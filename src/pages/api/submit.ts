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
        .setTitle('Submission')
        .setURL(url.origin)
        .addFields(
            { name: "Spell", value: body.spell },
            { name: "Glyphs", value: body.glyphs },
            { name: "Category", value: body.category },
            { name: "Addons", value: body.addons.split(",").join(", ") },
            { name: "Versions", value: body.versions.split(",").join(", ") },
        )
        .setAuthor({ name: body.author })
        .setDescription(body.description.length == 0 ? null : body.description)
        .setTimestamp();

    const res = await fetch(env.WEBHOOK_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            embeds: [embed.toJSON()]
        })
    });
    const json = await res.json();
    console.log("Response", json);
    
    return Response.redirect(url.origin, 303);
}
