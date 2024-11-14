import { Typewriter } from "react-simple-typewriter";
import WobblingRingSphere from "~/components/sphere";
import { motion, AnimatePresence } from "framer-motion";

export default function Index() {
  const roles = ["Developer", "Cloud Engineer", "DevOps Engineer"];
  const primaryColor = "#007f5f";
  const secondaryColor = "#80b918";

  return (
    <div className="flex h-screen items-center justify-center text-center">
      <AnimatePresence>
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: "spring",
            duration: 10,
          }}
        >
          <WobblingRingSphere color={primaryColor} cameraPositionZ={2} />
        </motion.div>
      </AnimatePresence>

      <header className="flex flex-col items-center gap-9">
        <h1 className="font-bold text-2xl md:text-6xl">
          Hello there! I&apos;m{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Nikhil Prabhu
          </span>
        </h1>

        <h2 className="text-xl md:text-4xl text-foreground-700">
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
