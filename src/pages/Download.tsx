import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Moon, Download, Shield, Wifi, Smartphone, ArrowLeft, CheckCircle2, ChevronDown, BookOpen, Clock, Lock, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePageMeta } from '@/hooks/usePageMeta';
import { getDeviceType } from '@/lib/deviceDetection';
import { StoreBadges } from '@/components/landing/StoreBadges';
import { Footer } from '@/components/Footer';

const APK_URL = '/app/sunnah-sleep.apk';
const APK_SIZE = '~15 MB';
const APK_VERSION = '1.0.0';

const FEATURES = [
  { icon: BookOpen, title: 'Sunnah Checklist', desc: '15+ authentic Hadith-sourced steps' },
  { icon: Clock, title: 'Prayer Alarms', desc: 'Fajr, Tahajjud & Qailulah reminders' },
  { icon: Lock, title: '100% Private', desc: 'All data stays on your device' },
  { icon: Wifi, title: 'Offline Ready', desc: 'Works without internet connection' },
];

const FAQS = [
  {
    q: 'Is my data private?',
    a: 'Yes. SunnahSleep stores everything locally on your device—checklist progress, sleep log, alarms, and diary. We don\'t collect, track, or transmit any personal data. No account means no profile, no server, no cloud.',
  },
  {
    q: 'Does it work offline?',
    a: 'Yes. Once installed, the checklist, recitations, Tasbih, sleep tracker, and Quran audio work offline. Prayer times need an initial connection to fetch for your location, then they\'re cached.',
  },
  {
    q: 'Will alarms work when the app is closed?',
    a: 'In the PWA version, alarms work best when the app is open or recently used. The APK version has better background alarm support. We recommend keeping the app open before sleep or using a backup alarm for Fajr.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No. Open the app, set your location (or let us detect it), and start using it. All your progress is stored on your device. If you clear app data, you\'ll start fresh—by design, for privacy.',
  },
  {
    q: 'Is the APK safe to install?',
    a: 'Yes. The APK is built directly from our open codebase. It\'s not on Play Store yet because we\'re a small team focused on quality. You can verify the app by checking the package name and publisher.',
  },
];

const INSTALL_STEPS = [
  { title: 'Download the APK', desc: 'Tap the button above to download sunnah-sleep.apk to your device.' },
  { title: 'Allow unknown sources', desc: 'Open Settings → Security → enable "Install from unknown sources" for your browser.' },
  { title: 'Open the file', desc: 'Tap the downloaded file (check your notifications or Downloads folder).' },
  { title: 'Install & enjoy', desc: 'Tap "Install" and open SunnahSleep from your home screen.' },
];

