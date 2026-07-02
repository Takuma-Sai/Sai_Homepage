import { SectionCard } from "@/components/section-card";
import { aboutParagraphs } from "@/lib/site-content";

export function AboutSection() {
  return (
    <SectionCard
      id="about"
      eyebrow="About"
      title="自己紹介"
      variant="plain"
      className="reveal"
    >
      <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-muted-strong">
        {aboutParagraphs.map((paragraph) => (
          <p key={paragraph} className="text-pretty">
            {paragraph}
          </p>
        ))}
      </div>
    </SectionCard>
  );
}
