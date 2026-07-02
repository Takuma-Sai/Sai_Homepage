import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import { ScrollBackground } from "@/components/scroll-background";
import { ScrollFallback } from "@/components/scroll-fallback";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { profile } from "@/lib/site-content";
import "./globals.css";

const bodyFont = Noto_Sans_JP({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const displayFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: profile.name,
    template: `%s | ${profile.name}`,
  },
  description: `${profile.name}のページ`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${bodyFont.variable} ${displayFont.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ScrollFallback />
        <ScrollBackground />
        <ScrollProgress />
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
