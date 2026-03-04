import type { MetaFunction } from "@remix-run/cloudflare";
import Profile from "/profile.png";
import BongoCat from "/bongocat.gif";
import { HiExternalLink, HiMail } from "react-icons/hi";
import { FaAws, FaGitAlt, FaGithub, FaLinkedin, FaPython, FaRust } from "react-icons/fa";
import { IconType } from "react-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { TiStarOutline } from "react-icons/ti";
import { BiGitRepoForked } from "react-icons/bi";
import { FaGolang } from "react-icons/fa6";
import { VscAzure } from "react-icons/vsc";
import { SiAnsible, SiCplusplus, SiDocker, SiGooglecloud, SiKubernetes, SiTerraform, SiTypescript } from "react-icons/si";
import { DiJava } from "react-icons/di";

export const meta: MetaFunction = () => {
  return [
    { title: "Nikhil Prabhu - Portfolio" },
    { name: "description", content: "Welcome to my portfolio!" },
  ];
};

type Repository = {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
};

type ContactInfoProps = {
  icon: IconType;
  display: string;
  url: string;
};

type SectionProps = {
  title: string;
  children: React.ReactNode;
}

type ExperienceEntryProps = {
  company: string;
  roles: RoleInfo[];
};

type EducationEntryProps = {
  institution: string;
  location: string;
  degree: string;
  startDate: string;
  endDate: string;
};

type RoleInfo = {
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  items: string[];
}

type ProjectCardProps = {
  title: string;
  description: string;
  url: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
}

async function fetchPinnedRepositories(username: string) {
  const GITHUB_API_URL = `https://pinned.berrysauce.dev/get/${username}`;

  try {
    const response = await axios.get(GITHUB_API_URL);

    const repos: Repository[] = response.data.map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      url: `https://github.com/${username}/${repo.name}`,
      language: repo.language,
      languageColor: repo.languageColor,
      stars: repo.stars,
      forks: repo.forks,
    }));

    return repos;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
}

function ContactInfo({ icon: Icon, display, url }: ContactInfoProps) {
  return (
    <a href={url} target="_blank" className="flex items-center gap-2">
      <Icon />
      <span className="font-mono">{display}</span>
      <HiExternalLink />
    </a>
  );
}

function Section(props: SectionProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        {props.title}
      </h2>

      <hr className="h-px bg-neutral-quaternary border-1 border-black dark:border-white w-full" />

      <div className="flex flex-col gap-4 w-full">
        {props.children}
      </div>
    </div>
  );
}

