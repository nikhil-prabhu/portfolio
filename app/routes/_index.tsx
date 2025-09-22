import { useEffect, useState } from "react";
import type { MetaFunction } from "@remix-run/cloudflare";
import figlet from "figlet";
import { fortune } from "@nikhil-prabhu/fortune";
import * as cowsay from "cowsay";

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
    // FIXME: don't break words onto multiple lines
    <pre className={className}>{cow}</pre>
  );
}

function Figlet({ text, className }: FigletComponentProps) {
  const [ascii, setAscii] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    figlet.text(text, { font: "ANSI Shadow" }, (err, result) => {
      if (err) {
        console.error("Figlet error:", err);
        setAscii(`Error: ${err.message}`);
      } else {
        // Clean up the result by removing extra whitespace and empty lines
        const cleanedResult =
          result
            ?.split("\n")
            .filter((line) => line.trim().length > 0) // Remove empty lines
            .map((line) => line.trimEnd()) // Remove trailing whitespace from each line
            .join("\n") || "";

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
        lineHeight: "1",
        margin: 0,
        padding: 0,
        whiteSpace: "pre",
      }}
    >
      {ascii}
    </pre>
  );
}

export const meta: MetaFunction = () => {
  return [
    { title: "Nikhil Prabhu - Portfolio" },
    { name: "description", content: "Welcome to my portfolio" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col lg:flex-row h-screen items-center justify-center gap-16">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-6">
          <Cowsay
            text={fortune()}
            className="text-sm md:text-base lg:text-lg text-muted"
          />
          <Figlet text="Nikhil" className="text-muted" />
          <Figlet text="Prabhu" className="text-muted" />
        </header>

        <div>
          <p className="italic text-muted">
            ⚡️ Welcome to my{" "}
            <span className="text-accent-secondary">Portfolio</span>
          </p>
        </div>

        <div className="max-w-3xl text-center text-primary space-y-4 px-4">
          <p>{resources["about"][0]}</p>
          <p>{resources["about"][1]}</p>
          <p>{resources["about"][2]}</p>
        </div>
      </div>

      <div className="flex flex-col items-left gap-6">
        <h1 className="text-accent-warning">Experience</h1>

        <div className="flex flex-row justify-between gap-8 w-full">
          <h2 className="text-accent-primary">Systems Engineer</h2>
          <h2 className="text-accent-secondary">EGYM AG</h2>
          <h2 className="text-muted">2025 - Present</h2>
          {/* TODO: make label container sides angled */}
          <div className="flex flex-row gap-4 items-center bg-secondary pl-4 pr-4">
            <p>Berlin, DE</p>
            <span>🇩🇪</span>
          </div>
        </div>

        <div className="flex flex-row justify-between gap-2 w-full">
          <h2 className="text-accent-primary">Developer Associate</h2>
          <h2 className="text-accent-secondary">SAP Labs</h2>
          <h2 className="text-muted">2022 - 2025</h2>
          {/* TODO: make label container sides angled */}
          <div className="flex flex-row gap-4 items-center bg-secondary pl-4 pr-4">
            <p>Bengaluru, IN</p>
            <span>🇮🇳</span>
          </div>
        </div>

        <div className="flex flex-row justify-between gap-2 w-full">
          <h2 className="text-accent-primary">DevOps Engineer</h2>
          <h2 className="text-accent-secondary">SAP Labs</h2>
          <h2 className="text-muted">2020 - 2025</h2>
          {/* TODO: make label container sides angled */}
          <div className="flex flex-row gap-4 items-center bg-secondary pl-4 pr-4">
            <p>Bengaluru, IN</p>
            <span>🇮🇳</span>
          </div>
        </div>

        <div className="flex flex-row justify-between gap-2 w-full">
          <h2 className="text-accent-primary">Full Stack Developer</h2>
          <h2 className="text-accent-secondary">SAP Labs</h2>
          <h2 className="text-muted">2019 - 2020</h2>
          {/* TODO: make label container sides angled */}
          <div className="flex flex-row gap-4 items-center bg-secondary pl-4 pr-4">
            <p>Bengaluru, IN</p>
            <span>🇮🇳</span>
          </div>
        </div>

        <h1 className="text-accent-warning">Education</h1>

        <div className="flex flex-row justify-between gap-2 w-full">
          <h2 className="text-accent-primary">MTech (Software Engineering)</h2>
          <h2 className="text-accent-secondary">BITS, Pilani</h2>
          <h2 className="text-muted">2019 - 2023</h2>
          {/* TODO: make label container sides angled */}
          <div className="flex flex-row gap-4 items-center bg-secondary pl-4 pr-4">
            <p>Bengaluru, IN</p>
            <span>🇮🇳</span>
          </div>
        </div>

        <div className="flex flex-row justify-between gap-2 w-full">
          <h2 className="text-accent-primary">BCA (Computer Applications)</h2>
          <h2 className="text-accent-secondary">SKASC, CBE</h2>
          <h2 className="text-muted">2016 - 2019</h2>
          {/* TODO: make label container sides angled */}
          <div className="flex flex-row gap-4 items-center bg-secondary pl-4 pr-4">
            <p>Coimbatore, IN</p>
            <span>🇮🇳</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const resources = {
  about: {
    0: "I’m a Systems Engineer with 6 years of experience designing reliable, efficient software and infrastructure solutions. Skilled across AWS, Azure, and GCP, I specialize in building automation and tooling that streamline workflows, enhance observability, and improve developer productivity.",
    1: "Proficient in Go, Python, Rust, and C, I enjoy tackling complex engineering problems and delivering maintainable, high-quality code. As a strong advocate for open source, I actively contribute to FOSS projects and share knowledge within the community.",
    2: "Let’s connect if you’d like to collaborate on cloud, DevOps, or open-source initiatives!",
  },
};
