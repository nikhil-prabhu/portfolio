import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";

import "./tailwind.css";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  NextUIProvider,
} from "@nextui-org/react";
import React from "react";
import Logo from "~/components/logo";
import { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import { Typewriter } from "react-simple-typewriter";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Nikhil Prabhu - Portfolio",
    },
  ];
};

export const links: LinksFunction = () => {
  return [
    {
      media: "(prefers-color-scheme: light)",
      rel: "icon",
      type: "image/svg",
      href: "/favicon.svg",
    },
    {
      media: "(prefers-color-scheme: dark)",
      rel: "icon",
      type: "image/svg",
      href: "/favicon.svg",
    },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(0);
  const primaryColor = "#007f5f";

  const menuItems = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Experience",
      href: "/experience",
    },
    {
      name: "Projects",
      href: "/projects",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="light text-foreground">
        <NextUIProvider>
          <Navbar
            onMenuOpenChange={setIsMenuOpen}
            isBlurred={false}
            className="bg-transparent fixed"
          >
            <NavbarContent>
              <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
              />

              <NavbarBrand>
                <Logo color={primaryColor} size={64} />
              </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
              {menuItems.map((item, index) => (
                <NavbarItem
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className="font-bold font-mono uppercase"
                >
                  <Link
                    to={item.href}
                    className={currentPage == index ? "text-primary" : ""}
                  >
                    {item.name}
                  </Link>
                </NavbarItem>
              ))}
            </NavbarContent>

            <NavbarMenu>
              {menuItems.map((item, index) => (
                <NavbarMenuItem
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className="font-bold font-mono uppercase"
                >
                  <Link
                    to={item.href}
                    className={`w-full ${currentPage == index ? "text-primary" : ""}`}
                  >
                    {item.name}
                  </Link>
                </NavbarMenuItem>
              ))}
            </NavbarMenu>
          </Navbar>

          {children}

          <ScrollRestoration />
          <Scripts />
        </NextUIProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex h-screen items-center justify-center text-center">
        <header className="flex flex-col items-center gap-9">
          <h1 className="font-bold text-8xl">
            <span className="text-primary">&lt;</span>
            {error.status}
            <span className="text-primary">/&gt;</span>
          </h1>

          <h2 className="text-4xl text-foreground-700">{error.statusText}</h2>
        </header>
      </div>
    );
  }

  throw new Error(error instanceof Error ? error.message : "unknown error");
}
