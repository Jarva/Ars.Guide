import type { APIContext } from "astro"

const pagefindMock = `
export const preload = () => null;
export const debouncedSearch = () => ({ results: [] })
`

export async function GET({}: APIContext) {
  return new Response(pagefindMock, {
    headers: {
        'Content-Type': 'text/javascript'
    }
  })
}
