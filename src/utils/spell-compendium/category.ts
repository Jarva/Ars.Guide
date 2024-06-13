import type { Category } from "./data/categories"
import { submissions } from "./spells"

export const getSubmissionsFromCategory = (category: Category) => {
    return submissions.filter(submission => submission.category == category).sort((a, b) => a.name < b.name ? -1 : 1);
}
