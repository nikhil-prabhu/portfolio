import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";

import "./tailwind.css";

import bg from "/bg-v1.mp4";

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
        <div className="relative min-h-screen w-full">
            {/* Fallback background for when video background is not available */}
            <div className="fixed inset-0 -z-20 h-full bg-gray-300 dark:bg-gray-950" />

            <video
                autoPlay
                loop
                muted
                playsInline
                className="fixed inset-0 -z-10 h-full w-full object-cover hidden motion-safe:!block"
            >
                <source src={bg} type="video/mp4" />
            </video>
            <Outlet />
        </div>
    );
}
