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