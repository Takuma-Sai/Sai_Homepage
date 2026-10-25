import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SectionMeta } from "@/lib/content/site-content";

type SectionProps = {
  meta: SectionMeta;
  children: ReactNode;
};

/** ナビゲーションの遷移先になるページ内セクション。id と見出しは meta から取る */
export function Section({ meta, children }: SectionProps) {
  return (
    <section id={meta.id} className="scroll-mt-24">
      <SectionHeading eyebrow={meta.eyebrow} title={meta.title} lead={meta.lead} />
      {children}
    </section>
  );
}
