import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: `${project.title} — Nishant Upadhyay` };
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx < projects.length - 1 ? projects[idx + 1] : null;

  return (
    <main className="min-h-screen pb-[120px]">

      {/* Hero band */}
      <div
        className="w-full flex flex-col items-center justify-end pt-[140px] pb-16 px-10"
        style={{
          background: `linear-gradient(160deg, ${project.accent}18 0%, transparent 60%)`,
          borderBottom: "2px solid var(--global-border)",
        }}
      >
        <div className="w-full max-w-[800px] flex flex-col gap-4">
          <Link
            href="/design"
            className="font-body text-sm inline-flex items-center gap-1 transition-opacity hover:opacity-70"
            style={{ color: "#8E8F94" }}
          >
            ← All projects
          </Link>
          <div
            className="self-start px-2 py-1 rounded-md font-body font-semibold"
            style={{ fontSize: "11px", background: project.accent, color: "white" }}
          >
            {project.brand}
          </div>
          <h1
            className="font-display font-bold"
            style={{ fontSize: "48px", lineHeight: "56px", color: "var(--text-primary)" }}
          >
            {project.title}
          </h1>
          <p className="font-body italic" style={{ fontSize: "16px", color: "#8E8F94" }}>
            {project.tag}
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.stats.map((stat) => (
              <span
                key={`${stat.value}-${stat.label}`}
                className="font-body font-semibold"
                style={{
                  fontSize: "13px",
                  padding: "6px 14px",
                  borderRadius: "999px",
                  background: `${project.accent}18`,
                  color: project.accent,
                  border: `1px solid ${project.accent}40`,
                }}
              >
                {stat.value} {stat.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hero visual placeholder */}
      <div
        className="w-full flex items-center justify-center"
        style={{
          height: "400px",
          background: `linear-gradient(135deg, ${project.accent}12 0%, ${project.accent}28 100%)`,
          borderBottom: "2px solid var(--global-border)",
        }}
      >
        <span
          className="font-display font-bold select-none"
          style={{ fontSize: "160px", lineHeight: "1", color: project.accent, opacity: 0.15 }}
        >
          {String(idx + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Body */}
      <div className="max-w-[800px] mx-auto px-10 pt-16 flex flex-col gap-16">

        {/* Context */}
        <Section label="Context" accent={project.accent}>
          <p className="font-body" style={{ fontSize: "16px", lineHeight: "28px", color: "#4B4B52" }}>
            {project.context}
          </p>
        </Section>

        {/* The Problem */}
        <Section label="The Problem" accent={project.accent}>
          <p className="font-body" style={{ fontSize: "16px", lineHeight: "28px", color: "#4B4B52" }}>
            {project.problem}
          </p>
        </Section>

        {/* The Approach */}
        <Section label="The Approach" accent={project.accent}>
          <div className="flex flex-col gap-8">
            {project.approach.map((item) => (
              <div key={item.heading} className="flex flex-col gap-2 pl-5" style={{ borderLeft: `3px solid ${project.accent}` }}>
                <h3 className="font-body font-semibold italic" style={{ fontSize: "16px", color: "var(--text-primary)" }}>
                  {item.heading}
                </h3>
                <p className="font-body" style={{ fontSize: "15px", lineHeight: "26px", color: "#4B4B52" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Impact */}
        <Section label="Impact" accent={project.accent}>
          <div
            className="rounded-2xl p-6"
            style={{ background: `${project.accent}10`, border: `1px solid ${project.accent}30` }}
          >
            <p className="font-body" style={{ fontSize: "16px", lineHeight: "28px", color: "#4B4B52" }}>
              {project.impact}
            </p>
          </div>
        </Section>

        {/* Key Insight */}
        <Section label="Key Insight" accent={project.accent}>
          <blockquote
            className="font-display font-semibold italic"
            style={{
              fontSize: "24px",
              lineHeight: "32px",
              color: "var(--text-primary)",
              borderLeft: `4px solid ${project.accent}`,
              paddingLeft: "24px",
              margin: 0,
            }}
          >
            &ldquo;{project.keyInsight}&rdquo;
          </blockquote>
        </Section>

        {/* Prev / Next navigation */}
        <div className="flex items-center justify-between pt-8" style={{ borderTop: "2px solid var(--global-border)" }}>
          {prev ? (
            <Link
              href={`/design/${prev.slug}`}
              className="flex flex-col gap-1 transition-opacity hover:opacity-70"
            >
              <span className="font-body text-xs" style={{ color: "#8E8F94" }}>← Previous</span>
              <span className="font-body font-semibold" style={{ fontSize: "14px", color: "var(--text-primary)", maxWidth: "280px" }}>
                {prev.title}
              </span>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              href={`/design/${next.slug}`}
              className="flex flex-col gap-1 items-end transition-opacity hover:opacity-70"
            >
              <span className="font-body text-xs" style={{ color: "#8E8F94" }}>Next →</span>
              <span className="font-body font-semibold" style={{ fontSize: "14px", color: "var(--text-primary)", maxWidth: "280px", textAlign: "right" }}>
                {next.title}
              </span>
            </Link>
          ) : <div />}
        </div>
      </div>
    </main>
  );
}

function Section({ label, accent, children }: { label: string; accent: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: accent, flexShrink: 0 }} />
        <span
          className="font-body font-semibold uppercase tracking-widest"
          style={{ fontSize: "11px", color: "#8E8F94", letterSpacing: "0.1em" }}
        >
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}
