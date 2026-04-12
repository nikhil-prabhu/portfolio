import { motion } from "framer-motion";

type CardProps = {
	faceIcon: string;
	label: string;
	isSelected?: boolean;
	onClick?: () => void;
};

export default function Card({ faceIcon, label, isSelected, onClick }: CardProps) {
	return (
		<motion.div
			onClick={onClick}
			initial={false}
			animate={{
				y: isSelected ? -20 : 0,
				scale: isSelected ? 1.1 : 1,
				zIndex: isSelected ? 30 : 10,
				filter: isSelected
					? "drop-shadow(12px 12px 10px rgba(0,0,0,0.4))"
					: "drop-shadow(4px 4px 0px rgba(0,0,0,0.5))",
			}}
			whileHover={{
				y: -15,
				scale: 1.05,
				filter: "drop-shadow(15px 15px 12px rgba(0,0,0,0.3))"
			}}
			whileTap={{ scale: 0.95, y: 0 }}
			transition={{
				type: "spring",
				stiffness: 400,
				damping: 15,
			}}
			className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-[#C2BFD7] bg-white p-4 cursor-pointer aspect-[2.5/3.5] w-full max-w-[180px] md:max-w-[220px] select-none ${isSelected ? 'border-[#0F8FFA] ring-4 ring-[#0F8FFA]/20' : ''
				}`}
		>
			<div className="absolute left-1.5 top-1.5 flex flex-col items-center gap-1 text-[#414143]">
				<div className="h-6 w-6 md:h-8 md:w-8">
					<img src={faceIcon} alt="icon" className="h-full w-full object-contain" />
				</div>
			</div>

			<div className="text-center p-2">
				<h3 className="text-xl xl:text-2xl text-[#414143]">
					{label}
				</h3>
			</div>

			<div className="absolute bottom-1.5 right-1.5 flex rotate-180 flex-col items-center gap-1 text-[#414143]">
				<div className="h-6 w-6 md:h-8 md:w-8">
					<img src={faceIcon} alt="icon" className="h-full w-full object-contain" />
				</div>
			</div>
		</motion.div>
	);
}