import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { getStats } from "~/services/github.server";

export const loader = async ({ context }: LoaderFunctionArgs) => {
	try {
		const stats = await getStats(
			context.cloudflare.env.GITHUB_USER,
			context.cloudflare.env.GITHUB_TOKEN,
		);
		return Response.json(stats, {
			headers: {
				"Cache-Control": "public, max-age=3600",
			},
		});
	} catch (error) {
		console.error("GitHub Fetch Failed:", error);
		return Response.json(
			{ repositories: { totalCount: 0 }, followers: { totalCount: 0 } },
			{ status: 200 }
		);
	}
};