"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const formulaSteps = ["5", "6", "7", "<5-7>", "3 * <5-7>"];
const formulaDelays = [380, 380, 480, 620, 2800];

const formulaStyle: React.CSSProperties = {
  bottom: "118px",
  right: "183.5px",
  transform: "translateX(50%) translateY(100%)",
  fontSize: "64px",
  lineHeight: "72px",
  background: "linear-gradient(-13deg, #0D0F1A 1%, #4755E3 99%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

function AnimatedFormula() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setTimeout(
      () => setStep((s) => (s + 1) % formulaSteps.length),
      formulaDelays[step]
    );
    return () => clearTimeout(t);
  }, [step]);

  return (
    <p className="absolute font-display font-bold whitespace-nowrap text-center" style={formulaStyle}>
      <span key={step} className="step-content-enter inline-block">
        {formulaSteps[step]}
      </span>
    </p>
  );
}

const cardBase: React.CSSProperties = {
  borderRadius: "16px",
  border: "2px solid #D9D9D9",
  overflow: "hidden",
  position: "relative",
};

const darkGradientBtn: React.CSSProperties = {
  background: "linear-gradient(-17deg, #1E2029 1%, #0A0C17 99%)",
  border: "1.6px solid rgba(255,255,255,0.3)",
  boxShadow: "0 2px 24px rgba(71,85,227,0.35)",
  borderRadius: "12px",
  height: "48px",
  padding: "0 20px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: "white",
  fontWeight: 600,
  fontStyle: "italic",
  fontSize: "14px",
  whiteSpace: "nowrap",
};

