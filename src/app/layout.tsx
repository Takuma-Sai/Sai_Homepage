import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Zen_Kaku_Gothic_New } from "next/font/google";
import { ScrollBackground } from "@/components/scroll-background";
import { ScrollFallback } from "@/components/scroll-fallback";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { profile } from "@/lib/site-content";
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
