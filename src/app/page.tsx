import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { WorksSection } from "@/components/sections/works-section";

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Content sections */}
      <main className="relative mx-auto w-full max-w-5xl space-y-24 px-6 pb-28 sm:px-8 sm:space-y-28">
        <AboutSection />
        <SkillsSection />
        <WorksSection />
        <ContactSection />
      </main>
    </>
  );
}
