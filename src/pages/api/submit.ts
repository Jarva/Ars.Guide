import type { APIContext } from 'astro';
import { Webhook, MessageBuilder } from "discord-webhook-node";

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

    const client = new Webhook(env.WEBHOOK_URL);

    const embed = new MessageBuilder()
        .setTitle('Submission')
        .setURL(url.origin)
        .addField("Spell", body.spell)
        .addField("Glyphs", body.glyphs)
        .addField("Category", body.category)
        .addField("Addons", body.addons.split(",").join(", "))
        .addField("Versions", body.versions.split(",").join(", "))
        .setAuthor({ name: body.author })
        .setDescription(body.description.length == 0 ? null : body.description)
        .setTimestamp()

    await client.send(embed);
    
    return Response.redirect(url.origin, 303);
}
