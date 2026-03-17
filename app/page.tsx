import Hero from "@/components/Hero";
import ToolsStrip from "@/components/ToolsStrip";
import Traits from "@/components/Traits";
import ImpactNumbers from "@/components/ImpactNumbers";
import Brands from "@/components/Brands";
import BrandLogos from "@/components/BrandLogos";
import SectionApproach from "@/components/SectionApproach";
import MyraTeaser from "@/components/MyraTeaser";
import VisionTeaser from "@/components/VisionTeaser";
import QuoteTeaser from "@/components/QuoteTeaser";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      {/* Background graphics — fixed, behind everything, not clipped vertically */}
      <div className="absolute pointer-events-none select-none z-0"
        style={{ left: "-876px", top: "-180px", width: "1152px", height: "1152px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero/Graphic Top Left.png" alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <div className="absolute pointer-events-none select-none z-0"
        style={{ right: "-876px", top: "-180px", width: "1152px", height: "1152px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero/Graphic Top Right.png" alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <Hero />
      <ToolsStrip />
      <Traits />
      <ImpactNumbers />
      <Brands />
      <BrandLogos />
      <SectionApproach />
      <MyraTeaser />
      <VisionTeaser />
      <QuoteTeaser />
      <Footer />
    </main>
  );
}
