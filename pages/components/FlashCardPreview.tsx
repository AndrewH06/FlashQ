import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { NewCardProps } from "../flashcard";
import FlashCardComponent from "./FlashCardComponent";

const FlashCardPreview = ({ text, key }: NewCardProps) => {
  const [i, setI] = useState(0);
  const [leave, setLeave] = useState(false);
  const [reset, setReset] = useState(false);

  const handleChange = (next: boolean) => {
    if (next) {
      if (i + 1 >= text.length) {
        setI(0);
      } else {
        setI(i + 1);
      }
    } else {
      if (i - 1 < 0) {
        setI(text.length - 1);
      } else {
        setI(i - 1);
      }
    }
  };

  useEffect(() => {
    setReset(!reset);
    setLeave(true);
    setTimeout(() => {
      setLeave(false);
    }, 100);
  }, [i]);

  if (!text)
    return <div className="text-center">Error, please try again later.</div>;

  return (
    <div className="flex flex-col w-full max-w-[320px] md:max-w-[650px] gap-2">
      <div className="flex gap-2 items-center">
        <div
          className="flex min-h-[240px] md:min-h-[325px] w-full transition-all duration-150"
          style={{
            transform: leave ? "translateX(-75px)" : "",
            opacity: leave ? 0 : 1,
          }}>
          <FlashCardComponent
            front={text[i].front}
            back={text[i].back}
            preview={true}
            reset={reset}
            key={0}
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => handleChange(false)}
          className="w-[108px] flex justify-center py-2 border-[1px] border-gray-200 rounded-lg text-gray-400 bg-white">
          <FiChevronLeft />
        </button>
        <p className="text-gray-500">Card {i + 1}</p>
        <button
          onClick={() => handleChange(true)}
          className="w-[108px] flex justify-center py-2 border-[1px] border-gray-200 rounded-lg text-gray-400 bg-white">
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default FlashCardPreview;
