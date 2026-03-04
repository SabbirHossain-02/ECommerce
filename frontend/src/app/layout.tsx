import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Vanguard | Premium E-Commerce",
  description: "A highly scalable, premium e-commerce native-like web application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased text-foreground bg-background selection:bg-primary selection:text-primary-foreground`}>
        <Providers>
          <Navbar />

          {/* Main Content Area */}
          <main className="min-h-screen pb-24 md:pb-0 relative overflow-x-hidden">
            {children}
          </main>

          <Footer />
          <MobileNav />
        </Providers>
      </body>
    </html>
  );
}
