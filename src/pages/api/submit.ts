import type { APIContext } from 'astro';

export const prerender = false;

export async function POST({ request }: APIContext) {
    const body = await request.formData();
  
    const obj = Object.fromEntries(body);
    console.log("OBJ", JSON.stringify(obj));

    return new Response("OK", { status: 200 });
}
