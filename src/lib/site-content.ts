import type { SocialId } from "@/components/social-icons";

export const profile = {
  name: "崔 拓真（Takuma Sai）",
  role: "AIエンジニア",
  email: "saita3006@icloud.com",
} as const;

export const profileFacts = [
  { label: "職種", value: profile.role },
  { label: "連絡先", value: profile.email },
] as const;

export const keywords = [
  "Python",
  "AWS",
  "TypeScript",
  "Claude Code",
  "Codex",
] as const;

// --- 以下はダミーデータ（後で実コンテンツに差し替え） ---

export const aboutParagraphs = [
  "AIエンジニアとして、生成AIを軸にしたプロダクト開発とエンジニアリングの自動化に取り組んでいます。",
  "クラウド基盤の設計からエージェント的なワークフロー構築まで、課題に応じて手段を選ばず形にすることを大切にしています。",
] as const;

export type SkillGroup = {
  category: string;
  items: readonly string[];
};

export const skillGroups: readonly SkillGroup[] = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "SQL"],
  },
  {
    category: "Cloud / Infra",
    items: ["AWS", "Docker", "Terraform"],
  },
  {
    category: "AI / Agent",
    items: ["Claude Code", "Codex", "LangChain", "RAG"],
  },
] as const;

export type Work = {
  title: string;
  description: string;
  tags: readonly string[];
};

export const works: readonly Work[] = [
  {
    title: "AIエージェント基盤",
    description:
      "業務フローを自動化するエージェントワークフローを設計・実装。（ダミー）",
    tags: ["Python", "LLM", "AWS"],
  },
  {
    title: "RAG検索システム",
    description:
      "社内ドキュメントを対象にしたRAG検索の構築。（ダミー）",
    tags: ["RAG", "Vector DB", "TypeScript"],
  },
  {
    title: "開発自動化ツール",
    description:
      "Claude Code / Codex を用いた開発支援ツールの内製。（ダミー）",
    tags: ["Claude Code", "Codex", "CI/CD"],
  },
] as const;

export const navigation = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Works", href: "/#works" },
  { label: "Contact", href: "/#contact" },
] as const;

export type SocialLink = {
  id: SocialId;
  label: string;
  handle: string;
  href: string;
  brandColor: string;
};

export const socialLinks: readonly SocialLink[] = [
  {
    id: "x",
    label: "X",
    handle: "@your-account",
    href: "https://x.com/your-account",
    brandColor: "#000000",
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@takuma.future.illust.gallery",
    href: "https://www.instagram.com/takuma.future.illust.gallery/",
    brandColor: "#E4405F",
  },
  {
    id: "facebook",
    label: "Facebook",
    handle: "your-account",
    href: "https://www.facebook.com/your-account",
    brandColor: "#1877F2",
  },
] as const;
