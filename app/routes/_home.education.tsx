import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "~/components/Card";

import BITSLogo from "/bits.svg";
import SKILogo from "/ski.jpeg";
import { FaLocationDot } from "react-icons/fa6";

export default function EducationView() {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const activeEducation = education[selectedIndex];

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9, y: 20 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			transition={{ type: "spring", stiffness: 260, damping: 20 }}
			className="flex flex-col items-center justify-center gap-8 w-full"
		>
			<div className="w-full max-w-7xl rounded-2xl border-4 border-[#ACB9C4] bg-[#38464C] p-8">
				<div className="flex flex-col gap-8">
					<section>
						<h2 className="text-3xl xl:text-6xl text-white">
							Education
						</h2>
						<span className="text-xl text-gray-300">
							Click a card to learn more about my education.
						</span>
					</section>

					<section className="bg-[#1A2527] border-b-4 border-[#131A1C] rounded-xl p-4">
						<div className="flex flex-wrap gap-6 items-center justify-center">
							{education.map((exp, index) => (
								<Card
									key={exp.id}
									faceIcon={exp.logo}
									label={`${exp.degree} (${exp.type})`}
									isSelected={selectedIndex === index}
									onClick={() => setSelectedIndex(index)}
								/>
							))}
						</div>
					</section>
				</div>
			</div>

			<AnimatePresence mode="wait">
				<motion.div
					key={activeEducation.id}
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
									<span className="bg-white text-[#516164] rounded-xl p-2">{activeEducation.degree}</span>
									<span className="text-center w-full [text-shadow:4px_4px_0px_rgba(112,120,128,1)]">{activeEducation.institution}</span>
									<div className="flex flex-row items-center justify-center w-[60%] bg-[#10181A] border-4 border-[#10181A] rounded-xl">
										<div className="bg-[#0F8FFA] rounded-xl text-right w-full text-2xl xl:text-4xl">
											<span className="mr-2">{activeEducation.startDate}</span>
										</div>

										<span className="text-2xl xl:text-4xl text-[#F64A40] w-[20%] xl:w-[25%] text-center">-</span>

										<div className="bg-[#FC4B43] rounded-xl text-left w-full text-2xl xl:text-4xl">
											<span className="ml-2">{activeEducation.endDate}</span>
										</div>
									</div>

									<div className="flex flex-row items-center justify-center w-[60%] gap-2">
										<FaLocationDot />
										<div className="bg-[#1A2527] text-center rounded-xl text-2xl xl:text-4xl p-2 w-full">
											{activeEducation.location}
										</div>
									</div>
								</div>
							</section>

							<section className="bg-[#1A2527] border-b-4 border-[#131A1C] rounded-xl p-4">
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
							</section>
						</div>
					</div>
				</motion.div>
			</AnimatePresence >
		</motion.div >
	);
}

const education = [
	{
		id: "mtech-software-engineer",
		institution: "BITS Pilani",
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
