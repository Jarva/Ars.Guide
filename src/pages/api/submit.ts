import type { APIContext } from 'astro';
import { EmbedBuilder } from "@discordjs/builders";
import { addonMap, glyphMap, spellFormSchema, transformMultiSelect, versionMap } from '../../utils/spell-form';

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
            { name: "Glyphs", value: transformMultiSelect(glyphMap)(body.glyphs).join(" ➝ ") },
            { name: "Category", value: body.category, inline: true },
            { name: "Addons", value: transformMultiSelect(addonMap)(body.addons).join(", "), inline: true },
            { name: "Description", value: body.description },
            { name: "Versions", value: body.versions.split(",").join(", "), inline: true },
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
            allowed_mentions: false
        })
    });

    const adminContent = [
        "```markdown",
        `## ${body.spell}`,
        "<Spell",
        `    author='${body.author}'`,
        `    glyphs={${JSON.stringify(body.glyphs.split(","))}}`,
        `    description='${body.description}'`,
        `    versions={${JSON.stringify(body.versions.split(","))}}`,
        `/>`,
        "```"
    ]

    if (!res.ok) {
        const json = await res.json();
        console.error("Discord Response", json);
    }

    const adminRes = await fetch(env.ADMIN_WEBHOOK_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: "Source Librarian",
            avatar_url: "https://cdn.discordapp.com/avatars/1235017501419765800/ff05eb9f01601892dd7b083dad16798d.webp?size=4096",
            content: adminContent.join("\n"),
            allowed_mentions: false
        })
    });

    if (!adminRes.ok) {
        const json = await res.json();
        console.error("Discord Response", json);
    }

    return Response.redirect(url.origin, 303);
}
