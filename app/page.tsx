import Image from "next/image";
import Hero from "@/components/Hero";
import ToolsStrip from "@/components/ToolsStrip";
import Traits from "@/components/Traits";
import ImpactNumbers from "@/components/ImpactNumbers";
import Brands from "@/components/Brands";
import BrandLogos from "@/components/BrandLogos";
import SectionApproach from "@/components/SectionApproach";
import SectionProjectsList from "@/components/SectionProjectsList";
import MyraTeaser from "@/components/MyraTeaser";
import VisionTeaser from "@/components/VisionTeaser";
import QuoteTeaser from "@/components/QuoteTeaser";
import Footer from "@/components/Footer";
import MobileHome from "@/components/MobileHome";

export default function Home() {
  return (
    <>
      {/* Mobile page — shown only on small screens */}
      <div className="sm:hidden">
        <MobileHome />
      </div>

      {/* Desktop page — hidden on small screens */}
      <main className="hidden sm:block relative overflow-x-hidden">
        {/* Background graphics */}
        <div className="absolute pointer-events-none select-none z-0"
          style={{ left: "-876px", top: "-180px", width: "1152px", height: "1152px" }}>
          <Image src="/hero/Graphic Top Left.png" alt="" fill className="object-contain" priority />
        </div>
        <div className="absolute pointer-events-none select-none z-0"
          style={{ right: "-876px", top: "-180px", width: "1152px", height: "1152px" }}>
          <Image src="/hero/Graphic Top Right.png" alt="" fill className="object-contain" priority />
        </div>
        <Hero />
        <ToolsStrip />
        <Traits />
        <ImpactNumbers />
        <Brands />
        <BrandLogos />
        {/* <SectionApproach /> */}
        <SectionProjectsList />
        <MyraTeaser />
        <VisionTeaser />
        <QuoteTeaser />
        <Footer />
      </main>
    </>
  );
}
