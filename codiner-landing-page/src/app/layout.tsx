import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://codiner.online"),
  title: "Codiner | Free AI App Builder & Local Development Engine",
  description: "Build production-grade full-stack applications with PAIKE orchestration. Free, 100% local-first, and open-source AI development platform.",
  keywords: ["AI app builder", "local AI", "paike engine", "open source ai", "software development", "app foundry"],
  authors: [{ name: "Codiner Team", url: "https://codiner.online" }],
  creator: "Subhan Haider",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codiner.online",
    title: "Codiner - Free AI App Builder",
    description: "Build full-stack applications with AI. Free, local, and open-source.",
    siteName: "Codiner",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Codiner AI App Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Codiner - Free AI App Builder",
    description: "Build full-stack applications with AI. Free, local, and open-source.",
    images: ["/og-image.png"],
    creator: "@codiner_ai",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/site.webmanifest",
};

import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
