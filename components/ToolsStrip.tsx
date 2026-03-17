"use client";

import Image from "next/image";

const tools = [
  { name: "CleverTap", src: "/tools/clevertap.png" },
  { name: "MoEngage", src: "/tools/moengage.png" },
  { name: "Claude", src: "/tools/claude.png" },
  { name: "Kotlin", src: "/tools/kotlin.png" },
  { name: "Figma", src: "/tools/figma.png" },
  { name: "ChatGPT", src: "/tools/chatgpt.png" },
  { name: "Sora", src: "/tools/sora.png" },
  { name: "Notion", src: "/tools/notion.png" },
  { name: "Claude Code", src: "/tools/claude-code.png" },
  { name: "Clarity", src: "/tools/clarity.png" },
  { name: "Excalidraw", src: "/tools/excalidraw.png" },
  { name: "Jira", src: "/tools/jira.png" },
  { name: "Confluence", src: "/tools/confluence.png" },
  { name: "Miro", src: "/tools/miro.png" },
  { name: "Slack", src: "/tools/slack.png" },
];

const doubled = [...tools, ...tools];

export default function ToolsStrip() {
  return (
    <section className="py-12 overflow-hidden">
      {/* Section label */}
      <div className="flex items-center gap-3 px-10 mb-8">
        <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #1E2029)" }} />
        <span
          className="font-body.heading-m text-xs tracking-widest uppercase whitespace-nowrap"
          style={{ color: "var(--text-primary)" }}
        >
          <Image src="/icons/star.png" alt="" width={16} height={16} className="inline-block mr-2" />
          EQUIPPED WITH PRODUCT &lt;&gt; DESIGN &lt;&gt; TECH
          <Image src="/icons/star.png" alt="" width={16} height={16} className="inline-block ml-2" />
        </span>
        <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, #1E2029, transparent)" }} />
      </div>

      {/* Scrolling carousel */}
      <div className="relative overflow-hidden w-full">
        <div
          className="flex"
          style={{
            width: "max-content",
            animation: "scroll 40s linear infinite",
          }}
        >
          {doubled.map((tool, i) => (
            <div
              key={i}
              className="relative flex items-center justify-center shrink-0"
              style={{ width: "240px", height: "120px" }}
            >
                <Image
                  src={tool.src}
                  alt={tool.name}
                  fill
                  unoptimized
                  className="object-contain"
                />
            </div>
          ))}
        </div>

        {/* Fade edges */}
        <div
          className="absolute top-0 left-0 h-full w-24 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--base-100), transparent)" }}
        />
        <div
          className="absolute top-0 right-0 h-full w-24 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--base-100), transparent)" }}
        />
      </div>
    </section>
  );
}
