"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import NavMusicPlayer from "./NavMusicPlayer";

const leftNav = [
  { label: "Design Projects", href: "/design" },
];

const mobileNavLinks = [
  { label: "Design Projects", href: "/design" },
  { label: "Vision Pipeline", href: "/vision" },
];

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const [visionState, setVisionState] = useState<"default" | "intro">("default");
  const [displayedText, setDisplayedText] = useState("");
  const INTRO_TEXT = "Things I have planned next ...";
  const [heroVisible, setHeroVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("modal_dismissed")) {
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setVisible(current < lastScrollY.current || current < 80);
      setScrolled(current > 40);
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisionState((s) => (s === "default" ? "intro" : "default"));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (visionState !== "intro") { setDisplayedText(""); return; }
    let i = 0;
    const startDelay = setTimeout(() => {
      const timer = setInterval(() => {
        i++;
        setDisplayedText(INTRO_TEXT.slice(0, i));
        if (i >= INTRO_TEXT.length) clearInterval(timer);
      }, 55);
      return () => clearInterval(timer);
    }, 500);
    return () => clearTimeout(startDelay);
  }, [visionState]);

  useEffect(() => {
    if (showModal || menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showModal, menuOpen]);

  const handleModalCTA = () => {
    sessionStorage.setItem("modal_dismissed", "1");
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "rgba(13,15,26,0.5)", backdropFilter: "blur(4px)" }}
        >
          <div
            className="relative flex items-start overflow-hidden rounded-2xl"
            style={{
              background: "linear-gradient(-21.65deg, #1E2029 1%, #0A0C17 99%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0px 24px 64px rgba(0,0,0,0.5)",
              width: "640px",
              maxWidth: "95vw",
              padding: "40px 16px 0px 40px",
            }}
          >
            <div className="flex flex-col gap-3 flex-1 self-stretch justify-between pr-4 pb-10">
              <p className="helper-m text-white" style={{ opacity: 0.7 }}>Hello there!</p>
              <div className="flex flex-col gap-3">
                <h2 className="font-display font-bold text-white" style={{ fontSize: "20px", lineHeight: "24px" }}>
                  I am always creating stuff with AI
                </h2>
                <p className="body-l text-white" style={{ opacity: 0.85 }}>Keep an eye out 👀</p>
              </div>
              <button
                onClick={handleModalCTA}
                className="label-m text-white rounded-xl transition-opacity duration-150 hover:opacity-80"
                style={{ background: "#4755E3", height: "48px", width: "240px", boxShadow: "0px 0px 40px rgba(71,85,227,0.4)" }}
              >
                Cool, I&apos;m excited too
              </button>
            </div>
            <div className="absolute right-[40px] top-[40px]" style={{ width: "99px", height: "99px" }}>
              <Image src="/section-myra/myra_static.png" alt="Myra" fill className="object-contain" />
            </div>
            <div className="relative shrink-0 right-[40px] bottom" style={{ width: "286px", height: "214px" }}>
              <Image src="/section-footer/founder-footer.png" alt="Nishant" fill className="object-cover object-top" />
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu overlay — sits below navbar (z-[48] < navbar z-50) */}
      <div
        className="fixed inset-0 z-[48] flex flex-col lg:hidden"
        style={{
          background: "rgba(240,238,233,0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
          paddingTop: "88px",
        }}
      >
        {/* Nav links — centered */}
        <div className="flex flex-col items-center justify-center flex-1 gap-10">
          {mobileNavLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="display-l text-center transition-opacity hover:opacity-60"
              style={{ color: "var(--text-primary)" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social icons row at bottom */}
        <div className="flex items-center justify-center gap-6 pb-14">
          <a href="https://wa.me/+917508631919" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
            <Image src="/nav/whatsapp.png" alt="WhatsApp" width={48} height={48} style={{ display: "block" }} />
          </a>
          <button
            onClick={() => navigator.clipboard.writeText("+917508631919")}
            style={{ padding: 0, background: "none", border: "none" }}
            className="transition-opacity hover:opacity-70"
            title="Copy phone number"
          >
            <Image src="/nav/phone.png" alt="Phone" width={48} height={48} style={{ display: "block" }} />
          </button>
          <a href="https://www.linkedin.com/in/nishantupadhyay0/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70">
            <Image src="/nav/linkedIn.png" alt="LinkedIn" width={48} height={48} style={{ display: "block" }} />
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className="fixed left-0 right-0 z-50 flex items-center gap-2 px-4 lg:px-10 pt-6 lg:pt-10 pb-4 transition-all duration-300"
        style={{
          top: 0,
          transform: visible ? "translateY(0)" : "translateY(-120%)",
          background: scrolled || menuOpen ? "rgba(255,255,255,0.72)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          borderBottom: scrolled || menuOpen ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent",
        }}
      >
        {/* Left: Logo + desktop nav pill + Ask Myra */}
        <div className="flex flex-1 items-start h-12 gap-3 lg:gap-8 min-w-0">
          {/* Logo */}
          <Link href="/" className="relative shrink-0 size-12 transition-opacity duration-150 hover:opacity-80">
            <Image src="/nav/logo.png" alt="Logo" width={48} height={48} priority style={{ display: "block", objectFit: "contain" }} />
          </Link>

          {/* Desktop nav pill */}
          <div
            className="hidden lg:flex h-12 items-center gap-[2px] rounded-xl overflow-hidden shrink-0"
            style={{ background: "var(--base-100)", border: "1px solid var(--global-border)", boxShadow: "0px 2px 12px rgba(0,0,0,0.08)" }}
          >
            {leftNav.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex h-full items-center justify-center label-m transition-colors hover:bg-black/[0.04] px-5"
                style={{ background: "var(--global-white)", color: "var(--text-primary)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Ask Myra — icon only on mobile, full on desktop */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-myra"))}
            className="flex items-center gap-2 label-m italic text-white rounded-xl border shimmer-ai-btn shrink-0 transition-all duration-300 px-2 lg:px-5"
            style={{
              background: "linear-gradient(-17deg, #1E2029 1%, #0A0C17 99%)",
              borderColor: "rgba(255,255,255,0.3)",
              borderWidth: "1.6px",
              boxShadow: "0 2px 24px rgba(71,85,227,0.35)",
              height: "48px",
              opacity: heroVisible ? 0 : 1,
              pointerEvents: heroVisible ? "none" : "all",
              transform: heroVisible ? "scale(0.92)" : "scale(1)",
            }}
          >
            <div className="relative w-8 h-8 rounded-full shrink-0" style={{ boxShadow: "0 0 12px rgba(71,85,227,0.6)" }}>
              <Image src="/section-myra/myra_static.png" alt="Myra" fill className="object-cover rounded-full" />
            </div>
            <span className="hidden lg:inline">Ask Myra</span>
          </button>
        </div>

        {/* Vision center button — desktop only */}
        <div className="hidden lg:block" style={{ perspective: "900px", flexShrink: 0, height: "48px", width: "268px" }}>
          <Link
            href="/vision"
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              position: "relative",
              transformStyle: "preserve-3d",
              transform: visionState === "default" ? "rotateX(0deg)" : "rotateX(180deg)",
              transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
              borderRadius: "12px",
            }}
          >
            <div
              className="absolute inset-0 flex items-center gap-3 px-5 rounded-xl"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                background: "linear-gradient(-12.64deg, #4755E3 1%, #080B14 99%) padding-box, linear-gradient(135deg, #c084fc 0%, #4755E3 100%) border-box",
                border: "1px solid transparent",
                boxShadow: "0px 2px 64px rgba(71,85,227,0.32)",
              }}
            >
              <div className="relative w-6 h-6 shrink-0">
                <Image src="/vision/left.png" alt="" fill className="object-contain" style={{ filter: "blur(5px)", transform: "scale(1.2)" }} />
                <Image src="/vision/left.png" alt="" fill className="object-contain" />
              </div>
              <span className="label-m text-white whitespace-nowrap flex-1 text-center">Vision Pipeline</span>
              <div className="relative w-6 h-6 shrink-0">
                <Image src="/vision/right.png" alt="" fill className="object-contain" style={{ filter: "blur(5px)", transform: "scale(1.2)" }} />
                <Image src="/vision/right.png" alt="" fill className="object-contain" />
              </div>
            </div>
            <div
              className="absolute inset-0 flex items-center justify-center px-5 rounded-xl"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateX(180deg)",
                background: "var(--global-white)",
                border: "2px solid var(--global-border)",
                boxShadow: "0px 2px 12px rgba(0,0,0,0.08)",
              }}
            >
              <span className="label-m whitespace-nowrap" style={{ color: "#1E2029" }}>
                {displayedText}
                {visionState === "intro" && displayedText.length < INTRO_TEXT.length && (
                  <span className="cursor-blink inline-block w-[1.5px] h-[13px] bg-[#1E2029] ml-[2px] align-middle" />
                )}
              </span>
            </div>
          </Link>
        </div>

        {/* Right: Desktop social/music | Mobile hamburger */}
        <div className="flex flex-1 items-start justify-end gap-4 lg:gap-8">
          {/* Desktop quick links */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <a href="https://wa.me/+917508631919" target="_blank" rel="noopener noreferrer" className="shrink-0 transition-opacity duration-150 hover:opacity-80">
              <Image src="/nav/whatsapp.png" alt="WhatsApp" width={48} height={48} style={{ display: "block" }} />
            </a>
            <button onClick={() => navigator.clipboard.writeText("+917508631919")} className="shrink-0 transition-opacity duration-150 hover:opacity-80" title="Copy phone number" style={{ padding: 0, background: "none", border: "none" }}>
              <Image src="/nav/phone.png" alt="Phone" width={48} height={48} style={{ display: "block" }} />
            </button>
            <a href="https://www.linkedin.com/in/nishantupadhyay0/" target="_blank" rel="noopener noreferrer" className="shrink-0 transition-opacity duration-150 hover:opacity-80">
              <Image src="/nav/linkedIn.png" alt="LinkedIn" width={48} height={48} style={{ display: "block" }} />
            </a>
          </div>

          <div className="hidden lg:block">
            <NavMusicPlayer />
          </div>

          {/* Mobile hamburger / close */}
          <button
            className="lg:hidden flex items-center justify-center shrink-0 transition-opacity hover:opacity-70"
            style={{ width: 48, height: 48 }}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </>
  );
}