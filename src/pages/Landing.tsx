import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Shield, Wifi, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';
import { getDeviceType } from '@/lib/deviceDetection';
import { usePageMeta } from '@/hooks/usePageMeta';
import { StoreBadges } from '@/components/landing/StoreBadges';
import { ReferenceCarousel } from '@/components/landing/ReferenceCarousel';
import { FeatureSteps } from '@/components/landing/FeatureSteps';

/* ─── Stats ─── */
const STATS = [
  { value: '6', label: 'Surahs for sleep', detail: 'Full recitations by Mishary Al-Afasy' },
  { value: '100%', label: 'Free & private', detail: 'No account, no ads, no tracking' },
  { value: '15+', label: 'Checklist items', detail: 'Authentic Hadith-sourced steps' },
  { value: '∞', label: 'Offline capable', detail: 'Works without internet' },
];

const Landing = () => {
  const device = useMemo(() => getDeviceType(), []);

  usePageMeta({
    title: 'SunnahSleep — Islamic Bedtime Companion | Prophetic Sleep Routine',
    description: 'Follow the Sunnah before sleep. Checklist, Quran recitations, Tasbih, Tahajjud alarms, sleep tracker. Free, private, offline. By Ummah.Build.',
    canonical: 'https://sunnahsleep.app/',
    keywords: ['Islamic sleep', 'Sunnah sleep', 'bedtime dua', 'Ayat al-Kursi', 'Tahajjud', 'Muslim sleep routine', 'Quran before bed', 'prophetic sleep', 'Islamic app'],
  });

  return (
    <div className="min-h-screen bg-gradient-night">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden islamic-pattern">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <Moon className="h-12 w-12 text-primary animate-pulse-slow" />
              <div className="absolute inset-0 blur-lg bg-primary/30 animate-glow" />
            </div>
            <span className="font-arabic text-3xl sm:text-4xl text-gradient-gold">SunnahSleep</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-arabic text-foreground leading-tight mb-4">
            Sleep the Way the
            <span className="text-gradient-gold block sm:inline"> Prophet ﷺ Taught</span>
          </h1>

          <p className="text-cream-dim text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Your complete Prophetic bedtime companion — checklist, Quran recitations, Tasbih, sleep timer & Tahajjud alarms. All based on authentic Hadith.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link to="/app">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-base px-8 glow-gold">
                <Moon className="h-5 w-5" /> Start Your Routine
              </Button>
            </Link>
            <Link to="/demo">
              <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 gap-2 text-base">
                Watch Demo <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-cream-dim">
            <span className="flex items-center gap-1"><Shield className="h-3.5 w-3.5 text-primary" /> 100% Private</span>
            <span className="flex items-center gap-1"><Wifi className="h-3.5 w-3.5 text-primary" /> Works Offline</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Free Forever</span>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section className="border-y border-border bg-[hsl(var(--midnight-light))]">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl sm:text-4xl font-arabic text-primary mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-foreground">{stat.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ FEATURE STEPS ═══════════════ */}
      <FeatureSteps />

      {/* ═══════════════ QURAN & HADITH CAROUSEL ═══════════════ */}
      <section className="bg-[hsl(var(--midnight-light))] border-y border-border py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-arabic text-foreground mb-3">
              What the <span className="text-gradient-gold">Quran & Sunnah</span> Say About Sleep
            </h2>
            <p className="text-cream-dim max-w-lg mx-auto text-sm">
              Every feature in SunnahSleep is grounded in authentic sources. Tap to explore in the app.
            </p>
          </div>

          <ReferenceCarousel />
        </div>
      </section>

      {/* ═══════════════ DEVICE-AWARE INSTALL ═══════════════ */}
      <section className="max-w-5xl mx-auto px-6 py-16 sm:py-24 text-center">
        <h2 className="text-2xl sm:text-3xl font-arabic text-foreground mb-3">
          Get <span className="text-gradient-gold">SunnahSleep</span> on Your Device
        </h2>
        <p className="text-cream-dim max-w-lg mx-auto mb-8 text-sm">
          Download the Android APK now. App Store and Google Play versions coming soon.
        </p>
        <StoreBadges device={device} />
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <Footer />
    </div>
  );
};

export default Landing;
