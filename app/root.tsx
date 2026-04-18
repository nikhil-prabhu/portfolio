import {
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
import faviconGif from "/favicon.gif";
import Profile from "/profile.png";
import Background from "/bg.jpg";
import { LinksFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { SidePanel } from "./components/SidePanel";
import { useEffect, useState } from "react";
import { getStats } from "./services/github.server";
import { GitHubStats } from "./types/github";

export const links: LinksFunction = () => [
    {
        rel: "icon",
        href: faviconGif,
        type: "image/gif",
    },
]

export const loader = async ({ context }: LoaderFunctionArgs) => {
    const statsPromise = getStats(
        context.cloudflare.env.GITHUB_USER,
        context.cloudflare.env.GITHUB_TOKEN,
    );
    return { stats: statsPromise };
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

export default function App() {
    const [isShaderEnabled, setIsShaderEnabled] = useState(true);
    const [isCrtEnabled, setIsCrtEnabled] = useState(true);
    const [isHydrated, setIsHydrated] = useState(false);
    const { stats } = useLoaderData<typeof loader>();
    const [data, setData] = useState<GitHubStats | null>(null);

    useEffect(() => {
        setIsHydrated(true);
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (motionQuery.matches) {
            setIsShaderEnabled(false);
            setIsCrtEnabled(false);
        }
    }, []);

    useEffect(() => {
        stats.then((resolved) => setData(resolved));
    }, [stats]);

    return (
        <div className="relative min-h-screen w-full">
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
                            <img
                                src={Background}
                                alt="Background"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <main className="relative z-10 pt-32 md:pl-80 md:pt-0">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>

            <SidePanel
                name="Nikhil Prabhu"
                title="The Engineer"
                chipImage={Profile}
                gitHubFollowers={data?.followers.totalCount || 0}
                gitHubRepos={data?.repositories.totalCount || 0}
                gitHubUrl={resources.github.url}
                steamUrl={resources.steam.url}
                instagramUrl={resources.instagram.url}
                linkedInUrl={resources.linkedin.url}
                linkedInId={resources.linkedin.id}
                emailUrl={resources.email.url}
                matrixUrl={resources.matrix.url}
                location={resources.location}
                isShaderEnabled={isShaderEnabled}
                isCrtEnabled={isCrtEnabled}
                toggleShader={() => setIsShaderEnabled(prev => !prev)}
                toggleCrt={() => setIsCrtEnabled(prev => !prev)}
            />

            <AnimatePresence>
                {isCrtEnabled && isHydrated && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="crt-screen pointer-events-none fixed inset-0 z-50"
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

const resources = {
    email: {
        id: "nikhilprabhu98@gmail.com",
        url: "mailto:nikhilprabhu98@gmail.com",
    },
    matrix: {
        id: "@nikhilprabhu:matrix.org",
        url: "https://matrix.to/#/@nikhilprabhu:matrix.org",
    },
    linkedin: {
        id: "in/nikhil-prabhu31",
        url: "https://linkedin.com/in/nikhil-prabhu31",
    },
    github: {
        id: "nikhil-prabhu",
        url: "https://github.com/nikhil-prabhu",
    },
    steam: {
        id: "dextrocardiac",
        url: "https://steamcommunity.com/id/dextrocardiac/",
    },
    instagram: {
        id: "_nikhilprabhu",
        url: "https://instagram.com/_nikhilprabhu",
    },
    location: "Coimbatore, India",
    experience: [
        {
            company: "EGYM AG",
            roles: [
                {
                    title: "Systems Engineer",
                    location: "Berlin, Germany",
                    startDate: "Jun 2025",
                    endDate: "Nov 2025",
                    items: [
                        "Built Rust and Go-based internal tooling to improve cloud observability workflows across Kubernetes workloads.",
                        "Automated operational processes reducing manual intervention and accelerating developer workflows.",
                        "Partnered with product engineering teams to improve performance and reliability of production services.",
                    ],
                },
            ],
        },
        {
            company: "SAP Labs",
            roles: [
                {
                    title: "Developer / DevOps Engineer",
                    location: "Bangalore, India",
                    startDate: "Jun 2020",
                    endDate: "May 2025",
                    items: [
                        "Designed and automated cloud infrastructure monitoring solutions and reusable tooling (Python/Go).",
                        "Developed Go-based system services to automate security and compliance enforcement across distributed cloud environments.",
                        "Built a custom validation framework to assess infrastructure health and state.",
                        "Created shared utility libraries/APIs/SDKs to reduce technical debt across platforms.",
                        "Performed code reviews to ensure code quality and best-practice adherence.",
                        "Mentored junior engineers and conducted annual technical training sessions to improve team-wide Go adoption and engineering practices.",
                        "Drove team migration from Python to Go.",
                    ],
                },
                {
                    title: "Fullstack Developer",
                    location: "Bangalore, India",
                    startDate: "Aug 2019",
                    endDate: "May 2020",
                    items: [
                        "Automated network access control policy changes and monitoring using Python.",
                        "Built robotic process automation workflows to streamline user onboarding.",
                    ],
                },
            ],
        },
    ],
    education: [
        {
            institution: "Birla Institute of Technology and Science, Pilani",
            location: "Pilani, India",
            degree: "Master's - MTech (Software Engineering)",
            startDate: "Aug 2019",
            endDate: "Jun 2023",
        },
        {
            institution: "Bharatiar University",
            location: "Coimbatore, India",
            degree: "Bachelor's - BCA (Computer Applications)",
            startDate: "Jun 2016",
            endDate: "May 2019",
        }
    ],
};
