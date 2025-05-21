import type {LinksFunction} from "@remix-run/cloudflare";
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";

import "./tailwind.css";

export const links: LinksFunction = () => [
    {rel: "preconnect", href: "https://fonts.googleapis.com"},
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    },
];

export function Layout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <Meta/>
            <Links/>
        </head>
        <body>
        {children}
        <ScrollRestoration/>
        <Scripts/>
        </body>
        </html>
    );
}

export default function App() {
    return (
        <div className="relative m-4 h-screen">
            {/* Title */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 bg-black text-white">
            <span className="text-sm font-mono border border-white px-2 py-1">
              my-portfolio.1
            </span>
            </div>

            {/* Bordered container */}
            <div className="border border-white p-8">
                <Outlet/>
            </div>
        </div>
    );
}
