import VisionTeaser from "@/components/VisionTeaser";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Vision Pipeline — Nishant Upadhyay",
  description: "What I'm building, designing, and exploring right now.",
};

export default function VisionPage() {
  return (
    <main
      className="min-h-screen pb-[120px]"
      style={{ background: "var(--base-100)" }}
    >
      <VisionTeaser />
      <Footer />
    </main>
  );
}
