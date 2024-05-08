import type { APIContext } from 'astro';
import { EmbedBuilder } from "@discordjs/builders";
import { zfd } from "zod-form-data";
import { spellFormSchema } from '../../utils/spell-form';

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
  
    const body = spellFormSchema.parse(form);
    const url = new URL(request.url)

    const embed = new EmbedBuilder()
        .setTitle("New Spell Submission")
        .addFields([
            { name: "Author", value: body.author, inline: true },
            { name: "Spell", value: body.spell, inline: true },
            { name: "Glyphs", value: body.glyphs.join(" ➝ ") },
            { name: "Category", value: body.category, inline: true },
            { name: "Addons", value: body.addons.join(", "), inline: true },
            { name: "Description", value: body.description },
            { name: "Versions", value: body.versions.join(", "), inline: true },
            { name: "Requires Infinite Spell?", value: body.infinite ? "Yes" : "No", inline: true },
        ])
        .setTimestamp();

    const res = await fetch(env.WEBHOOK_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: "Source Librarian",
            avatar_url: "https://cdn.discordapp.com/avatars/1235017501419765800/ff05eb9f01601892dd7b083dad16798d.webp?size=4096",
            embeds: [embed.toJSON()],
        })
    });

    if (!res.ok) {
        const json = await res.json();
        console.error("Discord Response", json);
    }
    
    return Response.redirect(url.origin, 303);
}
