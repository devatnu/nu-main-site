"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ─── Types ──────────────────────────────────────────────────────── */

interface ProjectCard {
  name: string;
  tags: string[];
  description: string;
  slug: string;
}

interface ParsedResponse {
  type: "text" | "contacts" | "tags_cta" | "resume" | "projects";
  text: string;
  tags?: string[];
  cta?: { label: string; href: string };
  projects?: ProjectCard[];
}

interface Message {
  role: "user" | "assistant";
  content: string;
  parsed?: ParsedResponse;
}

/* ─── Theme ──────────────────────────────────────────────────────── */

interface Theme {
  dark: boolean;
  panelBg: string;
  panelBorder: string;
  panelShadow: string;
  topBarBg: string;
  topBarBorder: string;
  bubbleBg: string;
  bubbleText: string;
  subBg: string;
  chipBg: string;
  chipBorder: string;
  chipText: string;
  inputBg: string;
  inputBorder: string;
  inputText: string;
  inputPlaceholder: string;
  inputShadow: string;
  bottomBg: string;
  bottomBorder: string;
  bottomShadow: string;
  nameColor: string;
  footerText: string;
  closeBorder: string;
  closeStroke: string;
  ctaBg: string;
  userAvatarBg: string;
}

const LIGHT: Theme = {
  dark: false,
  panelBg: "white",
  panelBorder: "#efe9ff",
  panelShadow: "-24px 0px 104px 0px #e9e2fd",
  topBarBg: "white",
  topBarBorder: "#e2e8f0",
  bubbleBg: "#f0eee9",
  bubbleText: "#475569",
  subBg: "#e5e2db",
  chipBg: "#f0eee9",
  chipBorder: "#d9d9d9",
  chipText: "#1e2029",
  inputBg: "white",
  inputBorder: "#cbd5e1",
  inputText: "#1e2029",
  inputPlaceholder: "#475569",
  inputShadow: "0px 4px 8px -2px rgba(23,23,23,0.1), 0px 2px 4px -2px rgba(23,23,23,0.06)",
  bottomBg: "white",
  bottomBorder: "#d9d9d9",
  bottomShadow: "0px -12px 60px 0px rgba(0,0,0,0.12)",
  nameColor: "#1e293b",
  footerText: "#94a3b8",
  closeBorder: "#cbd5e1",
  closeStroke: "#1e2029",
  ctaBg: "#5e3ac9",
  userAvatarBg: "#efe9ff",
};

const DARK: Theme = {
  dark: true,
  panelBg: "#0D0F1A",
  panelBorder: "#2a1f5e",
  panelShadow: "-24px 0px 104px 0px rgba(71,85,227,0.3)",
  topBarBg: "#0D0F1A",
  topBarBorder: "#1a1d2e",
  bubbleBg: "#1a1d2e",
  bubbleText: "#94a3b8",
  subBg: "#242742",
  chipBg: "#1a1d2e",
  chipBorder: "#2a2f4a",
  chipText: "#e2e8f0",
  inputBg: "#0D0F1A",
  inputBorder: "#2a2f4a",
  inputText: "#e2e8f0",
  inputPlaceholder: "#64748b",
  inputShadow: "0px 4px 8px -2px rgba(0,0,0,0.4)",
  bottomBg: "#0D0F1A",
  bottomBorder: "#1a1d2e",
  bottomShadow: "0px -12px 60px 0px rgba(0,0,0,0.5)",
  nameColor: "#e2e8f0",
  footerText: "#475569",
  closeBorder: "#2a2f4a",
  closeStroke: "#94a3b8",
  ctaBg: "#4755E3",
  userAvatarBg: "#1a1d2e",
};

const ThemeCtx = createContext<Theme>(LIGHT);
const useTheme = () => useContext(ThemeCtx);

const SUGGESTIONS = [
  "Who is Nishant?",
  "What has he designed?",
  "Get in touch",
  "What's he building now?",
];

/* ─── Small atoms ────────────────────────────────────────────────── */

