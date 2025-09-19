import { useEffect, useState } from "react";
import type { MetaFunction } from "@remix-run/cloudflare";
import figlet from 'figlet';

interface FigletComponentProps {
  text: string;
}

function Figlet({ text }: FigletComponentProps) {
  const [ascii, setAscii] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    figlet.text(text, { font: "ANSI Shadow" }, (err, result) => {
      if (err) {
        console.error('Figlet error:', err);
        setAscii(`Error: ${err.message}`);
      } else {
        setAscii(result || '');
      }
      setLoading(false);
    });
  }, [text]);

  if (loading) return <pre>Loading...</pre>;
  return <pre>{ascii}</pre>;
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <div className="h-[144px] w-[434px]">
            <Figlet text="Placeholder" />
          </div>
        </header>
      </div>
    </div>
  );
}
