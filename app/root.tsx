import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
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
                <Logo color="black" size={64} />
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
