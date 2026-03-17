import Image from "next/image";

const logos = [
  { name: "PeopleHum", src: "/brands/Gray/brand-1-logo-gray.png" },
  { name: "BatterySmart", src: "/brands/Gray/brand-2-logo-gray.png" },
  { name: "Bachatt", src: "/brands/Gray/brand-3-logo-gray.png" },
  { name: "Jio Engage", src: "/brands/Gray/brand-4-logo-gray.png" },
  { name: "Cure Finance", src: "/brands/Gray/brand-5-logo-gray.png" },
];

export default function BrandLogos() {
  return (
    <section className="pt-16 px-10">
      <div className="flex items-center justify-center gap-4">
        {logos.map((logo) => (
          <div
            key={logo.name}
            className="flex items-center justify-center"
            style={{
              height: "120px",
              width: "100%",
              mixBlendMode: "luminosity",
              opacity: 0.6,
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={logo.src}
                alt={logo.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
