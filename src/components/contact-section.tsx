import Link from "next/link";
import { SectionCard } from "@/components/section-card";
import { profile } from "@/lib/site-content";

export function ContactSection() {
  return (
    <SectionCard
      id="contact"
      eyebrow="Contact"
      title="お問い合わせ"
      className="reveal"
    >
      <p className="mt-6 text-sm text-muted text-pretty">
        お問い合わせは下記のメールアドレスまで。
      </p>
      <Link
        href={`mailto:${profile.email}`}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-5 py-2.5 text-sm text-muted-strong backdrop-blur-sm hover:border-cyan-500/50 hover:text-cyan-300 hover:-translate-y-0.5"
      >
        {profile.email}
      </Link>
    </SectionCard>
  );
}
