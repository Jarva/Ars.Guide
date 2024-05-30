import { spellFormSchema } from '../../src/utils/spell-form';
import type { PagesFunction, Response as WorkerResponse } from '@cloudflare/workers-types'
import he from "he"

interface Env {
	WEBHOOK_URL: string;
    ADMIN_WEBHOOK_URL: string;
}

const clean = (str: string) => he.encode(str, { useNamedReferences: true });

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;
    const form = await request.formData();
  
    const body = spellFormSchema.parse(form);
    const url = new URL(request.url)

    const markdownBuilder: string[] = [];
    markdownBuilder.push("`" + body.category + ".mdx`");
    markdownBuilder.push("```markdown")
    markdownBuilder.push(`## ${body.spell}`)
    markdownBuilder.push("<Spell")
    markdownBuilder.push(`    author='${clean(body.author)}'`)
    markdownBuilder.push(`    glyphs='${JSON.stringify(body.glyphs.split(","))}'`)
    if (body.description != "N/A") {
        markdownBuilder.push(`    description='${clean(body.description)}'`)
    }
    markdownBuilder.push(`    versions='${JSON.stringify(body.versions.split(","))}'`)
    if (body.addons.length > 0) {
        markdownBuilder.push(`    addons='${JSON.stringify(body.addons.split(","))}'`)
    }

    const adminRes = await fetch(env.ADMIN_WEBHOOK_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: "Source Librarian",
            avatar_url: "https://cdn.discordapp.com/avatars/1235017501419765800/ff05eb9f01601892dd7b083dad16798d.webp?size=4096",
            content: markdownBuilder.join("\n")
        })
    });

    if (!adminRes.ok) {
        const json = await adminRes.json();
        console.error("Discord Response", json);
    }

    return Response.redirect(url.origin, 303) as unknown as WorkerResponse;
}
