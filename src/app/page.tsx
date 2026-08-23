import Link from "next/link";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { GlobeCanvas } from "@/components/globe-canvas";
import { KeywordTags } from "@/components/keyword-tags";
import { SkillsSection } from "@/components/skills-section";
import { WorksSection } from "@/components/works-section";
import { keywords, profile } from "@/lib/site-content";

export default function Home() {
  return (
    <>
      {/* Hero */}
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
            <span
              aria-hidden="true"
              className="size-1.5 bg-signal shadow-[0_0_12px_rgba(103,232,249,0.7)]"
            />
            AI Engineer
          </p>

          <h1 className="gradient-text font-display text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Takuma Sai
          </h1>

          <p className="mt-3 text-xl tracking-[0.3em] text-muted-strong sm:text-2xl">
            崔 拓真
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-2">
            <KeywordTags items={keywords} />
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-6 py-3 text-sm text-foreground backdrop-blur-sm hover:border-signal/50 hover:bg-white/8"
            >
              プロフィール
              <svg
                className="size-4"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path
                  d="M8 3v10M3 8l5 5 5-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <Link
              href={`mailto:${profile.email}`}
              className="inline-flex items-center rounded-full bg-cyan-600 px-6 py-3 text-sm font-medium text-white hover:bg-cyan-500"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>

      {/* Content sections */}
      <main className="relative mx-auto w-full max-w-5xl space-y-28 px-6 pb-36 sm:px-8 sm:space-y-36">
        <AboutSection />
        <SkillsSection />
        <WorksSection />
        <ContactSection />
      </main>
    </>
  );
}
