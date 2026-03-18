"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function Hero() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <section id="hero" className="relative flex flex-col items-center pt-[200px] pb-9 gap-10">

      {/* Tag */}
      <div
        className="relative z-10 flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs"
        style={{
          background: "var(--base-200)",
          borderColor: "var(--global-border)",
          color: "var(--text-secondary)",
        }}
      >
        <Image src="/icons/chevron-left.svg" alt="" width={16} height={16} />
        <span style={{ color: "var(--text-primary)" }}>Hi, I am Nishant</span>
        <Image src="/icons/chevron-right.svg" alt="" width={16} height={16} />
      </div>

      {/* Heading */}
      <div className="relative z-10 flex flex-col items-center gap-0">
        <h1
          className="display-2xl text-center shimmer-hero-title"
        >
          I help brands move
          <br />
          from idea to scale
        </h1>
      </div>

      {/* Subtitle */}
      <p
        className="relative z-10 text-center body-l"
        style={{ color: "#69686E" }}
      >
        Building products, design systems, and teams that ship with clarity and impact.
      </p>

      {/* Button group */}
      <div className="relative z-50 flex flex-col items-center gap-4">
        <div className="flex items-center gap-5">
          {/* Primary CTA */}
          <div ref={ref} className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="label-m text-white rounded-xl transition-opacity duration-150 hover:opacity-80"
              style={{
                background: "#4755E3",
                padding: "0 56px",
                height: "48px",
              }}
            >
              What are you looking for?
            </button>
            {open && (
              <div
                className="absolute left-1/2 -translate-x-1/2 mt-2 flex flex-col overflow-hidden z-50"
                style={{
                  top: "100%",
                  minWidth: "260px",
                  background: "var(--global-white)",
                  border: "1px solid var(--global-border)",
                  borderRadius: "14px",
                  boxShadow: "0px 8px 32px rgba(0,0,0,0.12)",
                }}
              >
                <Link
                  href="/design"
                  onClick={() => setOpen(false)}
                  className="label-m flex items-center gap-3 px-5 py-4 transition-colors hover:bg-[#f5f5f7]"
                  style={{ color: "var(--text-primary)" }}
                >
                  <span style={{ fontSize: "18px" }}>🗂</span>
                  Projects I have worked upon
                </Link>
                <div style={{ height: "1px", background: "var(--global-border)", margin: "0 16px" }} />
                <a
                  href="https://calendly.com/nishantupadhyay/ideas-die-soon-if-not-shared"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="label-m flex items-center gap-3 px-5 py-4 transition-colors hover:bg-[#f5f5f7]"
                  style={{ color: "var(--text-primary)" }}
                >
                  <span style={{ fontSize: "18px" }}>📅</span>
                  Schedule a call with me
                </a>
              </div>
            )}
          </div>

          {/* Ask Myra */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-myra"))}
            className="flex items-center gap-2 label-m italic text-white rounded-xl border shimmer-ai-btn"
            style={{
              background: "linear-gradient(-17deg, #1E2029 1%, #0A0C17 99%)",
              borderColor: "rgba(255,255,255,0.3)",
              borderWidth: "1.6px",
              boxShadow: "0 2px 24px rgba(71,85,227,0.35)",
              height: "48px",
              padding: "0 20px",
            }}
          >
            <div className="relative w-9 h-9 rounded-full shrink-0" style={{ boxShadow: "0 0 12px rgba(71,85,227,0.6)" }}>
              <Image src="/section-myra/myra_static.png" alt="Myra" fill className="object-cover rounded-full" />
            </div>
            Ask Myra
          </button>
        </div>
      </div>

      {/* Trust row */}
      <div className="relative z-10 flex items-center gap-4">
        <Image src="/icons/trust-avatars.png" alt="Users" height={32} width={96} className="object-contain" />
        <p className="body-m">
          <span className="italic" style={{ color: "var(--text-primary)" }}>Designed for </span>
          <span className="font-bold" style={{ color: "#4755E3" }}>120M+</span>
          <span className="italic" style={{ color: "var(--text-primary)" }}> Indians</span>
        </p>
      </div>
    </section>
  );
}
