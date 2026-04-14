type ContainerProps = {
	children: React.ReactNode;
	className?: string;
};

export default function Container({ children, className = "" }: ContainerProps) {
	return (
		<section className={`bg-[#1A2527] border-b-4 border-[#131A1C] rounded-xl ${className}`}>
			{children}
		</section>
	);
}