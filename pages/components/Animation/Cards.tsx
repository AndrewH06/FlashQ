import { Stages } from "../Animation";
import { motion, AnimatePresence } from "framer-motion";
import FlashCardPreview from "../FlashCardPreview";

type Props = {
  stage: Stages;
  setStage: (stage: Stages) => void;
};

export const Cards: React.FC<Props> = (props) => {
  const cards = [
    {
      front: "What is FlashQ?",
      back: "The fastest way to study and prepare yourself for exams.",
    },
    {
      front: "How does FlashQ work?",
      back: "It uses AI to generate flashcards or quizzes from your notes.",
    },
    {
      front: "Why is FlashQ awesome?",
      back: "It saves you from the hassle of retyping your notes into a studyable questions. It's as simple as pasting your notes and clicking a button!",
    },
  ];

  return (
    <AnimatePresence>
      {props.stage === "cards" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5 } }}
          className="absolute w-full max-w-[45%]">
          <FlashCardPreview text={cards} key={0} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
