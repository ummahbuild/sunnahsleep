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
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'SunnahSleep',
        alternateName: 'Sunnah Sleep App',
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'Web, iOS, Android',
        url: 'https://sunnahsleep.app',
        description: 'Islamic bedtime companion app to follow the Prophetic Sunnah before sleep. Features include sleep tracking, prayer time alarms, Quran recitation, Tasbih counter, and Tahajjud reminders.',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        author: { '@type': 'Organization', name: 'Ummah.Build', url: 'https://ummah.build' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '120', bestRating: '5' },
        featureList: [
          'Sunnah sleep checklist with Hadith references',
          'Ayat al-Kursi recitation with audio',
          'Tasbih counter (33-33-34)',
          'Sleep tracking with dream diary',
          'Tahajjud & Fajr prayer alarms',
          'Qailulah midday nap reminder',
          'Wudu step-by-step guide',
          '100% offline capable PWA',
          'Privacy-focused (local storage only)',
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is SunnahSleep?',
            acceptedAnswer: { '@type': 'Answer', text: 'SunnahSleep is a free Islamic bedtime companion app that guides Muslims through the authentic Prophetic sleep routine including Quran recitations, bedtime duas, Tasbih, sleep tracking, and prayer alarms. All based on Sahih Hadith.' },
          },
          {
            '@type': 'Question',
            name: 'Is SunnahSleep free?',
            acceptedAnswer: { '@type': 'Answer', text: 'Yes, SunnahSleep is 100% free with no ads, no account required, and no data collection. All your data stays on your device.' },
          },
          {
            '@type': 'Question',
            name: 'What is the Sunnah way to sleep in Islam?',
            acceptedAnswer: { '@type': 'Answer', text: 'The Sunnah way to sleep includes: performing wudu, dusting the bed 3 times, sleeping on your right side, reciting Ayat al-Kursi, the last two verses of Surah Al-Baqarah, the Three Quls, bedtime duas, and completing Tasbih (33 SubhanAllah, 33 Alhamdulillah, 34 Allahu Akbar). Based on Sahih al-Bukhari and Sahih Muslim.' },
          },
          {
            '@type': 'Question',
            name: 'Does SunnahSleep work offline?',
            acceptedAnswer: { '@type': 'Answer', text: 'Yes. SunnahSleep is a Progressive Web App (PWA) that works fully offline after the first load. Quran audio, checklist, and all features are cached on your device.' },
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [{ '@type': 'ListItem', position: 1, name: 'SunnahSleep', item: 'https://sunnahsleep.app/' }],
      },
    ],
  });

  return (
    <div className="min-h-screen bg-gradient-night">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden islamic-pattern" aria-labelledby="hero-heading">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6" role="img" aria-label="SunnahSleep logo">
            <div className="relative">
              <Moon className="h-12 w-12 text-primary animate-pulse-slow" aria-hidden="true" />
              <div className="absolute inset-0 blur-lg bg-primary/30 animate-glow" aria-hidden="true" />
            </div>
            <span className="font-arabic text-3xl sm:text-4xl text-gradient-gold">SunnahSleep</span>
          </div>

          {/* Headline */}
          <h1 id="hero-heading" className="text-3xl sm:text-5xl lg:text-6xl font-arabic text-foreground leading-tight mb-4">
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
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-cream-dim mb-8">
            <span className="flex items-center gap-1"><Shield className="h-3.5 w-3.5 text-primary" /> 100% Private</span>
            <span className="flex items-center gap-1"><Wifi className="h-3.5 w-3.5 text-primary" /> Works Offline</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Free Forever</span>
          </div>

          {/* Store badges */}
          <StoreBadges device={device} />
        </div>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section className="border-y border-border bg-[hsl(var(--midnight-light))]" aria-label="App statistics">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((stat) => (
            <div key={stat.label} role="group" aria-label={`${stat.value} ${stat.label}`}>
              <p className="text-3xl sm:text-4xl font-arabic text-primary mb-1" aria-hidden="true">{stat.value}</p>
              <p className="text-sm font-medium text-foreground">{stat.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ FEATURE STEPS ═══════════════ */}
      <FeatureSteps />

      {/* ═══════════════ QURAN & HADITH CAROUSEL ═══════════════ */}
      <section className="bg-[hsl(var(--midnight-light))] border-y border-border py-16 sm:py-24" aria-labelledby="references-heading">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 id="references-heading" className="text-2xl sm:text-3xl font-arabic text-foreground mb-3">
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
      <section className="max-w-5xl mx-auto px-6 py-16 sm:py-24 text-center" aria-labelledby="install-heading">
        <h2 id="install-heading" className="text-2xl sm:text-3xl font-arabic text-foreground mb-3">
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
