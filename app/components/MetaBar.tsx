import React from "react";
import { IconType } from "react-icons";

export const MetaBar = ({ children }: { children: React.ReactNode }) => (
	<div className="flex flex-col lg:flex-row text-xl xl:text-2xl items-center justify-between bg-[#C2BFD7] border-b-4 border-[#606B72] rounded-xl p-1 gap-2 lg:gap-4 w-full overflow-hidden shrink-0">
		{children}
	</div>
);

export const MetaPill = ({ children }: { children: React.ReactNode }) => (
	<span className="bg-white text-[#516164] rounded-xl p-2 px-4 shrink-0 shadow-sm">
		{children}
	</span>
);

export const MetaTitle = ({ children }: { children: React.ReactNode }) => (
	<span className="flex-1 min-w-0 text-center px-2">
		{children}
	</span>
);

export const MetaDataBlock = ({
	leftLabel,
	rightLabel,
	separator = "-"
}: {
	leftLabel: React.ReactNode;
	rightLabel: React.ReactNode;
	separator?: string
}) => (
	<div className="flex flex-row items-center justify-center bg-[#10181A] border-4 border-[#10181A] rounded-xl overflow-hidden shrink-0 h-full">
		<div className="bg-[#0F8FFA] rounded-xl px-4 py-1">
			<span className="flex flex-row items-center justify-end text-white">{leftLabel}</span>
		</div>
		<span className="text-xl text-[#F64A40] px-2 text-center">{separator}</span>
		<div className="bg-[#FC4B43] rounded-xl px-4 py-1">
			<span className="flex flex-row items-center justify-start text-white">{rightLabel}</span>
		</div>
	</div>
);

export const MetaInfo = ({ icon: Icon, label }: { icon: IconType; label: string }) => (
	<div className="flex flex-row items-center gap-2 shrink-0 lg:w-fit lg:max-w-[256px] pr-2">
		<Icon className="shrink-0" size={20} />
		<div className="bg-[#1A2527] text-center rounded-xl p-2 px-4 w-full text-white border-b-2 border-[#131A1C]">
			{label}
		</div>
	</div>
);