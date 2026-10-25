import Link from "next/link";
import { MobileNav } from "@/components/layout/mobile-nav";
import { navigation, profile } from "@/lib/content/site-content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/80 backdrop-blur-md">
      <div className="relative mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-display font-semibold tracking-tight text-foreground">
            {profile.nameEn}
          </span>
          <span className="text-xs text-muted">{profile.nameJa}</span>
        </Link>
        <nav className="hidden items-center gap-6 sm:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
