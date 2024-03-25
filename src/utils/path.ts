interface Path {
    collection: string;
    slug?: string;
    entry: any;
}


export const getPath = ({ collection, slug, entry }: Path) => ({
    params: {
        collection,
        slug
    },
    props: {
        entry
    }
});
