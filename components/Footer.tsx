"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="pt-20 lg:pt-[200px] pb-16 lg:pb-[160px] px-4 sm:px-8 lg:px-16 flex flex-col items-center gap-16 lg:gap-[88px]">

      {/* Dark footer card */}
      <div
        className="relative rounded-3xl flex flex-col items-center gap-10 lg:gap-14 overflow-hidden w-full"
        style={{
          background: "linear-gradient(-38.3deg, #4755E3 1%, #080B14 99%)",
          paddingTop: "64px",
          paddingBottom: "16px",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      >
        {/* Vector decoration — top right */}
        <Image
          src="/section-footer/Vector.png"
          alt=""
          width={400}
          height={400}
          className="absolute top-0 right-0 pointer-events-none select-none"
          style={{ width: "400px", height: "auto", zIndex: 0 }}
        />

        {/* Founder photo + divider */}
        <div className="flex flex-col items-center relative z-10 shrink-0 w-full">
          <Image
            src="/section-footer/founder-footer.png"
            alt="Nishant Upadhyay"
            width={363}
            height={272}
            style={{ objectFit: "cover", display: "block", maxWidth: "363px", width: "100%" }}
          />
          <div style={{ width: "100%", maxWidth: "512px", height: "1px", background: "rgba(255,255,255,0.2)" }} />
        </div>

        {/* Headline + subheadline */}
        <div className="flex flex-col items-center gap-4 relative z-10 text-center text-white px-2">
          <p className="display-l lg:display-2xl">
            You&apos;ve seen what I do.
          </p>
          <p className="display-m lg:display-l">
            Now let&apos;s see what WEEE can do together.
          </p>
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 relative z-10 w-full sm:w-auto">
          <a
            href="mailto:iamnishantupadhyay@gmail.com"
            className="flex items-center justify-center label-m text-white rounded-xl transition-opacity duration-150 hover:opacity-80 w-full sm:w-auto"
            style={{ background: "#4755E3", border: "1px solid var(--global-border)", height: "48px", padding: "0 40px", whiteSpace: "nowrap" }}
          >
            Drop me an email
          </a>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-myra"))}
            className="flex items-center gap-4 label-m italic text-white rounded-xl shimmer-ai-btn w-full sm:w-auto justify-center"
            style={{
              background: "linear-gradient(-14.55deg, #1E2029 1%, #0A0C17 99%)",
              border: "1.6px solid white",
              boxShadow: "0px 0px 48px 0px rgba(167,139,250,0.64)",
              height: "48px",
              padding: "0 16px 0 24px",
              whiteSpace: "nowrap",
            }}
          >
            Just tell Myra
            <div className="relative shrink-0 rounded-full" style={{ width: "36px", height: "36px", boxShadow: "0px 0px 28px 0px #a78bfa" }}>
              <Image src="/section-myra/myra_static.png" alt="Myra" fill className="object-cover rounded-full" />
            </div>
          </button>
        </div>

        {/* Secondary info: resume, email, socials */}
        <div
          className="relative z-10 flex flex-col items-center gap-8 lg:gap-10 w-full rounded-2xl overflow-hidden"
          style={{ padding: "48px 16px" }}
        >
          <a
            href="https://drive.google.com/uc?export=download&id=1CtaL9u0L-xnbJL1VNnM5tLVK95e8GIrO"
            target="_blank"
            rel="noopener noreferrer"
            className="body-l italic text-white underline underline-offset-4 transition-opacity duration-150 hover:opacity-70 text-center"
          >
            Tap to download Resume
          </a>

          <a
            href="mailto:iamnishantupadhyay@gmail.com"
            className="body-l italic text-white underline underline-offset-4 transition-opacity duration-150 hover:opacity-70 text-center break-all"
          >
            iamnishantupadhyay@gmail.com
          </a>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="https://www.linkedin.com/in/nishantupadhyay0/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 label-m text-white rounded-full transition-opacity duration-150 hover:opacity-80"
              style={{ background: "#007FBC", border: "1px solid var(--global-border)", height: "48px", padding: "0 24px", whiteSpace: "nowrap" }}
            >
              Connect over LinkedIn
              <div className="relative shrink-0" style={{ width: "32px", height: "32px" }}>
                <Image src="/section-footer/linked-in.png" alt="" fill className="object-contain" />
              </div>
            </a>
            <a
              href="https://wa.me/+917508631919"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 label-m text-white rounded-full transition-opacity duration-150 hover:opacity-80"
              style={{ background: "#23B33A", border: "1px solid var(--global-border)", height: "48px", padding: "0 24px", whiteSpace: "nowrap" }}
            >
              WhatsApp
              <div className="relative shrink-0" style={{ width: "32px", height: "32px" }}>
                <Image src="/section-footer/whatsapp.png" alt="" fill className="object-contain" />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom text — outside the card */}
      <div className="flex flex-col items-center gap-4 px-4">
        <p
          className="display-l lg:display-2xl text-center"
          style={{ color: "#8E8F94" }}
        >
          Made with passion ❤️,<br />Guided by vision 🥽
        </p>
        <p
          className="helper-m text-center"
          style={{ color: "#6C6A6A" }}
        >
          © All rights reserved
        </p>
      </div>

    </footer>
  );
}