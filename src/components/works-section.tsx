import { SectionCard } from "@/components/section-card";
import { works } from "@/lib/site-content";

export function WorksSection() {
  return (
    <SectionCard id="works" eyebrow="Works" title="実績" className="reveal">
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {works.map((work) => (
          <li
            key={work.title}
            className="rounded-xl border border-line bg-white/[0.02] p-5 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-cyan-500/40"
          >
            <h3 className="font-display text-base font-medium text-foreground">
              {work.title}
            </h3>
            <p className="mt-2 text-sm text-muted text-pretty">
              {work.description}
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {work.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line bg-white/5 px-2.5 py-0.5 font-mono text-[11px] text-muted-strong"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
