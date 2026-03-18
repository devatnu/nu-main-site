"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";

const steps = [
  {
    number: "01",
    title: "Strategy",
    description: "I define direction, structure, and positioning to support every design decision.",
    tags: ["Brand Strategy", "Messaging", "Roadmap"],
  },
  {
    number: "02",
    title: "Research",
    description: "Deep user research and competitive analysis to uncover the right opportunities.",
    tags: ["User Interviews", "Competitive Analysis", "Insights"],
  },
  {
    number: "03",
    title: "Design",
    description: "From wireframes to high-fidelity — every screen crafted with intent and precision.",
    tags: ["Wireframes", "Prototypes", "Visual Design"],
  },
  {
    number: "04",
    title: "Validate",
    description: "Testing assumptions early and often so the final product ships with confidence.",
    tags: ["Usability Testing", "Feedback Loops", "Iteration"],
  },
  {
    number: "05",
    title: "Launch",
    description: "Smooth handoff, implementation support, and post-launch optimisation.",
    tags: ["Dev Handoff", "QA", "Post-Launch Support"],
  },
];

const BADGE      = 44;
const SPACING    = 484; // px between badges (matches Figma: 1193 - 709)
type PinState    = "before" | "pinned" | "after";

export default function SectionApproach() {
  const [active, setActive] = useState(0);
  const [pin, setPin]       = useState<PinState>("before");
  const wrapperRef          = useRef<HTMLDivElement>(null);

  const onScroll = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const scrolled = -wrapper.getBoundingClientRect().top;
    const vh       = window.innerHeight;
    if (scrolled < 0) {
      setPin("before"); setActive(0);
    } else if (scrolled >= steps.length * vh) {
      setPin("after"); setActive(steps.length - 1);
    } else {
      setPin("pinned");
      setActive(Math.floor(scrolled / vh));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const step       = steps[active];
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    el.classList.remove("step-content-enter");
    void el.offsetWidth; // force reflow so browser resets animation
    el.classList.add("step-content-enter");
  }, [active]);

  const panelStyle: React.CSSProperties =
    pin === "pinned" ? { position: "fixed",    top: 0, left: 0, right: 0, height: "100vh" } :
    pin === "after"  ? { position: "absolute", bottom: 0, left: 0, right: 0, height: "100vh" } :
                       { position: "absolute", top: 0,    left: 0, right: 0, height: "100vh" };

  // Slide the track so the active badge is always horizontally centered
  const trackX = `calc(50vw - ${BADGE / 2}px - ${active * SPACING}px)`;

  return (
    <section className="pt-[200px]" style={{ background: "var(--base-100)" }}>
      {/* Header */}
      <div className="flex flex-col items-center gap-10 px-10">
        <div
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border label-s"
          style={{ background: "var(--base-200)", borderColor: "var(--global-border)", color: "var(--text-primary)", }}
        >
          <Image src="/icons/chevron-right.svg" alt="" width={16} height={16} />
          Process
          <Image src="/icons/chevron-left.svg" alt="" width={16} height={16} />
        </div>

        <div className="flex flex-col items-center gap-2">
          <h2
            className="display-xl text-center"
            style={{
              fontSize: "64px", lineHeight: "72px",
              background: "linear-gradient(-5deg, #0D0F1A 1%, #4755E3 99%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}
          >
            A collaborative approach
          </h2>
          <p className="body-l text-center" style={{ color: "var(--text-primary)" }}>
            Design principles first.<br />Everything else follows.
          </p>
        </div>
      </div>

      {/* Scroll driver */}
      <div ref={wrapperRef} style={{ position: "relative", height: `${(steps.length + 1) * 100}vh` }}>
        <div
          style={{
            ...panelStyle,
            background: "var(--base-100)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: "160px",
            gap: "37px",
          }}
        >
          {/* Horizontal track */}
          <div style={{ position: "relative", width: "100vw", height: `${BADGE + 16}px`, overflowX: "hidden", overflowY: "visible" }}>
            {/* Track line */}
            <div
              style={{
                position: "absolute",
                top: "50%", left: 0, right: 0,
                height: "32px",
                background: "white",
                borderRadius: "16px",
                transform: "translateY(-50%)",
                boxShadow: "inset 0px 2px 8px rgba(0,0,0,0.12), 0px 4px 16px rgba(0,0,0,0.08)",
              }}
            />

            {/* Sliding badges */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                transform: `translateX(${trackX}) translateY(-50%)`,
                transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
                display: "flex",
                alignItems: "center",
                gap: `${SPACING - BADGE}px`,
              }}
            >
              {steps.map((s, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={s.number}
                    style={{
                      width: `${BADGE}px`, height: `${BADGE}px`,
                      borderRadius: "8px",
                      background: isActive ? "#4755E3" : "white",
                      border: `${isActive ? 1 : 2}px solid ${isActive ? "#3644D0" : "#D9D9D9"}`,
                      color: isActive ? "white" : "#8E8F94",
                      fontSize: "20px", lineHeight: "24px",
                      fontFamily: "var(--font-body)", fontWeight: 600,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                      transition: "background 0.4s, color 0.4s, border-color 0.4s",
                    }}
                  >
                    {s.number}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step content */}
          <div style={{ width: "712px" }}>
            <div ref={contentRef} className="flex flex-col items-center gap-6">
              <h3
                className="heading-xl text-center w-full"
                style={{ color: "var(--text-primary)" }}
              >
                {step.title}
              </h3>

              <p className="body-l text-center" style={{ color: "#6C6A6A" }}>
                {step.description}
              </p>

              {/* Tags with gradient fade sides */}
              <div
                className="w-full py-6 flex justify-center"
                style={{
                  background: "linear-gradient(to right, rgba(240,238,233,0), white 30%, white 70%, rgba(240,238,233,0))",
                }}
              >
                <div className="flex items-center gap-3">
                  {step.tags.map((tag, j) => (
                    <div key={tag} className="flex items-center gap-3">
                      <span className="body-l text-center whitespace-nowrap" style={{ color: "#6C6A6A" }}>
                        {tag}
                      </span>
                      {j < step.tags.length - 1 && (
                        <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#6C6A6A", flexShrink: 0 }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="https://calendly.com/nishantupadhyay/ideas-die-soon-if-not-shared"
                target="_blank"
                rel="noopener noreferrer"
                className="label-m text-white flex items-center justify-center rounded-xl transition-opacity duration-150 hover:opacity-80"
                style={{ background: "#4755E3", height: "48px", width: "240px" }}
              >
                Schedule a 15 min call
              </a>

              <p className="label-s text-center" style={{ color: "#6C6A6A" }}>
                {active + 1}/5
              </p>

              <div className="flex items-center gap-2">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === active ? "24px" : "8px",
                      height: "8px",
                      background: i === active ? "var(--primary)" : "var(--base-300)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
