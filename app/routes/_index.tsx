import { Typewriter } from "react-simple-typewriter";

export default function Index() {
  const roles = ["Developer", "Cloud Engineer", "DevOps Engineer"];
  const secondaryColor = "#80b918";

  return (
    <div className="flex h-screen items-center justify-center text-center">
      <header className="flex flex-col items-center gap-9">
        <h1 className="font-bold text-6xl">
          Hello there! I&apos;m{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Nikhil Prabhu
          </span>
        </h1>

        <h2 className="text-4xl text-foreground-700">
          I&apos;m a{" "}
          <span className="font-bold font-mono text-primary">
            <Typewriter
              words={roles}
              cursor
              cursorBlinking
              cursorStyle="_"
              cursorColor={secondaryColor}
              loop={false}
            />
          </span>
        </h2>
      </header>
    </div>
  );
}
