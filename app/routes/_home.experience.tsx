import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "~/components/Card";

import EGYMLogo from "/egym.svg";
import SAPLogo from "/sap.svg";
import { FaLocationDot } from "react-icons/fa6";
import Container from "~/components/Container";
import SectionBox from "~/components/SectionBox";
import { MetaBar, MetaPill, MetaTitle, MetaDataBlock, MetaInfo } from "~/components/MetaBar";

export default function ExperienceView() {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const activeExperience = experience[selectedIndex];

	return (
		<div className="flex flex-col items-center justify-center gap-8 w-full">
			<SectionBox>
				<div className="flex flex-col gap-8">
					<section>
						<h2 className="text-2xl xl:text-4xl text-white">
							Experience
						</h2>
						<span className="text-lg xl:text-xl">
							Click a card to learn more about my experience.
						</span>
					</section>

					<Container className="flex flex-wrap gap-6 items-center justify-center p-4">
						{experience.map((exp, index) => (
							<Card
								key={exp.id}
								faceIcon={exp.logo}
								label={exp.role}
								isSelected={selectedIndex === index}
								onClick={() => setSelectedIndex(index)}
							/>
						))}
					</Container>
				</div>
			</SectionBox>

			<AnimatePresence mode="wait">
				<motion.div
					key={activeExperience.id}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.2 }}
					className="w-full max-w-7xl"
				>
					<SectionBox>
						<div className="flex flex-col gap-8">
							<MetaBar>
								<MetaPill>{activeExperience.company}</MetaPill>

								<MetaTitle>{activeExperience.role}</MetaTitle>

								<MetaDataBlock
									leftLabel={activeExperience.startDate}
									rightLabel={activeExperience.endDate}
								/>

								<MetaInfo
									icon={FaLocationDot}
									label={activeExperience.location}
								/>
							</MetaBar>

							<Container className="p-4">
								{activeExperience.tasks.length > 0 ? (
									<ul className="list-disc list-inside text-lg xl:text-xl">
										{activeExperience.tasks.map((task, index) => (
											<li key={index}>{task}</li>
										))}
									</ul>
								) : (
									<p className="text-lg xl:text-xl">
										No specific tasks available for this role.
									</p>
								)}
							</Container>
						</div>
					</SectionBox>
				</motion.div>
			</AnimatePresence >
		</div>
	);
}

const experience = [
	{
		id: "egym-systems-engineer",
		company: "EGYM",
		role: "Systems Engineer",
		logo: EGYMLogo,
		startDate: "Jun 2025",
		endDate: "Nov 2025",
		location: "Berlin, Germany",
		tasks: [
			"Built Rust and Go-based internal tooling to improve cloud observability workflows across Kubernetes workloads.",
			"Automated operational processes reducing manual intervention and accelerating developer workflows.",
			"Partnered with product engineering teams to improve performance and reliability of production services.",
		],
	},
	{
		id: "sap-devops-engineer",
		company: "SAP",
		role: "Developer / DevOps Engineer",
		logo: SAPLogo,
		startDate: "Jun 2020",
		endDate: "May 2025",
		location: "Bangalore, India",
		tasks: [
			"Designed and automated cloud infrastructure monitoring solutions and reusable tooling (Python/Go).",
			"Developed Go-based system services to automate security and compliance enforcement across distributed cloud environments.",
			"Built a custom validation framework to assess infrastructure health and state.",
			"Created shared utility libraries/APIs/SDKs to reduce technical debt across platforms.",
			"Performed code reviews to ensure code quality and best-practice adherence.",
			"Mentored junior engineers and conducted annual technical training sessions to improve team-wide Go adoption and engineering practices.",
			"Drove team migration from Python to Go.",
		],
	},
	{
		id: "sap-fullstack-developer",
		company: "SAP",
		role: "Fullstack Developer",
		logo: SAPLogo,
		startDate: "Aug 2019",
		endDate: "May 2020",
		location: "Bangalore, India",
		tasks: [
			"Automated network access control policy changes and monitoring using Python.",
			"Built robotic process automation workflows to streamline user onboarding.",
		],
	},
];
