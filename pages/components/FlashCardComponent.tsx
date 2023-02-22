import { useEffect, useState } from "react";
import { TextProps } from "../flashcard";

interface NewTextProps extends TextProps {
  preview: boolean;
  reset: boolean;
}

const FlashCardComponent = ({ front, back, preview, reset }: NewTextProps) => {
  const [flipped, setFlipped] = useState(false);

  const flipCard = () => {
    setFlipped(!flipped);
  };

  useEffect(() => {
    setFlipped(false);
  }, [reset]);

  return (
    <div
      onClick={flipCard}
      className="hover:cursor-pointer drop-shadow-sm flex w-full max-w-full text-wrap break-word px-10 py-4 border-2 bg-white border-slate-200 rounded-lg transition-all duration-150 [transform-style:preserve-3d]"
      style={{
        transform: flipped ? "rotateX(180deg)" : "",
        alignItems: preview ? "center" : "",
        justifyContent: preview ? "center" : "",
      }}>
      {flipped ? (
        <div className="text-xl [transform:rotateX(180deg)]">
          <p className="text-sm italic">Answer</p>
          <p>{back}</p>
        </div>
      ) : (
        <div className="text-xl">
          <p className="text-sm italic">Question</p>
          <p className="">{front}</p>
        </div>
      )}
    </div>
  );
};

export default FlashCardComponent;
