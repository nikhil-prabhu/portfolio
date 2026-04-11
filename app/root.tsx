import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";

import "./tailwind.css";

import { VaporwaveBackground } from "~/components/VaporwaveBackground";
import faviconGif from "/favicon.gif";
import { LinksFunction } from "@remix-run/cloudflare";

export const links: LinksFunction = () => [
    {
        rel: "icon",
        href: faviconGif,
        type: "image/gif",
    },
]

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
    return (
        /* The container should be the full viewport */
        <div className="relative min-h-screen w-full">

            <VaporwaveBackground />

            <main className="relative z-10 contrast-125 brightness-110 saturate-150">
                <svg className="hidden">
                    <filter id="wavy">
                        <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="1" result="warp" />
                        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" in2="warp" />
                    </filter>
                </svg>
                <Outlet />
            </main>

            <div className="crt-screen" />

            {/* 4. Fallback background */}
            <div className="fixed inset-0 -z-20 bg-gray-300 dark:bg-gray-950" />
        </div>
    );
}