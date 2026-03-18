"use client";

import { useState } from "react";
import Link from "next/link";

export default function DesignSystemButton({
  url,
  modal,
  accent,
}: {
  url?: string;
  modal?: string;
  accent: string;
}) {
  const [open, setOpen] = useState(false);

  if (!url && !modal) return null;

  const buttonStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 18px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 600,
    lineHeight: "18px",
    border: `1.5px solid ${accent}40`,
    background: `${accent}10`,
    color: accent,
    textDecoration: "none",
    cursor: "pointer",
    transition: "opacity 0.15s",
  };

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" style={buttonStyle}
        className="hover:opacity-70 font-body">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        Design System
      </a>
    );
  }

  return (
    <>
      <button onClick={() => setOpen(true)} style={buttonStyle}
        className="hover:opacity-70 font-body">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        Design System
      </button>

      {open && (
        <div className="fixed inset-0 z-[900] flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
          onClick={() => setOpen(false)}>
          <div className="flex flex-col gap-5 rounded-2xl p-8 max-w-[400px] w-full"
            style={{ background: "white", boxShadow: "0 24px 80px rgba(0,0,0,0.2)" }}
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <div style={{ width: 40, height: 40, borderRadius: 12, background: `${accent}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h2 className="font-display font-bold" style={{ fontSize: 18, color: "#0f172a" }}>Design System</h2>
            </div>
            <p className="font-body" style={{ fontSize: 15, lineHeight: "24px", color: "#475569" }}>{modal}</p>
            <div className="flex gap-3">
              <a href="https://nishak.notion.site/Batt-Design-System-ea9b5da4c797405e9b7c9a790db4ce64"
                target="_blank" rel="noopener noreferrer"
                className="font-body font-semibold flex-1 flex items-center justify-center hover:opacity-80"
                style={{ padding: "10px 16px", borderRadius: 999, background: "#22C55E18", color: "#22C55E", border: "1.5px solid #22C55E40", fontSize: 13, textDecoration: "none" }}>
                Batt DS
              </a>
              <a href="https://nishak.notion.site/CURE-Design-System-741979c7285f4d3aba883fa5a1ea27ea"
                target="_blank" rel="noopener noreferrer"
                className="font-body font-semibold flex-1 flex items-center justify-center hover:opacity-80"
                style={{ padding: "10px 16px", borderRadius: 999, background: "#0EA5E918", color: "#0EA5E9", border: "1.5px solid #0EA5E940", fontSize: 13, textDecoration: "none" }}>
                Cure DS
              </a>
              <a href="mailto:iamnishantupadhyay@gmail.com"
                className="font-body font-semibold flex-1 flex items-center justify-center hover:opacity-80"
                style={{ padding: "10px 16px", borderRadius: 999, background: `${accent}18`, color: accent, border: `1.5px solid ${accent}40`, fontSize: 13, textDecoration: "none" }}>
                Contact
              </a>
            </div>
            <button onClick={() => setOpen(false)}
              className="body-m hover:opacity-60 transition-opacity"
              style={{ color: "#94a3b8", alignSelf: "center" }}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
