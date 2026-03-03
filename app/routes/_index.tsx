import type { MetaFunction } from "@remix-run/cloudflare";
import Profile from "/profile.png";
import { HiMail } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IconType } from "react-icons";

export const meta: MetaFunction = () => {
  return [
    { title: "Nikhil Prabhu - Portfolio" },
    { name: "description", content: "Welcome to my portfolio!" },
  ];
};

type ContactInfoProps = {
  icon: IconType;
  display: string;
  url: string;
};

function ContactInfo({ icon: Icon, display, url }: ContactInfoProps) {
  return (
    <a href={url} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
      <Icon className="w-5 h-5" />
      <span className="font-mono">{display}</span>
    </a>
  );
}

function Header() {
  return (
    <div className="flex flex-col gap-8 w-full">
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

      <div className="flex flex-wrap gap-4">
        <ContactInfo icon={HiMail} display={resources.email.id} url={resources.email.url} />
        <ContactInfo icon={FaLinkedin} display={resources.linkedin.id} url={resources.linkedin.url} />
        <ContactInfo icon={FaGithub} display={resources.github.id} url={resources.github.url} />
      </div>
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
  email: {
    id: "nikhilprabhu98@gmail.com",
    url: "mailto:nikhilprabhu98@gmail.com",
  },
  linkedin: {
    id: "in/nikhil-prabhu31",
    url: "https://linkedin.com/in/nikhil-prabhu31",
  },
  github: {
    id: "nikhil-prabhu",
    url: "https://github.com/nikhil-prabhu",
  },
};
