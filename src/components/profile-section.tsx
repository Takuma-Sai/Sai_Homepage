import { SectionCard } from "@/components/section-card";
import { SocialLinks } from "@/components/social-links";
import { profileFacts, socialLinks } from "@/lib/site-content";

export function ProfileSection() {
  return (
    <SectionCard
      id="profile"
      eyebrow="Profile"
      title="プロフィール"
      className="reveal"
    >
      <dl className="mt-6 grid gap-y-3 text-sm sm:grid-cols-[8rem_1fr]">
        {profileFacts.map((fact) => (
          <div key={fact.label} className="contents">
            <dt className="text-muted">{fact.label}</dt>
            <dd className="text-foreground">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8">
        <SocialLinks items={socialLinks} />
      </div>
    </SectionCard>
  );
}
