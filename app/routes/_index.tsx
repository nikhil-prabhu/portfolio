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

type SectionProps = {
  title: string;
  children: React.ReactNode;
}

type ExperienceEntryProps = {
  company: string;
  roles: RoleInfo[];
};

type RoleInfo = {
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  items: string[];
}

function ContactInfo({ icon: Icon, display, url }: ContactInfoProps) {
  return (
    <a href={url} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
      <Icon className="w-5 h-5" />
      <span className="font-mono">{display}</span>
    </a>
  );
}

function Section(props: SectionProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        {props.title}
      </h2>

      <hr className="h-px bg-neutral-quaternary border-1 border-black w-full" />

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
        <div className={`border-l-2 border-quarternary-neutral ${props.roles.length > 1 ? '' : 'hidden'}`} />

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

      <hr className="h-px bg-neutral-quaternary border-1 border-black w-full" />
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

function Experience() {
  return (
    <Section title="Professional Experience">
      {resources.experience.map((entry, index) => (
        <ExperienceEntry key={index} company={entry.company} roles={entry.roles} />
      ))}
    </Section>
  );
}

export default function Index() {
  return (
    <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 border-4 border-black dark:border-gray-700 w-full sm:w-full md:w-[80%] lg:w-[60%] xl:w-[50%] my-0 md:my-12 mx-auto">
      <div className="flex flex-col items-center gap-8 w-full">
        <Header />
        <About />
        <Experience />
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
            "Designed and automated cloud infrastructure monitoring solutions and reusable tooling (Python/ Go).",
            "Developed Go-based system services to automate security and compliance enforcement across distributed cloud environments.",
            "Built a custom validation framework to assess infrastructure health and state.",
            "Created shared utility libraries/ APIs/ SDKs to reduce technical debt across platforms.",
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
  ]
};
