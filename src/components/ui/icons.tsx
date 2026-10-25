import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

// 線画アイコン共通の描画設定。色は currentColor で親の文字色に従う
const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function ArrowDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" {...strokeProps} {...props}>
      <path d="M8 3v10M3 8l5 5 5-5" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" {...strokeProps} {...props}>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...strokeProps} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...strokeProps} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
