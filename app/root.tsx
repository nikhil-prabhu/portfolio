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
import { motion, AnimatePresence } from "framer-motion";

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
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Experience", href: "/experience" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
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
          <div className="flex min-h-screen">
            {/* Desktop Vertical Navbar */}
            <Navbar
              onMenuOpenChange={setIsMenuOpen}
              isBlurred={false}
              className="hidden sm:flex fixed left-0 h-screen w-24 flex-col justify-between bg-transparent transform-none"
            >
              <NavbarContent className="flex-1 flex-col items-center justify-between">
                <NavbarBrand className="mt-4">
                  <Logo color={primaryColor} size={64} />
                </NavbarBrand>

                <div className="h-full flex flex-col gap-16 mt-12">
                  {menuItems.map((item, index) => (
                    <NavbarItem
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      className="font-bold font-mono uppercase writing-mode-vertical"
                    >
                      <Link
                        to={item.href}
                        className={`transform rotate-90 whitespace-nowrap ${
                          currentPage == index ? "text-primary" : ""
                        }`}
                      >
                        {item.name}
                      </Link>
                    </NavbarItem>
                  ))}
                </div>
              </NavbarContent>
            </Navbar>

            {/* Mobile Horizontal Navbar */}
            <Navbar
              onMenuOpenChange={setIsMenuOpen}
              isBlurred={false}
              className="sm:hidden fixed top-0 w-full bg-transparent"
            >
              <NavbarContent>
                <NavbarMenuToggle
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  className="sm:hidden"
                />
                <NavbarBrand>
                  <Logo color={primaryColor} size={40} />
                </NavbarBrand>
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
                      className={currentPage == index ? "text-primary" : ""}
                    >
                      {item.name}
                    </Link>
                  </NavbarMenuItem>
                ))}
              </NavbarMenu>
            </Navbar>

            {/* Main Content */}
            <main className="flex-1 sm:ml-24 mt-16 sm:mt-0">{children}</main>
          </div>

          <ScrollRestoration />
          <Scripts />
        </NextUIProvider>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <AnimatePresence>
      <motion.div
        key="content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 100,
        }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
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
