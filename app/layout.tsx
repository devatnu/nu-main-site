import type { Metadata } from "next";
import { Bricolage_Grotesque, Be_Vietnam_Pro, Caveat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PageLoader from "@/components/PageLoader";
import MyraChat from "@/components/MyraChat";
import DesktopOnly from "@/components/DesktopOnly";

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nishant Upadhyay — Design Leader",
  description: "I help brands move from idea to scale. Building products, design systems, and teams that ship with clarity and impact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${beVietnamPro.variable} ${caveat.variable}`}>
      <body className="antialiased">
<PageLoader />
        <MyraChat />
        <DesktopOnly><Navbar /></DesktopOnly>
        {children}
      </body>
    </html>
  );
}
