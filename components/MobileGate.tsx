"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function MobileGate() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isMobile || true) return null; // hidden for now

  return (
    <div
      className="fixed inset-0 z-[997] flex flex-col items-center justify-center gap-8 px-8"
      style={{ background: "var(--base-100)" }}
    >
      {/* Logo */}
      <div className="relative w-16 h-16">
        <Image src="/nav/logo.png" alt="nü" fill className="object-contain" />
      </div>

      {/* Text */}
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="heading-l" style={{ color: "var(--text-primary)" }}>
          This experience is designed for desktop
        </p>
        <p className="body-m max-w-[300px]" style={{ color: "var(--text-secondary)" }}>
          Mobile version coming soon. In the meantime, chat with Myra — she knows everything about my work.
        </p>
      </div>

      {/* CTA */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("open-myra"))}
          className="flex items-center gap-2 label-m italic text-white rounded-xl border shimmer-ai-btn"
          style={{
            background: "linear-gradient(-17deg, #1E2029 1%, #0A0C17 99%)",
            borderColor: "rgba(255,255,255,0.3)",
            borderWidth: "1.6px",
            boxShadow: "0 2px 24px rgba(71,85,227,0.35)",
            height: "48px",
            padding: "0 24px",
          }}
        >
          <div className="relative w-8 h-8 rounded-full shrink-0" style={{ boxShadow: "0 0 12px rgba(71,85,227,0.6)" }}>
            <Image src="/section-myra/myra_static.png" alt="Myra" fill className="object-cover rounded-full" />
          </div>
          Talk to Myra
        </button>
        <p className="body-s" style={{ color: "var(--text-muted)" }}>
          Or view on desktop →
        </p>
      </div>
    </div>
  );
}