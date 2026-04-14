import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "~/components/Card";
import { type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { getPinnedRepositories } from "~/services/github.server";
import { GitHubRepository } from "~/types/github";
import { FaCodeFork } from "react-icons/fa6";
import { IconType } from "react-icons";
import { SiPython, SiTypescript, SiGo, SiRust, SiJavascript, SiCplusplus, SiGnubash, SiGnuemacs, SiLua } from "react-icons/si";
import { FaBalanceScale, FaCode, FaStar } from "react-icons/fa";
import SectionBox from "~/components/SectionBox";
import Container from "~/components/Container";
import { MetaBar, MetaDataBlock, MetaInfo, MetaPill, MetaTitle } from "~/components/MetaBar";

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
		case "shell": return SiGnubash;
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
		<div className="flex flex-col items-center justify-center gap-8 w-full">
			<SectionBox>
				<div className="flex flex-col gap-8">
					<section>
						<h2 className="text-3xl xl:text-6xl text-white">Projects</h2>
						<span className="text-xl text-gray-300">Click a card to learn more about my projects.</span>
					</section>

					<Container className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-8 gap-x-4 justify-items-center p-4">
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
					</Container>
				</div>
			</SectionBox>

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
						<SectionBox>
							<div className="flex flex-col gap-8">
								<MetaBar>
									<MetaPill>{activeRepo.primaryLanguage?.name || "Code"}</MetaPill>

									<MetaTitle>{activeRepo.name}</MetaTitle>

									<MetaDataBlock
										leftLabel={<span className="flex items-center gap-1"><FaStar /> {activeRepo.stargazerCount}</span>}
										rightLabel={<span className="flex items-center gap-1"><FaCodeFork /> {activeRepo.forkCount}</span>}
										separator="X"
									/>

									<MetaInfo
										icon={FaBalanceScale}
										label={activeRepo.licenseInfo?.spdxId || "No License"}
									/>
								</MetaBar>

								<Container className="p-4">
									{activeRepo.description || "No description provided."}
									{activeRepo.url && (
										<a href={activeRepo.url} target="_blank" rel="noopener noreferrer" className="text-[#0F8FFA] underline ml-2">
											View on GitHub
										</a>
									)}
								</Container>
							</div>
						</SectionBox>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
