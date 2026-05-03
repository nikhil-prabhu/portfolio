import React, { forwardRef } from "react";

type ContainerProps = {
	children: React.ReactNode;
	className?: string;
};

const Container = forwardRef<HTMLElement, ContainerProps>(
	({ children, className = "" }, ref) => {
		return (
			<section
				ref={ref}
				className={`bg-[#1A2527] border-b-4 border-[#131A1C] rounded-xl ${className}`}
			>
				{children}
			</section>
		);
	}
);

Container.displayName = "Container";

export default Container;