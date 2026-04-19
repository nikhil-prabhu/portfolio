import { motion } from "framer-motion";
import { useSettings } from "~/context/SettingsContext";

type FloatingTextProps = {
	children: string;
	intensity?: number;
	speed?: number;
	stagger?: number;
	className?: string;
};

export default function FloatingText({
	children,
	intensity = 0.8,
	speed = 1,
	stagger = 0.1,
	className = "",
}: FloatingTextProps) {
	const { isMotionEnabled } = useSettings();

	if (!isMotionEnabled) {
		return <span className={className}>{children}</span>;
	}

	const words = children.split(" ");
	let charCounter = 0;

	return (
		<span className={`flex flex-wrap justify-center items-center gap-x-[0.25em] ${className}`}>
			{words.map((word, wordIndex) => {
				const characters = word.split("");

				return (
					<span key={wordIndex} className="inline-block whitespace-nowrap">
						{characters.map((char) => {
							const currentIndex = charCounter++;
							return (
								<motion.span
									key={currentIndex}
									className="inline-block"
									animate={{
										y: [0, -4 * intensity, 0],
										rotate: [-2 * intensity, 2 * intensity, -2 * intensity],
									}}
									transition={{
										duration: 2.5 / speed,
										repeat: Infinity,
										ease: "easeInOut",
										delay: currentIndex * stagger,
									}}
								>
									{char}
								</motion.span>
							);
						})}
						{(() => { charCounter++; return null; })()}
					</span>
				);
			})}
		</span>
	);
}