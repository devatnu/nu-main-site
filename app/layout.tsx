import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PageLoader from "@/components/PageLoader";
import MyraChat from "@/components/MyraChat";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Caveat:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <PageLoader />
        <MyraChat />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
