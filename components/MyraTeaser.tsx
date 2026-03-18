"use client";

import Image from "next/image";

export default function MyraTeaser() {
  return (
    <section className="pt-[120px] pb-[48px] flex flex-col items-center relative px-10">

      {/* Rainbow blur glow behind card */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "1048px",
          height: "372px",
          top: "50%",
          left: "50%",
          transform: "translate(calc(-50% + 60px), -50%)",
          borderRadius: "72px",
          filter: "blur(256px)",
          background: "linear-gradient(90deg, rgba(255,55,0,0.3) 0%, rgba(255,212,0,0.3) 37%, rgba(0,255,64,0.3) 72%, rgba(32,76,233,0.3) 100%)",
          zIndex: 0,
        }}
      />

      {/* White outer frame */}
      <div
        className="relative z-10"
        style={{
          width: "1048px",
          background: "white",
          borderRadius: "20px",
          padding: "24px",
        }}
      >
        {/* Dark inner card */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: "16px",
            background: "linear-gradient(-17.95deg, #1E2029 1%, #0A0C17 99%)",
            padding: "40px",
            display: "flex",
            gap: "128px",
            alignItems: "flex-start",
          }}
        >
          {/* Card background image — full card */}
          <Image src="/section-myra/card-bg.png" alt="" fill unoptimized className="object-cover rounded-2xl pointer-events-none" />

          {/* Left content */}
          <div className="relative flex flex-col gap-14 flex-1" style={{ zIndex: 3 }}>
            <div className="flex flex-col gap-4">
              <p
                className="helper-m"
                style={{ color: "white" }}
              >
                Ooh and ...
              </p>
              <p
                className="display-l"
                style={{
                  background: "linear-gradient(158.19deg, #ffffff 14.94%, #a78bfa 86.46%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}
              >
                Have you met
              </p>
              <p
                className="display-xl"
                style={{
                  fontSize: "64px", lineHeight: "72px",
                  background: "linear-gradient(140.51deg, #ffffff 14.94%, #a78bfa 86.46%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}
              >
                Myra ?
              </p>
            </div>

            <p className="body-m" style={{ color: "white" }}>
              My companion throughout career journey : )
            </p>
          </div>

          {/* Right info card */}
          <div
            className="relative shrink-0 flex flex-col gap-8 overflow-hidden"
            style={{
              width: "400px",
              background: "#EEECEA",
              border: "8px solid white",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "inset 0px 0px 4px rgba(0,0,0,0.25)",
              zIndex: 3,
            }}
          >
            {/* Available to talk tag */}
            <div className="flex items-center gap-2 w-full">
              <p className="font-body italic shrink-0" style={{ fontSize: "14px", lineHeight: "20px", fontWeight: 300, color: "var(--text-secondary)" }}>
                Available to talk
              </p>
              <div style={{ flex: 1, height: "1px", background: "#D9D9D9" }} />
            </div>

            {/* Feature list */}
            <div className="flex flex-col gap-4">
              {["Ask anything about me", "Submit your ideas"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Image src="/icons/star.png" alt="" width={16} height={16} />
                  <p className="body-m" style={{ color: "var(--text-primary)" }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA button */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-myra"))}
              className="label-m italic text-white flex items-center justify-center rounded-xl shimmer-ai-btn"
              style={{
                height: "48px",
                padding: "0 24px",
                background: "linear-gradient(-13.24deg, #1E2029 1%, #0A0C17 99%)",
                border: "1.6px solid white",
                boxShadow: "0px 0px 48px 0px rgba(167,139,250,0.64)",
                whiteSpace: "nowrap",
              }}
            >
              Have a chat with Myra
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
