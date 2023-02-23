"use client";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { TbArrowRight } from "react-icons/tb";
import { TiFlash } from "react-icons/ti";
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
      <Head>
        <title>FlashQ - The fastest way to study.</title>
        <meta
          name="description"
          content="FlashQ is the fastest way to study and prepare yourself for exams. It uses AI to generate flashcards or quizzes from your notes. FlashQ saves you from the hassle of retyping your notes into studyable questions. "
        />
        <link rel="icon" href="/FlashQ.ico" />
      </Head>
      <div className="min-h-screen bg-zinc-100/70">
        <Header />
        <main className="flex flex-col items-center gap-12">
          <div className="flex flex-col items-center mt-20 gap-4">
            <div className="flex font-bold text-5xl text-zinc-800">
              <h2>The&nbsp;</h2>
              <h2 className="underline decoration-yellow-300 decoration-4 underline-offset-2">
                fastest
              </h2>
              <h2>&nbsp;way to study.</h2>
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
          <div className="w-full max-w-7xl h-[380px]">
            <Animation />
          </div>
        </main>
      </div>
    </>
  );
}
