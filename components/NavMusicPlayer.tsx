"use client";

import { useRef, useState, useEffect } from "react";

const playlist = [
  { title: "Track 1", src: "/music/portfolio_music_1.mp3" },
  { title: "Track 2", src: "/music/portfolio_music_2.mp3" },
  { title: "Track 3", src: "/music/portfolio_music_3.mp3" },
];

const VOLUME = 0.3;

export default function NavMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  // Autoplay on mount — try immediately, fall back to first user interaction
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = VOLUME;
    audio.src = playlist[0].src;

    const tryPlay = () => {
      audio.play().then(() => {
        setPlaying(true);
      }).catch(() => {
        const onInteract = () => {
          audio.play().then(() => setPlaying(true)).catch(() => {});
          window.removeEventListener("click", onInteract);
          window.removeEventListener("wheel", onInteract);
          window.removeEventListener("touchstart", onInteract);
          window.removeEventListener("keydown", onInteract);
        };
        window.addEventListener("click", onInteract, { once: true });
        window.addEventListener("wheel", onInteract, { once: true });
        window.addEventListener("touchstart", onInteract, { once: true });
        window.addEventListener("keydown", onInteract, { once: true });
      });
    };
    tryPlay();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = VOLUME;
    audio.src = playlist[currentIndex].src;
    if (playing) audio.play();
    const onEnd = () => {
      const next = (currentIndex + 1) % playlist.length;
      setCurrentIndex(next);
    };
    audio.addEventListener("ended", onEnd);
    return () => audio.removeEventListener("ended", onEnd);
  }, [currentIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); } else { audio.play(); }
    setPlaying(!playing);
  };

  const prev = () => setCurrentIndex((currentIndex - 1 + playlist.length) % playlist.length);
  const next = () => setCurrentIndex((currentIndex + 1) % playlist.length);

  return (
    <>
      <div
        className="relative rounded-xl overflow-hidden shrink-0 transition-all duration-300"
        style={{
          width: hovered ? "208px" : "120px",
          background: hovered ? "#4755E3" : "var(--base-100)",
          border: hovered ? "1px solid #4755E3" : "1px solid var(--global-border)",
          boxShadow: hovered ? "0px 2px 24px rgba(71,85,227,0.4)" : "0px 2px 12px rgba(0,0,0,0.08)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Player row */}
        <div
          className="flex h-12 items-center w-full rounded-xl overflow-hidden"
          style={{ background: "var(--base-100)" }}
        >
          <button
            onClick={prev}
            className="flex h-full items-center justify-center shrink-0 transition-all duration-200 hover:bg-black/[0.04]"
            style={{
              width: hovered ? "56px" : "0px",
              overflow: "hidden",
              opacity: hovered ? 1 : 0,
              background: "var(--global-white)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/music/prev.svg" alt="Previous" width={24} height={24} />
          </button>
          <button
            onClick={togglePlay}
            className="flex flex-1 h-full items-center justify-center overflow-hidden transition-opacity duration-150 hover:opacity-80"
            style={{ background: "var(--global-white)" }}
          >
            {playing
              ? <img src="/music/animation.gif" alt="Now playing" width={106} height={34} style={{ objectFit: "contain" }} /> // eslint-disable-line @next/next/no-img-element
              : <span className="label-s" style={{ color: "var(--text-secondary)" }}>Music</span>
            }
          </button>
          <button
            onClick={next}
            className="flex h-full items-center justify-center shrink-0 transition-all duration-200 hover:bg-black/[0.04]"
            style={{
              width: hovered ? "56px" : "0px",
              overflow: "hidden",
              opacity: hovered ? 1 : 0,
              background: "var(--global-white)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/music/next.svg" alt="Next" width={24} height={24} />
          </button>
        </div>

        {/* Spotify row — slides in on hover */}
        <a
          href="https://open.spotify.com/playlist/4nAh2cHuUla45HVNL3WPuF"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-5 transition-all duration-300 overflow-hidden"
          style={{
            height: hovered ? "44px" : "0px",
            opacity: hovered ? 1 : 0,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/music/spotify.svg" alt="Spotify" width={20} height={20} />
          <span className="label-s text-white whitespace-nowrap flex-1">Open playlist</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/music/chevron-right.svg" alt="" width={16} height={16} />
        </a>
      </div>

      <audio ref={audioRef} />
    </>
  );
}
