import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Moon, ArrowLeft, BookOpen, Home, Download, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_STORE_LINKS } from "@/lib/deviceDetection";

const SUGGESTIONS: (
  | { to: string; label: string; desc: string; icon: typeof Home }
  | { href: string; label: string; desc: string; icon: typeof Smartphone; external: true }
)[] = [
  { to: "/", label: "Home", desc: "Back to the landing page", icon: Home },
  { to: "/app", label: "Open App", desc: "Start your bedtime routine", icon: Moon },
  ...(APP_STORE_LINKS.appStore.available
    ? [{ href: APP_STORE_LINKS.appStore.url, label: "App Store", desc: "iPhone & iPad app", icon: Smartphone, external: true as const }]
    : []),
  { to: "/download", label: "Download", desc: "Android APK & more", icon: Download },
  { to: "/blog", label: "Blog", desc: "Islamic sleep articles", icon: BookOpen },
];

const NotFound = () => {
  const location = useLocation();

  usePageMeta({
    title: "Page Not Found — SunnahSleep",
    description: "The page you are looking for does not exist. Explore SunnahSleep — your free Islamic bedtime companion.",
    noIndex: true,
  });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-night flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Moon className="h-8 w-8 text-primary" />
          <span className="font-arabic text-xl text-gradient-gold">SunnahSleep</span>
        </div>

        <h1 className="text-6xl font-arabic font-bold text-primary mb-3">404</h1>
        <p className="text-lg text-foreground mb-2">Page not found</p>
        <p className="text-sm text-muted-foreground mb-8">
          The page <code className="text-primary/70 bg-primary/10 px-1.5 py-0.5 rounded text-xs">{location.pathname}</code> doesn't exist.
        </p>

        {/* Suggestions */}
        <nav className="grid grid-cols-2 gap-3 mb-8" aria-label="Suggested pages">
          {SUGGESTIONS.map((s) =>
            "external" in s && s.external ? (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 p-4 rounded-xl border border-border/30 hover:border-primary/40 hover:bg-card/40 transition-colors group"
              >
                <s.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{s.label}</span>
                <span className="text-xs text-muted-foreground">{s.desc}</span>
              </a>
            ) : (
              <Link
                key={s.to}
                to={s.to}
                className="flex flex-col items-center gap-1.5 p-4 rounded-xl border border-border/30 hover:border-primary/40 hover:bg-card/40 transition-colors group"
              >
                <s.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{s.label}</span>
                <span className="text-xs text-muted-foreground">{s.desc}</span>
              </Link>
            )
          )}
        </nav>

        <Link to="/">
          <Button variant="outline" className="gap-2 border-primary/30 text-primary hover:bg-primary/10">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
