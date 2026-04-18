import { motion, TargetAndTransition } from "framer-motion";
import { useState, useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaSteam } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { SiMatrix } from "react-icons/si";

type ProfileProps = { chipImage: string; name: string; title: string; gitHubUrl: string; }
type LocationProps = { location: string; }
type GitHubStatsProps = { repos: number; followers: number; }
type SettingsAndSocialProps = {
	emailUrl: string; matrixUrl: string; linkedInUrl: string; linkedInId: string;
	steamUrl: string; instagramUrl: string; isShaderEnabled: boolean; isCrtEnabled: boolean;
	toggleShader: () => void; toggleCrt: () => void;
}

type SidePanelProps = {
	chipImage: string; name: string; title: string; location: string; gitHubUrl: string;
	linkedInUrl: string; linkedInId: string; emailUrl: string; matrixUrl: string;
	steamUrl: string; instagramUrl: string; isShaderEnabled: boolean; isCrtEnabled: boolean;
	toggleShader: () => void; toggleCrt: () => void;
};

function Profile({ chipImage, name, title, gitHubUrl }: ProfileProps) {
	const [isDragging, setIsDragging] = useState(false);
	return (
		<div className="flex flex-col items-center justify-center w-full bg-[#10181A] border-4 border-[#10181A] rounded-xl gap-1">
			<div className="flex flex-col bg-[#434343] border-b-2 border-[#252A2B] rounded-xl text-center text-4xl xl:text-6xl w-full"><span>{title}</span></div>
			<div className="flex flex-col items-center justify-center bg-[#303638] border-b-4 border-b-[#131A1C] rounded-xl w-full">
				<span className="text-xl xl:text-2xl m-1">{name}</span>
				<div className="flex flex-row items-center justify-center gap-4 w-full m-2">
					<motion.div drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={0.7} onDragStart={() => setIsDragging(true)} onDragEnd={() => setIsDragging(false)} whileHover={{ scale: 1.15, rotate: 5 }} whileTap={{ scale: 1.0, cursor: "grabbing" }} transition={{ type: "spring", stiffness: 400, damping: 12 }} animate={{ filter: isDragging ? "drop-shadow(0px 0px 0px rgba(0,0,0,0))" : "drop-shadow(6px 6px 0px rgba(0,0,0,0.5))" }} className="w-20 xl:w-28 cursor-grab">
						<img src={chipImage} alt={name} className="pointer-events-none select-none rounded-full border-2 border-white/10" />
					</motion.div>
					<div className="flex flex-col items-center justify-center w-[60%] xl:w-[65%] bg-[#1A2527] border-b-4 border-[#131A1C] rounded-xl">
						<span className="text-sm xl:text-xl">Go check out my</span>
						<a href={gitHubUrl} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center justify-center gap-2 text-2xl"><FaGithub /> <span className="text-[#E6504A] text-2xl xl:text-4xl">GitHub</span></a>
						<div className="flex flex-row items-center justify-center gap-2"><span className="text-sm xl:text-xl">Reward:</span> <span className="text-[#EAAE6C] text-xl xl:text-4xl">$$$$$</span></div>
					</div>
				</div>
			</div>
		</div>
	);
}

function Location({ location }: LocationProps) {
	return (
		<div className="flex flex-row items-center justify-evenly bg-[#414143] w-full rounded-xl border-b-4 border-[#131A1C]">
			<span className="m-2 text-xl xl:text-2xl">Location</span>
			<div className="flex flex-row items-center justify-center bg-[#283032] rounded-xl p-1 pl-4 pr-4 gap-2 w-full m-2"><FaLocationDot /> <span className="text-2xl xl:text-4xl">{location}</span></div>
		</div>
	);
}

function GitHubStats({ repos, followers }: GitHubStatsProps) {
	const getPopAnimation = (val: number): TargetAndTransition => {
		if (val === 0) return { scale: 1 };
		return { scale: [1, 1.2, 0.95, 1], transition: { duration: 0.4, times: [0, 0.2, 0.5, 1], ease: "easeOut" } };
	};
	return (
		<div className="flex flex-col items-center justify-center bg-[#1A2527] w-full rounded-xl border-b-4 border-[#131A1C] p-4 gap-4">
			<span className="text-2xl xl:text-4xl">GitHub Repos &amp; Followers</span>
			<div className="flex flex-row items-center justify-center gap-2 w-full px-2">
				<motion.div animate={getPopAnimation(repos)} className="bg-[#0F8FFA] border-b-4 border-[#10539A] rounded-xl text-right w-full p-2 text-4xl xl:text-6xl"><span>{repos}</span></motion.div>
				<span className="text-4xl xl:text-6xl text-[#F64A40] w-[20%] xl:w-[25%] text-center">X</span>
				<motion.div animate={getPopAnimation(followers)} className="bg-[#FC4B43] border-b-4 border-[#963332] rounded-xl text-left w-full p-2 text-4xl xl:text-6xl"><span>{followers}</span></motion.div>
			</div>
		</div>
	);
}

function SettingsAndSocial(props: SettingsAndSocialProps) {
	return (
		<div className="flex flex-col items-center justify-center w-full h-[250px] xl:h-[400px]">
			<div className="flex flex-row items-center justify-start gap-2 w-full h-full">
				<div className="flex flex-col items-center justify-center gap-2 w-[30%] h-[80%] xl:w-[40%]">
					<button className="bg-[#FC4B43] w-full h-full rounded-xl border-r-4 border-b-4 border-[#24251F] text-2xl xl:text-4xl p-2" onClick={props.toggleShader}>{props.isShaderEnabled ? "Disable Motion" : "Enable Motion"}</button>
					<button className="bg-[#E29103] w-full h-full rounded-xl border-r-4 border-b-4 border-[#24251F] text-2xl xl:text-4xl p-2" onClick={props.toggleCrt}>{props.isCrtEnabled ? "Disable CRT" : "Enable CRT"}</button>
				</div>
				<div className="flex flex-col items-center justify-center gap-2 w-full h-full">
					<div className="flex flex-row items-center justify-center gap-2 w-full">
						<div className="flex flex-col items-center justify-evenly bg-[#414143] w-full rounded-xl border-b-4 border-[#131A1C] p-1">
							<span className="text-xl xl:text-3xl">Mail</span>
							<a href={props.emailUrl} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center justify-center bg-[#283032] rounded-xl p-1 pl-4 pr-4 gap-2 w-full text-2xl xl:text-4xl"><FaEnvelope /></a>
						</div>
						<div className="flex flex-col items-center justify-evenly bg-[#414143] w-full rounded-xl border-b-4 border-[#131A1C] p-1">
							<span className="text-xl xl:text-3xl">Matrix</span>
							<a href={props.matrixUrl} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center justify-center bg-[#283032] rounded-xl p-1 pl-4 pr-4 gap-2 w-full text-2xl xl:text-4xl"><SiMatrix /></a>
						</div>
					</div>
					<div className="flex flex-row items-center justify-center gap-2 w-full">
						<div className="flex flex-col items-center justify-evenly bg-[#414143] w-full rounded-xl border-b-4 border-[#131A1C] p-1">
							<a href={props.linkedInUrl} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center justify-center bg-[#283032] rounded-xl p-1 pl-4 pr-4 gap-2 w-full">
								<FaLinkedin className="text-xl xl:text-3xl" /> <span className="text-lg xl:text-3xl">{props.linkedInId}</span>
							</a>
						</div>
					</div>
					<div className="flex flex-row items-center justify-center gap-2 w-full">
						<div className="flex flex-col items-center justify-evenly bg-[#414143] w-full rounded-xl border-b-4 border-[#131A1C] p-1">
							<span className="text-xl xl:text-3xl">Steam</span>
							<a href={props.steamUrl} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center justify-center bg-[#283032] rounded-xl p-1 pl-4 pr-4 gap-2 w-full text-2xl xl:text-4xl"><FaSteam /></a>
						</div>
						<div className="flex flex-col items-center justify-evenly bg-[#414143] w-full rounded-xl border-b-4 border-[#131A1C] p-1">
							<span className="text-xl xl:text-3xl">Instagram</span>
							<a href={props.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center justify-center bg-[#283032] rounded-xl p-1 pl-4 pr-4 gap-2 w-full text-2xl xl:text-4xl"><FaInstagram /></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export function SidePanel(props: SidePanelProps) {
	const fetcher = useFetcher<any>();
	useEffect(() => {
		if (fetcher.state === "idle" && !fetcher.data) {
			fetcher.load("/api/github-stats");
		}
	}, [fetcher]);

	const repos = fetcher.data?.repositories?.totalCount ?? 0;
	const followers = fetcher.data?.followers?.totalCount ?? 0;

	return (
		<aside
			className="
        /* SHARED STYLES */
        flex flex-col items-center border-[#3D4142] bg-[#232C2C] shadow-2xl transition-all gap-2 p-2 z-30
        
        /* MOBILE STYLES (Landing Page Mode) */
        relative w-[calc(100%-1rem)] m-2 rounded-xl border-4 h-fit justify-start
        
        /* DESKTOP STYLES (Side Panel Mode) */
        md:fixed md:left-14 md:top-0 md:h-screen md:w-72 md:xl:w-[512px] md:m-0 md:rounded-none md:border-y-0 md:border-l-4 md:border-r-4 md:justify-center
    "
		>
			<Profile chipImage={props.chipImage} name={props.name} title={props.title} gitHubUrl={props.gitHubUrl} />
			<Location location={props.location} />
			<GitHubStats repos={repos} followers={followers} />
			<SettingsAndSocial {...props} />
			<div className="md:absolute md:bottom-2 mt-auto pb-2">
				<a href="https://www.playbalatro.com/" target="_blank" rel="noopener noreferrer" className="text-sm xl:text-lg opacity-50 hover:opacity-100 transition-opacity">Design inspiration: Balatro, by LocalThunk</a>
			</div>
		</aside>
	);
}