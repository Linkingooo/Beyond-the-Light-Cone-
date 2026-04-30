import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarField from "@/components/StarField";

export const metadata: Metadata = {
  title: {
    default: "光锥之外 · Beyond the Light Cone",
    template: "%s · Beyond the Light Cone",
  },
  description:
    "一个关于量子力学与相对论的现代物理学科普网站，带你探索时空、粒子与宇宙的边界。",
  keywords: [
    "量子力学",
    "相对论",
    "物理",
    "Quantum Mechanics",
    "Relativity",
    "Physics",
  ],
  openGraph: {
    title: "光锥之外 · Beyond the Light Cone",
    description: "现代物理学的两大基石：量子力学与相对论。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="bg-cosmos-bg">
      <body className="relative min-h-screen overflow-x-hidden bg-cosmic-gradient">
        <StarField />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
