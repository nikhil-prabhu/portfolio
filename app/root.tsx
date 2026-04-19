import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";

import favicon from "/favicon.png";
import Profile from "/profile.png";
import { LinksFunction } from "@remix-run/cloudflare";
import { SidePanel } from "./components/SidePanel";
import { useEffect, useState } from "react";
import { VaporwaveBackground } from "~/components/VaporwaveBackground";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { SettingsProvider, useSettings } from "./context/SettingsContext";

import Background from "/bg.jpg"

export const links: LinksFunction = () => [
    { rel: "icon", href: favicon, type: "image/gif" },
];

function BackgroundProvider() {
    const { isMotionEnabled } = useSettings();
    const [isHydrated, setIsHydrated] = useState(false);
    useEffect(() => setIsHydrated(true), []);
    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-[#10181A]">
            <AnimatePresence mode="wait">
                {isMotionEnabled ? (
                    <motion.div key="shader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 h-full w-full">
                        {isHydrated && <VaporwaveBackground />}
                    </motion.div>
                ) : (
                    <motion.div key="static" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 h-full w-full">
                        <img src={Background} alt="Background" className="object-cover w-full h-full" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function CrtOverlay() {
    const { isCrtEnabled } = useSettings();
    const [isHydrated, setIsHydrated] = useState(false);
    useEffect(() => setIsHydrated(true), []);
    return (
        <AnimatePresence>
            {isCrtEnabled && isHydrated && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="crt-screen pointer-events-none fixed inset-0 z-50" />
            )}
        </AnimatePresence>
    );
}

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

function AppContent() {
    const { isMotionEnabled: isShaderEnabled } = useSettings();
    const controls = useAnimation();

    useEffect(() => {
        const handleGlobalClick = (e: MouseEvent) => {
            if (!isShaderEnabled) return;
            const target = e.target as HTMLElement;
            if (target.closest("button") || target.closest("a")) {
                controls.start({
                    x: [-2, 2, -1, 1, 0],
                    y: [1, -1, 0.5, -0.5, 0],
                    rotate: [0.08, -0.08, 0.04, -0.04, 0],
                    transition: { duration: 0.15, ease: "linear" }
                });
            }
        };
        window.addEventListener("mousedown", handleGlobalClick);
        return () => window.removeEventListener("mousedown", handleGlobalClick);
    }, [controls, isShaderEnabled]);

    const commonProps = {
        name: "Nikhil Prabhu",
        title: "The Engineer",
        chipImage: Profile,
        location: "Coimbatore, India",
        gitHubUrl: "https://github.com/nikhil-prabhu",
        steamUrl: "https://steamcommunity.com/id/dextrocardiac/",
        instagramUrl: "https://instagram.com/_nikhilprabhu",
        linkedInUrl: "https://linkedin.com/in/nikhil-prabhu31",
        linkedInId: "in/nikhil-prabhu31",
        emailUrl: "mailto:nikhilprabhu98@gmail.com",
        matrixUrl: "https://matrix.to/#/@nikhilprabhu:matrix.org",
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#10181A]">
            <BackgroundProvider />
            <motion.div animate={controls} className="relative z-10 w-full min-h-screen">
                <SidePanel {...commonProps} />
                <main className="md:pl-80 xl:pl-[600px]">
                    <div className="p-2 md:p-8">
                        <Outlet />
                    </div>
                </main>
            </motion.div>
            <CrtOverlay />
        </div>
    );
}

export default function App() {
    return (
        <SettingsProvider>
            <AppContent />
        </SettingsProvider>
    );
}