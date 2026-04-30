import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blueprint AI Career Explorer",
  description: "Career exploration built for first-generation students.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-[#F4F7FC] font-sans text-[#2D3748] antialiased">{children}</body>
    </html>
  );
}