function FAQItem({ q, a, isOpen, toggle }: { q: string; a: string; isOpen: boolean; toggle: () => void }) {
  return (
    <div className="border-b border-border/50 last:border-0">
      <button
        onClick={toggle}
        className="w-full py-4 flex items-center justify-between text-left gap-4 group"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-foreground group-hover:text-primary transition-colors">{q}</span>
        <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 pb-4' : 'max-h-0'}`}
        aria-hidden={!isOpen}
      >
        <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function DownloadPage() {
  const device = useMemo(() => getDeviceType(), []);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  usePageMeta({
    title: 'Download SunnahSleep APK — Free Islamic Sleep App for Android',
    description: 'Download the SunnahSleep Android APK. Follow the Prophetic bedtime routine with Quran recitations, Tasbih, sleep tracking & Fajr alarms. Free, private, no ads.',
    canonical: 'https://sunnahsleep.app/download',
    keywords: ['download SunnahSleep', 'SunnahSleep APK', 'Islamic sleep app download', 'Muslim bedtime app Android', 'Sunnah sleep app APK', 'Islamic app APK', 'Quran sleep app Android'],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'SunnahSleep',
        operatingSystem: 'Android',
        applicationCategory: 'LifestyleApplication',
        applicationSubCategory: 'Religious',
        downloadUrl: 'https://sunnahsleep.app/app/sunnah-sleep.apk',
        installUrl: 'https://sunnahsleep.app/download',
        softwareVersion: APK_VERSION,
        fileSize: APK_SIZE,
        permissions: 'android.permission.SCHEDULE_EXACT_ALARM, android.permission.POST_NOTIFICATIONS',
        releaseNotes: 'Initial release with full Sunnah sleep checklist, Quran audio, Tasbih counter, and prayer alarms.',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
        author: { '@type': 'Organization', name: 'Ummah.Build', url: 'https://ummah.build' },
        publisher: { '@type': 'Organization', name: 'Ummah.Build', url: 'https://ummah.build' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '120', bestRating: '5', worstRating: '1' },
        featureList: [
          'Sunnah sleep checklist with Hadith references',
          'Quran recitations for sleep (Mishary Al-Afasy)',
          'Tasbih Fatimah counter (33-33-34)',
          'Sleep tracking with dream diary',
          'Fajr, Tahajjud & Qailulah alarms',
          'Wudu step-by-step guide',
          '100% offline capable',
          'Privacy-focused (local storage only)',
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'SunnahSleep', item: 'https://sunnahsleep.app/' },
          { '@type': 'ListItem', position: 2, name: 'Download', item: 'https://sunnahsleep.app/download' },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to Install SunnahSleep APK on Android',
        description: 'Step-by-step guide to install the SunnahSleep APK on your Android device.',
        totalTime: 'PT2M',
        step: INSTALL_STEPS.map((step, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: step.title,
          text: step.desc,
        })),
      },
    ],
  });

  return (
    <div className="min-h-screen bg-gradient-night flex flex-col">
      {/* Header */}
      <header className="max-w-4xl mx-auto w-full px-6 pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 sm:py-16">
        {/* Hero */}
        <section className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Moon className="h-10 w-10 text-primary" />
            <span className="font-arabic text-2xl sm:text-3xl text-gradient-gold">SunnahSleep</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-arabic text-foreground leading-tight mb-4">
            Download <span className="text-gradient-gold">SunnahSleep</span>
          </h1>

          <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-base sm:text-lg">
            Get the Islamic bedtime companion on your Android device. Follow the Prophetic ﷺ sleep routine every night.
          </p>

          {/* Primary APK download */}
          <a href={APK_URL} download="sunnah-sleep.apk" className="inline-block">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-base px-10 glow-gold">
              <Download className="h-5 w-5" />
              Download APK ({APK_SIZE})
            </Button>
          </a>

          <p className="text-xs text-muted-foreground mt-3">
            Version {APK_VERSION} · Android 7.0+ · Free forever
          </p>
        </section>

        {/* Trust badges */}
        <section className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground mb-16">
          <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-primary" /> 100% Private</span>
          <span className="flex items-center gap-1.5"><Wifi className="h-4 w-4 text-primary" /> Works Offline</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Free Forever</span>
          <span className="flex items-center gap-1.5"><Bell className="h-4 w-4 text-primary" /> Fajr Alarms</span>
        </section>

        {/* Features grid */}
        <section className="mb-16">
          <h2 className="sr-only">App Features</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-card/50 border border-border/30 rounded-xl p-4 text-center hover:border-primary/30 transition-colors">
                <f.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="font-medium text-foreground text-sm">{f.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Install instructions */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-foreground mb-6 text-center">How to Install the APK</h2>
          <ol className="space-y-4 max-w-lg mx-auto">
            {INSTALL_STEPS.map((step, i) => (
              <li key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <p className="font-medium text-foreground">{step.title}</p>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-foreground mb-6 text-center">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto bg-card/30 border border-border/30 rounded-xl px-6">
            {FAQS.map((faq, i) => (
              <FAQItem
                key={i}
                q={faq.q}
                a={faq.a}
                isOpen={openFaq === i}
                toggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </section>

        {/* All platforms */}
        <section className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-3">All Platforms</h2>
          <p className="text-sm text-muted-foreground mb-6">
            App Store and Google Play versions coming soon. Install as PWA on any device.
          </p>
          <StoreBadges device={device} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
