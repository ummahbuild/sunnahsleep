import { Link } from 'react-router-dom';
import { useMemo, useState, useCallback } from 'react';
import {
  Moon, Download, Shield, Wifi, ArrowLeft, CheckCircle2, ChevronDown,
  BookOpen, Clock, Lock, Bell, Share2, Smartphone,
  ExternalLink, Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePageMeta } from '@/hooks/usePageMeta';
import { getDeviceType, APP_STORE_LINKS } from '@/lib/deviceDetection';
import { StoreBadges } from '@/components/landing/StoreBadges';
import { Footer } from '@/components/Footer';
import badgeAppStore from '@/assets/badge-appstore.png';
import badgePlayStore from '@/assets/badge-playstore.png';

const APK_URL = '/app/sunnah-sleep.apk';
const APK_SIZE = '~15 MB';
const APK_VERSION = '1.0.0';
const SHARE_URL = 'https://sunnahsleep.app/download';
const SHARE_TEXT = 'Download SunnahSleep — the free Islamic bedtime companion app. Follow the Prophetic ﷺ sleep routine every night.';

const FEATURES = [
  { icon: BookOpen, title: 'Sunnah Checklist', desc: '15+ authentic Hadith-sourced steps' },
  { icon: Clock, title: 'Prayer Alarms', desc: 'Fajr, Tahajjud & Qailulah reminders' },
  { icon: Lock, title: '100% Private', desc: 'All data stays on your device' },
  { icon: Wifi, title: 'Offline Ready', desc: 'Works without internet connection' },
  { icon: Star, title: 'Quran Audio', desc: 'Mishary Al-Afasy recitations' },
  { icon: Bell, title: 'Smart Alarms', desc: 'Location-based prayer times' },
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
    a: 'Yes. The APK is built directly from our open codebase. For most users we recommend Google Play — the APK is an alternative if you prefer a direct install. You can verify the app by checking the package name and publisher.',
  },
  {
    q: 'What\'s the difference between the APK and PWA?',
    a: 'The APK is a native Android app with better background alarm support and home screen integration. The PWA works on any device through the browser — install it from the address bar or share menu. Both have the same features.',
  },
];

const APK_STEPS = [
  { title: 'Download the APK', desc: 'Tap the button above to download sunnah-sleep.apk to your device.' },
  { title: 'Allow unknown sources', desc: 'Open Settings → Security → enable "Install from unknown sources" for your browser.' },
  { title: 'Open the file', desc: 'Tap the downloaded file (check your notifications or Downloads folder).' },
  { title: 'Install & enjoy', desc: 'Tap "Install" and open SunnahSleep from your home screen.' },
];

const IOS_STEPS = [
  { title: 'Open in Safari', desc: 'Open sunnahsleep.app in Safari (required for iOS PWA install).' },
  { title: 'Tap the Share button', desc: 'Tap the share icon at the bottom (or top) of Safari.' },
  { title: '"Add to Home Screen"', desc: 'Scroll down and tap "Add to Home Screen."' },
  { title: 'Tap "Add"', desc: 'SunnahSleep appears on your home screen — launches like a native app.' },
];

const DESKTOP_STEPS = [
  { title: 'Open in Chrome or Edge', desc: 'Visit sunnahsleep.app in Chrome, Edge, or another Chromium browser.' },
  { title: 'Click the install icon', desc: 'Look for the ⊕ or download icon in the address bar.' },
  { title: 'Click "Install"', desc: 'Confirm the install prompt. SunnahSleep opens in its own window.' },
];

/* ---------- sub-components ---------- */

