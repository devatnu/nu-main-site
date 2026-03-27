"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { homeProjects, HomeProject } from "@/lib/homeProjects";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import runningCharData from "../public/animation/running_character.json";

function DesktopPill() {
  return (
    <div
      className="flex items-center justify-center px-6 py-3"
      style={{
        borderRadius: "8px",
        background: "var(--base-200)",
        border: "1px solid var(--global-border)",
      }}
    >
      <span
        className="font-body italic"
        style={{ fontSize: "14px", lineHeight: "20px", color: "#69686E" }}
      >
        Desktop view is genuinely better
      </span>
    </div>
  );
}

function MobileProjectCard({ project, onTap }: { project: HomeProject; onTap: () => void }) {
  const isLight = project.textColor === "#FFFFFF";

  return (
    <div
      onClick={onTap}
      className="flex flex-col items-center gap-3 overflow-hidden w-full"
      style={{
        background: project.bg,
        border: `1.5px solid ${isLight ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.07)"}`,
        borderRadius: "16px",
        padding: "12px",
      }}
    >
      {/* Image */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "144px", borderRadius: "12px" }}
      >
        <Image
          src={project.imageSrc}
          alt={project.title}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      {/* Category + Title */}
      <div className="flex flex-col items-center gap-2" style={{ paddingTop: "8px", paddingBottom: "8px" }}>
        <div className="flex items-center gap-1">
          {project.category.split("·").map((part, i) => (
            <span
              key={i}
              className="font-body"
              style={{
                fontSize: "12px",
                lineHeight: "16px",
                color: isLight
                  ? i === 0 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.45)"
                  : i === 0 ? "rgba(30,32,41,0.75)" : "rgba(30,32,41,0.4)",
              }}
            >
              {i === 1 && <span style={{ marginRight: "4px", opacity: 0.4, fontSize: "12px", lineHeight: "12px" }}>·</span>}
              {part.trim()}
            </span>
          ))}
        </div>

        <p
          className="font-display font-semiBold whitespace-pre-wrap text-center"
          style={{ fontSize: "16px", lineHeight: "20px", color: project.textColor }}
        >
          {project.title}
        </p>
      </div>
    </div>
  );
}

