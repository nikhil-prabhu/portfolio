import { motion } from "framer-motion";
import { useState } from "react";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaSteam } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { SiMatrix } from "react-icons/si";

type SidePanelProps = {
	chipImage: string;
	name: string;
	title: string;
	location: string;
	gitHubUrl: string;
	linkedInUrl: string;
	linkedInId: string;
	emailUrl: string;
	matrixUrl: string;
	steamUrl: string;
	instagramUrl: string;
	isShaderEnabled: boolean;
	isCrtEnabled: boolean;
	toggleShader: () => void;
	toggleCrt: () => void;
};

export const SidePanel = ({ chipImage, name, title, location, gitHubUrl, linkedInUrl, linkedInId, emailUrl, matrixUrl, steamUrl, instagramUrl, isShaderEnabled, isCrtEnabled, toggleShader, toggleCrt }: SidePanelProps) => {
	const [isDragging, setIsDragging] = useState(false);

	return (
		<aside className="fixed left-14 top-0 z-40 flex flex-col items-center justify-center border-l-4 border-r-4 border-[#3D4142] bg-[#232C2C] shadow-2xl transition-all flex-row p-2 h-screen w-72 flex-col justify-start pt-12 gap-2">

			<div className="flex flex-col items-center justify-center w-full bg-[#10181A] border-4 border-[#10181A] rounded-xl gap-1">
				<div className="flex flex-col bg-[#434343] border-b-2 border-[#252A2B] rounded-xl text-center text-4xl w-full">
					<span>{title}</span>
				</div>

				<div className="flex flex-col items-center justify-center bg-[#303638] border-b-4 border-b-[#131A1C] rounded-xl w-full">
					<span className="text-xl m-1">{name}</span>

					<div className="flex flex-row items-center justify-center gap-4 w-full m-2">
						<motion.div
							drag
							dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
							dragElastic={0.7}
							onDragStart={() => setIsDragging(true)}
							onDragEnd={() => setIsDragging(false)}

							whileHover={{ scale: 1.15, rotate: 5 }}

							whileTap={{ scale: 1.0, cursor: "grabbing" }}

							transition={{
								type: "spring",
								stiffness: 400,
								damping: 12,
							}}

							animate={{
								filter: isDragging
									? "drop-shadow(0px 0px 0px rgba(0,0,0,0))"
									: "drop-shadow(6px 6px 0px rgba(0,0,0,0.5))"
							}}

							className="z-10 w-20 cursor-grab"
						>
							<img
								src={chipImage}
								alt={name}
								className="pointer-events-none select-none rounded-full border-2 border-white/10"
							/>
						</motion.div>

						<div className="flex flex-col items-center justify-center w-[60%] bg-[#1A2527] border-b-4 border-[#131A1C] rounded-xl">
							<span className="text-sm">Go check out my</span>
							<a href={gitHubUrl} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center justify-center gap-2 text-2xl">
								<FaGithub /> <span className="text-[#E6504A]">GitHub</span>
							</a>
							<div className="flex flex-row items-center justify-center gap-2">
								<span className="text-sm">Reward:</span> <span className="text-[#EAAE6C] text-xl">$$$$$</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-row items-center justify-evenly bg-[#414143] w-full rounded-xl border-b-4 border-[#131A1C]">
				<span className="m-2">Location</span>

				<div className="flex flex-row items-center justify-center bg-[#283032] rounded-xl p-1 pl-4 pr-4 gap-2">
					<FaLocationDot /> <span className="text-md">{location}</span>
				</div>
			</div>

			<div className="flex flex-col items-center justify-center bg-[#1A2527] w-full rounded-xl border-b-4 border-[#131A1C] p-4">
				<span className="m-6"></span>

				<div className="flex flex-row items-center justify-center gap-2 w-full">
					<div className="bg-[#0F8FFA] border-b-4 border-[#10539A] rounded-xl text-right w-full p-2 text-4xl">
						<span>0</span>
					</div>

					<span className="text-4xl text-[#F64A40] w-[20%] text-center">X</span>

					<div className="bg-[#FC4B43] border-b-4 border-[#963332] rounded-xl text-left w-full p-2 text-4xl">
						<span>0</span>
					</div>
				</div>
			</div>

			<div className="flex flex-col items-center justify-center w-full h-[250px]">
				<div className="flex flex-row items-center justify-start gap-2 w-full h-full">
					<div className="flex flex-col items-center justify-center gap-2 w-[30%] h-[80%]">
						<button className="bg-[#FC4B43] w-full h-full rounded-xl border-r-4 border-b-4 border-[#24251F] text-2xl p-2" onClick={toggleShader}>
							{isShaderEnabled ? "Disable Motion" : "Enable Motion"}
						</button>
						<button className="bg-[#E29103] w-full h-full rounded-xl border-r-4 border-b-4 border-[#24251F] text-2xl p-2" onClick={toggleCrt}>
							{isCrtEnabled ? "Disable CRT" : "Enable CRT"}
						</button>
					</div>

					<div className="flex flex-col items-center justify-center gap-2 w-full h-full">
						<div className="flex flex-row items-center justify-center gap-2 w-full">
							<div className="flex flex-col items-center justify-evenly bg-[#414143] w-full rounded-xl border-b-4 border-[#131A1C] p-1">
								<span className="">Mail</span>

								<a href={emailUrl} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center justify-center bg-[#283032] rounded-xl p-1 pl-4 pr-4 gap-2 w-full text-2xl">
									<FaEnvelope />
								</a>
							</div>

							<div className="flex flex-col items-center justify-evenly bg-[#414143] w-full rounded-xl border-b-4 border-[#131A1C] p-1">
								<span className="">Matrix</span>

								<a href={matrixUrl} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center justify-center bg-[#283032] rounded-xl p-1 pl-4 pr-4 gap-2 w-full text-2xl">
									<SiMatrix />
								</a>
							</div>
						</div>

						<div className="flex flex-row items-center justify-center gap-2 w-full">
							<div className="flex flex-col items-center justify-evenly bg-[#414143] w-full rounded-xl border-b-4 border-[#131A1C] p-1">
								<a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center justify-center bg-[#283032] rounded-xl p-1 pl-4 pr-4 gap-2 w-full">
									<FaLinkedin /> <span className="text-md">{linkedInId}</span>
								</a>
							</div>
						</div>

						<div className="flex flex-row items-center justify-center gap-2 w-full">
							<div className="flex flex-col items-center justify-evenly bg-[#414143] w-full rounded-xl border-b-4 border-[#131A1C] p-1">
								<span className="">Steam</span>

								<a href={steamUrl} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center justify-center bg-[#283032] rounded-xl p-1 pl-4 pr-4 gap-2 w-full text-2xl">
									<FaSteam />
								</a>
							</div>

							<div className="flex flex-col items-center justify-evenly bg-[#414143] w-full rounded-xl border-b-4 border-[#131A1C] p-1">
								<span className="">Instagram</span>

								<a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center justify-center bg-[#283032] rounded-xl p-1 pl-4 pr-4 gap-2 w-full text-2xl">
									<FaInstagram />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="absolute fixed bottom-0">
				<a href="https://www.playbalatro.com/" target="_blank" rel="noopener noreferrer" className="text-xs">Design inspiration: Balatro, by LocalThunk</a>
			</div>
		</aside>
	);
};