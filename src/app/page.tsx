import Image from "next/image";
import Link from "next/link";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { KeywordTags } from "@/components/keyword-tags";
import { ProfileSection } from "@/components/profile-section";
import { SkillsSection } from "@/components/skills-section";
import { WorksSection } from "@/components/works-section";
import { keywords, profile } from "@/lib/site-content";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
        {/* Background image */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Image
            src="/images/image_1.png"
            alt=""
            fill
            priority
            className="hero-parallax object-cover object-center"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/65" />
          {/* Subtle cool tint to blend with site palette */}
          <div className="absolute inset-0 bg-sky-950/20" />
          {/* Gradient fade to page background at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-background" />
        </div>

        <div className="animate-fade-up">
          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-muted uppercase">
            AI Engineer
          </p>

          <h1 className="gradient-text font-display text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Takuma Sai
          </h1>

          <p className="mt-2 font-display text-xl tracking-widest text-muted-strong sm:text-2xl">
            崔 拓真
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <KeywordTags items={keywords} />
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-6 py-3 text-sm text-foreground backdrop-blur-sm hover:border-cyan-500/50 hover:bg-white/8"
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
      <main className="relative mx-auto w-full max-w-3xl space-y-6 px-6 pb-32 sm:px-8">
        <AboutSection />
        <ProfileSection />
        <SkillsSection />
        <WorksSection />
        <ContactSection />
      </main>
    </>
  );
}
