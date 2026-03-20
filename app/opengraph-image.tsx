import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nishant Upadhyay — Founding Product Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const bricolage = await fetch(
    new URL(
      "https://fonts.gstatic.com/s/bricolagegrotesque/v10/3y9U6as8bTXq_nANBjzKo3IeZx8z6up5BeSl5HZtRaFPFBFmFw.woff2"
    )
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          backgroundColor: "#1E2029",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "64px 80px",
          fontFamily: '"Bricolage Grotesque"',
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: 14,
            border: "2px solid rgba(255,255,255,0.15)",
            color: "#ffffff",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "-0.5px",
          }}
        >
          nü
        </div>

        {/* Bottom content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1,
              letterSpacing: "-2px",
            }}
          >
            Nishant Upadhyay
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 400,
              color: "#8E8F94",
              letterSpacing: "-0.3px",
            }}
          >
            Founding Product Designer
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Bricolage Grotesque",
          data: bricolage,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
