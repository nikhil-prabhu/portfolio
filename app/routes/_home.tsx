import type { MetaFunction } from "@remix-run/cloudflare";
import { NavLink, Outlet } from "@remix-run/react";


export const meta: MetaFunction = () => {
  return [
    { title: "Nikhil Prabhu - Portfolio" },
    { name: "description", content: "Welcome to my portfolio!" },
  ];
};

export default function HomeLayout() {
  return (
    <div className="flex flex-col items-center justify-start gap-8 w-full h-full">
      <h1 className="text-6xl xl:text-9xl text-white text-shadow-heavy">Welcome to my Portfolio</h1>

      <div className="flex flex-row items-center justify-center gap-4 rounded-xl border-b-4 border-[#131A1C] bg-[#38464C] p-4">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `
      bg-[#0F8FFA] border-b-4 border-[#24251F] rounded-xl p-4 text-2xl xl:text-4xl transition-all text-white uppercase
      ${isActive ? 'brightness-125 scale-105 -translate-y-1' : 'brightness-90 hover:brightness-100'}
    `}
        >
          About
        </NavLink>

        <NavLink
          to="/experience"
          className={({ isActive }) => `
      bg-[#E29103] border-b-4 border-[#24251F] rounded-xl p-4 text-2xl xl:text-4xl transition-all text-white uppercase
      ${isActive ? 'brightness-125 scale-105 -translate-y-1' : 'brightness-90 hover:brightness-100'}
    `}
        >
          Experience
        </NavLink>

        <NavLink
          to="/education"
          className={({ isActive }) => `
      bg-[#FC4B43] border-b-4 border-[#24251F] rounded-xl p-4 text-2xl xl:text-4xl transition-all text-white uppercase
      ${isActive ? 'brightness-125 scale-105 -translate-y-1' : 'brightness-90 hover:brightness-100'}
    `}
        >
          Education
        </NavLink>

        <NavLink
          to="/projects"
          prefetch="intent"
          className={({ isActive }) => `
      bg-[#3F976F] border-b-4 border-[#24251F] rounded-xl p-4 text-2xl xl:text-4xl transition-all text-white uppercase
      ${isActive ? 'brightness-125 scale-105 -translate-y-1' : 'brightness-90 hover:brightness-100'}
    `}
        >
          Projects
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}