import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Zen_Kaku_Gothic_New } from "next/font/google";
import { ScrollBackground } from "@/components/effects/scroll-background";
import { ScrollFallback } from "@/components/effects/scroll-fallback";
import { ScrollProgress } from "@/components/effects/scroll-progress";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { profile } from "@/lib/content/site-content";
import "./globals.css";

// 本文の欧文。和文ゴシックと合わせて設計された字面なので、
// 和文（globals.css で OS 標準の明快なゴシックを指定）と並べても浮かない
const bodyFont = Zen_Kaku_Gothic_New({
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

// ラベル・数値・タグ用。計器の読み取り値としての性格を持たせる
const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: profile.fullName,
    template: `%s | ${profile.fullName}`,
  },
  description: `${profile.fullName}のページ`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} h-full scroll-smooth antialiased`}
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
