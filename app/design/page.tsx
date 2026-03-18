import Image from "next/image";
import Link from "next/link";
import { projects, Project } from "@/lib/projects";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Projects — Nishant Upadhyay",
  description: "Design principles first. Everything else follows.",
};

type LayoutRow =
  | { type: "wide"; projectIdx: number; imageLeft: boolean; cardBg: string; statsBg: string }
  | { type: "stacked"; projectIdx: number; cardBg: string; statsBg: string }
  | { type: "pair"; projectIdxs: [number, number]; bgs: [string, string] };

const rows: LayoutRow[] = [
  { type: "wide",    projectIdx: 0, imageLeft: true,  cardBg: "white",    statsBg: "#ebf6fb" },
  { type: "pair",    projectIdxs: [1, 3],              bgs: ["#4755e3", "#f0eee9"] },
  { type: "stacked", projectIdx: 2,                   cardBg: "#e5e2db",  statsBg: "#d4d0c8" },
  { type: "wide",  projectIdx: 6, imageLeft: false, cardBg: "white",    statsBg: "#ebf6fb" },
  { type: "pair",  projectIdxs: [4, 5],              bgs: ["#f0eee9", "white"] },
  { type: "stacked", projectIdx: 7,                 cardBg: "#d4d0c8",  statsBg: "#f0eee9" },
  { type: "pair",  projectIdxs: [8, 9],              bgs: ["white", "#f0eee9"] },
];

function WideCard({
  project,
  imageLeft,
  cardBg,
  statsBg,
  animDelay,
}: {
  project: Project;
  imageLeft: boolean;
  cardBg: string;
  statsBg: string;
  animDelay: number;
}) {
  const tagParts = project.tag.split("·").map((s) => s.trim());
  const tagFirst = tagParts[0] ?? "";
  const tagSecond = tagParts[1] ?? "";

  return (
    <Link
      href={`/design/${project.slug}`}
      className="card-slide-up group flex flex-col gap-6 overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: cardBg,
        border: "2px solid var(--global-border)",
        borderRadius: "40px",
        padding: "40px",
        animationDelay: `${animDelay}ms`,
      }}
    >
      {/* Top: preview + text */}
      <div
        className="flex gap-6 items-stretch"
        style={{ flexDirection: imageLeft ? "row" : "row-reverse" }}
      >
        {/* Preview image */}
        <div
          className="relative shrink-0 overflow-hidden"
          style={{ width: "440px", aspectRatio: "1 / 1", borderRadius: project.previewRadius }}
        >
          <Image
            src={project.previewImage}
            alt=""
            fill
            className="object-cover"
            sizes="440px"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-10 px-4 py-8 flex-1 min-w-0">
          <p
            className="font-display font-medium flex gap-2 items-center"
            style={{ fontSize: "24px", lineHeight: "28px", color: "var(--text-primary)" }}
          >
            <span>{tagFirst}</span>
            {tagSecond && (
              <>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#8E8F94", flexShrink: 0, display: "inline-block" }} />
                <span style={{ color: "#8E8F94" }}>{tagSecond}</span>
              </>
            )}
          </p>
          <h2
            className="font-display font-bold"
            style={{ fontSize: "64px", lineHeight: "72px", color: "var(--text-primary)" }}
          >
            {project.title}
          </h2>
          <p
            className="font-body"
            style={{ fontSize: "16px", lineHeight: "20px", color: "var(--text-primary)" }}
          >
            {project.description}
          </p>
        </div>
      </div>

      {/* Stats bar */}
      <div
        className="flex items-center gap-6 px-10 py-6"
        style={{ background: statsBg, borderRadius: "88px" }}
      >
        {project.stats.map((stat) => (
          <div
            key={`${stat.value}-${stat.label}`}
            className="flex-1 flex flex-col gap-1 p-4 min-w-0 overflow-hidden"
          >
            <span
              className="font-display font-semibold whitespace-nowrap"
              style={{ fontSize: "32px", lineHeight: "36px", color: "#28364d" }}
            >
              {stat.value}
            </span>
            <span
              className="font-body italic whitespace-nowrap"
              style={{
                fontSize: "12px",
                lineHeight: "16px",
                fontWeight: 300,
                color: "var(--text-primary)",
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}

        {/* View more button */}
        <span
          className="shrink-0 flex items-center justify-center font-body font-semibold text-white transition-opacity duration-150 group-hover:opacity-90"
          style={{
            height: "56px",
            padding: "16px 48px",
            borderRadius: "32px",
            background: "linear-gradient(-17.19deg, rgb(30,32,41) 1%, rgb(10,12,23) 99%)",
            border: "4px solid white",
            boxShadow: "0px 0px 48px 0px rgba(167,139,250,0.64)",
            fontSize: "16px",
            lineHeight: "20px",
          }}
        >
          View more
        </span>
      </div>
    </Link>
  );
}

function CompactCard({
  project,
  bg,
  animDelay,
}: {
  project: Project;
  bg: string;
  animDelay: number;
}) {
  const tagParts = project.tag.split("·").map((s) => s.trim());
  const tagFirst = tagParts[0] ?? "";
  const tagSecond = tagParts[1] ?? "";
  // Only #4755e3 (indigo) needs white text; all base/neutral tones use dark text
  const lightText = bg === "#4755e3";
  const textColor = lightText ? "white" : "var(--text-primary)";

  return (
    <Link
      href={`/design/${project.slug}`}
      className="card-slide-up group flex-1 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: bg,
        border: "2px solid var(--global-border)",
        borderRadius: "32px",
        padding: "40px",
        animationDelay: `${animDelay}ms`,
      }}
    >
      {/* Text — centered */}
      <div className="flex flex-col gap-8 items-center px-4 py-8 flex-1">
        <p
          className="font-display font-medium flex gap-2 items-center"
          style={{ fontSize: "24px", lineHeight: "28px", color: textColor }}
        >
          <span>{tagFirst}</span>
          {tagSecond && (
            <>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: textColor, opacity: 0.6, flexShrink: 0, display: "inline-block" }} />
              <span style={{ opacity: 0.6, color: textColor }}>{tagSecond}</span>
            </>
          )}
        </p>
        <h2
          className="font-display font-bold text-center"
          style={{ fontSize: "48px", lineHeight: "56px", color: textColor, whiteSpace: "pre-line" }}
        >
          {project.title}
        </h2>
        <p
          className="font-body text-center"
          style={{
            fontSize: "16px",
            lineHeight: "20px",
            color: textColor,
            opacity: lightText ? 0.85 : 1,
          }}
        >
          {project.description}
        </p>
        <span
          className="shrink-0 flex items-center justify-center font-body font-semibold text-white transition-opacity duration-150 group-hover:opacity-80"
          style={{
            height: "56px",
            padding: "16px 48px",
            borderRadius: "32px",
            background: lightText
              ? "#3644d0"
              : "linear-gradient(-17.19deg, rgb(30,32,41) 1%, rgb(10,12,23) 99%)",
            border: lightText ? "4px solid #d9d9d9" : "4px solid white",
            boxShadow: lightText ? "none" : "0px 0px 48px 0px rgba(167,139,250,0.64)",
            fontSize: "16px",
            lineHeight: "20px",
          }}
        >
          View more
        </span>
      </div>

      {/* Preview image */}
      <div
        className="relative overflow-hidden w-full"
        style={{ borderRadius: project.previewRadius, aspectRatio: "16 / 9" }}
      >
        <Image
          src={project.previewImage}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>
    </Link>
  );
}

