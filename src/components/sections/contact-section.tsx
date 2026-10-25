import { SectionHeading } from "@/components/ui/section-heading";
import { SocialLinks } from "@/components/ui/social-links";
import { profile, socialLinks } from "@/lib/content/site-content";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24">
      <SectionHeading
        eyebrow="Contact"
        title="お問い合わせ"
        lead="制作やAI活用のご相談は、メールからお気軽にどうぞ。"
      />

      <div className="mt-10 grid gap-10 border border-line p-7 sm:p-9 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="font-mono text-[0.7rem] tracking-[0.2em] text-muted uppercase">
            Email
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-2 inline-block font-mono text-xl break-all text-foreground hover:text-signal-pale sm:text-2xl"
          >
            {profile.email}
          </a>
        </div>

        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-signal/40 bg-signal/10 px-7 py-3.5 text-sm font-medium text-signal-pale hover:border-signal hover:bg-signal/20"
        >
          メールを書く
          <svg
            className="size-4"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      <div className="mt-8">
        <p className="font-mono text-[0.7rem] tracking-[0.2em] text-muted uppercase">
          Elsewhere
        </p>
        <div className="mt-4">
          <SocialLinks items={socialLinks} />
        </div>
      </div>
    </section>
  );
}
