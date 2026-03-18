"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface BrandStat {
  number: string;
  label: string;
}

interface Brand {
  name: string;
  category: string;
  description: string;
  logo: string;
  preview: string;
  stats: BrandStat[];
  statBg: string;
  statColor: string;
}

const brands: Brand[] = [
  {
    name: "PeopleHum",
    category: "AI-Powered HRMS · Global SaaS · Codie Award Winner",
    description: "Designed the hire-to-retire HR platform experience — spanning recruitment, performance management, engagement, and analytics modules across web and mobile.",
    logo: "/brands/brand-1-logo.png",
    preview: "/brands/brand-1-preview.png",
    stats: [
      { number: "12+", label: "Platform Modules Designed" },
      { number: "94+", label: "Employees Supported by Platform Ops" },
      { number: "6", label: "Global Markets Served" },
      { number: "1", label: "Global Codie Award (2019)" },
    ],
    statBg: "#ebf6fb",
    statColor: "#28364d",
  },
  {
    name: "Battery Smart",
    category: "EV Infrastructure · Series B · $170M Raised",
    description: "Founding designer — built the design function and team from zero. Created the Batt Design System, which remains core infrastructure across product and operations through multiple funding rounds.",
    logo: "/brands/brand-2-logo.png",
    preview: "/brands/brand-2-preview.png",
    stats: [
      { number: "1,000+", label: "Swap Stations Designed For" },
      { number: "35M+", label: "Battery Swaps Completed" },
      { number: "30+", label: "Cities Across India" },
      { number: "1", label: "Design System Built (Batt DS)" },
    ],
    statBg: "#ecf2fe",
    statColor: "#00109f",
  },
  {
    name: "Bachatt",
    category: "Fintech · Daily Savings · Seed · $4M Raised",
    description: "Founding product designer owning the full app experience — onboarding, daily SIP flows, and investment dashboards. Contributed to the product narrative that secured Lightspeed-led funding.",
    logo: "/brands/brand-3-logo.png",
    preview: "/brands/brand-3-preview.png",
    stats: [
      { number: "2.1M+", label: "Users served" },
      { number: "70Cr+", label: "Target User Base" },
      { number: "3", label: "Products designed" },
      { number: "$16M", label: "Series A Round Closed" },
    ],
    statBg: "#fbf6e7",
    statColor: "#91630e",
  },
  {
    name: "Jio Engage",
    category: "Gamification & Digital Marketing · Jio Platforms",
    description: "Designed interactive engagement experiences — gamified campaigns, play-and-win flows, and brand activation tools powering customer interactivity across the Jio ecosystem.",
    logo: "/brands/brand-4-logo.png",
    preview: "/brands/brand-4-preview.png",
    stats: [
      { number: "3.8M", label: "Daily Active Users" },
      { number: "35.6M", label: "Monthly Active Users" },
      { number: "560M+", label: "Jio Subscriber Ecosystem" },
      { number: "6 min", label: "Avg. Session Time" },
    ],
    statBg: "#f7eef7",
    statColor: "#550059",
  },
  {
    name: "Cure Finance",
    category: "Vertical Neobank · HealthTech × FinTech · Berlin",
    description: "Designed the open-banking platform experience for medical professionals — integrating business banking, automated accounting, and practice financial management into one dashboard.",
    logo: "/brands/brand-5-logo.png",
    preview: "/brands/brand-5-preview.png",
    stats: [
      { number: "3", label: "Core Modules (Banking, Accounting, Tax)" },
      { number: "€1.4M", label: "Seed Round Raised" },
      { number: "1", label: "Vertical Neobank for Healthcare" },
      { number: "2", label: "Markets Targeted (DACH Region)" },
    ],
    statBg: "#eaf5f0",
    statColor: "#252f27",
  },
];

