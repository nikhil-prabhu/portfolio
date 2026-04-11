import type { MetaFunction } from "@remix-run/cloudflare";
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

export default function Index() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Placeholder */}
    </div>
  );
}
