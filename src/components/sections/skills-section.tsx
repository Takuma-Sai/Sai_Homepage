import { Section } from "@/components/ui/section";
import { SignalDot } from "@/components/ui/signal-dot";
import { sections, skillGroups } from "@/lib/content/site-content";

export function SkillsSection() {
  return (
    <Section meta={sections.skills}>
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
                  <SignalDot size="sm" tone="deep" className="translate-y-[-0.15em]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