function FAQItem({ q, a, isOpen, toggle }: { q: string; a: string; isOpen: boolean; toggle: () => void }) {
  return (
    <div className="border-b border-border/50 last:border-0">
      <button
        onClick={toggle}
        className="w-full py-4 flex items-center justify-between text-left gap-4 group"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-foreground group-hover:text-primary transition-colors">{q}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-48 pb-4' : 'max-h-0'}`}
        aria-hidden={!isOpen}
      >
        <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

function InstallSteps({ steps, label }: { steps: typeof APK_STEPS; label: string }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        {label}
      </h3>
      <ol className="space-y-4">
        {steps.map((step, i) => (
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
    </div>
  );
}

/* ---------- page ---------- */

export default function DownloadPage() {
  const device = useMemo(() => getDeviceType(), []);
  const isAndroid = device === 'android';
  const isIOS = device === 'ios';
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [dlState, setDlState] = useState<'idle' | 'downloading' | 'done'>('idle');

  const handleDownload = useCallback(() => {
    setDlState('downloading');
    setTimeout(() => setDlState('done'), 3000);
  }, []);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'SunnahSleep', text: SHARE_TEXT, url: SHARE_URL });
      } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(SHARE_URL);
    }
  }, []);

  usePageMeta({
    title: 'Download SunnahSleep — Free Islamic Sleep App',
    description: 'Download SunnahSleep for Android (APK) or install as PWA on iPhone & desktop. Prophetic bedtime routine with Quran, Tasbih, sleep tracking & Fajr alarms. Free, private, no ads.',
    canonical: 'https://sunnahsleep.app/download',
    keywords: [
      'download SunnahSleep', 'SunnahSleep APK', 'Islamic sleep app download',
      'Muslim bedtime app Android', 'Sunnah sleep app', 'Islamic app APK',
      'Quran sleep app', 'install Islamic app iPhone', 'PWA Islamic app',
    ],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'SunnahSleep',
        operatingSystem: 'Android, iOS, Windows, macOS',
        applicationCategory: 'LifestyleApplication',
        applicationSubCategory: 'Religious',
        downloadUrl: 'https://sunnahsleep.app/app/sunnah-sleep.apk',
        installUrl: 'https://sunnahsleep.app/download',
        softwareVersion: APK_VERSION,
        fileSize: APK_SIZE,
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
        name: isAndroid ? 'How to Install SunnahSleep APK on Android' : isIOS ? 'How to Install SunnahSleep on iPhone' : 'How to Install SunnahSleep on Desktop',
        description: isAndroid
          ? 'Step-by-step guide to install the SunnahSleep APK on your Android device.'
          : isIOS
            ? 'Step-by-step guide to add SunnahSleep to your iPhone home screen.'
            : 'Step-by-step guide to install SunnahSleep as a desktop app.',
        totalTime: 'PT2M',
        step: (isAndroid ? APK_STEPS : isIOS ? IOS_STEPS : DESKTOP_STEPS).map((step, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: step.title,
          text: step.desc,
        })),
      },
    ],
  });

  const dlButtonLabel = dlState === 'downloading' ? 'Downloading…' : dlState === 'done' ? 'Download Complete ✓' : `Download APK (${APK_SIZE})`;

  return (
    <div className="min-h-screen bg-gradient-night flex flex-col">
      {/* Header */}
      <header className="max-w-4xl mx-auto w-full px-6 pt-6 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-sm"
          aria-label="Share this page"
        >
          <Share2 className="h-4 w-4" />
          Share
        </button>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 sm:py-16">
        {/* Hero */}
        <section className="text-center mb-16" aria-labelledby="dl-heading">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Moon className="h-10 w-10 text-primary" />
            <span className="font-arabic text-2xl sm:text-3xl text-gradient-gold">SunnahSleep</span>
          </div>

          <h1 id="dl-heading" className="text-3xl sm:text-4xl lg:text-5xl font-arabic text-foreground leading-tight mb-4">
            {isAndroid
              ? <>Download <span className="text-gradient-gold">SunnahSleep</span> for Android</>
              : isIOS
                ? <>Install <span className="text-gradient-gold">SunnahSleep</span> on iPhone</>
                : <>Get <span className="text-gradient-gold">SunnahSleep</span> on Any Device</>
            }
          </h1>

          <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-base sm:text-lg">
            {isAndroid
              ? 'Get SunnahSleep on Google Play for the best Android experience, or download the APK directly. Follow the Prophetic ﷺ sleep routine with better background alarms and offline support.'
              : isIOS
                ? 'Download SunnahSleep from the App Store, or add the web app to your home screen from Safari — works offline either way.'
                : 'Get the iPhone app on the App Store, Android app on Google Play, install as a PWA, or download the APK. Free on every platform.'
            }
          </p>

          {/* Primary CTA — App Store & Google Play, then APK (Android/desktop), then PWA where relevant */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {APP_STORE_LINKS.appStore.available && (
                <a
                  href={APP_STORE_LINKS.appStore.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 ring-1 ring-border/40 hover:ring-primary/40 transition-[box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  aria-label="Download on the App Store"
                >
                  <img
                    src={badgeAppStore}
                    alt="Download on the App Store"
                    className="h-14 sm:h-16 w-auto"
                    width={200}
                    height={64}
                    loading="eager"
                  />
                </a>
              )}
              {APP_STORE_LINKS.playStore.available && (
                <a
                  href={APP_STORE_LINKS.playStore.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 ring-1 ring-border/40 hover:ring-primary/40 transition-[box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  aria-label="Get it on Google Play"
                >
                  <img
                    src={badgePlayStore}
                    alt="Get it on Google Play"
                    className="h-14 sm:h-16 w-auto"
                    width={200}
                    height={64}
                    loading="eager"
                  />
                </a>
              )}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {(isAndroid || device === 'desktop') && (
                <a href={APK_URL} download="sunnah-sleep.apk" className="inline-block" onClick={handleDownload}>
                  <Button
                    size="lg"
                    className={`gap-2 text-base px-10 glow-gold transition-all ${
                      dlState === 'done'
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-primary text-primary-foreground hover:bg-primary/90'
                    }`}
                    disabled={dlState === 'downloading'}
                  >
                    {dlState === 'done' ? <CheckCircle2 className="h-5 w-5" /> : <Download className="h-5 w-5" />}
                    {dlButtonLabel}
                  </Button>
                </a>
              )}

              {!isAndroid && (
                <Link to="/install">
                  <Button size="lg" variant={isAndroid ? 'outline' : 'default'} className="gap-2 text-base px-10">
                    <Smartphone className="h-5 w-5" />
                    Install as PWA
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-3">
            Version {APK_VERSION} · Android 7.0+ · Free forever · No account needed
          </p>
        </section>

        {/* Trust badges */}
        <section className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground mb-16" aria-label="Trust badges">
          <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-primary" /> 100% Private</span>
          <span className="flex items-center gap-1.5"><Wifi className="h-4 w-4 text-primary" /> Works Offline</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Free Forever</span>
          <span className="flex items-center gap-1.5"><Bell className="h-4 w-4 text-primary" /> Fajr Alarms</span>
          <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-primary" /> No Ads</span>
        </section>

        {/* Features grid */}
        <section className="mb-16" aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-xl font-semibold text-foreground mb-6 text-center">What's Inside</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-card/50 border border-border/30 rounded-xl p-4 text-center hover:border-primary/30 transition-colors">
                <f.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="font-medium text-foreground text-sm">{f.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Install instructions — device-aware */}
        <section className="mb-16" aria-labelledby="install-heading">
          <h2 id="install-heading" className="text-xl font-semibold text-foreground mb-8 text-center">How to Install</h2>
          <div className="max-w-lg mx-auto space-y-10">
            {isAndroid ? (
              <InstallSteps steps={APK_STEPS} label="Android (APK)" />
            ) : isIOS ? (
              <InstallSteps steps={IOS_STEPS} label="iPhone / iPad (Safari)" />
            ) : (
              <>
                <InstallSteps steps={DESKTOP_STEPS} label="Desktop (Chrome / Edge)" />
                <div className="border-t border-border/30 pt-8">
                  <InstallSteps steps={APK_STEPS} label="Android (APK)" />
                </div>
              </>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-xl font-semibold text-foreground mb-6 text-center">Frequently Asked Questions</h2>
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
        <section className="text-center mb-16" aria-labelledby="platforms-heading">
          <h2 id="platforms-heading" className="text-xl font-semibold text-foreground mb-3">All Platforms</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Available on the App Store and Google Play. Install as PWA on any device today.
          </p>
          <StoreBadges device={device} />
        </section>

        {/* Related content — internal linking for SEO */}
        <section aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-xl font-semibold text-foreground mb-6 text-center">Learn More About Sunnah Sleep</h2>
          <nav className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto" aria-label="Related articles">
            {[
              { to: '/prophetic-sleep', label: 'How the Prophet ﷺ Slept', desc: 'Complete guide to Prophetic sleep habits' },
              { to: '/blog/prophetic-sleep-routine-complete-guide', label: 'Prophetic Sleep Routine', desc: 'Step-by-step bedtime Sunnah guide' },
              { to: '/blog/sunnah-sleep-app-complete-guide', label: 'SunnahSleep App Guide', desc: 'How to use every feature' },
              { to: '/wudu', label: 'Wudu Before Sleep', desc: 'Step-by-step ablution guide' },
              { to: '/blog/ayat-al-kursi-benefits-bedtime-protection', label: 'Ayat al-Kursi at Bedtime', desc: 'Benefits & angelic protection' },
              { to: '/blog/tasbih-fatimah-bedtime-dhikr', label: 'Tasbih Fatimah Guide', desc: '33-33-34 bedtime dhikr explained' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-start gap-3 p-3 rounded-lg border border-border/30 hover:border-primary/40 hover:bg-card/40 transition-colors group"
              >
                <ExternalLink className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{link.label}</p>
                  <p className="text-xs text-muted-foreground">{link.desc}</p>
                </div>
              </Link>
            ))}
          </nav>
        </section>
      </main>

      <Footer />
    </div>
  );
}
