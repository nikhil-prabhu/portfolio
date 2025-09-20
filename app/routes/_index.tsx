import { useEffect, useState } from "react";
import type { MetaFunction } from "@remix-run/cloudflare";
import figlet from 'figlet';
import * as cowsay from 'cowsay';

interface CowsayProps {
  text: string;
  className?: string;
}

interface FigletComponentProps {
  text: string;
  className?: string;
}

function Cowsay({ text, className }: CowsayProps) {
  const cow = cowsay.say({ text: text });

  return (
    <pre className={className}>{cow}</pre>
  );
}

function Figlet({ text, className }: FigletComponentProps) {
  const [ascii, setAscii] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    figlet.text(text, { font: "ANSI Shadow" }, (err, result) => {
      if (err) {
        console.error('Figlet error:', err);
        setAscii(`Error: ${err.message}`);
      } else {
        // Clean up the result by removing extra whitespace and empty lines
        const cleanedResult = result
          ?.split('\n')
          .filter(line => line.trim().length > 0) // Remove empty lines
          .map(line => line.trimEnd()) // Remove trailing whitespace from each line
          .join('\n') || '';

        setAscii(cleanedResult);
      }
      setLoading(false);
    });
  }, [text]);

  if (loading) return <pre>Loading...</pre>;

  return (
    <pre
      className={className}
      style={{
        lineHeight: '1',
        margin: 0,
        padding: 0,
        whiteSpace: 'pre'
      }}
    >
      {ascii}
    </pre>
  );
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col lg:flex-row h-screen items-center justify-center gap-16">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-6">
          <Cowsay text="Placeholder" className="text-sm md:text-base lg:text-lg text-muted" />
          <Figlet text="Nikhil" className="text-muted" />
          <Figlet text="Prabhu" className="text-muted" />
        </header>

        <div>
          <p className="italic text-muted">⚡️ Welcome to my <span className="text-accent-secondary">Portfolio</span></p>
        </div>

        <div className="max-w-3xl text-center text-primary space-y-4 px-4">
          <p>{resources["about"][0]}</p>
          <p>{resources["about"][1]}</p>
          <p>{resources["about"][2]}</p>
        </div>
      </div>
    </div>
  );
}

const resources = {
  "about": {
    0: "I’m a Systems Engineer with 6 years of experience designing reliable, efficient software and infrastructure solutions. Skilled across AWS, Azure, and GCP, I specialize in building automation and tooling that streamline workflows, enhance observability, and improve developer productivity.",
    1: "Proficient in Go, Python, Rust, and C, I enjoy tackling complex engineering problems and delivering maintainable, high-quality code. As a strong advocate for open source, I actively contribute to FOSS projects and share knowledge within the community.",
    2: "Let’s connect if you’d like to collaborate on cloud, DevOps, or open-source initiatives!",
  }
};
