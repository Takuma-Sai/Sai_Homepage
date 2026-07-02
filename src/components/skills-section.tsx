import { KeywordTags } from "@/components/keyword-tags";
import { SectionCard } from "@/components/section-card";
import { skillGroups } from "@/lib/site-content";

export function SkillsSection() {
  return (
    <SectionCard id="skills" eyebrow="Skills" title="スキル" className="reveal">
      <div className="mt-6 space-y-6">
        {skillGroups.map((group) => (
          <div key={group.category}>
            <h3 className="mb-3 text-sm font-medium text-foreground">
              {group.category}
            </h3>
            <KeywordTags items={group.items} />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
