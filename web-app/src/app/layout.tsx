import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { AppLayout } from "@/components/layout/AppLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Codiner - Next-Generation AI App Builder",
  description: "Build unlimited AI-powered applications with 1000+ features. Local, open-source, enterprise-ready.",
  keywords: "AI app builder, low-code development, full-stack apps, Supabase integration, AI coding assistant",
  authors: [{ name: "Codiner Team" }],
  creator: "Codiner",
  publisher: "Codiner",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codiner.online",
    title: "Codiner - Next-Generation AI App Builder",
    description: "Build unlimited AI-powered applications with 1000+ features",
    siteName: "Codiner",
  },
  twitter: {
    card: "summary_large_image",
    title: "Codiner - Next-Generation AI App Builder",
    description: "Build unlimited AI-powered applications with 1000+ features",
    creator: "@codiner",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.ico",
    apple: "/favicon-32x32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceCodePro.variable}`}>
      <body className="font-sans antialiased min-h-screen overflow-x-hidden">
        <Providers>
          <AppLayout>
            {children}
          </AppLayout>
        </Providers>
      </body>
    </html>
  );
}
