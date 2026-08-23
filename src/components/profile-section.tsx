import type { ReactNode } from "react";
import { KeywordTags } from "@/components/keyword-tags";
import { SocialLinks } from "@/components/social-links";
import {
  profile,
  skillGroups,
  socialLinks,
  works,
} from "@/lib/site-content";

type ProfileEntry = {
  key: string;
  eyebrow: string;
  title: string;
  body?: string;
  content?: ReactNode;
  anchorId?: string;
};

const profileEntries: readonly ProfileEntry[] = [
  {
    key: "hello",
    eyebrow: "Hello",
    title: profile.name,
    body: `${profile.role}として、生成AIを軸にしたプロダクト開発とエンジニアリングの自動化に取り組んでいます。`,
  },
  {
    key: "focus",
    eyebrow: "Focus / Toolkit",
    title: "課題から、最適な手段を選ぶ",
    body: "クラウド基盤からエージェント設計まで、技術を組み合わせて最後まで形にします。",
    content: <KeywordTags items={["Python", "AWS", "TypeScript", "RAG", "Codex"]} />,
  },
  {
    key: "connect",
    anchorId: "connect",
    eyebrow: "Connect",
    title: "オンラインでつながる",
    body: "制作の記録や日々の発信はこちらからご覧いただけます。",
    content: <SocialLinks items={socialLinks} />,
  },
  {
    key: "skills",
    anchorId: "skills",
    eyebrow: "Skills",
    title: "技術スタック",
    content: (
      <div className="grid gap-5 sm:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.category}>
            <h4 className="mb-2 text-sm font-medium text-balance text-foreground">
              {group.category}
            </h4>
            <KeywordTags items={group.items} />
          </div>
        ))}
      </div>
    ),
  },
  {
    key: "works-primary",
    anchorId: "works",
    eyebrow: "Selected Works / 01",
    title: "AIプロダクト開発",
    content: (
      <div className="space-y-4">
        {works.slice(0, 2).map((work) => (
          <div key={work.title}>
            <h4 className="text-sm font-medium text-balance text-foreground">
              {work.title}
            </h4>
            <p className="mt-1 text-sm text-pretty text-muted-strong">
              {work.description}
            </p>
          </div>
        ))}
      </div>
    ),
  },
  {
    key: "works-automation",
    eyebrow: "Selected Works / 02",
    title: works[2].title,
    body: works[2].description,
    content: <KeywordTags items={works[2].tags} />,
  },
  {
    key: "contact",
    anchorId: "contact",
    eyebrow: "Contact",
    title: "一緒に、次のアイデアを形に",
    body: "制作やAI活用についてのご相談は、メールからお気軽にどうぞ。",
    content: (
      <a
        href={`mailto:${profile.email}`}
        className="inline-flex items-center rounded-full border border-line bg-white/5 px-5 py-2.5 text-sm text-muted-strong hover:-translate-y-0.5 hover:border-cyan-500/50 hover:text-cyan-300"
      >
        {profile.email}
      </a>
    ),
  },
];

export function ProfileSection() {
  return (
    <section
      id="profile"
      className="scroll-mt-24 py-6"
      aria-labelledby="profile-title"
    >
      <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.15em] text-muted uppercase">
        <span
          aria-hidden="true"
          className="h-px w-6 bg-gradient-to-r from-cyan-400/70 to-transparent"
        />
        Profile
      </p>
      <h2
        id="profile-title"
        className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
      >
        プロフィール
      </h2>
      <p className="mt-3 max-w-xl text-sm text-pretty text-muted-strong">
        人となりからスキル・実績・連絡先まで、順にまとめています。
      </p>

      {/* 左に通し番号、右に本文を置くインデックス形式 */}
      <ol className="mt-8">
        {profileEntries.map((entry, index) => (
          <li
            key={entry.key}
            id={entry.anchorId}
            className="grid scroll-mt-24 gap-x-6 gap-y-2 border-t border-line py-8 sm:grid-cols-[3.5rem_1fr] sm:py-10"
          >
            <span className="font-mono text-sm tabular-nums text-cyan-400/70">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <p className="text-xs font-semibold tracking-[0.15em] text-muted uppercase">
                {entry.eyebrow}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold text-balance text-foreground sm:text-2xl">
                {entry.title}
              </h3>
              {entry.body ? (
                <p className="mt-3 text-sm leading-relaxed text-pretty text-muted-strong sm:text-base">
                  {entry.body}
                </p>
              ) : null}
              {entry.content ? <div className="mt-5">{entry.content}</div> : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
