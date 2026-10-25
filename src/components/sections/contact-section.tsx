import { ArrowRightIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SocialLinks } from "@/components/ui/social-links";
import { profile, sections, socialLinks } from "@/lib/content/site-content";

export function ContactSection() {
  return (
    <Section meta={sections.contact}>
      <div className="mt-10 grid gap-10 border border-line p-7 sm:p-9 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="font-mono text-[0.7rem] tracking-[0.2em] text-muted uppercase">
            Email
          </p>
          <a
            href={profile.mailto}
            className="mt-2 inline-block font-mono text-xl break-all text-foreground hover:text-signal-pale sm:text-2xl"
          >
            {profile.email}
          </a>
        </div>

        <a
          href={profile.mailto}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-signal/40 bg-signal/10 px-7 py-3.5 text-sm font-medium text-signal-pale hover:border-signal hover:bg-signal/20"
        >
          メールを書く
          <ArrowRightIcon className="size-4" />
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
    </Section>
  );
}