function UserAvatar() {
  const t = useTheme();
  return (
    <div className="shrink-0 rounded-full flex items-center justify-center"
      style={{ width: 48, height: 48, background: t.userAvatarBg }}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 13C16.7614 13 19 10.7614 19 8C19 5.23858 16.7614 3 14 3C11.2386 3 9 5.23858 9 8C9 10.7614 11.2386 13 14 13Z" fill="#7C3AED" fillOpacity="0.65" />
        <path d="M14 15C9.58172 15 6 17.6863 6 21C6 21.5523 6.44772 22 7 22H21C21.5523 22 22 21.5523 22 21C22 17.6863 18.4183 15 14 15Z" fill="#7C3AED" fillOpacity="0.65" />
      </svg>
    </div>
  );
}

function MyraSphere({ size = 36, loading = false, video = false }: { size?: number; loading?: boolean; video?: boolean }) {
  return (
    <div className="shrink-0 relative"
      style={{ width: size, height: size, filter: size >= 80 ? "drop-shadow(0 0 40px #a78bfa)" : "drop-shadow(0 0 14px #a78bfa)" }}>
      {(loading || video) ? (
        <video src="/section-myra/myra-video.webm" autoPlay loop muted playsInline
          style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      ) : (
        <Image src="/section-myra/myra_static.png" alt="Myra" fill className="object-contain" />
      )}
    </div>
  );
}

