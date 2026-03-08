import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Moon, Shield, Wifi, Bell, BookOpen, ListChecks, Headphones, Clock, ChevronRight, Star, Download, Smartphone, Apple, Play, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';
import { getDeviceType, APP_STORE_LINKS, type DeviceType } from '@/lib/deviceDetection';
import { usePageMeta } from '@/hooks/usePageMeta';

/* ─── Quran & Hadith references about sleep ─── */
const SLEEP_REFERENCES = [
  {
    type: 'quran' as const,
    arabic: 'وَهُوَ الَّذِي جَعَلَ لَكُمُ اللَّيْلَ لِبَاسًا وَالنَّوْمَ سُبَاتًا',
    translation: '"He is the One who made the night for you as a covering, and sleep as a means of rest."',
    source: 'Surah Al-Furqan 25:47',
    url: 'https://quran.com/25/47',
  },
  {
    type: 'quran' as const,
    arabic: 'وَمِنْ آيَاتِهِ مَنَامُكُم بِاللَّيْلِ وَالنَّهَارِ',
    translation: '"And among His signs is your sleep by night and day, and your seeking of His bounty."',
    source: 'Surah Ar-Rum 30:23',
    url: 'https://quran.com/30/23',
  },
  {
    type: 'quran' as const,
    arabic: 'وَجَعَلْنَا نَوْمَكُمْ سُبَاتًا',
    translation: '"And We have made your sleep as a thing for rest."',
    source: 'Surah An-Naba 78:9',
    url: 'https://quran.com/78/9',
  },
  {
    type: 'hadith' as const,
    arabic: '',
    translation: '"When you go to your bed, perform ablution like that for prayer, then lie on your right side."',
    source: 'Sahih al-Bukhari 247',
    url: 'https://sunnah.com/bukhari:247',
  },
  {
    type: 'hadith' as const,
    arabic: '',
    translation: '"Whoever recites Ayat al-Kursi before sleeping, Allah will send a guardian angel and no devil will come near until morning."',
    source: 'Sahih al-Bukhari 5010',
    url: 'https://sunnah.com/bukhari:5010',
  },
  {
    type: 'hadith' as const,
    arabic: '',
    translation: '"Our Lord descends every night to the lowest heaven during the last third of the night and says: Who is calling upon Me that I may answer?"',
    source: 'Sahih al-Bukhari 1145',
    url: 'https://sunnah.com/bukhari:1145',
  },
  {
    type: 'hadith' as const,
    arabic: '',
    translation: '"Take the Qailulah (midday nap), for the devils do not take a midday nap."',
    source: "Sahih al-Jami' 4431",
    url: 'https://sunnah.com/search?q=qailulah',
  },
];

/* ─── Feature steps (mirrors the app flow) ─── */
const FEATURE_STEPS = [
  {
    step: 1,
    icon: ListChecks,
    title: 'Sunnah Bedtime Checklist',
    description: 'Follow the Prophetic routine step by step — from Isha prayer to wudu to lying on your right side.',
    color: 'text-gold',
  },
  {
    step: 2,
    icon: BookOpen,
    title: 'Quran Recitations & Duas',
    description: 'Ayat al-Kursi, Three Quls, last two verses of Al-Baqarah, and bedtime duas — with audio and Arabic text.',
    color: 'text-teal',
  },
  {
    step: 3,
    icon: Star,
    title: 'Tasbih Counter (33-33-34)',
    description: 'Complete the dhikr the Prophet ﷺ recommended: 33 SubhanAllah, 33 Alhamdulillah, 34 Allahu Akbar.',
    color: 'text-gold',
  },
  {
    step: 4,
    icon: Headphones,
    title: 'Quran Sleep Player',
    description: 'Fall asleep to full surah recitations — Al-Mulk, Yaseen, Ar-Rahman and more. Sleep timer included.',
    color: 'text-teal',
  },
  {
    step: 5,
    icon: Bell,
    title: 'Tahajjud & Fajr Alarms',
    description: 'Location-based prayer alarms. Wake for Tahajjud in the blessed last third of the night.',
    color: 'text-gold',
  },
  {
    step: 6,
    icon: Clock,
    title: 'Sleep Tracker',
    description: 'Track your Isha-to-Fajr sleep window. See weekly stats, streaks, and consistency — all local.',
    color: 'text-teal',
  },
];

/* ─── Stats ─── */
const STATS = [
  { value: '6', label: 'Surahs for sleep', detail: 'Full recitations by Mishary Al-Afasy' },
  { value: '100%', label: 'Free & private', detail: 'No account, no ads, no tracking' },
  { value: '15+', label: 'Checklist items', detail: 'Authentic Hadith-sourced steps' },
  { value: '∞', label: 'Offline capable', detail: 'Works without internet' },
];

