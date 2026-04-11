import type { MetaFunction } from "@remix-run/cloudflare";
import axios from "axios";


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
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-8xl">Welcome to my Portfolio!</h1>

      <div className="flex flex-row items-center justify-center gap-4 mt-8 bg-[#38464C] rounded-xl border-b-4 border-[#131A1C] p-4">
        <button className="bg-[#0F8FFA] border-b-4 border-[#24251F] rounded-xl text-right p-4 text-4xl">
          Skills
        </button>

        <button className="bg-[#E29103] border-b-4 border-[#24251F] rounded-xl text-right p-4 text-4xl">
          Experience
        </button>

        <button className="bg-[#FC4B43] border-b-4 border-[#24251F] rounded-xl text-right p-4 text-4xl">
          Education
        </button>

        <button className="bg-[#3F976F] border-b-4 border-[#24251F] rounded-xl text-right p-4 text-4xl">
          Projects
        </button>
      </div>
    </div>
  );
}
