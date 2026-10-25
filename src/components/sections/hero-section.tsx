import { GlobeCanvas } from "@/components/effects/globe-canvas";
import { ArrowDownIcon } from "@/components/ui/icons";
import { SignalDot } from "@/components/ui/signal-dot";
import { hero, profile, sections } from "@/lib/content/site-content";

export function HeroSection() {
  const [headlineFirst, headlineSecond] = hero.headline;

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      {/* Background: rotating dot-matrix globe */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="hero-parallax absolute inset-0">
          <GlobeCanvas className="globe-in h-full w-full" />
        </div>
        {/* Vignette for text readability over the globe */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_50%_44%,rgba(5,5,5,0.5)_0%,rgba(5,5,5,0.15)_55%,transparent_78%)]" />
        {/* Gradient fade to page background at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="animate-fade-up">
        <p className="mb-5 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.32em] text-signal-pale/80 uppercase">
          <SignalDot />
          {hero.eyebrow}
        </p>

        {/* 名前はヘッダー、技術は Skills にあるので、ここでは何をしている人かだけを示す */}
        <h1 className="gradient-text text-3xl leading-tight font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          {headlineFirst}
          <br />
          {headlineSecond}
        </h1>

        <p className="mx-auto mt-6 text-sm leading-relaxed text-pretty text-muted-strong [word-break:auto-phrase] sm:text-base">
          {hero.tagline}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`#${sections.about.id}`}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-6 py-3 text-sm text-foreground backdrop-blur-sm hover:border-signal/50 hover:bg-white/8"
          >
            プロフィール
            <ArrowDownIcon className="size-4" />
          </a>
          <a
            href={profile.mailto}
            className="inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-hover"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