function DeviceInstallCTA({ device }: { device: DeviceType }) {
  const { apk, appStore, playStore } = APP_STORE_LINKS;

  if (device === 'ios') {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        {appStore.available ? (
          <a href={appStore.url}>
            <Button className="bg-foreground text-background hover:bg-foreground/90 gap-2 w-full sm:w-auto">
              <Apple className="h-5 w-5" /> Download on App Store
            </Button>
          </a>
        ) : (
          <Button disabled className="gap-2 opacity-60 cursor-not-allowed">
            <Apple className="h-5 w-5" /> App Store — Coming Soon
          </Button>
        )}
        <Link to="/install">
          <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10 gap-2 w-full sm:w-auto">
            <Download className="h-4 w-4" /> Install as PWA
          </Button>
        </Link>
      </div>
    );
  }

  if (device === 'android') {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        {apk.available ? (
          <a href={apk.url} download>
            <Button className="bg-gold text-[hsl(var(--midnight))] hover:bg-gold/90 gap-2 w-full sm:w-auto">
              <Download className="h-5 w-5" /> Download APK
            </Button>
          </a>
        ) : null}
        {playStore.available ? (
          <a href={playStore.url}>
            <Button className="bg-foreground text-background hover:bg-foreground/90 gap-2 w-full sm:w-auto">
              <Play className="h-5 w-5" /> Get on Google Play
            </Button>
          </a>
        ) : (
          <Button disabled className="gap-2 opacity-60 cursor-not-allowed">
            <Play className="h-5 w-5" /> Google Play — Coming Soon
          </Button>
        )}
        <Link to="/install">
          <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10 gap-2 w-full sm:w-auto">
            <Smartphone className="h-4 w-4" /> Install as PWA
          </Button>
        </Link>
      </div>
    );
  }

  // Desktop
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Link to="/install">
        <Button className="bg-gold text-[hsl(var(--midnight))] hover:bg-gold/90 gap-2 w-full sm:w-auto">
          <Download className="h-5 w-5" /> Install App (PWA)
        </Button>
      </Link>
      {apk.available && (
        <a href={apk.url} download>
          <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10 gap-2 w-full sm:w-auto">
            <Download className="h-4 w-4" /> Download APK
          </Button>
        </a>
      )}
    </div>
  );
}

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
        {/* Radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <Moon className="h-12 w-12 text-gold animate-pulse-slow" />
              <div className="absolute inset-0 blur-lg bg-gold/30 animate-glow" />
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
              <Button size="lg" className="bg-gold text-[hsl(var(--midnight))] hover:bg-gold/90 gap-2 text-base px-8 glow-gold">
                <Moon className="h-5 w-5" /> Start Your Routine
              </Button>
            </Link>
            <Link to="/demo">
              <Button size="lg" variant="outline" className="border-gold/30 text-gold hover:bg-gold/10 gap-2 text-base">
                Watch Demo <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-cream-dim">
            <span className="flex items-center gap-1"><Shield className="h-3.5 w-3.5 text-gold" /> 100% Private</span>
            <span className="flex items-center gap-1"><Wifi className="h-3.5 w-3.5 text-gold" /> Works Offline</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-gold" /> Free Forever</span>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section className="border-y border-border bg-[hsl(var(--midnight-light))]">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl sm:text-4xl font-arabic text-gold mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-foreground">{stat.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ FEATURE STEPS ═══════════════ */}
      <section className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-arabic text-foreground mb-3">
            Your Nightly Routine, <span className="text-gradient-gold">Step by Step</span>
          </h2>
          <p className="text-cream-dim max-w-xl mx-auto">
            SunnahSleep guides you through the Prophetic bedtime routine — from Isha prayer to waking for Tahajjud.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURE_STEPS.map(({ step, icon: Icon, title, description, color }) => (
            <div
              key={step}
              className="group relative p-6 rounded-2xl bg-gradient-card border border-border hover:border-gold/30 transition-all duration-300"
            >
              {/* Step number */}
              <div className="absolute -top-3 -left-2 w-7 h-7 rounded-full bg-gold text-[hsl(var(--midnight))] text-xs font-bold flex items-center justify-center">
                {step}
              </div>
              <Icon className={`h-8 w-8 ${color} mb-4`} />
              <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-cream-dim leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/app">
            <Button size="lg" className="bg-gold text-[hsl(var(--midnight))] hover:bg-gold/90 gap-2 glow-gold">
              Begin Your Routine <ChevronRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ═══════════════ QURAN & HADITH SCROLL ═══════════════ */}
      <section className="bg-[hsl(var(--midnight-light))] border-y border-border py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-arabic text-foreground mb-3">
              What the <span className="text-gradient-gold">Quran & Sunnah</span> Say About Sleep
            </h2>
            <p className="text-cream-dim max-w-lg mx-auto text-sm">
              Every feature in SunnahSleep is grounded in authentic sources. Here are key references.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {SLEEP_REFERENCES.map((ref, i) => (
              <a
                key={i}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl bg-gradient-card border border-border hover:border-gold/30 transition-all duration-300 block"
              >
                <div className="flex items-start gap-3">
                  <span className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${ref.type === 'quran' ? 'bg-teal/20 text-teal' : 'bg-gold/20 text-gold'}`}>
                    {ref.type === 'quran' ? 'Q' : 'H'}
                  </span>
                  <div className="min-w-0">
                    {ref.arabic && (
                      <p className="font-arabic text-gold/80 text-base mb-2 leading-relaxed">{ref.arabic}</p>
                    )}
                    <p className="text-sm text-foreground leading-relaxed italic">{ref.translation}</p>
                    <p className="text-xs text-muted-foreground mt-2 group-hover:text-gold transition-colors">
                      {ref.source} →
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ DEVICE-AWARE INSTALL ═══════════════ */}
      <section className="max-w-5xl mx-auto px-6 py-16 sm:py-24 text-center">
        <h2 className="text-2xl sm:text-3xl font-arabic text-foreground mb-3">
          Get <span className="text-gradient-gold">SunnahSleep</span> on Your Device
        </h2>
        <p className="text-cream-dim max-w-lg mx-auto mb-8 text-sm">
          {device === 'ios' && 'Available as a PWA — install directly from Safari. Native App Store version coming soon.'}
          {device === 'android' && 'Download the APK directly or install from your browser. Google Play version coming soon.'}
          {device === 'desktop' && 'Install as a Progressive Web App for a native-like experience, or download the Android APK.'}
        </p>
        <DeviceInstallCTA device={device} />
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <Footer />
    </div>
  );
};

export default Landing;
