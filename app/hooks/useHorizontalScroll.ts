import { useRef, useEffect } from "react";

export function useHorizontalScroll() {
	const elRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const el = elRef.current;
		if (!el) return;

		const onWheel = (e: WheelEvent) => {
			const isOverflowing = el.scrollWidth > el.clientWidth;

			if (isOverflowing && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
				e.preventDefault();

				el.scrollTo({
					left: el.scrollLeft + e.deltaY * 1.5,
					behavior: "smooth",
				});
			}
		};

		el.addEventListener("wheel", onWheel, { passive: false });
		return () => el.removeEventListener("wheel", onWheel);
	}, []);

	return elRef;
}