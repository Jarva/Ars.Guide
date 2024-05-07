import type { APIContext } from 'astro';
import { EmbedBuilder } from "@discordjs/builders";

export const prerender = false;

interface FormData {
    author: string;
    description?: string;
    spell: string;
    glyphs: string;
    category: string;
    addons: string;
    versions: string;
    infinite: boolean;
}

type CloudflareContext = APIContext & {
    locals: APIContext["locals"] & {
        runtime: {
            env: {
                [k: string]: string;
            }
        }
    }
}

export async function POST(context: CloudflareContext) {
    const { request, locals } = context;
    const form = await request.formData();
    const { env } = locals.runtime;
  
    const body = Object.fromEntries(form) as unknown as FormData;
    const url = new URL(request.url)

    console.log("Body", body);

    const embed = new EmbedBuilder()
        .setTitle("New Spell Submission")
        .addFields(
            { name: "Author", value: body.author, inline: true },
            { name: "Spell", value: body.spell, inline: true },
            { name: "Category", value: body.category, inline: true },
            { name: "Addons", value: body.addons.split(",").join(", "), inline: true },
            { name: "Versions", value: body.versions.split(",").join(", "), inline: true },
            { name: "Requires Infinite Spell?", value: body.infinite ? "Yes" : "No", inline: true },
            { name: "Glyphs", value: body.glyphs },
            { name: "Description", value: body.description || "" },
        )
        .setTimestamp();

    const res = await fetch(env.WEBHOOK_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            // username: "Ars.Guide",
            // avatar_url: "https://ars.guide/favicon-512x512.png",
            content: null,
            embeds: [embed.toJSON()],
        })
    });
    const json = await res.json();
    console.log("Response", json);
    
    return Response.redirect(url.origin, 303);
}