function StackedWideCard({
  project,
  cardBg,
  statsBg,
  animDelay,
}: {
  project: Project;
  cardBg: string;
  statsBg: string;
  animDelay: number;
}) {
  const tagParts = project.tag.split("·").map((s) => s.trim());
  const tagFirst = tagParts[0] ?? "";
  const tagSecond = tagParts[1] ?? "";

  return (
    <Link
      href={`/design/${project.slug}`}
      className="card-slide-up group relative flex flex-col gap-6 overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: cardBg,
        border: "2px solid var(--global-border)",
        borderRadius: "40px",
        padding: "40px",
        animationDelay: `${animDelay}ms`,
      }}
    >
      {/* Coin — top right */}
      <div
        className="pointer-events-none select-none absolute"
        style={{ right: "-60px", top: "-80px", width: "280px", height: "280px", transform: "rotate(22.85deg)" }}
      >
        <Image src="/problem_cards/preview/coin_top_right.png" alt="" fill className="object-contain" sizes="280px" />
      </div>

      {/* Coin — left center */}
      <div
        className="pointer-events-none select-none absolute"
        style={{ left: "-80px", top: "160px", width: "200px", height: "200px", transform: "rotate(-23.99deg)" }}
      >
        <Image src="/problem_cards/preview/coin_second.png" alt="" fill className="object-contain" sizes="200px" />
      </div>

      {/* Text — centered */}
      <div className="flex flex-col gap-10 items-center px-4 py-8 relative z-10">
        <p
          className="font-display font-medium flex gap-2 items-center"
          style={{ fontSize: "24px", lineHeight: "28px", color: "var(--text-primary)" }}
        >
          <span>{tagFirst}</span>
          {tagSecond && (
            <>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#8E8F94", flexShrink: 0, display: "inline-block" }} />
              <span style={{ color: "#8E8F94" }}>{tagSecond}</span>
            </>
          )}
        </p>
        <h2
          className="font-display font-bold text-center"
          style={{ fontSize: "64px", lineHeight: "72px", color: "var(--text-primary)" }}
        >
          {project.title}
        </h2>
        <p
          className="font-body text-center"
          style={{ fontSize: "16px", lineHeight: "20px", color: "var(--text-primary)" }}
        >
          {project.description}
        </p>
      </div>

      {/* Preview image */}
      <div
        className="overflow-hidden w-full relative z-10"
        style={{ borderRadius: project.previewRadius }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.previewImage}
          alt=""
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* Stats bar */}
      <div
        className="flex items-center gap-6 px-10 py-6 relative z-10"
        style={{ background: statsBg, borderRadius: "88px" }}
      >
        {project.stats.map((stat) => (
          <div
            key={`${stat.value}-${stat.label}`}
            className="flex-1 flex flex-col gap-1 p-4 min-w-0 overflow-hidden"
          >
            <span
              className="font-display font-semibold whitespace-nowrap"
              style={{ fontSize: "32px", lineHeight: "36px", color: "#28364d" }}
            >
              {stat.value}
            </span>
            <span
              className="font-body italic whitespace-nowrap"
              style={{ fontSize: "12px", lineHeight: "16px", fontWeight: 300, color: "var(--text-primary)" }}
            >
              {stat.label}
            </span>
          </div>
        ))}
        <span
          className="shrink-0 flex items-center justify-center font-body font-semibold text-white transition-opacity duration-150 group-hover:opacity-90"
          style={{
            height: "56px",
            padding: "16px 48px",
            borderRadius: "32px",
            background: "linear-gradient(-17.19deg, rgb(30,32,41) 1%, rgb(10,12,23) 99%)",
            border: "4px solid white",
            boxShadow: "0px 0px 48px 0px rgba(167,139,250,0.64)",
            fontSize: "16px",
            lineHeight: "20px",
          }}
        >
          View more
        </span>
      </div>
    </Link>
  );
}