function ExperienceEntry(props: ExperienceEntryProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">{props.company}</h1>

      <div className="flex flex-row gap-4">
        <div className={`border-l-2 border-gray-400 dark:border-gray-600 ${props.roles.length > 1 ? '' : 'hidden'}`} />

        <div className="flex flex-col gap-8 w-full">
          {props.roles.map((role, index) => (
            <div key={index} className="flex flex-col gap-1">
              <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between w-full mb-2">
                <h2 className="text-lg italic">
                  {role.title}
                </h2>
                <div className="text-sm">
                  {role.startDate} - {role.endDate} | {role.location}
                </div>
              </div>

              <ul className="list-disc ml-8">
                {role.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
}

function EducationEntry(props: EducationEntryProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between w-full mb-2">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">{props.institution}</h1>
        <div className="text-sm">{props.startDate} - {props.endDate} | {props.location}</div>
      </div>
      <div className="text-lg italic">{props.degree}</div>
    </div >
  );
}

function ProjectCard(props: ProjectCardProps) {
  return (
    <div className={`block p-4 border-2 border-black dark:border-white font-mono w-full`}>
      <a href={props.url} target="_blank" className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">{props.title} <HiExternalLink /></a>
      <p className="text-gray-700 dark:text-gray-300">{props.description}</p>

      <div className="flex items-center gap-2 mt-2 relative bottom-0 left-0">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: props.languageColor }} />
        <span className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">{props.language}</span>
        <span className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"><TiStarOutline /> {props.stars}</span>
        <span className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"><BiGitRepoForked /> {props.forks}</span>
      </div>
    </div >
  );
}

function SkillCard(props: { skill: string, icon: IconType, color: string }) {
  return (
    <div className="flex gap-2 items-center px-3 py-1 border-2 border-black dark:border-white font-mono">
      <props.icon style={{ color: props.color }} />
      {props.skill}
    </div>
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

      <div className="flex flex-wrap gap-8">
        <ContactInfo icon={HiMail} display={resources.email.id} url={resources.email.url} />
        <ContactInfo icon={FaLinkedin} display={resources.linkedin.id} url={resources.linkedin.url} />
        <ContactInfo icon={FaGithub} display={resources.github.id} url={resources.github.url} />
      </div>

      <hr className="h-px bg-neutral-quaternary border-1 border-black dark:border-white w-full" />
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

function Skills() {
  return (
    <Section title="Skills">
      <div className="flex flex-wrap items-center gap-4">
        <SkillCard skill="Go" icon={FaGolang} color="#00ADD8" />
        <SkillCard skill="Rust" icon={FaRust} color="#dea584" />
        <SkillCard skill="Python" icon={FaPython} color="#3572A5" />
        <SkillCard skill="AWS" icon={FaAws} color="#FF9900" />
        <SkillCard skill="Azure" icon={VscAzure} color="#007FFF" />
        <SkillCard skill="GCP" icon={SiGooglecloud} color="#4285F4" />
        <SkillCard skill="Terraform" icon={SiTerraform} color="#623CE4" />
        <SkillCard skill="Kubernetes" icon={SiKubernetes} color="#326CE5" />
        <SkillCard skill="Docker" icon={SiDocker} color="#2496ED" />
        <SkillCard skill="Ansible" icon={SiAnsible} color="#000000" />
        <SkillCard skill="Git" icon={FaGitAlt} color="#F05032" />
        <SkillCard skill="GitHub" icon={FaGithub} color="#000000" />
        <SkillCard skill="TypeScript" icon={SiTypescript} color="#3178C6" />
        <SkillCard skill="Java" icon={DiJava} color="#007396" />
        <SkillCard skill="C/C++" icon={SiCplusplus} color="#00599C" />

        <span className="font-mono">...and more!</span>
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section title="Professional Experience">
      {resources.experience.map((entry, index) => (
        <ExperienceEntry key={index} company={entry.company} roles={entry.roles} />
      ))}
    </Section>
  );
}

function Education() {
  return (
    <Section title="Education">
      {resources.education.map((entry, index) => (
        <EducationEntry key={index} institution={entry.institution} location={entry.location} degree={entry.degree} startDate={entry.startDate} endDate={entry.endDate} />
      ))}
    </Section>
  );
}

function Projects() {
  const username = resources.github.id;
  const [pinnedRepos, setPinnedRepos] = useState<Repository[]>([]);

  useEffect(() => {
    async function getPinnedRepos() {
      const repos = await fetchPinnedRepositories(username);
      setPinnedRepos(repos);
    }

    getPinnedRepos();
  }, []);

  return (
    <Section title="Projects">
      <div className="grid auto-rows-fr grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 w-full">
        {pinnedRepos.map((repo, index) => (
          <ProjectCard
            key={index}
            title={repo.name}
            description={repo.description || "No description provided."}
            url={`https://github.com/${username}/${repo.name}`}
            language={repo.language}
            languageColor={repo.languageColor}
            stars={repo.stars}
            forks={repo.forks}
          />
        ))}
      </div>
    </Section>
  );
}

export default function Index() {
  return (
    <div className="relative z-30">
      <div className="absolute top-[-99px] right-1 md:right-1/4 transform -translate-x-1/2">
        <img
          src={BongoCat}
          alt="BongoCat"
          className="w-32 h-auto hidden motion-safe:!block"
        />
      </div>
      <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 border-4 border-black dark:border-gray-700 w-full sm:w-full md:w-[80%] lg:w-[60%] xl:w-[50%] my-24 mx-auto">
        <div className="flex flex-col items-center gap-8 w-full">
          <Header />
          <About />
          <Skills />
          <Experience />
          <Education />
          <Projects />
        </div>
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
