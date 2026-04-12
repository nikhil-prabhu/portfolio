import { motion } from "framer-motion";
import React from "react";

type CardProps = {
	index?: number;
	faceIcon?: string | React.ReactNode;
	label?: string;
	value?: string;
	isSelected?: boolean;
	isLoading?: boolean;
	onClick?: () => void;
};

export default function Card({ index, faceIcon, label, value, isSelected, isLoading, onClick }: CardProps) {

	const renderIconContent = (icon: string | React.ReactNode) => {
		if (!icon) return null;
		if (typeof icon === "string") {
			return <img src={icon} alt="icon" className="h-full w-full object-contain" />;
		}
		return icon;
	};

	const renderVerticalText = (text?: string) => {
		if (!text) return null;
		return (
			<div className="flex flex-col items-center leading-[0.8]">
				{String(text).split("").map((char, i) => (
					<span key={i} className="text-[10px] md:text-xl">
						{char}
					</span>
				))}
			</div>
		);
	};

	return (
		<div
			className="w-full max-w-[180px] md:max-w-[220px] aspect-[2.5/3.5]"
			style={{ perspective: "1000px" }}
		>
			<motion.div
				onClick={!isLoading ? onClick : undefined}
				style={{
					transformStyle: "preserve-3d",
					transform: isLoading ? "rotateY(180deg)" : "rotateY(0deg)"
				}}
				initial={false}
				animate={{
					y: isSelected ? -20 : 0,
					scale: isSelected ? 1.1 : 1,
					zIndex: isSelected ? 30 : 10,
					rotateY: isLoading ? 180 : 0,
					opacity: 1,
				}}
				whileHover={!isLoading ? {
					y: -15,
					scale: 1.05,
				} : {}}
				whileTap={!isLoading ? { scale: 0.95, y: 0 } : {}}
				transition={{
					type: "spring",
					stiffness: 400,
					damping: 20,
					rotateY: {
						delay: index ? index * 0.15 : 0,
						type: "spring",
						stiffness: 120,
						damping: 20,
					}
				}}
				className="relative w-full h-full cursor-pointer"
			>
				<div
					className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center rounded-xl border-2 select-none transition-colors duration-500 ${isLoading ? 'bg-transparent border-transparent' : 'bg-white border-[#C2BFD7]'
						} ${isSelected ? 'border-[#0F8FFA] ring-4 ring-[#0F8FFA]/20' : ''}`}
					style={{
						backfaceVisibility: "hidden",
						WebkitBackfaceVisibility: "hidden",
						boxShadow: !isLoading && isSelected ? "12px 12px 10px rgba(0,0,0,0.4)" : (!isLoading ? "4px 4px 0px rgba(0,0,0,0.5)" : "none")
					}}
				>
					{!isLoading && label && (
						<>
							<div className="absolute left-1.5 top-1.5 flex flex-col items-center gap-1 text-[#414143]">
								<div className="h-6 w-6 md:h-8 md:w-8 flex items-center justify-center">
									{renderIconContent(faceIcon)}
								</div>
								{renderVerticalText(value)}
							</div>

							<div className="text-center p-2">
								<h3 className="text-xl xl:text-2xl text-[#414143]">
									{label}
								</h3>
							</div>

							<div className="absolute bottom-1.5 right-1.5 flex rotate-180 flex-col items-center gap-1 text-[#414143]">
								<div className="h-6 w-6 md:h-8 md:w-8 flex items-center justify-center">
									{renderIconContent(faceIcon)}
								</div>
								{renderVerticalText(value)}
							</div>
						</>
					)}
				</div>

				<div
					className="absolute inset-0 w-full h-full rounded-xl border-2 border-white bg-[#ef4444]"
					style={{
						backfaceVisibility: "hidden",
						WebkitBackfaceVisibility: "hidden",
						transform: "rotateY(180deg)"
					}}
				>
					<div className="absolute inset-0 h-full w-full rounded-lg"
						style={{
							backgroundImage: `radial-gradient(#ffffff 1px, transparent 0)`,
							backgroundSize: "16px 16px",
							backgroundPosition: "8px 8px",
							opacity: 0.4
						}}>
						<div className="absolute inset-2 rounded-lg border-2 border-white/20" />
					</div>
				</div>
			</motion.div>
		</div>
	);
}