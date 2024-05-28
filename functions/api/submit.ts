import { spellFormSchema } from '../../src/utils/spell-form';
import type { PagesFunction, Response as WorkerResponse } from '@cloudflare/workers-types'

interface Env {
	WEBHOOK_URL: string;
    ADMIN_WEBHOOK_URL: string;
}

const clean = (str: string) => (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;
    const form = await request.formData();
  
    const body = spellFormSchema.parse(form);
    const url = new URL(request.url)

    const adminContent = [
        "`" + body.category + ".mdx`",
        "```markdown",
        `## ${body.spell}`,
        "<Spell",
        `    author='${clean(body.author)}'`,
        `    glyphs={${JSON.stringify(clean(body.glyphs).split(","))}}`,
        ...(body.description != "N/A" ? [`    description='${clean(body.description)}'`] : []),
        `    versions={${JSON.stringify(clean(body.versions).split(","))}}`,
        `    addons={${JSON.stringify(clean(body.addons).split(","))}}`,
        `/>`,
        "```"
    ]

    const adminRes = await fetch(env.ADMIN_WEBHOOK_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: "Source Librarian",
            avatar_url: "https://cdn.discordapp.com/avatars/1235017501419765800/ff05eb9f01601892dd7b083dad16798d.webp?size=4096",
            content: adminContent.join("\n")
        })
    });

    if (!adminRes.ok) {
        const json = await adminRes.json();
        console.error("Discord Response", json);
    }

    return Response.redirect(url.origin, 303) as unknown as WorkerResponse;
}
