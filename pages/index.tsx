"use client";
import Link from "next/link";
import { useState } from "react";
import { TbArrowRight } from "react-icons/tb";
import Animation from "./components/Animation";
import Header from "./components/Header";

const cards = [
  {
    title: "Flash Cards",
    link: "/flashcard",
    text: "Practice with AI generated flash cards. No more writing them out. Just type your notes and we'll do the rest.",
    left: true,
  },
  {
    title: "Quizzes",
    link: "/quiz",
    text: "Make some",
    left: false,
  },
];

export default function Home() {
  const [buttonHover, setButtonHover] = useState<Boolean>(false);

  return (
    <>
      <div className="min-h-screen bg-zinc-100/70 pb-24">
        <Header />
        <main className="flex flex-col items-center gap-12 px-12 md:px-36">
          <div className="flex flex-col items-center mt-20 gap-4">
            <div className="flex flex-col md:gap-3 md:flex-row font-bold text-5xl text-zinc-800">
              <div className="flex gap-3">
                <h2>The</h2>
                <h2 className="underline decoration-yellow-300 decoration-6 underline-offset-2">
                  fastest
                </h2>
              </div>
              <h2>way to study.</h2>
            </div>
            <p className="text-zinc-600 text-lg text-center max-w-[500px] word-break">
              Harness the power of AI and turn your notes into study material in
              a flash.
            </p>
            <Link
              href="/flashcard"
              onMouseEnter={() => setButtonHover(true)}
              onMouseLeave={() => setButtonHover(false)}
              className="flex items-center justify-center gap-2 w-56 py-2 font-semibold text-lg text-zinc-800 bg-gradient-to-t from-yellow-300 to-yellow-300/80 rounded-xl border-2 border-yellow-300/30 hover:to-yellow-300/60">
              Start Generating
              <TbArrowRight
                className="text-2xl transition-all duration-200"
                style={{
                  transform: buttonHover ? "translateX(4px)" : "translateX(0)",
                }}
              />
            </Link>
          </div>
          <Animation />
        </main>
      </div>
    </>
  );
}
