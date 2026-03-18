import Image from "next/image";

const cards = [
  {
    tag: "Coding",
    tagIcon: "/section-vision-teaser/Icon.png",
    title: ["Building a FREE", "investment advisory calculator"],
    subtitle: "Helps you plan your expenses and wealth",
    image: "/section-vision-teaser/image 8.png",
    imageAspect: "360/640",
    tall: true,
  },
  {
    tag: "Designing",
    tagIcon: "/section-vision-teaser/Icon-1.png",
    title: ["Brainstorming", "Uttar Bus"],
    subtitle: "North India's trusted bus service",
    image: "/section-vision-teaser/image 8-1.png",
    tall: false,
  },
  {
    tag: "Creating",
    tagIcons: ["/section-vision-teaser/Icon-2.png", "/section-vision-teaser/Icon-3.png"],
    title: ["Getting the people of Mumbai Best Litti Chokha"],
    subtitle: "Authentic tast serving with love ❤️",
    image: "/section-vision-teaser/image 8-2.png",
    tall: false,
  },
];

function CardTag({ tag, tagIcon, tagIcons }: { tag: string; tagIcon?: string; tagIcons?: string[] }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg self-start"
      style={{ background: "var(--base-200)", border: "1px solid var(--global-border)" }}
    >
      <span className="label-s" style={{ color: "var(--text-primary)" }}>
        {tag}
      </span>
      {tagIcon && <Image src={tagIcon} alt="" width={20} height={20} className="object-cover" />}
      {tagIcons && tagIcons.map((src, i) => (
        <Image key={i} src={src} alt="" width={20} height={20} className="object-cover" />
      ))}
    </div>
  );
}

export default function VisionTeaser() {
  const [tall, ...stack] = cards;

  return (
    <section className="pt-[200px] px-16">
      {/* Header */}
      <div className="flex flex-col items-center gap-10 mb-24">
        <div
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border label-s"
          style={{ background: "var(--base-200)", borderColor: "var(--global-border)", color: "#8E8F94" }}
        >
          <Image src="/icons/chevron-right.svg" alt="" width={16} height={16} />
          What's happening right now?
          <Image src="/icons/chevron-left.svg" alt="" width={16} height={16} />
        </div>

        <div className="flex flex-col items-center gap-2">
          <h2
            className="display-xl text-center"
            style={{
              fontSize: "64px", lineHeight: "72px",
              background: "linear-gradient(-6deg, #0D0F1A 1%, #4755E3 99%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}
          >
            What&apos;s up these days
          </h2>
          <p className="body-l text-center" style={{ color: "var(--text-primary)" }}>
            I&apos;m always experimenting with new ideas<br />
            designing, building, and exploring concepts that push my thinking and craft forward.
          </p>
        </div>
      </div>

      {/* Cards grid */}
      <div className="flex gap-6 items-start">

        {/* Left — tall card */}
        <div
          className="flex flex-1 gap-8 overflow-hidden"
          style={{
            height: "600px",
            background: "white",
            border: "2px solid var(--global-border)",
            borderRadius: "16px",
            padding: "32px",
          }}
        >
          <div className="flex flex-col gap-4 flex-1 py-4">
            <CardTag tag={tall.tag} tagIcon={tall.tagIcon} />
            <div>
              {tall.title.map((line, i) => (
                <p key={i} className="heading-xl" style={{ color: "var(--text-primary)" }}>
                  {line}
                </p>
              ))}
            </div>
            <p className="body-l" style={{ color: "var(--text-primary)" }}>
              {tall.subtitle}
            </p>
          </div>
          <div className="relative shrink-0 rounded-xl overflow-hidden" style={{ aspectRatio: "360/640", height: "100%" }}>
            <Image src={tall.image} alt={tall.title.join(" ")} fill unoptimized className="object-cover" />
          </div>
        </div>

        {/* Right — stacked cards */}
        <div className="flex flex-col gap-6 shrink-0" style={{ width: "591px" }}>
          {stack.map((card) => (
            <div
              key={card.tag}
              className="flex gap-8 overflow-hidden shrink-0"
              style={{
                height: "288px",
                background: "white",
                border: "2px solid var(--global-border)",
                borderRadius: "16px",
                padding: "32px",
              }}
            >
              <div className="flex flex-col gap-4 flex-1">
                <CardTag tag={card.tag} tagIcon={card.tagIcon} tagIcons={card.tagIcons} />
                <div>
                  {card.title.map((line, i) => (
                    <p key={i} className="heading-xl" style={{ color: "var(--text-primary)" }}>
                      {line}
                    </p>
                  ))}
                </div>
                <p className="body-l" style={{ color: "var(--text-primary)" }}>
                  {card.subtitle}
                </p>
              </div>
              <div className="relative shrink-0 rounded-xl overflow-hidden" style={{ aspectRatio: "1/1", height: "100%" }}>
                <Image src={card.image} alt={card.title.join(" ")} fill unoptimized className="object-cover" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
