import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "~/components/Card";

import BITSLogo from "/bits.svg";
import SKILogo from "/ski.jpeg";
import { FaLocationDot } from "react-icons/fa6";
import SectionBox from "~/components/SectionBox";
import Container from "~/components/Container";
import { MetaBar, MetaPill, MetaTitle, MetaDataBlock, MetaInfo } from "~/components/MetaBar";

export default function EducationView() {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const activeEducation = education[selectedIndex];

	return (
		<div className="flex flex-col items-center justify-center gap-8 w-full">
			<SectionBox>
				<div className="flex flex-col gap-8">
					<section>
						<h2 className="text-3xl xl:text-6xl text-white">
							Education
						</h2>
						<span className="text-xl text-gray-300">
							Click a card to learn more about my education.
						</span>
					</section>


					<Container className="flex flex-wrap gap-6 items-center justify-center p-4">
						{education.map((exp, index) => (
							<Card
								key={exp.id}
								faceIcon={exp.logo}
								label={`${exp.degree} (${exp.type})`}
								isSelected={selectedIndex === index}
								onClick={() => setSelectedIndex(index)}
							/>
						))}
					</Container>
				</div>
			</SectionBox>

			<AnimatePresence mode="wait">
				<motion.div
					key={activeEducation.id}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.2 }}
					className="w-full max-w-7xl"
				>
					<SectionBox>
						<div className="flex flex-col gap-8">
							<MetaBar>
								<MetaPill>{activeEducation.degree}</MetaPill>

								<MetaTitle>{activeEducation.institution}</MetaTitle>

								<MetaDataBlock
									leftLabel={activeEducation.startDate}
									rightLabel={activeEducation.endDate}
								/>

								<MetaInfo
									icon={FaLocationDot}
									label={activeEducation.location}
								/>
							</MetaBar>

							<Container className="p-4">
								{activeEducation.tasks.length > 0 ? (
									<ul className="list-disc list-inside text-xl xl:text-2xl text-gray-300">
										{activeEducation.tasks.map((task, index) => (
											<li key={index}>{task}</li>
										))}
									</ul>
								) : (
									<p className="text-xl xl:text-2xl text-gray-300">
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

const education = [
	{
		id: "mtech-software-engineer",
		institution: "Birla Institute of Technology and Science",
		degree: "MTech",
		type: "Master's",
		logo: BITSLogo,
		startDate: "Aug 2019",
		endDate: "Jun 2023",
		location: "Pilani, India",
		tasks: [
			"Major: Software Engineering",
			"CGPA: 7.46/10",
		],
	},
	{
		id: "bca-computer-applications",
		institution: "Sri Krishna Arts and Science College",
		degree: "BCA",
		type: "Bachelor's",
		logo: SKILogo,
		startDate: "Jun 2016",
		endDate: "May 2019",
		location: "Coimbatore, India",
		tasks: [
			"Major: Computer Applications",
			"CGPA: 8.0/10",
		],
	},
];
