"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const quotes = [
  { quote: "If the system outlives you, you did your job right.", sub: "it's yours, it's specific, it will stick" },
  { quote: "Design is not just what it looks like. Design is how it works.", sub: "function follows form, always" },
  { quote: "Ship early, iterate often, never stop listening.", sub: "speed is a feature too" },
  { quote: "The best design is the one users never have to think about.", sub: "clarity beats cleverness, every time" },
  { quote: "A great product is a series of good decisions made consistently.", sub: "process is the real product" },
  { quote: "You're not designing screens. You're designing behaviour.", sub: "intent before interface" },
  { quote: "Constraints are not obstacles. They are the brief.", sub: "work within them, win within them" },
  { quote: "Data tells you what. Research tells you why. Taste tells you how.", sub: "use all three" },
  { quote: "If you can't explain it simply, you haven't designed it well enough.", sub: "simplicity is the hardest thing" },
  { quote: "Build for the user who has no time, no patience, and no manual.", sub: "that's everyone, always" },
];

const SPEED = 28;

export default function QuoteTeaser() {
  const [index, setIndex]                   = useState(0);
  const [displayedQuote, setDisplayedQuote] = useState("");
  const [displayedSub, setDisplayedSub]     = useState("");

  const { quote, sub } = quotes[index];

  useEffect(() => {
    setDisplayedQuote("");
    setDisplayedSub("");
    let i = 0;
    const quoteTimer = setInterval(() => {
      i++;
      setDisplayedQuote(quote.slice(0, i));
      if (i >= quote.length) {
        clearInterval(quoteTimer);
        let j = 0;
        const subTimer = setInterval(() => {
          j++;
          setDisplayedSub(sub.slice(0, j));
          if (j >= sub.length) clearInterval(subTimer);
        }, SPEED);
      }
    }, SPEED);
    return () => clearInterval(quoteTimer);
  }, [index, quote, sub]);

  const nextQuote = () => {
    let next = index;
    while (next === index) next = Math.floor(Math.random() * quotes.length);
    setIndex(next);
  };

  const quoteTyping = displayedQuote.length < quote.length;
  const subTyping   = !quoteTyping && displayedSub.length < sub.length;

  return (
    <section className="pt-[200px] pb-[200px] px-16 flex flex-col items-center gap-24">
      {/* Tag */}
      <div className="flex items-center gap-4 px-3 py-2">
        <Image src="/icons/star.png" alt="" width={24} height={24} />
        <span className="heading-l whitespace-nowrap" style={{ color: "#8E8F94" }}>
          In case you need this
        </span>
        <Image src="/icons/star.png" alt="" width={24} height={24} />
      </div>

      {/* Quote */}
      <div className="text-center w-full">
        <p className="display-2xl" style={{ color: "black" }}>
          &ldquo;{displayedQuote}
          {quoteTyping && <span className="cursor-blink inline-block w-[4px] h-[56px] bg-black ml-1 align-middle" />}
          {!quoteTyping && displayedQuote.length > 0 && <>&rdquo;</>}
        </p>
        <p className="display-2xl" style={{ color: "black", minHeight: "72px" }}>
          {displayedSub}
          {subTyping && <span className="cursor-blink inline-block w-[4px] h-[56px] bg-black ml-1 align-middle" />}
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={nextQuote}
        className="label-m pulse-btn transition-opacity duration-150 hover:opacity-80"
        style={{
          height: "64px",
          padding: "0 48px",
          borderRadius: "64px",
          background: "var(--gradient-indigo)",
          border: "4px solid white",
          boxShadow: "0px 0px 48px 0px rgba(167,139,250,0.64)",
          color: "#F0F1FD",
          whiteSpace: "nowrap",
        }}
      >
        Get a new quote
      </button>
    </section>
  );
}
