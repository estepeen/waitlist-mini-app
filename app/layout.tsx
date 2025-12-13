import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import { SafeArea } from "@coinbase/onchainkit/minikit";
import { minikitConfig } from "../minikit.config";
import { RootProvider } from "./rootProvider";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: minikitConfig.frame.name,
    description: minikitConfig.frame.description,
    other: {
      "base:app_id": "693c6083e6be54f5ed71d805",
      "fc:frame": JSON.stringify({
        version: minikitConfig.frame.version,
        imageUrl: minikitConfig.frame.heroImageUrl,
        button: {
          title: `Join the ${minikitConfig.frame.name} Waitlist`,
          action: {
            name: `Launch ${minikitConfig.frame.name}`,
            type: "launch_frame",
          },
        },
      }),
      "fc:miniapp": JSON.stringify({
        version: "next",
        imageUrl: "https://waitlist-mini-app-gules.vercel.app/screenshot-portrait.png",
        button: {
          title: "Open App",
          action: {
            type: "launch_frame",
            url: "https://waitlist-mini-app-gules.vercel.app/",
          },
        },
      }),
    },
  };
}

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
    <RootProvider>
      <html lang="en">
        <body className={`${inter.variable} ${sourceCodePro.variable}`}>
          {/* Global test banner */}
          <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[60]">
            <div className="px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-400/40 text-yellow-100 backdrop-blur-md shadow-lg">
              <span className="font-medium">Test version:</span> This build is a work in progress and not fully functional.
            </div>
          </div>

          <SafeArea>{children}</SafeArea>
          <SpeedInsights />
        </body>
      </html>
    </RootProvider>
  );
}
