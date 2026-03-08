import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { Moon, Download, Shield, Wifi, Smartphone, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePageMeta } from '@/hooks/usePageMeta';
import { getDeviceType } from '@/lib/deviceDetection';
import { StoreBadges } from '@/components/landing/StoreBadges';
import { Footer } from '@/components/Footer';

const APK_URL = '/app/sunnah-sleep.apk';
const APK_SIZE = '~15 MB';
const APK_VERSION = '1.0.0';

export default function DownloadPage() {
  const device = useMemo(() => getDeviceType(), []);

  usePageMeta({
    title: 'Download SunnahSleep APK — Free Islamic Sleep App for Android',
    description: 'Download the SunnahSleep Android APK. Follow the Prophetic bedtime routine with Quran recitations, Tasbih, sleep tracking & Fajr alarms. Free, private, no ads.',
    canonical: 'https://sunnahsleep.app/download',
    keywords: ['download SunnahSleep', 'SunnahSleep APK', 'Islamic sleep app download', 'Muslim bedtime app Android'],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'SunnahSleep',
        operatingSystem: 'Android',
        applicationCategory: 'LifestyleApplication',
        downloadUrl: 'https://sunnahsleep.app/app/sunnah-sleep.apk',
        softwareVersion: APK_VERSION,
        fileSize: APK_SIZE,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        author: { '@type': 'Organization', name: 'Ummah.Build', url: 'https://ummah.build' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'SunnahSleep', item: 'https://sunnahsleep.app/' },
          { '@type': 'ListItem', position: 2, name: 'Download', item: 'https://sunnahsleep.app/download' },
        ],
      },
    ],
  });

  return (
    <div className="min-h-screen bg-gradient-night flex flex-col">
      {/* Header */}
      <header className="max-w-3xl mx-auto w-full px-6 pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12 sm:py-20">
        {/* Hero */}
        <div className="text-center mb-12">
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
          <a href={APK_URL} download="sunnah-sleep.apk">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-base px-10 glow-gold">
              <Download className="h-5 w-5" />
              Download APK ({APK_SIZE})
            </Button>
          </a>

          <p className="text-xs text-muted-foreground mt-3">
            Version {APK_VERSION} · Android 7.0+
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground mb-16">
          <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-primary" /> 100% Private</span>
          <span className="flex items-center gap-1.5"><Wifi className="h-4 w-4 text-primary" /> Works Offline</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Free Forever</span>
        </div>

        {/* Install instructions */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-foreground mb-6 text-center">How to Install the APK</h2>
          <ol className="space-y-4 max-w-lg mx-auto">
            {[
              { title: 'Download the APK', desc: 'Tap the button above to download sunnah-sleep.apk to your device.' },
              { title: 'Allow unknown sources', desc: 'Open Settings → Security → enable "Install from unknown sources" for your browser.' },
              { title: 'Open the file', desc: 'Tap the downloaded file (check your notifications or Downloads folder).' },
              { title: 'Install & enjoy', desc: 'Tap "Install" and open SunnahSleep from your home screen.' },
            ].map((step, i) => (
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

        {/* All platforms */}
        <section className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-3">All Platforms</h2>
          <p className="text-sm text-muted-foreground mb-6">
            App Store and Google Play versions coming soon.
          </p>
          <StoreBadges device={device} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
