import type { Stages } from "../Animation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TiFlash } from "react-icons/ti";
import { BiLoaderAlt } from "react-icons/bi";

type Props = {
  isMobile: boolean;
  stage: Stages;
  setStage: (stage: Stages) => void;
  text: string;
};

const Generator: React.FC<Props> = ({ isMobile, stage, setStage, text }) => {
  const generateButtonRef = useRef<HTMLButtonElement>(null);
  const [pasteText, setPasteText] = useState<boolean>(false);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const animateGenerator = async () => {
    await sleep(5000);
    setPasteText(true);
    await sleep(2000);
    setStage("cards");
  };

  useEffect(() => {
    animateGenerator();
  }, []);

  return (
    <AnimatePresence>
      {stage === "generator" ? (
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          className="relative bg-white w-full rounded-lg overflow-scroll">
          <div className="relative px-12 py-8 flex flex-col items-center justify-center">
            <div className="flex flex-col gap-4 md:gap-2 md:flex-row items-center w-full justify-between mb-4">
              <h1 className="flex gap-[0.15rem] justify-center text-3xl font-bold">
                <TiFlash className="text-yellow-400 text-4xl" />
                FlashQ
              </h1>
              <AnimatePresence>
                {pasteText ? (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}>
                    <motion.button
                      ref={generateButtonRef}
                      className="rounded-lg px-4 py-2 flex justify-center items-center font-semibold bg-yellow-300 cursor-not-allowed opacity-50 ring-4 ring-yellow-100/50 gap-2">
                      <BiLoaderAlt className="animate-spin" /> Generating
                    </motion.button>
                  </motion.div>
                ) : (
                  <></>
                )}
              </AnimatePresence>
            </div>
            <p className="overflow p-4 border border-black-20 rounded-md w-full h-full">
              {!pasteText ? (
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, repeat: Infinity }}>
                  |
                </motion.span>
              ) : null}
              <AnimatePresence>
                {pasteText ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    {text}
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Generator;
