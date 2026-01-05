import type { Category } from "../../lib/types/category"
import { submissions } from "./spells"

export const getSubmissionsFromCategory = (category: Category) => {
    return submissions.filter(submission => submission.category == category).sort((a, b) => a.name < b.name ? -1 : 1);
}
