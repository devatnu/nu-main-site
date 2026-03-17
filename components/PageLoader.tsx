"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "@/public/animation/nu-loader.json";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [offline, setOffline] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleAnimationComplete = () => {
    if (!offline) {
      setFadeOut(true);
      setTimeout(() => setVisible(false), 500);
    }
  };

  // Offline / online detection
  useEffect(() => {
    const goOffline = () => {
      setOffline(true);
      setFadeOut(false);
      setVisible(true);
    };
    const goOnline = () => {
      setOffline(false);
      setFadeOut(true);
      setTimeout(() => setVisible(false), 500);
    };

    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);
    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: "var(--base-100, #F0EEE9)",
        transition: "opacity 0.5s ease",
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? "none" : "all",
      }}
    >
      <div style={{ width: "160px", height: "160px" }}>
        <Lottie
          animationData={animationData}
          loop={offline}
          autoplay
          onComplete={handleAnimationComplete}
        />
      </div>
      {offline && (
        <p
          className="font-body mt-4"
          style={{ fontSize: "14px", color: "var(--text-secondary, #8E8F94)" }}
        >
          Reconnecting…
        </p>
      )}
    </div>
  );
}
