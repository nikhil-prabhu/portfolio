import { motion } from "framer-motion";

type SectionBoxProps = {
	children: React.ReactNode;
	className?: string;
};

export default function SectionBox({ children, className = "" }: SectionBoxProps) {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9, y: 20 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			transition={{ type: "spring", stiffness: 260, damping: 20 }}
			className={`w-full max-w-7xl rounded-2xl border-4 border-[#ACB9C4] bg-[#38464C] p-4 md:p-8 ${className}`}
		>
			<div className="flex flex-col gap-8">
				{children}
			</div>
		</motion.div>
	);
}