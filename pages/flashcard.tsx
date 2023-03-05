import { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import { AiOutlineLoading } from "react-icons/ai";
import { FiCopy, FiCheck } from "react-icons/fi";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [donezo, setDonezo] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const parent = useRef(null);

  const callApi = async (input: string) => {
    try {
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
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  const copy = () => {
    let copiedNotes = "";
    cards?.text.forEach((card) => {
      copiedNotes += card.front + "\n" + card.back + "\n\n";
    }, copiedNotes);
    navigator.clipboard.writeText(copiedNotes);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  if (error) <div>Sorry there was an error, please try again later.</div>;

  return (
    <div className="min-h-screen pb-16 bg-zinc-100/70">
      <Header />
      <main
        ref={parent}
        className="flex flex-col gap-6 items-center px-12 md:px-36 mt-20">
        {!donezo && (
          <div className="w-full max-w-7xl flex flex-col gap-8">
            <div className="text-center items-center flex flex-col gap-4">
              <div className="flex flex-col md:flex-row text-5xl md:gap-3 font-bold">
                <h4>Make some</h4>
                <div className="flex">
                  <h4 className="underline decoration-yellow-300 decoration-4 underline-offset-2">
                    flashcards
                  </h4>
                  <h4>.</h4>
                </div>
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
          <>
            <button
              className="font-semibold text-lg flex gap-2 items-center justify-center w-48 h-[48px] text-zinc-800/50 bg-gradient-to-t from-yellow-300/40  to-yellow-300/30 rounded-xl"
              disabled={true}>
              <AiOutlineLoading className="animate-spin" />
              Generating
            </button>
          </>
        )}
        {cards && (
          <div className="flex flex-col gap-12 w-full items-center">
            <div className="flex w-full max-w-2xl">
              <FlashCardPreview text={cards.text} key={cards.key} />
            </div>
            <div className="flex flex-col gap-4 w-full max-w-6xl">
              <div className="flex justify-between items-center">
                <p className="text-gray-600 text-">All cards</p>
                <button
                  onClick={copy}
                  className="text-md py-1 text-zinc-800 transition-all duration-100 bg-gradient-to-t from-yellow-300 to-yellow-300/80 rounded-xl border-2 border-yellow-300/30 hover:to-yellow-300/70"
                  style={{
                    width: copied ? "124px" : "164px",
                  }}>
                  {copied ? "Copied" : "Copy cards"}
                  {copied ? (
                    <FiCheck className="inline ml-2 text-lg" />
                  ) : (
                    <FiCopy className="inline ml-2 text-md" />
                  )}
                </button>
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
