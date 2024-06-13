export const t = (text: string) => ({text});

export function toTitleCase(str: string) {
    return str.replaceAll("_", " ").replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}
