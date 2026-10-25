type SignalDotProps = {
  size?: "sm" | "md";
  /** bright: 常に発光 / deep: 暗色で、親の group にホバーすると発光 */
  tone?: "bright" | "deep";
  className?: string;
};

const sizeClass = {
  sm: "size-1",
  md: "size-1.5",
} as const;

const toneClass = {
  bright: "bg-signal shadow-signal",
  deep: "bg-signal-deep group-hover:bg-signal group-hover:shadow-signal",
} as const;

/**
 * 測点マーカー。ヒーローの地球儀に描かれた弧の終端記号と同じ小さな発光点で、
 * 見出しや一覧の行頭に置いてページ全体の語彙をそろえる。
 */
export function SignalDot({ size = "md", tone = "bright", className }: SignalDotProps) {
  const classes = [sizeClass[size], "shrink-0", toneClass[tone], className]
    .filter(Boolean)
    .join(" ");
  return <span aria-hidden="true" className={classes} />;
}
