import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "~/components/Card";
import { type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { getPinnedRepositories } from "~/services/github.server";
import { GitHubRepository } from "~/types/github";
import { FaCodeFork } from "react-icons/fa6";
import { IconType } from "react-icons";
import { SiPython, SiTypescript, SiGo, SiRust, SiJavascript, SiCplusplus, SiGnuemacs, SiLua } from "react-icons/si";
import { FaBalanceScale, FaCode, FaStar } from "react-icons/fa";

export const loader = async ({ context }: LoaderFunctionArgs) => {
	const reposPromise = getPinnedRepositories(
		context.cloudflare.env.GITHUB_USER,
		context.cloudflare.env.GITHUB_TOKEN,
	);
	return { repos: reposPromise };
};

const getLanguageIcon = (langName: string | undefined): IconType => {
	switch (langName?.toLowerCase()) {
		case "typescript": return SiTypescript;
		case "javascript": return SiJavascript;
		case "python": return SiPython;
		case "go": return SiGo;
		case "rust": return SiRust;
		case "c++": return SiCplusplus;
		case "emacs-lisp": return SiGnuemacs;
		case "lua": return SiLua;
		default: return FaCode;
	}
};

export default function ProjectsView() {
	const { repos } = useLoaderData<typeof loader>();
	const [data, setData] = useState<GitHubRepository[] | null>(null);
	const [selectedIndex, setSelectedIndex] = useState(0);

	useEffect(() => {
		repos.then((resolved) => setData(resolved));
	}, [repos]);

	const activeRepo = data ? data[selectedIndex] : null;

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9, y: 20 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			transition={{ type: "spring", stiffness: 260, damping: 20 }}
			className="flex flex-col items-center justify-center gap-8 w-full"
		>
			<div className="w-full max-w-7xl rounded-2xl border-4 border-[#ACB9C4] bg-[#38464C] p-4 md:p-8">
				<div className="flex flex-col gap-8">
					<section>
						<h2 className="text-3xl xl:text-6xl text-white">Projects</h2>
						<span className="text-xl text-gray-300">Click a card to learn more about my projects.</span>
					</section>

					<section className="bg-[#1A2527] border-b-4 border-[#131A1C] rounded-xl p-4 md:p-12">
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-16 gap-x-8 justify-items-center">
							{[...Array(6)].map((_, index) => {
								const repo = data?.[index];
								const isLoading = !data || !repo;
								const LangIcon = getLanguageIcon(repo?.primaryLanguage?.name);

								return (
									<Card
										key={index}
										index={index}
										faceIcon={repo ? <LangIcon size={32} color={repo.primaryLanguage?.color || "#fff"} /> : undefined}
										label={repo?.name}
										isLoading={isLoading}
										isSelected={data ? data && selectedIndex === index : false}
										onClick={() => setSelectedIndex(index)}
									/>
								);
							})}
						</div>
					</section>
				</div>
			</div>

			<AnimatePresence mode="wait">
				{activeRepo && (
					<motion.div
						key={activeRepo.name}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
						className="w-full max-w-7xl"
					>
						<div className="w-full rounded-2xl border-4 border-[#ACB9C4] bg-[#38464C] p-8">
							<div className="flex flex-col gap-8">
								<section>
									<div className="flex flex-row text-2xl xl:text-4xl items-center justify-between bg-[#C2BFD7] border-b-4 border-[#606B72] rounded-xl p-1 gap-8">
										<span className="bg-white text-[#516164] rounded-xl p-2">
											{activeRepo.primaryLanguage?.name || "Code"}
										</span>
										<span className="text-center w-full [text-shadow:4px_4px_0px_rgba(112,120,128,1)]">
											{activeRepo.name}
										</span>

										<div className="flex flex-row items-center justify-center w-[60%] bg-[#10181A] border-4 border-[#10181A] rounded-xl overflow-hidden">
											<div className="bg-[#0F8FFA] rounded-xl text-right w-full text-2xl xl:text-4xl px-4">
												<span className="text-white flex flex-row items-center justify-end gap-2"><FaStar /> {activeRepo.stargazerCount}</span>
											</div>
											<span className="text-2xl xl:text-4xl text-[#F64A40] w-[20%] xl:w-[25%] text-center">X</span>
											<div className="bg-[#FC4B43] rounded-xl text-left w-full text-2xl xl:text-4xl px-4">
												<span className="text-white flex flex-row items-center justify-start gap-2"><FaCodeFork /> {activeRepo.forkCount}</span>
											</div>
										</div>

										<div className="flex flex-row items-center justify-center w-[60%] gap-2">
											<FaBalanceScale />
											<div className="bg-[#1A2527] text-center rounded-xl text-2xl xl:text-4xl p-2 w-full text-white truncate">
												{activeRepo.licenseInfo?.spdxId || "No license"}
											</div>
										</div>
									</div>
								</section>

								<section className="bg-[#1A2527] border-b-4 border-[#131A1C] rounded-xl p-6 text-white text-xl leading-relaxed">
									{activeRepo.description || "No description provided."}
									{activeRepo.url && (
										<a href={activeRepo.url} target="_blank" rel="noopener noreferrer" className="text-[#0F8FFA] underline ml-2">
											View on GitHub
										</a>
									)}
								</section>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}