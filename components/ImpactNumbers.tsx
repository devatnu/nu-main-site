"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const stats = [
  { number: "150 Million+", label: "Users served" },
  { number: "3 Startups", label: "Scaled from 0 to Series A" },
  { number: "Series A", label: "Raised babies, winning funding" },
  { number: "7+ years", label: "Leading teams, building systems" },
];

const darkGradientBtn: React.CSSProperties = {
  background: "#4755E3",
  borderRadius: "12px",
  height: "48px",
  padding: "0 56px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontWeight: 600,
  fontSize: "14px",
  whiteSpace: "nowrap",
};

const numberStyle: React.CSSProperties = {
  whiteSpace: "nowrap",
  background: "var(--text-secondary)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

function TypewriterNumber({ value, delay = 0 }: { value: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
        } else {
          setStarted(false);
          setDisplayed("");
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(value.slice(0, i));
        if (i >= value.length) clearInterval(interval);
      }, 60);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [started, value, delay]);

  return (
    <span
      ref={ref}
      className="absolute top-14 left-14 display-xl select-none pointer-events-none"
      style={numberStyle}
    >
      {displayed}
      {displayed.length < value.length && (
        <span className="cursor-blink inline-block w-[3px] h-[56px] bg-[#D2D6FF] ml-1 align-middle" />
      )}
    </span>
  );
}

export default function ImpactNumbers() {
  return (
    <section className="pt-[200px] px-10">
      <div className="max-w-[1048px] mx-auto flex gap-20 items-start">
        {/* Left column */}
        <div className="flex flex-col gap-4 flex-1">
          {/* Tag */}
          <div
            className="inline-flex self-start items-center gap-1 px-3 py-1.5 rounded-lg border label-s"
            style={{
              background: "var(--base-200)",
              borderColor: "var(--global-border)",
              color: "var(--text-primary)",
            }}
          >
            <Image src="/icons/chevron-right.svg" alt="" width={16} height={16} />
            Impact Created
          </div>

          {/* Heading */}
          <h2
            className="display-2xl"
            style={{
              lineHeight: "1.05",
              background: "linear-gradient(-13deg, #0D0F1A 1%, #4755E3 99%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Just putting
            <br />
            it out there
          </h2>

          {/* Body */}
          <p
            className="font-body"
            style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: "1.6", maxWidth: "380px" }}
          >
            If you&apos;re building something interesting, I&apos;d love to hear about it. Great things often start with a simple conversation.
          </p>

          {/* CTA */}
          <div className="relative">
            <a
              href="https://calendly.com/nishantupadhyay/ideas-die-soon-if-not-shared"
              target="_blank"
              rel="noopener noreferrer"
              style={darkGradientBtn}
              className="label-m transition-opacity duration-150 hover:opacity-80 flex items-center justify-center"
            >
              Schedule a 15 min call
            </a>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6" style={{ width: "512px" }}>
          {stats.map((stat, i) => (
            <div
              key={i}
              className="relative overflow-hidden"
              style={{
                background: "white",
                border: "2px solid var(--global-border)",
                borderRadius: "16px",
                padding: "56px",
                height: "288px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <TypewriterNumber value={stat.number} delay={i * 600} />
              <span
                className="body-l italic"
                style={{ color: "var(--text-primary)" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
