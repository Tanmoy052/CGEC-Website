import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/common/ChatBot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cooch Behar Government Engineering College | CGEC",
  description:
    "Official website of Cooch Behar Government Engineering College (CGEC). Excellence in technical education and research.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-white text-gray-900`}>
        <Navbar />
        <main className="min-h-screen pt-20">{children}</main>
        <ChatBot />
        <Footer />
      </body>
    </html>
  );
}
