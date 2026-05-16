import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/ToastProvider";

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains-mono"
});

export const metadata: Metadata = {
  title: "Terminal Knowledge Base",
  description: "Advanced frontend hacker-style knowledge management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable}`}>
      <body className="font-mono h-screen w-screen relative">
        <div className="absolute inset-0 bg-scanlines bg-scanlines pointer-events-none z-50 opacity-20"></div>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
