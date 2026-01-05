/**
 * GitHub and CDN fetch utilities.
 * Centralizes external API fetching patterns.
 */

const JSDELIVR_BASE = "https://cdn.jsdelivr.net/gh";
const GITHUB_API_BASE = "https://api.github.com";

export interface FetchOptions {
    headers?: Record<string, string>;
}

const defaultHeaders = {
    Accept: "application/vnd.github.text-match+json",
};

/**
 * Fetch JSON from jsDelivr CDN for a GitHub repository.
 * @param repo - Repository in "owner/repo" format
 * @param branch - Branch or tag name
 * @param path - File path within the repository
 */
export async function fetchFromCDN<T>(
    repo: string,
    branch: string,
    path: string
): Promise<T> {
    const url = `${JSDELIVR_BASE}/${repo}@${branch}/${path}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch from CDN: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

/**
 * Fetch contents of a directory from GitHub API.
 * @param repo - Repository in "owner/repo" format
 * @param path - Directory path within the repository
 */
export async function fetchGitHubContents<T>(
    repo: string,
    path: string
): Promise<T> {
    const url = `${GITHUB_API_BASE}/repos/${repo}/contents/${path}`;
    const response = await fetch(url, {
        headers: defaultHeaders,
    });

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

/**
 * Fetch JSON file from a GitHub repository via jsDelivr.
 * Convenience wrapper for common pattern.
 */
export async function fetchRepoFile<T>(
    repo: string,
    branch: string,
    filePath: string
): Promise<T> {
    return fetchFromCDN<T>(repo, branch, filePath);
}
