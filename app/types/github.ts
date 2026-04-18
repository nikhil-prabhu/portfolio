export interface GitHubLicense {
	spdxId: string;
}

export interface GitHubLanguage {
	name: string;
	color: string;
}

export interface GitHubRepository {
	name: string;
	description: string;
	url: string;
	stargazerCount: number;
	forkCount: number;
	licenseInfo: GitHubLicense | null;
	primaryLanguage: GitHubLanguage | null;
}

export interface GitHubRepositories {
	totalCount: number;
}

export interface GitHubFollowers {
	totalCount: number;
}

export interface GitHubStats {
	repositories: GitHubRepositories;
	followers: GitHubFollowers;
}