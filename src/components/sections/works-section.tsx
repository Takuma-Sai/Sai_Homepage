import { SectionHeading } from "@/components/ui/section-heading";
import { works } from "@/lib/content/site-content";

export function WorksSection() {
  return (
    <section id="works" className="scroll-mt-24">
      <SectionHeading
        eyebrow="Works"
        title="実績"
        lead="担当した主なプロジェクトです（新しい順）。"
      />

      {/* 目録形式。左に対象、右に内容を置いて縦に読み下せるようにする */}
      <ul className="mt-10 border-t border-line">
        {works.map((work) => (
          <li
            key={work.title}
            className="group grid gap-x-10 gap-y-4 border-b border-line py-7 md:grid-cols-[19rem_1fr]"
          >
            <div>
              <h3 className="flex items-baseline gap-3 font-display text-lg font-medium text-balance text-foreground [word-break:auto-phrase]">
                <span
                  aria-hidden="true"
                  className="size-1.5 shrink-0 translate-y-[-0.2em] bg-signal-deep group-hover:bg-signal group-hover:shadow-[0_0_12px_rgba(103,232,249,0.7)]"
                />
                {work.title}
              </h3>
              <p className="mt-2 pl-[1.125rem] font-mono text-xs tracking-wide text-signal-pale/70">
                {work.period}
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 pl-[1.125rem]">
                {work.tags.map((tag) => (
                  <li
                    key={tag}
                    className="font-mono text-[0.7rem] tracking-wide text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <p className="max-w-[54ch] leading-[1.9] text-pretty text-muted-strong md:pt-0.5">
              {work.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
