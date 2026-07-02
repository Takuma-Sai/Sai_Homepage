import type { CSSProperties } from "react";
import { socialIcons } from "@/components/social-icons";
import type { SocialLink } from "@/lib/site-content";

type SocialLinksProps = {
  items: readonly SocialLink[];
  variant?: "pill" | "icon";
};

export function SocialLinks({ items, variant = "pill" }: SocialLinksProps) {
  if (variant === "icon") {
    return (
      <ul className="flex items-center gap-4">
        {items.map((link) => {
          const Icon = socialIcons[link.id];
          return (
            <li key={link.id}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="text-muted hover:text-foreground hover:scale-110"
              >
                <Icon className="size-5" />
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className="flex flex-wrap gap-3">
      {items.map((link) => {
        const Icon = socialIcons[link.id];
        const style = { "--hover": link.brandColor } as CSSProperties;
        return (
          <li key={link.id}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${link.label} (${link.handle})`}
              style={style}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-2 text-sm text-muted-strong backdrop-blur-sm hover:border-cyan-500/50 hover:text-cyan-300 hover:-translate-y-0.5"
            >
              <Icon className="size-4" />
              <span>{link.handle}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