export default function DesignPage() {
  return (
    <main
      className="min-h-screen pt-[140px] pb-[120px]"
      style={{ background: "var(--base-100)" }}
    >
      {/* Header */}
      <div
        className="card-slide-up flex flex-col gap-3 mb-16"
        style={{ animationDelay: "0ms", paddingLeft: "128px", paddingRight: "128px" }}
      >
        <h1
          className="font-display font-bold"
          style={{
            fontSize: "64px",
            lineHeight: "72px",
            background: "linear-gradient(-13deg, #0D0F1A 1%, #4755E3 99%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Projects
        </h1>
        <p
          className="font-body"
          style={{ fontSize: "16px", lineHeight: "20px", color: "#8E8F94" }}
        >
          Design principles first. Everything else follows.
        </p>
      </div>

      {/* Rows */}
      <div
        className="flex flex-col gap-10"
        style={{ paddingLeft: "128px", paddingRight: "128px" }}
      >
        {rows.map((row, rowIdx) => {
          if (row.type === "wide") {
            const p = projects[row.projectIdx];
            return (
              <WideCard
                key={p.slug}
                project={p}
                imageLeft={row.imageLeft}
                cardBg={row.cardBg}
                statsBg={row.statsBg}
                animDelay={150 + rowIdx * 100}
              />
            );
          }
          if (row.type === "stacked") {
            const p = projects[row.projectIdx];
            return (
              <StackedWideCard
                key={p.slug}
                project={p}
                cardBg={row.cardBg}
                statsBg={row.statsBg}
                animDelay={150 + rowIdx * 100}
              />
            );
          }
          return (
            <div key={`pair-${row.projectIdxs[0]}`} className="flex gap-10">
              <CompactCard
                project={projects[row.projectIdxs[0]]}
                bg={row.bgs[0]}
                animDelay={150 + rowIdx * 100}
              />
              <CompactCard
                project={projects[row.projectIdxs[1]]}
                bg={row.bgs[1]}
                animDelay={200 + rowIdx * 100}
              />
            </div>
          );
        })}
      </div>
      <Footer />
    </main>
  );
}
