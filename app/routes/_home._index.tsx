import { motion } from "framer-motion";
import { useState } from "react";
import { IconType } from "react-icons";
import { DiJava } from "react-icons/di";
import { FaAws, FaGitAlt, FaGithub, FaPython, FaRust } from "react-icons/fa";
import { FaGolang } from "react-icons/fa6";
import { SiAnsible, SiCplusplus, SiGooglecloud, SiKubernetes, SiTerraform, SiTypescript } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import Container from "~/components/Container";
import SectionBox from "~/components/SectionBox";

export default function AboutIndex() {
	return (
		<SectionBox>
			<div className="flex flex-col gap-8">
				<section>
					<h2 className="text-3xl xl:text-6xl text-white">
						About Me
					</h2>
					{resources.about.map((paragraph, index) => (
						<p key={index} className="mb-4 mt-4 text-xl xl:text-2xl">
							{paragraph}
						</p>
					))}
				</section>

				<Container>
					<div className="flex flex-wrap gap-2 p-4">
						<SkillTag icon={FaGolang} color="#00ADD8" label="Go" description="High-level, general-purpose programming language." />
						<SkillTag icon={FaRust} color="#dea584" label={"Rust"} description="Modern, high-performance systems programming language." />
						<SkillTag icon={FaPython} color="#3572A5" label={"Python"} description="Dynamically-typed, high-level programming language." />
						<SkillTag icon={FaAws} color="#FF9900" label={"AWS"} description="Cloud computing platform." />
						<SkillTag icon={VscAzure} color="#007FFF" label={"Microsoft Azure"} description="Cloud computing platform." />
						<SkillTag icon={SiGooglecloud} color="#4285F4" label={"Google Cloud Platform"} description="Cloud computing platform." />
						<SkillTag icon={SiTerraform} color="#623CE4" label={"Terraform"} description="Infrastructure as Code tool." />
						<SkillTag icon={SiKubernetes} color="#326CE5" label={"Kubernetes"} description="Container orchestration platform." />
						<SkillTag icon={SiAnsible} color="#000000" label={"Ansible"} description={"Automation and configuration management tool."} />
						<SkillTag icon={FaGitAlt} color="#F05032" label={"Git"} description={"Version control system."} />
						<SkillTag icon={FaGithub} color="#000000" label={"GitHub"} description={"Web-based Git repository hosting service."} />
						<SkillTag icon={SiTypescript} color="#3178C6" label={"TypeScript"} description={"Superset of JavaScript that adds static typing."} />
						<SkillTag icon={DiJava} color="#007396" label={"Java"} description={"General-purpose programming language."} />
						<SkillTag icon={SiCplusplus} color="#00599C" label={"C/C++"} description={"General-purpose programming language."} />
					</div>
				</Container>
			</div>
		</SectionBox>
	);
}

function SkillTag({ icon, color, label, description }: { icon: IconType, color: string, label: string, description: string }) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className="relative"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<motion.div
				whileHover={{ scale: 1.15, rotate: 5 }}
				transition={{
					type: "spring",
					stiffness: 400,
					damping: 12,
				}}
				animate={{
					filter: "drop-shadow(6px 6px 0px rgba(0,0,0,0.5))"
				}}
				className="bg-white border-4 border-[#AABDD9] rounded-xl p-2 cursor-help w-full"
			>
				{icon({ size: 32, color: color })}
			</motion.div>

			{isHovered && (
				<div className="absolute right-full top-1/2 z-50 mr-4 -translate-y-1/2 pointer-events-none border-b-4 border-[#918A93] rounded-xl w-[256px] normal-case tracking-normal">
					<div className="flex flex-col bg-[#414143] border-4 border-[#D2D6DA] p-2 rounded-xl shadow-2xl w-full gap-1">
						<h3 className="text-xl xl:text-2xl text-center">
							{label}
						</h3>
						<p className="text-lg xl:text-xl text-[#414143] bg-white border-b-4 border-[#918A93] rounded-xl p-2 text-shadow-none">
							{description}
						</p>
					</div>
				</div>
			)}
		</div>
	);
}

const resources = {
	about: [
		"I'm a Backend and Platform Engineer with 6+ years of experience building scalable backend services, developer platforms, and cloud automation using Go, Rust, and Python.",
		"Experienced in distributed systems, cloud-native infrastructure, and reliability engineering across AWS, Azure, and GCP. Focused on improving developer productivity, system reliability, and operational scalability through automation and reusable tooling.",
		"I'm passionate about open source, continuous learning, and sharing knowledge with the community.",
		"My skills are listed below. Hover over the chips for more info."
	],
}