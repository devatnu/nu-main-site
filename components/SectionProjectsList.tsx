"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef, useEffect, useState, useCallback } from "react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import runningCharData from "../public/animation/running_character.json";

import { homeProjects as projects, HomeProject as Project } from "@/lib/homeProjects";

type PinState = "before" | "pinned" | "after";

const CARD_W = 572;
const GAP = 40;
const STRIDE = CARD_W + GAP;

function ProjectCard({ project }: { project: Project }) {
  const isLight = project.textColor === "#FFFFFF";

  return (
    <a
      href={`/design/${project.slug}`}
      className="flex flex-col gap-6 shrink-0 overflow-hidden no-underline"
      style={{
        width: `${CARD_W}px`,
        background: project.bg,
        border: "2px solid #D9D9D9",
        borderRadius: "32px",
        padding: "40px",
      }}
    >
      {project.layout === "title-top" ? (
        <>
          {/* Title + button on top */}
          <div className="flex flex-col gap-6 items-center p-2">
            <p
              className="font-display font-bold text-center w-full whitespace-pre-wrap"
              style={{ fontSize: "36px", lineHeight: "40px", color: project.textColor }}
            >
              {project.title}
            </p>
            <div
              className="flex items-center justify-center shrink-0"
              style={{
                height: "56px",
                padding: "16px 48px",
                borderRadius: "44px",
                background: project.btnBg,
                border: isLight ? "2px solid #D9D9D9" : "none",
              }}
            >
              <span
                className="font-body font-semibold whitespace-nowrap"
                style={{ fontSize: "16px", lineHeight: "20px", color: "#F0F1FD" }}
              >
                View more
              </span>
            </div>
          </div>
          {/* Preview image below */}
          <div
            className="relative w-full overflow-hidden shrink-0"
            style={{ height: "256px", borderRadius: "12px" }}
          >
            <Image
              src={project.imageSrc}
              alt={project.title}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </>
      ) : (
        <>
          {/* Preview image on top */}
          <div
            className="relative w-full overflow-hidden shrink-0"
            style={{ height: "256px", borderRadius: "20px", background: "white" }}
          >
            <Image
              src={project.imageSrc}
              alt={project.title}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          {/* Title + button below */}
          <div className="flex flex-col gap-6 items-start p-2">
            <p
              className="font-display font-bold whitespace-pre-wrap"
              style={{ fontSize: "36px", lineHeight: "40px", color: project.textColor }}
            >
              {project.title}
            </p>
            <div
              className="flex items-center justify-center shrink-0"
              style={{
                height: "56px",
                padding: "16px 48px",
                borderRadius: "32px",
                background: project.btnBg,
              }}
            >
              <span
                className="font-body font-semibold whitespace-nowrap"
                style={{ fontSize: "16px", lineHeight: "20px", color: "#F0F1FD" }}
              >
                View more
              </span>
            </div>
          </div>
        </>
      )}
    </a>
  );
}

const SCALE_VHS = 2; // extra vh after horizontal scroll ends, used for lottie scale

export default function SectionProjectsList() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [pin, setPin] = useState<PinState>("before");
  const [progress, setProgress] = useState(0);
  const [lottieScale, setLottieScale] = useState(1);

  const onScroll = useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const scrolled = -el.getBoundingClientRect().top;
    const vh = window.innerHeight;
    const horizEnd = projects.length * vh;
    const scaleEnd = horizEnd + SCALE_VHS * vh;

    if (scrolled < 0) {
      setPin("before");
      setProgress(0);
      setLottieScale(1);
    } else if (scrolled >= scaleEnd) {
      setPin("after");
      setProgress(1);
      setLottieScale(3);
    } else if (scrolled >= horizEnd) {
      // horizontal scroll done — keep pinned, grow lottie
      setPin("pinned");
      setProgress(1);
      const scaleProgress = (scrolled - horizEnd) / (SCALE_VHS * vh);
      setLottieScale(1 + scaleProgress * 2);
    } else {
      setPin("pinned");
      setProgress(scrolled / horizEnd);
      setLottieScale(1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const panelStyle: React.CSSProperties =
    pin === "pinned"
      ? { position: "fixed", top: 0, left: 0, right: 0, height: "100vh" }
      : pin === "after"
      ? { position: "absolute", bottom: 0, left: 0, right: 0, height: "100vh" }
      : { position: "absolute", top: 0, left: 0, right: 0, height: "100vh" };

  const translateX = -progress * projects.length * STRIDE;

  return (
    <section className="pt-[160px]" style={{ background: "var(--base-100)" }}>
      {/* Scroll driver — drives horizontal card slide + lottie scale */}
      <div
        ref={wrapperRef}
        style={{ position: "relative", height: `${(projects.length + 1 + SCALE_VHS) * 100}vh` }}
      >
        <div
          style={{
            ...panelStyle,
            background: "var(--base-100)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "120px",
          }}
        >
          {/* Section header — inside sticky panel */}
          <div className="flex flex-col items-center gap-10 px-10">
            <div className="flex items-center gap-2">
              <span
                className="font-display font-medium"
                style={{ fontSize: "24px", lineHeight: "28px", color: "var(--text-primary)" }}
              >
                Recent Builds
              </span>
              <div
                style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4755E3", flexShrink: 0 }}
              />
              <span
                className="font-display font-medium"
                style={{ fontSize: "24px", lineHeight: "28px", color: "var(--text-secondary)" }}
              >
                Making Impact
              </span>
            </div>
            <h2
              className="display-2xl text-center"
              style={{
                background: "linear-gradient(-5deg, #0D0F1A 1%, #4755E3 99%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              From insight to execution<br />Delivering measurable value for customers
            </h2>
          </div>

          {/* Padded overflow-hidden track container */}
          <div
            style={{
              width: "100%",
              padding: "0 120px",
              overflow: "hidden",
            }}
          >
            {/* Sliding card track */}
            <div
              style={{
                display: "flex",
                gap: `${GAP}px`,
                transform: `translateX(${translateX}px)`,
                willChange: "transform",
              }}
            >
              {projects.map((project, i) => (
                <ProjectCard key={i} project={project} />
              ))}

              {/* Lottie + CTA as final slide */}
              <div
                className="flex flex-col items-center justify-center gap-8 shrink-0"
                style={{ width: `${CARD_W}px`, paddingLeft: "50%" }}
              >
                <div style={{ width: "200px", height: "200px", transform: `scale(${lottieScale})`, transformOrigin: "center center", transition: "transform 0.05s linear" }}>
                  <Lottie animationData={runningCharData} loop />
                </div>
                <a
                  href="/design"
                  className="font-body font-semibold ripple-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "24px 48px",
                    borderRadius: "20px",
                    border: "4px solid white",
                    background: "linear-gradient(-9deg, #1E2029 1%, #0A0C17 99%)",
                    fontSize: "20px",
                    lineHeight: "24px",
                    color: "#F0F1FD",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  View all the things built till now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
