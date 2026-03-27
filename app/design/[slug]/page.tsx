import Image from "next/image";
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
  const ex = project.expandedSections;

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
            className="body-m inline-flex items-center gap-1 transition-opacity hover:opacity-70"
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
            className="display-xl"
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #475569 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {project.title}
          </h1>
          <p className="body-l italic" style={{ color: "#8E8F94" }}>
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

      {/* Banner image */}
      <div className="w-full relative" style={{ height: "512px", borderBottom: "2px solid var(--global-border)" }}>
        <Image
          src={project.bannerImage}
          alt={project.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1440px"
        />
      </div>

      {/* Body */}
      <div className="max-w-[800px] mx-auto px-10 pt-16 flex flex-col gap-16">

        {/* Context */}
        <Section label="Context">
          <p className="font-body" style={{ fontSize: "16px", lineHeight: "28px", color: "#4B4B52" }}>
            {project.context}
          </p>
        </Section>

        {/* The Problem */}
        <Section label="The Problem">
          <p className="font-body" style={{ fontSize: "16px", lineHeight: "28px", color: "#4B4B52" }}>
            {project.problem}
          </p>
        </Section>

        {/* The Approach */}
        <Section label="The Approach">
          <div className="flex flex-col gap-8">
            {project.approach.map((item) => (
              <div key={item.heading} className="flex flex-col gap-2 pl-5" style={{ borderLeft: `3px solid ${project.accent}` }}>
                <h3 className="display-m italic" style={{ color: "var(--text-primary)" }}>
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
        <Section label="Impact">
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
        <Section label="Key Insight">
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

        {/* ── Expanded sections (filled per-project) ── */}
        {ex && (
          <>
            {/* Why */}
            {ex.why && (
              <Section label="Why">
                <p className="font-body" style={{ fontSize: "16px", lineHeight: "28px", color: "#4B4B52" }}>
                  {ex.why}
                </p>
              </Section>
            )}

            {/* Key Design Decisions */}
            {ex.keyDesignDecisions && ex.keyDesignDecisions.length > 0 && (
              <Section label="Key Design Decisions">
                <div className="flex flex-col gap-10">
                  {ex.keyDesignDecisions.map((d, i) => (
                    <div key={i} className="flex flex-col gap-6 p-6 rounded-2xl" style={{ background: `${project.accent}08`, border: `1px solid ${project.accent}20` }}>
                      <h3 className="display-m" style={{ color: "var(--text-primary)" }}>{d.title}</h3>
                      <p className="font-body" style={{ fontSize: "14px", lineHeight: "24px", color: "#8E8F94" }}>
                        <strong style={{ color: "var(--text-primary)" }}>Situation:</strong> {d.situation}
                      </p>
                      {/* Options — two-column on desktop, stack on mobile */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2 p-4 rounded-xl" style={{ background: "var(--base-200)", border: "1px solid var(--global-border)" }}>
                          <span className="font-body font-semibold" style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#8E8F94" }}>Option A</span>
                          <p className="font-body" style={{ fontSize: "14px", lineHeight: "22px", color: "#4B4B52" }}>{d.optionA}</p>
                        </div>
                        <div className="flex flex-col gap-2 p-4 rounded-xl" style={{ background: "var(--base-200)", border: "1px solid var(--global-border)" }}>
                          <span className="font-body font-semibold" style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#8E8F94" }}>Option B</span>
                          <p className="font-body" style={{ fontSize: "14px", lineHeight: "22px", color: "#4B4B52" }}>{d.optionB}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 pl-4" style={{ borderLeft: `3px solid ${project.accent}` }}>
                        <span className="font-body font-semibold" style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: project.accent }}>What I chose</span>
                        <p className="font-body" style={{ fontSize: "15px", lineHeight: "26px", color: "#4B4B52" }}>{d.chosen}</p>
                      </div>
                      {d.visual && (
                        <p className="font-body italic" style={{ fontSize: "13px", color: "#8E8F94" }}>
                          Visual: {d.visual}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* The Work */}
            {ex.theWork && ex.theWork.length > 0 && (
              <Section label="The Work">
                {/* Horizontal scroll on desktop, vertical stack on mobile */}
                <div className="flex flex-col md:flex-row md:overflow-x-auto gap-4 pb-2">
                  {ex.theWork.map((screen, i) => (
                    <div key={i} className="flex flex-col gap-2 md:shrink-0 md:w-[320px]">
                      <div
                        className="w-full md:w-[320px] flex items-center justify-center rounded-2xl"
                        style={{ aspectRatio: "9/16", background: "var(--base-200)", border: "1px solid var(--global-border)" }}
                      >
                        {screen.imageSrc ? (
                          <Image src={screen.imageSrc} alt={screen.caption} fill className="object-cover rounded-2xl" sizes="320px" />
                        ) : (
                          <span className="font-body" style={{ fontSize: "12px", color: "#8E8F94" }}>Screen {i + 1}</span>
                        )}
                      </div>
                      <p className="font-body" style={{ fontSize: "13px", lineHeight: "20px", color: "#4B4B52" }}>{screen.caption}</p>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Pushback */}
            {ex.pushback && ex.pushback.length > 0 && (
              <Section label="Pushback">
                <div className="flex flex-col gap-8">
                  {ex.pushback.map((item, i) => (
                    <div key={i} className="flex flex-col gap-3 pl-5" style={{ borderLeft: `3px solid ${project.accent}40` }}>
                      <h3 className="display-m italic" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                      <div className="flex flex-col gap-2">
                        <p className="font-body" style={{ fontSize: "15px", lineHeight: "26px", color: "#4B4B52" }}>
                          <strong style={{ color: "var(--text-primary)" }}>What happened: </strong>{item.what}
                        </p>
                        <p className="font-body" style={{ fontSize: "15px", lineHeight: "26px", color: "#4B4B52" }}>
                          <strong style={{ color: "var(--text-primary)" }}>How I navigated it: </strong>{item.navigation}
                        </p>
                        <p className="font-body" style={{ fontSize: "15px", lineHeight: "26px", color: "#4B4B52" }}>
                          <strong style={{ color: "var(--text-primary)" }}>Result: </strong>{item.result}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Impact & Adaptation */}
            {ex.impactAdaptation && (
              <Section label="Impact & Adaptation">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <span className="font-body font-semibold" style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#8E8F94" }}>Launch metrics</span>
                    <div className="flex flex-wrap gap-2">
                      {ex.impactAdaptation.launchMetrics.map((m, i) => (
                        <span key={i} className="font-body font-semibold" style={{ fontSize: "13px", padding: "6px 14px", borderRadius: "999px", background: `${project.accent}12`, color: project.accent, border: `1px solid ${project.accent}30` }}>
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 pl-4" style={{ borderLeft: `3px solid var(--global-border)` }}>
                    <span className="font-body font-semibold" style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#8E8F94" }}>What we observed</span>
                    <p className="font-body" style={{ fontSize: "15px", lineHeight: "26px", color: "#4B4B52" }}>{ex.impactAdaptation.observed}</p>
                  </div>
                  <div className="flex flex-col gap-1 pl-4" style={{ borderLeft: `3px solid var(--global-border)` }}>
                    <span className="font-body font-semibold" style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#8E8F94" }}>What we adapted</span>
                    <p className="font-body" style={{ fontSize: "15px", lineHeight: "26px", color: "#4B4B52" }}>{ex.impactAdaptation.adapted}</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <span className="font-body font-semibold" style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#8E8F94" }}>Final steady-state metrics</span>
                    <div className="flex flex-wrap gap-2">
                      {ex.impactAdaptation.finalMetrics.map((m, i) => (
                        <span key={i} className="font-body" style={{ fontSize: "13px", padding: "6px 14px", borderRadius: "999px", background: "var(--base-200)", color: "var(--text-primary)", border: "1px solid var(--global-border)" }}>
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Section>
            )}

            {/* Outcome & Reflection */}
            {ex.outcomeReflection && (
              <Section label="Outcome & Reflection">
                <div className="flex flex-col gap-6">
                  <div className="rounded-2xl p-6" style={{ background: `${project.accent}08`, border: `1px solid ${project.accent}20` }}>
                    <span className="font-body font-semibold block mb-2" style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: project.accent }}>What this project taught me</span>
                    <p className="font-body" style={{ fontSize: "16px", lineHeight: "28px", color: "#4B4B52" }}>{ex.outcomeReflection.learned}</p>
                  </div>
                  <div className="rounded-2xl p-6" style={{ background: "var(--base-200)", border: "1px solid var(--global-border)" }}>
                    <span className="font-body font-semibold block mb-2" style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "#8E8F94" }}>What I&apos;d do differently</span>
                    <p className="font-body" style={{ fontSize: "16px", lineHeight: "28px", color: "#4B4B52" }}>{ex.outcomeReflection.differently}</p>
                  </div>
                </div>
              </Section>
            )}
          </>
        )}

        {/* Prev / Next navigation */}
        <div className="flex items-center justify-between pt-8" style={{ borderTop: "2px solid var(--global-border)" }}>
          {prev ? (
            <Link
              href={`/design/${prev.slug}`}
              className="flex flex-col gap-1 transition-opacity hover:opacity-70"
            >
              <span className="label-s" style={{ color: "#8E8F94" }}>← Previous</span>
              <span className="label-m" style={{ color: "var(--text-primary)", maxWidth: "280px" }}>
                {prev.title}
              </span>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              href={`/design/${next.slug}`}
              className="flex flex-col gap-1 items-end transition-opacity hover:opacity-70"
            >
              <span className="label-s" style={{ color: "#8E8F94" }}>Next →</span>
              <span className="label-m" style={{ color: "var(--text-primary)", maxWidth: "280px", textAlign: "right" }}>
                {next.title}
              </span>
            </Link>
          ) : <div />}
        </div>
      </div>
    </main>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="display-l" style={{ color: "var(--text-primary)" }}>
        {label}
      </span>
      {children}
    </div>
  );
}
