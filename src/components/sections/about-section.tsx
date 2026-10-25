import { SectionHeading } from "@/components/ui/section-heading";
import { aboutParagraphs, profile, profileFacts } from "@/lib/content/site-content";

export function AboutSection() {
  const [lead, ...rest] = aboutParagraphs;

  return (
    <section id="about" className="scroll-mt-24">
      <SectionHeading eyebrow="About" title="自己紹介" />

      <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-[1fr_15rem]">
        <div>
          <p className="text-lg leading-[1.9] text-pretty text-foreground sm:text-xl">
            {lead}
          </p>
          {rest.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-5 max-w-[60ch] leading-[1.9] text-pretty text-muted-strong"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* 計器の読み取り値としての基礎情報 */}
        <dl className="h-fit border-t border-line pt-5 md:border-t-0 md:border-l md:pt-0 md:pl-8">
          {profileFacts.map((fact) => (
            <div key={fact.label} className="not-first:mt-5">
              <dt className="font-mono text-[0.7rem] tracking-[0.2em] text-muted uppercase">
                {fact.label}
              </dt>
              <dd className="mt-1.5 text-sm break-all text-muted-strong">
                {fact.label === "連絡先" ? (
                  <a
                    href={`mailto:${profile.email}`}
                    className="hover:text-signal-pale"
                  >
                    {fact.value}
                  </a>
                ) : (
                  fact.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
