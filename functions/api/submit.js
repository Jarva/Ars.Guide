export async function onRequest({ request }) {
    if (request.method !== "POST") {
        return new Response("Method Not Allowed", {
            status: 405
        });
    }
    const body = await request.formData();

    const obj = Object.fromEntries(body);

    console.log("OBJ", JSON.stringify(obj));

    return new Response("OK", { status: 200 });
}
