import type { APIContext } from 'astro';
import { REST } from '@discordjs/rest';
import { EmbedBuilder } from "@discordjs/builders";
import { WebhooksAPI } from "@discordjs/core";

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

const rest = new REST({ version: '10' });

export async function POST(context: CloudflareContext) {
    const { request, locals } = context;
    const form = await request.formData();
    const { env } = locals.runtime;
  
    const body = Object.fromEntries(form) as unknown as FormData;
    const url = new URL(request.url)

    const client = new WebhooksAPI(rest);

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
        .setTimestamp()

    await client.execute(env.WEBHOOK_ID, env.WEBHOOK_TOKEN, embed.toJSON());
    
    return Response.redirect(url.origin, 303);
}
