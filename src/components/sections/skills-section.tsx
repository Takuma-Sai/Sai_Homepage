import { SectionHeading } from "@/components/ui/section-heading";
import { skillGroups } from "@/lib/content/site-content";

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-24">
      <SectionHeading
        eyebrow="Skills"
        title="技術スタック"
        lead="業務で使っている主な技術です。"
      />

      {/* 点描の下地に載せたデータ面 */}
      <div className="dot-field mt-10 grid gap-10 border border-line p-7 sm:grid-cols-3 sm:p-9">
        {skillGroups.map((group) => (
          <div key={group.category}>
            <h3 className="font-mono text-[0.72rem] tracking-[0.2em] text-signal-pale/80 uppercase">
              {group.category}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-2.5 text-sm text-muted-strong"
                >
                  <span
                    aria-hidden="true"
                    className="size-1 shrink-0 translate-y-[-0.15em] bg-signal-deep"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
