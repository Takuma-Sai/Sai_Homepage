import { SocialLinks } from "@/components/ui/social-links";
import { profile, socialLinks } from "@/lib/content/site-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <SocialLinks items={socialLinks} variant="icon" />
      </div>
    </footer>
  );
}
