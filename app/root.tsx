import {
    Await,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from "@remix-run/react";
import { motion, AnimatePresence } from "framer-motion";

import "./tailwind.css";

import { VaporwaveBackground } from "~/components/VaporwaveBackground";
import favicon from "/favicon.png";
import Profile from "/profile.png";
import Background from "/bg.jpg";
import { LinksFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { SidePanel } from "./components/SidePanel";
import { Suspense, useEffect, useState } from "react";
import { getStats } from "./services/github.server";

export const links: LinksFunction = () => [
    {
        rel: "icon",
        href: favicon,
        type: "image/gif",
    },
]

export const headers = () => ({
    "Cache-Control": "no-store, no-cache, must-revalidate",
});

export const loader = async ({ context }: LoaderFunctionArgs) => {
    try {
        const statsPromise = getStats(
            context.cloudflare.env.GITHUB_USER,
            context.cloudflare.env.GITHUB_TOKEN,
        ).then(resolved => {
            console.log(">>> [SERVER] Fetched GitHub stats:", resolved);
            return resolved;
        });
        return { stats: statsPromise };
    } catch (error) {
        console.error("GitHub API Error:", error);
        throw new Response("GitHub Auth Failed", { status: 500 });
    }
};

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

function BackgroundProvider({ isShaderEnabled }: { isShaderEnabled: boolean }) {
    const [isHydrated, setIsHydrated] = useState(false);
    useEffect(() => setIsHydrated(true), []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-[#10181A]">
            <AnimatePresence mode="wait">
                {isShaderEnabled ? (
                    <motion.div
                        key="shader"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 h-full w-full"
                    >
                        {isHydrated && <VaporwaveBackground />}
                    </motion.div>
                ) : (
                    <motion.div
                        key="static"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 h-full w-full"
                    >
                        <img src={Background} alt="Background" className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function CrtOverlay({ enabled }: { enabled: boolean }) {
    const [isHydrated, setIsHydrated] = useState(false);
    useEffect(() => setIsHydrated(true), []);

    return (
        <AnimatePresence>
            {enabled && isHydrated && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="crt-screen pointer-events-none fixed inset-0 z-50"
                />
            )}
        </AnimatePresence>
    );
}

export default function App() {
    const [isShaderEnabled, setIsShaderEnabled] = useState(true);
    const [isCrtEnabled, setIsCrtEnabled] = useState(true);
    const { stats } = useLoaderData<typeof loader>();

    useEffect(() => {
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (motionQuery.matches) {
            setIsShaderEnabled(false);
            setIsCrtEnabled(false);
        }
    }, []);

    const commonProps = {
        name: "Nikhil Prabhu",
        title: "The Engineer",
        chipImage: Profile,
        gitHubUrl: resources.github.url,
        steamUrl: resources.steam.url,
        instagramUrl: resources.instagram.url,
        linkedInUrl: resources.linkedin.url,
        linkedInId: resources.linkedin.id,
        emailUrl: resources.email.url,
        matrixUrl: resources.matrix.url,
        location: resources.location,
        isShaderEnabled,
        isCrtEnabled,
        toggleShader: () => setIsShaderEnabled(prev => !prev),
        toggleCrt: () => setIsCrtEnabled(prev => !prev),
    };

    return (
        <div className="relative min-h-screen w-full">
            <BackgroundProvider isShaderEnabled={isShaderEnabled} />

            <Suspense fallback={<SidePanel {...commonProps} gitHubFollowers={0} gitHubRepos={0} />}>
                <Await resolve={stats}>
                    {(resolvedStats) => (
                        <SidePanel
                            {...commonProps}
                            gitHubFollowers={resolvedStats.followers.totalCount || 0}
                            gitHubRepos={resolvedStats.repositories.totalCount || 0}
                        />
                    )}
                </Await>
            </Suspense>

            <main className="relative z-10 pt-32 md:pl-80 md:pt-0">
                <div className="p-2 md:p-8">
                    <Outlet />
                </div>
            </main>

            <CrtOverlay enabled={isCrtEnabled} />
        </div>
    );
}

const resources = {
    email: { id: "nikhilprabhu98@gmail.com", url: "mailto:nikhilprabhu98@gmail.com" },
    matrix: { id: "@nikhilprabhu:matrix.org", url: "https://matrix.to/#/@nikhilprabhu:matrix.org" },
    linkedin: { id: "in/nikhil-prabhu31", url: "https://linkedin.com/in/nikhil-prabhu31" },
    github: { id: "nikhil-prabhu", url: "https://github.com/nikhil-prabhu" },
    steam: { id: "dextrocardiac", url: "https://steamcommunity.com/id/dextrocardiac/" },
    instagram: { id: "_nikhilprabhu", url: "https://instagram.com/_nikhilprabhu" },
    location: "Coimbatore, India",
};