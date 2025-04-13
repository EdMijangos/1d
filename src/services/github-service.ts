export interface SearchResponse {
    id: number,
    name: string,
    stargazers_count: number,
    watchers_count: number,
    language: string,
    forks_count: number,
    open_issues_count: number,
    owner: {
        avatar_url: string
    }
}


export async function searchRepo(keyword: string) {
    if (keyword === '') return null;

    try {
        const res = await fetch(`https://api.github.com/search/repositories?q=${keyword}`);
        if (!res.ok) throw new Error(res.statusText);
        return await res.json();
    } catch (error) {
        console.log(error)
    }
}