export default function MobileHome() {
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [projectPopup, setProjectPopup] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    if (!email.trim()) return;
    await fetch("/api/save-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), project: projectPopup }),
    });
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setEmail("");
      setProjectPopup(null);
    }, 2000);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex flex-col" style={{ background: "var(--base-100)" }}>

      {/* ── Header ────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 transition-all duration-200"
        style={{
          background: scrolled || contactOpen ? "rgba(240,238,233,0.95)" : "var(--base-100)",
          backdropFilter: scrolled || contactOpen ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled || contactOpen ? "blur(14px)" : "none",
          borderBottom: `1px solid ${scrolled || contactOpen ? "var(--global-border)" : "transparent"}`,
          boxShadow: scrolled || contactOpen ? "0 2px 16px rgba(0,0,0,0.06)" : "none",
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-4" style={{ height: "64px" }}>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-myra"))}
            className="flex items-center gap-2"
          >
            <div
              className="relative w-10 h-10 rounded-full shrink-0"
              style={{ boxShadow: "0 0 12px rgba(71,85,227,0.45)" }}
            >
              <Image src="/section-myra/myra_static.png" alt="Myra" fill className="object-cover rounded-full" />
            </div>
            <span
              className="font-display font-semibold"
              style={{ fontSize: "16px", lineHeight: "20px", color: "var(--text-primary)" }}
            >
              Ask Myra
            </span>
          </button>

          <button
            onClick={() => setContactOpen(v => !v)}
            className="flex items-center justify-center font-body font-medium transition-all duration-200"
            style={{
              height: "40px",
              paddingLeft: "20px",
              paddingRight: "20px",
              borderRadius: "20px",
              border: `1.5px solid ${contactOpen ? "var(--text-primary)" : "var(--global-border)"}`,
              fontSize: "15px",
              lineHeight: "20px",
              color: "var(--text-primary)",
              background: contactOpen ? "var(--base-200)" : "transparent",
            }}
          >
            Contact
          </button>
        </div>

        {/* ── Contact dropdown ── */}
        {contactOpen && (
          <div className="flex flex-col items-center gap-5 px-5 pb-6 pt-2">
            <a
              href="/Nishant_Upadhyay_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body italic underline underline-offset-4 text-center"
              style={{ fontSize: "15px", color: "var(--text-primary)" }}
            >
              Tap to download Resume
            </a>
            <a
              href="mailto:iamnishantupadhyay@gmail.com"
              className="font-body italic underline underline-offset-4 text-center break-all"
              style={{ fontSize: "15px", color: "var(--text-primary)" }}
            >
              iamnishantupadhyay@gmail.com
            </a>
            <div className="flex items-center gap-6">
              <a href="https://wa.me/+917508631919" target="_blank" rel="noopener noreferrer">
                <Image src="/nav/whatsapp.png" alt="WhatsApp" width={44} height={44} className="object-contain" />
              </a>
              <a href="tel:+917508631919">
                <Image src="/nav/phone.png" alt="Phone" width={44} height={44} className="object-contain" />
              </a>
              <a href="https://www.linkedin.com/in/nishantupadhyay0/" target="_blank" rel="noopener noreferrer">
                <Image src="/nav/linkedIn.png" alt="LinkedIn" width={44} height={44} className="object-contain" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative flex flex-col items-center pt-12 pb-10 gap-8 px-5 overflow-hidden"
      >
        {/* Badge */}
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full border"
          style={{ background: "var(--base-200)", borderColor: "var(--global-border)" }}
        >
          <Image src="/icons/chevron-left.svg" alt="" width={14} height={14} style={{ opacity: 0.5 }} />
          <span className="font-body" style={{ fontSize: "12px", lineHeight: "16px", color: "var(--text-primary)" }}>
            Hi, I am Nishant
          </span>
          <Image src="/icons/chevron-right.svg" alt="" width={14} height={14} style={{ opacity: 0.5 }} />
        </div>

        {/* Headline */}
        <h1 className="display-xl text-center shimmer-hero-title">
          I help brands move<br />from idea to scale
        </h1>

        {/* Subtitle */}
        <p className="text-center body-m" style={{ color: "#69686E", maxWidth: "320px" }}>
          Building products, design systems, and teams that ship with clarity and impact.
        </p>

        {/* Ask Myra CTA */}
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("open-myra"))}
          className="flex items-center justify-center gap-3 label-m italic text-white shimmer-ai-btn"
          style={{
            background: "linear-gradient(-17deg, #1E2029 1%, #0A0C17 99%)",
            border: "1.6px solid rgba(255,255,255,0.25)",
            borderRadius: "16px",
            boxShadow: "0 4px 32px rgba(71,85,227,0.4)",
            padding: "12px 32px",
          }}
        >
          Ask Myra
          <div
            className="relative w-9 h-9 rounded-full shrink-0"
            style={{ boxShadow: "0 0 16px rgba(71,85,227,0.7)" }}
          >
            <Image src="/section-myra/myra_static.png" alt="Myra" fill className="object-cover rounded-full" />
          </div>
        </button>

        {/* Flag + Trust */}
        <div className="flex flex-col items-center" style={{ gap: "12px" }}>
          <span style={{ fontSize: "32px", lineHeight: 1 }}>🇮🇳</span>
          <Image src="/icons/trust-avatars.png" alt="Users" height={32} width={96} className="object-contain" />
          <p className="body-m italic" style={{ color: "var(--text-primary)" }}>
            Designed for{" "}
            <span className="font-bold not-italic" style={{ color: "#4755E3" }}>120M+</span>
            {" "}Indians
          </p>
        </div>
      </section>

      {/* ── Character ─────────────────────────────────────── */}
      <section className="pb-10 flex flex-col items-center" style={{ gap: 0, marginTop: "-24px" }}>
        <div style={{ width: "240px", height: "240px" }}>
          <Lottie animationData={runningCharData} loop />
        </div>
        <div style={{ marginTop: "-64px" }}>
          <DesktopPill />
        </div>
      </section>

      {/* ── Projects ──────────────────────────────────────── */}
      <section
        className="px-5 pb-10 flex flex-col gap-5"
        style={{ background: "var(--base-200)", borderRadius: "16px", margin: "0 12px", padding: "12px" }}
      >
        {/* Label */}
        <div className="flex items-center justify-center gap-2">
          <span className="font-body font-semibold" style={{ fontSize: "14px", color: "var(--text-primary)" }}>
            Built
          </span>
          <span style={{ color: "var(--text-secondary)" }}>•</span>
          <span className="font-body" style={{ fontSize: "14px", color: "var(--text-secondary)"  }}>
            till now
          </span>
        </div>

        {/* Heading */}
        <h2
          className="font-display font-bold text-center"
          style={{
            fontSize: "20px",
            lineHeight: "24px",
            background: "linear-gradient(135deg, #0D0F1A 0%, #4755E3 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          From insight to execution{"\n"}Delivering measurable value{"\n"}for customers
        </h2>

        {/* Cards */}
        <div className="flex flex-col gap-6">
          {homeProjects.map((project, i) => (
            <MobileProjectCard key={i} project={project} onTap={() => setProjectPopup(project.title)} />
          ))}
        </div>
      </section>

      {/* ── Project popup ─────────────────────────────────── */}
      {projectPopup && (
        <div
          className="fixed inset-0 z-[200] flex items-end justify-center"
          style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
          onClick={() => setProjectPopup(null)}
        >
          <div
            className="flex flex-col gap-5 w-full"
            style={{
              background: "var(--base-100)",
              borderRadius: "24px 24px 0 0",
              padding: "28px 20px 40px",
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="flex justify-center">
              <div style={{ width: "40px", height: "4px", borderRadius: "2px", background: "var(--global-border)" }} />
            </div>

            <p
              className="font-display font-bold text-center"
              style={{ fontSize: "18px", lineHeight: "24px", color: "var(--text-primary)" }}
            >
              Details about a project are available on desktop version.
            </p>

            {sent ? (
              <p className="font-body text-center" style={{ color: "#4755E3", fontSize: "15px" }}>
                Sent! Check your inbox.
              </p>
            ) : (
              <>
                <div
                  className="flex items-center gap-2"
                  style={{
                    border: "1.5px solid var(--global-border)",
                    borderRadius: "12px",
                    padding: "0 14px",
                    height: "48px",
                    background: "var(--base-200)",
                  }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email to send this to you"
                    className="flex-1 bg-transparent font-body outline-none"
                    style={{ fontSize: "14px", color: "var(--text-primary)" }}
                  />
                </div>

                <button
                  onClick={handleSend}
                  className="w-full font-body font-semibold text-white"
                  style={{
                    height: "48px",
                    borderRadius: "12px",
                    background: "#4755E3",
                    fontSize: "15px",
                  }}
                >
                  Send
                </button>

                <button
                  onClick={() => setProjectPopup(null)}
                  className="w-full font-body"
                  style={{ fontSize: "14px", color: "#69686E" }}
                >
                  I&apos;ll see later
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Footer ────────────────────────────────────────── */}
      {/* ── Character ─────────────────────────────────────── */}
      <section className="pb-10 flex flex-col items-center" style={{ gap: 0, marginTop: "-24px" }}>
        <div style={{ width: "240px", height: "240px" }}>
          <Lottie animationData={runningCharData} loop />
        </div>
        <div style={{ marginTop: "-64px" }}>
          <DesktopPill />
        </div>
      </section>

      <section className="flex flex-col items-center gap-7 px-5 pt-12 pb-14">
        <a
          href="/Nishant_Upadhyay_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body italic underline underline-offset-4 text-center"
          style={{ fontSize: "15px", color: "var(--text-primary)" }}
        >
          Tap to download Resume
        </a>

        <a
          href="mailto:iamnishantupadhyay@gmail.com"
          className="font-body italic underline underline-offset-4 text-center break-all"
          style={{ fontSize: "15px", color: "var(--text-primary)" }}
        >
          iamnishantupadhyay@gmail.com
        </a>

        {/* Social icons */}
        <div className="flex items-center gap-6">
          <a href="https://wa.me/+917508631919" target="_blank" rel="noopener noreferrer">
            <Image src="/nav/whatsapp.png" alt="WhatsApp" width={48} height={48} className="object-contain" />
          </a>
          <a href="tel:+917508631919">
            <Image src="/nav/phone.png" alt="Phone" width={48} height={48} className="object-contain" />
          </a>
          <a href="https://www.linkedin.com/in/nishantupadhyay0/" target="_blank" rel="noopener noreferrer">
            <Image src="/nav/linkedIn.png" alt="LinkedIn" width={48} height={48} className="object-contain" />
          </a>
        </div>

        {/* Logo */}
        <Image src="/nav/logo.png" alt="Logo" width={48} height={48} className="object-contain" />
      </section>

    </div>
  );
}
