import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { getPinnedRepositories } from "~/services/github.server";

export const loader = async ({ context }: LoaderFunctionArgs) => {
	try {
		const repos = await getPinnedRepositories(
			context.cloudflare.env.GITHUB_USER,
			context.cloudflare.env.GITHUB_TOKEN,
		);
		return Response.json(repos, {
			headers: {
				"Cache-Control": "public, max-age=3600",
			},
		});
	} catch (error) {
		console.error("GitHub Projects Fetch Failed:", error);
		return Response.json([], { status: 200 });
	}
};