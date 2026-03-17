"use client";

import { useState } from "react";
import MyraOrb from "@/components/MyraOrb";

const states = ["idle", "listening", "thinking", "speaking"] as const;

export default function MyraDemo() {
  const [active, setActive] = useState<typeof states[number]>("idle");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-16"
      style={{ background: "#0A0C17" }}>

      {/* Live orb */}
      <div className="flex flex-col items-center gap-4">
        <MyraOrb state={active} size={180} onClick={() => {}} />
        <p className="label-m" style={{ color: "#A78BFA", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {active}
        </p>
      </div>

      {/* State switcher */}
      <div className="flex gap-3">
        {states.map((s) => (
          <button
            key={s}
            onClick={() => setActive(s)}
            className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
            style={{
              background: active === s ? "#A78BFA" : "rgba(167,139,250,0.1)",
              color: active === s ? "#0A0C17" : "#A78BFA",
              border: "1px solid rgba(167,139,250,0.3)",
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* All 4 states side by side */}
      <div className="flex gap-12 items-center">
        {states.map((s) => (
          <div key={s} className="flex flex-col items-center gap-3">
            <MyraOrb state={s} size={80} />
            <p className="body-s" style={{ color: "rgba(167,139,250,0.6)", textTransform: "capitalize" }}>{s}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