export default function Brands() {
  const [active, setActive] = useState(Math.floor(brands.length / 2));
  const carouselRef = useRef<HTMLDivElement>(null);

  const prev = () => setActive((i) => Math.max(0, i - 1));
  const next = () => setActive((i) => Math.min(brands.length - 1, i + 1));

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    let locked = false;
    let touchX = 0;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < 3) return;
      e.preventDefault();
      if (locked) return;
      locked = true;
      setTimeout(() => { locked = false; }, 600);
      if (e.deltaX > 0) setActive((i) => Math.min(brands.length - 1, i + 1));
      else setActive((i) => Math.max(0, i - 1));
    };

    const onTouchStart = (e: TouchEvent) => { touchX = e.touches[0].clientX; };
    const onTouchEnd = (e: TouchEvent) => {
      const delta = touchX - e.changedTouches[0].clientX;
      if (Math.abs(delta) < 50) return;
      if (delta > 0) setActive((i) => Math.min(brands.length - 1, i + 1));
      else setActive((i) => Math.max(0, i - 1));
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <section className="pt-[200px]">
      {/* Header */}
      <div className="flex flex-col items-center gap-6 px-10 mb-12">
        <div
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border label-s"
          style={{
            background: "var(--base-200)",
            borderColor: "var(--global-border)",
            color: "var(--text-primary)",
          }}
        >
          <Image src="/icons/chevron-right.svg" alt="" width={16} height={16} />
          Brand Building
          <Image src="/icons/chevron-left.svg" alt="" width={16} height={16} />
        </div>
        <h2
          className="display-2xl text-center"
          style={{
            lineHeight: "1.05",
            background: "linear-gradient(-13deg, #0D0F1A 1%, #4755E3 99%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            maxWidth: "720px",
          }}
        >
          Crafting brands from the ground up
        </h2>
        <p
          className="font-body text-center"
          style={{ fontSize: "16px", color: "var(--text-secondary)", maxWidth: "520px", lineHeight: "1.6" }}
        >
          Brands that communicate clearly,<br />earn trust, and grow with the products behind them.
        </p>
      </div>

      {/* Carousel */}
      <div ref={carouselRef} className="relative overflow-hidden">
        <div
          className="flex items-center transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(calc(50vw - 320px - ${active * (640 + 24)}px))`,
            gap: "24px",
            paddingLeft: "40px",
            paddingRight: "40px",
          }}
        >
          {brands.map((brand, i) => {
            const isActive = i === active;
            return (
              <div
                key={i}
                onClick={() => setActive(i)}
                className="flex flex-col gap-6 transition-all duration-500"
                style={{
                  width: "640px",
                  background: "white",
                  border: "2px solid var(--global-border)",
                  borderRadius: "16px",
                  padding: "16px",
                  flexShrink: 0,
                  opacity: isActive ? 1 : 0.4,
                  cursor: isActive ? "default" : "pointer",
                  transform: isActive ? "scale(1)" : "scale(0.90)",
                }}
              >
                {/* Top section */}
                <div className="relative p-4 flex flex-col gap-2">
                  <h3 className="heading-xl" style={{ color: "var(--text-primary)" }}>
                    {brand.name}
                  </h3>
                  <p className="body-m italic" style={{ color: "var(--text-primary)" }}>
                    {brand.category}
                  </p>
                  <p className="body-m" style={{ color: "#6C6A6A", paddingTop: "24px" }}>
                    {brand.description}
                  </p>
                  <div className="absolute top-4 right-4" style={{ width: "80px", height: "40px" }}>
                    <Image src={brand.logo} alt={brand.name} fill className="object-contain object-right" />
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-4 gap-3">
                  {brand.stats.map((stat, j) => (
                    <div key={j} className="flex flex-col gap-1 p-4 rounded-xl" style={{ background: brand.statBg }}>
                      <span className="font-display font-bold" style={{ fontSize: "32px", color: brand.statColor, lineHeight: "1" }}>
                        {stat.number}
                      </span>
                      <span className="helper-m" style={{ color: "var(--text-secondary)" }}>
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Preview image */}
                <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <Image src={brand.preview} alt={`${brand.name} preview`} fill unoptimized className="object-cover" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dot indicators + arrows */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          disabled={active === 0}
          className="flex items-center justify-center rounded-full transition-all"
          style={{
            width: "40px", height: "40px",
            background: active === 0 ? "var(--base-200)" : "var(--base-100)",
            border: "1px solid var(--global-border)",
            opacity: active === 0 ? 0.4 : 1,
          }}
        >
          <Image src="/icons/chevron-left.svg" alt="Prev" width={16} height={16}
            style={{ filter: active === 0 ? "none" : "invert(1)" }} />
        </button>

        <div className="flex items-center gap-2">
          {brands.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === active ? "24px" : "8px",
                height: "8px",
                background: i === active ? "var(--primary)" : "var(--base-300)",
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={active === brands.length - 1}
          className="flex items-center justify-center rounded-full transition-all"
          style={{
            width: "40px", height: "40px",
            background: active === brands.length - 1 ? "var(--base-200)" : "var(--base-100)",
            border: "1px solid var(--global-border)",
            opacity: active === brands.length - 1 ? 0.4 : 1,
          }}
        >
          <Image src="/icons/chevron-right.svg" alt="Next" width={16} height={16}
            style={{ filter: active === brands.length - 1 ? "none" : "invert(1)" }} />
        </button>
      </div>
    </section>
  );
}
