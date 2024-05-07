import type { APIContext } from 'astro';
import { EmbedBuilder } from "@discordjs/builders";

export const prerender = false;

interface FormData {
    author: string;
    description: string;
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

    const embed = new EmbedBuilder()
        .setTitle("New Spell Submission")
        .addFields([
            { name: "Author", value: body.author, inline: true },
            { name: "Spell", value: body.spell, inline: true },
            { name: "Glyphs", value: body.glyphs },
            { name: "Category", value: body.category, inline: true },
            { name: "Addons", value: body.addons.length > 0 ? body.addons.split(",").join(", ") : "None", inline: true },
            { name: "Description", value: body.description.length > 0 ? body.description : "N/A" },
            { name: "Versions", value: body.versions.split(",").join(", "), inline: true },
            { name: "Requires Infinite Spell?", value: "infinite" in body ? "Yes" : "No", inline: true },
        ])
        .setTimestamp();

    const res = await fetch(env.WEBHOOK_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            embeds: [embed.toJSON()],
        })
    });
    if (!res.ok) {
        const json = await res.json();
        console.error("Discord Response", json);
    }
    
    return Response.redirect(url.origin, 303);
}
