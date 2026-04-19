import React, { createContext, useContext, useState, useEffect } from "react";

type SettingsContextType = {
	isMotionEnabled: boolean;
	isCrtEnabled: boolean;
	toggleMotion: () => void;
	toggleCrt: () => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
	const [isMotionEnabled, setIsShaderEnabled] = useState(true);
	const [isCrtEnabled, setIsCrtEnabled] = useState(true);

	useEffect(() => {
		const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		if (motionQuery.matches) {
			setIsShaderEnabled(false);
			setIsCrtEnabled(false);
		}
	}, []);

	const toggleMotion = () => setIsShaderEnabled(prev => !prev);
	const toggleCrt = () => setIsCrtEnabled(prev => !prev);

	return (
		<SettingsContext.Provider value={{ isMotionEnabled, isCrtEnabled, toggleMotion, toggleCrt }}>
			{children}
		</SettingsContext.Provider>
	);
}

export function useSettings() {
	const context = useContext(SettingsContext);
	if (!context) throw new Error("useSettings must be used within a SettingsProvider");
	return context;
}