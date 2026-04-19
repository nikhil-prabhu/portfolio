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
	intensity = 1,
	speed = 0.8,
	stagger = 0.1,
	className = "",
}: FloatingTextProps) {
	const { isMotionEnabled: isShaderEnabled } = useSettings();

	if (!isShaderEnabled) {
		return <span className={className}>{children}</span>;
	}

	const characters = children.split("");

	return (
		<span className={`flex flex-wrap justify-center items-center whitespace-pre ${className}`}>
			{characters.map((char, index) => (
				<motion.span
					key={index}
					className="inline-block"
					animate={{
						y: [0, -4 * intensity, 0],
						rotate: [-2 * intensity, 2 * intensity, -2 * intensity],
					}}
					transition={{
						duration: 2.5 / speed,
						repeat: Infinity,
						ease: "easeInOut",
						delay: index * stagger,
					}}
				>
					{char === " " ? "\u00A0" : char}
				</motion.span>
			))}
		</span>
	);
}