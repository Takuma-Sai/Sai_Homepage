import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionCardProps = {
  id: string;
  eyebrow: string;
  title: string;
  variant?: "card" | "plain";
  className?: string;
  children: ReactNode;
};

export function SectionCard({
  id,
  eyebrow,
  title,
  variant = "card",
  className,
  children,
}: SectionCardProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24",
        variant === "card" &&
          "rounded-2xl border border-line bg-white/[0.03] p-8 backdrop-blur-sm sm:p-10",
        variant === "plain" && "py-6",
        className
      )}
    >
      <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.15em] text-muted uppercase">
        <span
          aria-hidden="true"
          className="h-px w-6 bg-gradient-to-r from-cyan-400/70 to-transparent"
        />
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      {children}
    </section>
  );
}