function ArrowRight({ color = "white" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ─── Bubble wrapper ─────────────────────────────────────────────── */
function Bubble({ children }: { children: React.ReactNode }) {
  const t = useTheme();
  return (
    <div className="body-m rounded-2xl w-full"
      style={{ background: t.bubbleBg, color: t.bubbleText, padding: 12 }}>
      {children}
    </div>
  );
}

/* ─── CTA button ─────────────────────────────────────────────────── */
function CTAButton({ label, href, icon = "arrow" }: { label: string; href: string; icon?: "arrow" | "download" }) {
  const t = useTheme();
  const inner = (
    <span className="label-m text-white flex items-center gap-2">
      {label}
      {icon === "download" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      ) : <ArrowRight />}
    </span>
  );
  const btnStyle: React.CSSProperties = {
    height: 48, borderRadius: 32, padding: "0 20px",
    background: t.ctaBg, border: `1px solid ${t.chipBorder}`,
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
  };
  if (href.startsWith("/")) return <Link href={href} style={btnStyle}>{inner}</Link>;
  return <a href={href} target="_blank" rel="noopener noreferrer" style={btnStyle}>{inner}</a>;
}

/* ─── Component: plain text ──────────────────────────────────────── */
function TextBubble({ text }: { text: string }) {
  const lines = text.split("\n");
  const hasListItems = lines.some((l) => /^[-•]\s/.test(l.trim()));
  if (!hasListItems) return <Bubble><p style={{ margin: 0 }}>{text}</p></Bubble>;

  const blocks: { type: "p" | "li"; content: string }[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (/^[-•]\s/.test(trimmed)) blocks.push({ type: "li", content: trimmed.replace(/^[-•]\s/, "") });
    else blocks.push({ type: "p", content: trimmed });
  }
  return (
    <Bubble>
      {blocks.map((b, i) => b.type === "p" ? <p key={i} style={{ margin: 0, marginBottom: 4 }}>{b.content}</p> : null)}
      {blocks.some((b) => b.type === "li") && (
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {blocks.filter((b) => b.type === "li").map((b, i) => <li key={i}>{b.content}</li>)}
        </ul>
      )}
    </Bubble>
  );
}

/* ─── Component: contacts ────────────────────────────────────────── */
const CONTACT_CHIPS = [
  { label: "Call him",  href: "tel:+917508631919",                             gradient: "linear-gradient(90deg, #275c9c, #00b8ec)" },
  { label: "Whatsapp",  href: "https://wa.me/+917508631919",                   gradient: "linear-gradient(90deg, #009732, #00c850)" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/nishantupadhyay0/", gradient: "linear-gradient(90deg, #2a445e, #275c9c)" },
];

function ContactsBubble({ text }: { text: string }) {
  return (
    <>
      <Bubble><p style={{ margin: 0 }}>{text}</p></Bubble>
      {CONTACT_CHIPS.map((c) => (
        <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
          className="label-m flex items-center justify-center shrink-0 transition-opacity hover:opacity-80"
          style={{ background: c.gradient, color: "white", borderRadius: 32, padding: "8px 16px", textDecoration: "none" }}>
          {c.label}
        </a>
      ))}
    </>
  );
}

/* ─── Component: tags + CTA ──────────────────────────────────────── */
function TagsCTABubble({ text, tags, cta }: { text: string; tags?: string[]; cta?: { label: string; href: string } }) {
  const t = useTheme();
  return (
    <>
      <Bubble><p style={{ margin: 0 }}>{text}</p></Bubble>
      {tags?.map((tag) => (
        <div key={tag} className="label-m shrink-0"
          style={{ background: t.chipBg, border: `1.6px solid ${t.chipBorder}`, color: t.chipText, borderRadius: 12, padding: "8px 16px" }}>
          {tag}
        </div>
      ))}
      {cta && <CTAButton label={cta.label} href={cta.href} />}
    </>
  );
}

/* ─── Component: resume ──────────────────────────────────────────── */
function ResumeBubble({ text }: { text: string }) {
  return (
    <>
      <Bubble><p style={{ margin: 0 }}>{text}</p></Bubble>
      <CTAButton label="Download resume" href="https://drive.google.com/file/d/1CtaL9u0L-xnbJL1VNnM5tLVK95e8GIrO/view?usp=sharing" icon="download" />
    </>
  );
}

/* ─── Component: project cards ───────────────────────────────────── */
function ProjectsBubble({ text, projects }: { text: string; projects?: ProjectCard[] }) {
  const t = useTheme();
  return (
    <>
      <Bubble><p style={{ margin: 0 }}>{text}</p></Bubble>
      {projects?.map((p) => (
        <div key={p.slug} className="flex flex-col gap-1 w-full overflow-hidden rounded-2xl"
          style={{ background: t.bubbleBg, padding: 12 }}>
          <div className="rounded-xl w-full" style={{ background: t.subBg, padding: 12 }}>
            <p className="heading-m whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ color: t.chipText, margin: 0 }}>{p.name}</p>
          </div>
          {p.tags?.length > 0 && (
            <div className="flex gap-3 items-center flex-wrap" style={{ padding: 4 }}>
              {p.tags.map((tag) => (
                <div key={tag} className="label-s shrink-0"
                  style={{ background: t.subBg, border: `0.6px solid ${t.chipBorder}`, color: t.chipText, borderRadius: 16, padding: "4px 8px" }}>
                  {tag}
                </div>
              ))}
            </div>
          )}
          <div style={{ padding: 4 }}>
            <p className="body-m" style={{ color: t.chipText, margin: 0 }}>{p.description}</p>
          </div>
          <Link href={`/design/${p.slug}`}
            className="label-m text-white flex items-center justify-center gap-2 shrink-0 transition-opacity hover:opacity-80"
            style={{ height: 40, borderRadius: 32, padding: "0 16px", background: t.ctaBg, border: `1px solid ${t.chipBorder}`, textDecoration: "none" }}>
            View more <ArrowRight />
          </Link>
        </div>
      ))}
    </>
  );
}

/* ─── Myra message row ───────────────────────────────────────────── */
function MyraMessage({ msg, loading = false }: { msg?: Message; loading?: boolean }) {
  const t = useTheme();
  const p = msg?.parsed;

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center gap-1 rounded-2xl"
          style={{ background: t.bubbleBg, padding: "14px 16px" }}>
          {[0, 1, 2].map((j) => (
            <span key={j} style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#7C3AED", opacity: 0.5, display: "inline-block",
              animation: "myra-dot-bounce 1.2s infinite ease-in-out",
              animationDelay: `${j * 0.2}s`,
            }} />
          ))}
        </div>
      );
    }
    if (!p) return <TextBubble text={msg?.content ?? ""} />;
    switch (p.type) {
      case "contacts": return <ContactsBubble text={p.text} />;
      case "tags_cta": return <TagsCTABubble text={p.text} tags={p.tags} cta={p.cta} />;
      case "resume":   return <ResumeBubble text={p.text} />;
      case "projects": return <ProjectsBubble text={p.text} projects={p.projects} />;
      default:         return <TextBubble text={p.text} />;
    }
  };

  return (
    <div className="flex gap-2 items-start w-full">
      <MyraSphere size={36} loading={loading} />
      <div className="flex flex-col gap-[6px] flex-1 min-w-0 items-start">
        <span className="font-body font-bold" style={{ color: t.nameColor, fontSize: 16, lineHeight: "22px", letterSpacing: "-0.07px" }}>Myra</span>
        {renderContent()}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Main component
═══════════════════════════════════════════════════════════════════ */

export default function MyraChat() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const voiceoverRef = useRef<HTMLAudioElement | null>(null);
  const voiceoverPlayed = useRef(false);

  const t = dark ? DARK : LIGHT;

  useEffect(() => {
    const handler = () => {
      setOpen(true);
      if (!voiceoverPlayed.current && voiceoverRef.current) {
        const vo = voiceoverRef.current;
        vo.currentTime = 0;
        vo.volume = 1.0;
        window.dispatchEvent(new CustomEvent("myra-voice-start"));
        vo.play().catch(() => {});
        vo.onended = () => window.dispatchEvent(new CustomEvent("myra-voice-end"));
        voiceoverPlayed.current = true;
      }
      setTimeout(() => inputRef.current?.focus(), 350);
    };
    window.addEventListener("open-myra", handler);
    return () => window.removeEventListener("open-myra", handler);
  }, []);

  useEffect(() => {
    if (open && hasStarted) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open, hasStarted]);

  const close = () => setOpen(false);

  const send = async (textOverride?: string) => {
    const text = (textOverride ?? input).trim();
    if (!text || loading) return;
    setHasStarted(true);
    const userMsg: Message = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/myra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.slice(updated.findIndex((m) => m.role === "user"))
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const parsed: ParsedResponse = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: parsed.text ?? "", parsed }]);
    } catch {
      const errMsg = "Something went wrong. Try reaching Nishant at iamnishantupadhyay@gmail.com.";
      setMessages((prev) => [...prev, { role: "assistant", content: errMsg, parsed: { type: "text", text: errMsg } }]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  /* ── Top Bar ── */
  const TopBar = (
    <div className="flex items-center gap-2 shrink-0"
      style={{ height: 64, padding: "12px 16px", borderBottom: `1px solid ${t.topBarBorder}`, background: t.topBarBg }}>
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <MyraSphere size={36} loading={loading} />
        <span className="font-display font-bold whitespace-nowrap" style={{ color: t.nameColor, fontSize: 20, lineHeight: "24px" }}>Myra</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {/* Sun — light mode */}
        <button onClick={() => setDark(false)} aria-label="Light mode"
          className="flex items-center justify-center rounded-full transition-all"
          style={{ width: 40, height: 40, background: !dark ? "#efe9ff" : "transparent" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={!dark ? "#7C3AED" : t.closeStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        </button>
        {/* Moon — dark mode */}
        <button onClick={() => setDark(true)} aria-label="Dark mode"
          className="flex items-center justify-center rounded-full transition-all"
          style={{ width: 40, height: 40, background: dark ? "#1a1d2e" : "transparent" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={dark ? "#a78bfa" : t.closeStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
        {/* Close */}
        <button onClick={close} aria-label="Close"
          className="flex items-center justify-center rounded-full transition-opacity hover:opacity-70"
          style={{ width: 40, height: 40, border: `1px solid ${t.closeBorder}` }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={t.closeStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );

  /* ── Chat Input ── */
  const ChatInput = (
    <div className="shrink-0 flex flex-col gap-2 items-center"
      style={{ padding: "24px 16px", borderTop: `2px solid ${t.bottomBorder}`, background: t.bottomBg, boxShadow: t.bottomShadow }}>
      <div className="flex items-center gap-4 w-full"
        style={{ background: t.inputBg, border: `1px solid ${t.inputBorder}`, borderRadius: 20, paddingLeft: 20, paddingRight: 12, paddingTop: 12, paddingBottom: 12, boxShadow: t.inputShadow }}>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ask me anything..."
          disabled={loading}
          className="flex-1 body-l bg-transparent outline-none"
          style={{ color: t.inputText }}
        />
        <button onClick={() => send()} disabled={!input.trim() || loading} aria-label="Send"
          className="flex items-center justify-center rounded-full shrink-0 transition-all"
          style={{ width: 40, height: 40, background: input.trim() && !loading ? t.ctaBg : "#d1c4f5", opacity: !input.trim() || loading ? 0.6 : 1 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
      <p className="body-s text-center w-full" style={{ color: t.footerText }}>
        Myra can make mistakes. For more clarity, contact me :)
      </p>
    </div>
  );

  return (
    <ThemeCtx.Provider value={t}>
      {/* Hidden voiceover */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={voiceoverRef} src="/section-myra/intro_voiceover.mp3" preload="auto" style={{ display: "none" }} />

      {open && <div className="fixed inset-0 z-[998]" onClick={close} />}

      <div className="fixed top-0 right-0 h-screen z-[999] flex flex-col"
        style={{
          width: "375px",
          background: t.panelBg,
          border: `4px solid ${t.panelBorder}`,
          boxShadow: t.panelShadow,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}>
        {TopBar}

        {!hasStarted ? (
          <>
            <div className="flex-1 overflow-y-auto flex flex-col items-center" style={{ padding: "32px 16px" }}>
              <div className="flex flex-col gap-4 items-center w-full">
                <MyraSphere size={108} video />
                <p className="body-l text-center" style={{ color: t.nameColor }}>Hey there!</p>
                <div className="flex flex-col gap-2 items-center py-2 w-full">
                  <p className="display-s text-center whitespace-nowrap"
                    style={{ fontSize: 24, lineHeight: "28px", background: "linear-gradient(155.92deg, #000000 14.94%, #a78bfa 86.46%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    Hi, I am Myra
                  </p>
                  <p className="body-l text-center" style={{ color: t.nameColor }}>
                    I know everything about Nishant&apos;s work, projects, and experience.
                  </p>
                </div>
                <p className="body-m italic text-center" style={{ color: "#5e3ac9" }}>
                  Ask me anything, or start with one of these:
                </p>
                <div className="flex flex-col gap-2 items-center w-full" style={{ paddingTop: 32, paddingBottom: 32 }}>
                  {SUGGESTIONS.map((s) => (
                    <button key={s} onClick={() => send(s)}
                      className="body-m transition-opacity hover:opacity-70"
                      style={{ color: t.bubbleText, background: t.bubbleBg, borderRadius: 16, padding: 12 }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {ChatInput}
          </>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto flex flex-col gap-5" style={{ padding: "32px 16px", background: t.panelBg }}>
              {messages.map((msg, i) =>
                msg.role === "user" ? (
                  <div key={i} className="flex gap-3 items-start w-full justify-end">
                    <div className="flex flex-col gap-1 items-end min-w-0">
                      <span className="heading-m" style={{ color: t.nameColor }}>You</span>
                      <div className="body-m rounded-2xl"
                        style={{ background: t.bubbleBg, color: t.bubbleText, padding: 12 }}>
                        {msg.content}
                      </div>
                    </div>
                    <UserAvatar />
                  </div>
                ) : (
                  <MyraMessage key={i} msg={msg} />
                )
              )}
              {loading && <MyraMessage loading />}
              <div ref={bottomRef} />
            </div>
            {ChatInput}
          </>
        )}
      </div>

      <style>{`
        @keyframes myra-dot-bounce {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </ThemeCtx.Provider>
  );
}
