import type { MetaFunction } from "@remix-run/cloudflare";
import Profile from "/profile.png";

export const meta: MetaFunction = () => {
  return [
    { title: "Nikhil Prabhu - Portfolio" },
    { name: "description", content: "Welcome to my portfolio!" },
  ];
};

function Header() {
  return (
    <div className="w-full">
      <header className="flex flex-col md:flex-row items-center justify-between w-full gap-8">
        <div className="flex flex-col items-start gap-4 text-left w-full">
          <h1 className="text-6xl text-gray-800 dark:text-gray-100">
            Nikhil <span className="font-bold">Prabhu</span>
          </h1>

          <div className="text-3xl italic">
            Developer & Platform Engineer
          </div>
        </div>

        <div className="flex flex-col">
          <img src={Profile} alt="Profile" className="w-48 rounded-full object-cover" />
        </div>
      </header>
    </div>
  );
}

function About() {
  return (
    <div>
      <p>{resources.about}</p>
    </div>
  );
}

export default function Index() {
  return (
    <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 border-4 border-black dark:border-gray-700 w-full sm:w-full md:w-[80%] lg:w-[60%] xl:w-[50%] my-0 md:my-12 mx-auto">
      <div className="flex flex-col items-center gap-16 w-full">
        <Header />
        <hr className="h-px bg-neutral-quaternary border-1 w-full" />

        <About />
      </div>
    </div>
  );
}

const resources = {
  about: "Backend and Platform Engineer with 6+ years of experience building scalable backend services, developer platforms, and cloud automation using Go, Rust, and Python. Experienced in distributed systems, cloud-native infrastructure, and reliability engineering across AWS, Azure, and GCP. Focused on improving developer productivity, system reliability, and operational scalability through automation and reusable tooling.",
};
