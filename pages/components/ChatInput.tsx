import { useState, useEffect } from "react";
import { InputProps } from "../flashcard";
import { encode } from "gpt-tokenizer";

const ChatInput = ({ onSend, donezo, setDonezo }: InputProps) => {
  const [input, setInput] = useState("");
  const [tokens, setTokens] = useState<number[]>([]);

  const sendInput = () => {
    if (tokens.length > 2007) {
      alert("Too many tokens! Please shorten your input.");
      return;
    } else {
      onSend(input);
      setDonezo(true);
    }
  };

  useEffect(() => {
    setTokens(encode(input));
  }, [input]);

  return (
    <div className="flex flex-col">
      {!donezo && (
        <>
          <textarea
            className="w-full rounded-lg py-3 px-4 h-48 text-start border-2 bg-white border-slate-200"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Input your notes"
          />
          <p
            className="text-right"
            style={{
              color:
                tokens.length >= 2007 ? "rgb(220 0 0)" : "rgb(209 213 219)",
            }}>
            Tokens: {tokens.length}/2007
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
