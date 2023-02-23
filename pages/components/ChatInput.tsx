import { useState } from "react";
import { InputProps } from "../flashcard";

const ChatInput = ({ onSend, donezo, setDonezo }: InputProps) => {
  const [input, setInput] = useState("");

  const sendInput = () => {
    onSend(input);
    setDonezo(true);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      sendInput();
    }
  };

  return (
    <div className="flex flex-col">
      {!donezo && (
        <>
          <textarea
            className="w-full rounded-lg py-3 px-4 h-48 text-start border-2 bg-white border-slate-200"
            value={input}
            maxLength={4098}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            placeholder="Input your notes"
          />
          <p
            className="text-right"
            style={{
              color: input.length >= 4098 ? "rgb(220 0 0)" : "rgb(209 213 219)",
            }}>
            {input.length}/4098
          </p>
        </>
      )}
      <div className="flex flex-col w-full items-center font-semibold text-lg">
        <button
          className="transition-all duration-100 w-48 py-2 text-zinc-800 bg-gradient-to-t from-yellow-300 to-yellow-300/80 rounded-xl border-2 border-yellow-300/30 hover:to-yellow-300/70"
          onClick={() => sendInput()}>
          Generate
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
