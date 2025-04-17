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

export async function searchRepo(keyword: string, page = 1) {
    if (keyword === '') return null;
    const query = encodeURIComponent(keyword);
    const pageSize = 10;

    try {
        const res = await fetch(`https://api.github.com/search/repositories?q=${query}&per_page=${pageSize}&page=${page}`);
        if (!res.ok) throw new Error(res.statusText);
        return await res.json();
    } catch (error) {
        console.log(error)
    }
}

export async function getRepo(id: string) {
    if (id === '') return;

    try {
        const res = await fetch(`https://api.github.com/repositories/${id}`);
        if (!res.ok) throw new Error(res.statusText);
        return await res.json();
    } catch (error) {
        console.log(error)
    }
}