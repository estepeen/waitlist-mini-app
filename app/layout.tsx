import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import { RootProvider } from "./rootProvider";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Skadi",
  description: "AI assistant for crypto",
  other: {
    "base:app_id": "693c6083e6be54f5ed71d805",
  },
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sourceCodePro.variable}`}>
        <RootProvider>
          {/* Global test banner */}
          <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[60]">
            <div className="px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-400/40 text-yellow-100 backdrop-blur-md shadow-lg">
              <span className="font-medium">Test version:</span> This build is a work in progress and not fully functional.
            </div>
          </div>

          {children}
          <SpeedInsights />
        </RootProvider>
      </body>
    </html>
  );
}
