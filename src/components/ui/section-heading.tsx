import { SignalDot } from "@/components/ui/signal-dot";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  lead?: string;
};

/**
 * 各セクションの見出し。
 * 測点（小さな四角）＋英字ラベル＋右端まで伸びる破線のリーダーで構成する。
 * ヒーローの点描地球儀に描かれた弧の終端記号と同じ語彙を使い、
 * ページ全体を一つの計器の読み取り面として見せる。
 */
export function SectionHeading({ eyebrow, title, lead }: SectionHeadingProps) {
  return (
    <header>
      <p className="flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.28em] text-signal-pale/75 uppercase">
        <SignalDot />
        {eyebrow}
        <span aria-hidden="true" className="leader h-px flex-1" />
      </p>
      <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 max-w-[56ch] text-base leading-[1.9] text-pretty text-muted-strong">
          {lead}
        </p>
      ) : null}
    </header>
  );
}
