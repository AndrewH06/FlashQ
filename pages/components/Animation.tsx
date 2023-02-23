import { useState } from "react";
import Cards from "./Animation/Cards";
import Generator from "./Animation/Generator";
import Notes from "./Animation/Notes";

export type Stages = "notes" | "generator" | "cards";

const Animation = () => {
  const [stage, setStage] = useState<Stages>("notes");

  const notes = `FlashQ is the fastest way to study and prepare yourself for exams. It uses AI to generate flashcards or quizzes from your notes. FlashQ saves you from the hassle of retyping your notes into studyable questions. You focus on the notes, we will do the rest. It's as simple as pasting your notes and clicking a button! You can then study these flashcards and test yourself to prepare for your exam.`;

  return (
    <div className="flex gap-4 w-full justify-center">
      <Notes stage={stage} setStage={setStage} text={notes} />
      <Generator stage={stage} setStage={setStage} text={notes} />
      <Cards stage={stage} setStage={setStage} />
    </div>
  );
};

export default Animation;
