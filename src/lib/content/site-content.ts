import type { SocialId } from "@/components/ui/social-icons";

const nameJa = "崔 拓真";
const nameEn = "Takuma Sai";
const email = "saita3006@icloud.com";

export const profile = {
  nameJa,
  nameEn,
  fullName: `${nameJa}（${nameEn}）`,
  role: "AIエンジニア",
  email,
  mailto: `mailto:${email}`,
} as const;

export type ProfileFact = {
  label: string;
  value: string;
  href?: string;
};

export const profileFacts: readonly ProfileFact[] = [
  { label: "職種", value: profile.role },
  { label: "経験", value: "システム開発 約4年" },
  { label: "担当工程", value: "設計・実装・運用" },
  { label: "連絡先", value: profile.email, href: profile.mailto },
];

export const aboutParagraphs = [
  "生成AIを使った業務アプリケーションの設計・開発をしているAIエンジニアです。",
  "保険・年金システム（COBOL）の開発と保守からキャリアを始め、現在は TypeScript と Python で、金融・保険・小売向けのAIチャットボットや診断ロジックを開発しています。",
  "課題の整理と検証方針の作成から、本番実装・運用改善まで一貫して担当しています。",
] as const;

export type SkillGroup = {
  category: string;
  items: readonly string[];
};

export const skillGroups: readonly SkillGroup[] = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "SQL", "COBOL"],
  },
  {
    category: "AI / LLM",
    items: [
      "Amazon Bedrock",
      "Dify",
      "Strands Agents",
      "LiteLLM",
      "RAG（Bedrock KB / OpenSearch）",
    ],
  },
  {
    category: "Cloud / Infra",
    items: [
      "AWS（ECS / Lambda / Aurora）",
      "Google Cloud（Vertex AI）",
      "Docker",
      "Terraform",
      "AWS CDK",
    ],
  },
] as const;

export type Work = {
  title: string;
  period: string;
  description: string;
  tags: readonly string[];
};

// 新しい順に並べる
export const works: readonly Work[] = [
  {
    title: "自動車保険の問い合わせAI",
    period: "2026.09 – 2026.10",
    description:
      "保険会社向け問い合わせチャットボットの、管理画面や有人チャット画面などを詳細設計から実装まで担当。",
    tags: ["TypeScript", "Python", "LiteLLM", "Salesforce", "Terraform"],
  },
  {
    title: "金融機関向け 人事AIアプリ",
    period: "2026.01 – 2026.10",
    description:
      "人事領域のチャットボットのフロント画面を開発。Dify と Strands Agents でチャットボットとワークフローをフルスクラッチで構築し、設計から運用まで担当。",
    tags: ["TypeScript", "Dify", "Strands Agents", "Bedrock", "AWS CDK"],
  },
  {
    title: "店頭サイネージのファッション診断ロジック",
    period: "2025.06 – 2026.10",
    description:
      "アパレル店頭のデジタルサイネージで動く各種診断のロジックを開発。課題整理・検証から本番実装・運用改善まで担当し、Vertex AI による画像生成の技術検証も実施。",
    tags: ["Python", "scikit-learn", "ResNet", "ECS", "Terraform"],
  },
  {
    title: "保険・年金システムの開発と保守",
    period: "2022.11 – 2025.04",
    description:
      "保険料などを計算する帳票システムの開発（影響分析〜テスト、顧客への改修説明を含む）と、年金システムの運用保守・障害対応を担当。",
    tags: ["COBOL", "SQL", "DB2"],
  },
] as const;

export const hero = {
  eyebrow: "AI Engineer",
  headline: ["AIの「できそう」を、", "「動いている」に。"],
  tagline: "課題整理から運用まで、手を離さずに形にする。",
} as const;

export type SectionMeta = {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
};

// 並び順がそのままナビゲーションの順になる
export const sections = {
  about: { id: "about", eyebrow: "About", title: "自己紹介" },
  skills: {
    id: "skills",
    eyebrow: "Skills",
    title: "技術スタック",
    lead: "業務で使っている主な技術です。",
  },
  works: {
    id: "works",
    eyebrow: "Works",
    title: "実績",
    lead: "担当した主なプロジェクトです（新しい順）。",
  },
  contact: {
    id: "contact",
    eyebrow: "Contact",
    title: "お問い合わせ",
    lead: "制作やAI活用のご相談は、メールからお気軽にどうぞ。",
  },
} as const satisfies Record<string, SectionMeta>;

export const navigation = Object.values(sections).map((section) => ({
  label: section.eyebrow,
  href: `/#${section.id}`,
}));

export type SocialLink = {
  id: SocialId;
  label: string;
  handle: string;
  href: string;
};

// X と Facebook の URL は仮置き（後で実アカウントに差し替え）
export const socialLinks: readonly SocialLink[] = [
  {
    id: "x",
    label: "X",
    handle: "@your-account",
    href: "https://x.com/your-account",
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@takuma.future.illust.gallery",
    href: "https://www.instagram.com/takuma.future.illust.gallery/",
  },
  {
    id: "facebook",
    label: "Facebook",
    handle: "your-account",
    href: "https://www.facebook.com/your-account",
  },
] as const;
