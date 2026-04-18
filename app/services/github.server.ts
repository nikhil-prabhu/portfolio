import { GitHubRepository, GitHubStats } from "../types/github";
import getPinnedReposQuery from "../graphql/getPinnedRepos.graphql?raw";
import getStatsQuery from "../graphql/getStats.graphql?raw";

export async function getPinnedRepositories(
	username: string,
	token: string
): Promise<GitHubRepository[]> {
	try {
		const response = await fetch("https://api.github.com/graphql", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
				"User-Agent": `${username}-portfolio`,
			},
			body: JSON.stringify({
				query: getPinnedReposQuery,
				variables: { username },
			}),
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`GitHub API HTTP Error: ${response.status} - ${errorText}`);
		}

		const json = await response.json() as any;

		if (!json.data?.user) {
			console.warn(`GitHub user "${username}" not found or unauthorized.`);
			return [];
		}

		const nodes = json.data.user.pinnedItems.nodes || [];

		return nodes
			.filter((repo: any) => repo !== null)
			.map((repo: any) => ({
				name: repo.name,
				description: repo.description || "",
				url: repo.url,
				stargazerCount: repo.stargazerCount || 0,
				forkCount: repo.forkCount || 0,
				licenseInfo: repo.licenseInfo ? {
					spdxId: repo.licenseInfo.spdxId
				} : null,
				primaryLanguage: repo.primaryLanguage ? {
					name: repo.primaryLanguage.name,
					color: repo.primaryLanguage.color
				} : null,
				topics: repo.repositoryTopics?.nodes
					?.map((n: any) => n.topic?.name)
					.filter(Boolean) || []
			}));

	} catch (error) {
		console.error("Failed to fetch pinned repos:", error);
		return [];
	}
}

export async function getStats(
	username: string,
	token: string
): Promise<GitHubStats> {
	try {
		const response = await fetch("https://api.github.com/graphql", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
				"User-Agent": `${username}-portfolio`,
			},
			body: JSON.stringify({
				query: getStatsQuery,
				variables: { username },
			}),
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`GitHub API HTTP Error: ${response.status} - ${errorText}`);
		}

		const json = await response.json() as any;

		if (!json.data?.user) {
			console.warn(`GitHub user "${username}" not found or unauthorized.`);
			return { repositories: { totalCount: 0 }, followers: { totalCount: 0 } };
		}

		return {
			repositories: {
				totalCount: json.data.user.repositories.totalCount || 0,
			},
			followers: {
				totalCount: json.data.user.followers.totalCount || 0,
			},
		};

	} catch (error) {
		console.error("Failed to fetch GitHub stats:", error);
		return { repositories: { totalCount: 0 }, followers: { totalCount: 0 } };
	}
}