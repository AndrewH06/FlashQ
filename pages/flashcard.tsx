import { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import { AiOutlineLoading } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

import ChatInput from "./components/ChatInput";
import FlashCardComponent from "./components/FlashCardComponent";
import FlashCardPreview from "./components/FlashCardPreview";
import Header from "./components/Header";

export interface CardProps {
  text: string;
  key: number;
}

export interface InputProps {
  onSend: (text: string) => void;
  donezo: boolean;
  setDonezo: any;
}

export interface TextProps {
  front: string;
  back: string;
}

export interface NewCardProps {
  text: TextProps[];
  key: number;
}

const FlashCard = () => {
  const [cards, setCards] = useState<NewCardProps>();
  const [loading, setLoading] = useState(false);
  const [donezo, setDonezo] = useState(false);
  const parent = useRef(null);

  const callApi = async (input: string) => {
    setLoading(true);

    const response = await fetch("/api/generate-flash", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
      }),
    }).then((response) => response.json());
    setLoading(false);

    if (response.text) {
      const botCards: CardProps = {
        text: response.text,
        key: new Date().getTime(),
      };
      const jsonText: Array<TextProps> = JSON.parse(botCards.text);
      const newCards: NewCardProps = {
        text: jsonText,
        key: botCards.key,
      };
      setCards(newCards);
    } else {
      // error
    }
  };

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div className="min-h-screen bg-zinc-100/70">
      <Header />
      <main
        ref={parent}
        className="flex flex-col gap-6 items-center px-4 md:px-20 mt-20">
        {!donezo && (
          <div className="w-full max-w-7xl flex flex-col gap-8">
            <div className="text-center items-center flex flex-col gap-4">
              <div className="flex text-4xl font-bold">
                <h4>Let's make&nbsp;</h4>
                <h4 className="underline decoration-yellow-300 decoration-4 underline-offset-2">
                  flashcards
                </h4>
                <h4>.</h4>
              </div>
              <p className="text-zinc-600 text-lg text-center max-w-[500px] word-break">
                Paste in your notes and we'll do the rest.
              </p>
            </div>
            <ChatInput
              onSend={(input) => callApi(input)}
              donezo={donezo}
              setDonezo={setDonezo}
            />
          </div>
        )}
        {loading && (
          <button
            className="font-semibold text-lg flex gap-2 items-center justify-center w-48 h-[48px] text-zinc-800/50 bg-gradient-to-t from-yellow-300/40  to-yellow-300/30 rounded-xl"
            disabled={true}>
            <AiOutlineLoading className="animate-spin" />
            Generating
          </button>
        )}
        {cards && (
          <div className="flex flex-col gap-6 w-full items-center">
            <div className="flex w-full max-w-2xl">
              <FlashCardPreview text={cards.text} key={cards.key} />
            </div>
            <div className="flex flex-col gap-1 w-full max-w-6xl">
              <div className="flex justify-between">
                <p className="text-gray-600">All cards</p>
                <p className="text-gray-600">Copy</p>
              </div>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {cards.text.map((card: TextProps, index) => (
                  <>
                    <FlashCardComponent
                      front={card.front}
                      back={card.back}
                      key={index}
                      preview={false}
                      reset={true}
                    />
                  </>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default FlashCard;