export default function Traits() {
  return (
    <section className="px-[60px] pt-[120px]">

      {/* Founder photo — outside the grid container */}
      <div className="relative flex justify-center">
        <div className="relative" style={{ height: "442px", width: "590px" }}>
          <Image
            src="/hero/founder_photo.png"
            alt="Nishant Upadhyay"
            fill
            className="object-cover object-top"
          />
        </div>
        {/* Rainbow blur strip */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "-200px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            height: "512px",
            filter: "blur(100px)",
            background: "linear-gradient(90deg, #FF3700, #FFD400, #00FF40, #204CE9)",
            borderRadius: "100%",
            opacity: 0.2,
            zIndex: -10,
          }}
        />
      </div>

      {/* Grid container — white border */}
      <div
        className="rounded-3xl p-6 flex flex-col gap-6"
        style={{
          background: "#E5E2DB",
          border: "2px solid white",
          boxShadow: "inset 0px 0px 10px 0px rgba(0,0,0,0.15)",
        }}
      >

        {/* Row 1 — 30/70 split */}
        <div className="flex gap-6" style={{ height: "288px" }}>

          {/* Card A: I build — 40% */}
          <div style={{ ...cardBase, background: "white", padding: "40px", flex: "0 0 40%" }}>
            <div className="flex flex-col gap-2">
              <h3 className="font-body font-bold" style={{ fontSize: "24px", lineHeight: "28px", color: "var(--text-primary)" }}>
                I build
              </h3>
              <p className="font-body" style={{ fontSize: "16px", lineHeight: "20px", color: "var(--text-primary)" }}>
                The foundation others scale on
              </p>
            </div>
            <div className="float-anim absolute" style={{ bottom: "-54px", right: "48px", width: "204px", height: "244px" }}>
              <Image src="/traits/traits-i-build.png" alt="" fill className="object-contain" />
            </div>
          </div>

          {/* Card B: I turn — 60% */}
          <div style={{ ...cardBase, background: "white", padding: "16px", flex: "1 0 0" }}>
            <div className="flex h-full gap-8">
              <div className="relative shrink-0" style={{ aspectRatio: "1/1", height: "100%", borderRadius: "12px", overflow: "hidden" }}>
                <Image src="/traits/traits-i-turn.png" alt="" fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-start gap-2 py-4">
                <h3 className="font-body font-bold" style={{ fontSize: "24px", lineHeight: "28px", color: "var(--text-primary)" }}>
                  I turn
                </h3>
                <p className="font-body" style={{ fontSize: "16px", lineHeight: "20px", color: "var(--text-primary)" }}>
                  Creative teams into creative forces
                </p>
              </div>
            </div>
            {/* Big display text bottom-right */}
            <AnimatedFormula />
          </div>
        </div>

        {/* Row 2 — 50/50 */}
        <div className="flex gap-6" style={{ height: "288px" }}>

          {/* Card C: I let — indigo */}
          <div style={{ ...cardBase, background: "#4755E3", padding: "40px", flex: "1 0 0" }}>
            <div className="flex flex-col gap-6" style={{ maxWidth: "240px" }}>
              <div className="flex flex-col gap-2">
                <h3 className="font-body font-bold" style={{ fontSize: "24px", lineHeight: "28px", color: "white" }}>
                  I let
                </h3>
                <p className="font-body" style={{ fontSize: "16px", lineHeight: "20px", color: "rgba(255,255,255,0.8)" }}>
                  Users write the brief
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <a
                  href="https://calendly.com/nishantupadhyay/ideas-die-soon-if-not-shared"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={darkGradientBtn}
                  className="transition-opacity duration-150 hover:opacity-80 flex items-center justify-center"
                >Schedule a 15 min call</a>
                <p className="font-body italic" style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>
                  Something else may workout?
                </p>
              </div>
            </div>
            <div className="absolute" style={{ bottom: "-90px", right: "-26px", width: "334px", height: "334px" }}>
              <Image src="/traits/traits-i-let.png" alt="" fill className="object-contain" />
            </div>
          </div>

          {/* Card D: I build systems */}
          <div style={{ ...cardBase, background: "white", padding: "40px", flex: "1 0 0" }}>
            <div className="flex flex-col gap-3">
              <h3 className="font-body font-bold" style={{ fontSize: "24px", lineHeight: "28px", color: "var(--text-primary)" }}>
                I build
              </h3>
              <p className="font-body" style={{ fontSize: "16px", lineHeight: "20px", color: "var(--text-primary)" }}>
                Systems that outlive my tenure
              </p>
              <div className="flex flex-col items-end gap-2 mt-2">
                {["Batt Design System", "Cure Design System", "Aurum Design System"].map((name) => (
                  <span
                    key={name}
                    className="font-display font-medium underline underline-offset-2 cursor-pointer"
                    style={{
                      fontSize: "24px",
                      lineHeight: "28px",
                      background: "linear-gradient(-7deg, #0D0F1A 1%, #4755E3 99%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Row 3 — Full width: I've taken */}
        <div style={{ ...cardBase, background: "white", height: "288px" }}>
          {/* Left image */}
          <div className="absolute" style={{ left: "40px", bottom: "-44px", width: "320px", height: "100%" }}>
            <Image src="/traits/traits-ive-taken-left.png" alt="" fill className="object-contain" />
          </div>
          {/* Right image — rocket, floats */}
          <div className="float-anim absolute" style={{ right: "5%", top: "0", bottom: "-19%", width: "28%", minWidth: "179px" }}>
            <Image src="/traits/traits-ive-taken-right.png" alt="" fill className="object-contain object-right-bottom" />
          </div>
          {/* Center content */}
          <div className="relative flex items-center justify-center h-full z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="text-center">
                <h3 className="font-body font-bold" style={{ fontSize: "24px", lineHeight: "28px", color: "var(--text-primary)" }}>
                  I&apos;ve taken
                </h3>
                <p className="font-body" style={{ fontSize: "16px", lineHeight: "20px", color: "var(--text-primary)" }}>
                  Brands from vision to Series A
                </p>
              </div>
              <button onClick={() => window.dispatchEvent(new CustomEvent("open-myra"))} className="flex items-center gap-4 shimmer-ai-btn" style={darkGradientBtn}>
                <span>Ask Myra more about it</span>
                <div className="relative shrink-0" style={{ width: "36px", height: "36px", borderRadius: "50%", boxShadow: "0 0 28px #a78bfa" }}>
                  <Image src="/section-myra/myra_static.png" alt="Myra" fill className="object-cover rounded-full" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Row 4 — 3 equal cols */}
        <div className="grid grid-cols-3 gap-6" style={{ height: "288px" }}>

          {/* Card F: I learned */}
          <div style={{ ...cardBase, background: "white", padding: "40px" }}>
            <div className="flex flex-col gap-2">
              <h3 className="font-body font-bold" style={{ fontSize: "24px", lineHeight: "28px", color: "var(--text-primary)" }}>
                I learned
              </h3>
              <p className="font-body" style={{ fontSize: "16px", lineHeight: "20px", color: "var(--text-primary)" }}>
                Their language so nothing gets lost
              </p>
            </div>
            <div className="absolute" style={{ bottom: "-20px", right: "-40px", width: "419px", height: "168px" }}>
              <Image src="/traits/traits-i-learned.png" alt="" fill className="object-contain object-left-bottom" />
            </div>
          </div>

          {/* Card G: I track */}
          <div style={{ ...cardBase, background: "white", padding: "40px" }}>
            <div className="flex flex-col gap-2">
              <h3 className="font-body font-bold" style={{ fontSize: "24px", lineHeight: "28px", color: "var(--text-primary)" }}>
                I track
              </h3>
              <p className="font-body" style={{ fontSize: "16px", lineHeight: "20px", color: "var(--text-primary)" }}>
                Every drop-off, every hesitation
              </p>
            </div>
            <div className="absolute" style={{ bottom: "-40px", right: "-1px", width: "244px", height: "100%" }}>
              <Image src="/traits/traits-i-track.png" alt="" fill className="object-contain object-bottom" />
            </div>
          </div>

          {/* Card H: I don't just design */}
          <div style={{ ...cardBase, background: "white", padding: "40px" }}>
            <div className="flex flex-col gap-2">
              <h3 className="font-body font-bold" style={{ fontSize: "24px", lineHeight: "28px", color: "var(--text-primary)", maxWidth: "211px" }}>
                I don&apos;t just design
              </h3>
              <p className="font-body" style={{ fontSize: "16px", lineHeight: "20px", color: "var(--text-primary)", maxWidth: "237px" }}>
                I create, develop, and lead
              </p>
            </div>
            <div className="absolute" style={{ bottom: "0", left: "-2px", width: "408px", height: "169px" }}>
              <Image src="/traits/traits-i-dont-just-design.png" alt="" fill className="object-contain object-left-bottom" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
