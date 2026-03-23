import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '@/hooks/usePageMeta';
import { APP_STORE_LINKS } from '@/lib/deviceDetection';
import badgeAppStore from '@/assets/badge-appstore.png';
import { ArrowLeft, Download, Share, Plus, MoreVertical, Check, Moon, Shield, WifiOff, Bell, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Install() {
  usePageMeta({
    title: 'Install SunnahSleep — App Store, PWA & Home Screen | Free Islamic Sleep App',
    description: 'Download SunnahSleep on the App Store for iPhone & iPad, or install the PWA on Android and desktop. Prophetic bedtime routine with Quran, Tasbih & Fajr alarms. Works offline, 100% private.',
    canonical: 'https://sunnahsleep.app/install',
    keywords: ['install SunnahSleep', 'SunnahSleep App Store', 'add to home screen', 'PWA Islamic app', 'SunnahSleep app', 'install Islamic sleep app', 'SunnahSleep iPhone', 'SunnahSleep Android'],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'SunnahSleep', item: 'https://sunnahsleep.app/' },
          { '@type': 'ListItem', position: 2, name: 'Install', item: 'https://sunnahsleep.app/install' },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is my data private?',
            acceptedAnswer: { '@type': 'Answer', text: 'Yes. SunnahSleep stores everything locally on your device—checklist, sleep log, alarms, diary. We don\'t collect, track, or transmit any personal data.' },
          },
          {
            '@type': 'Question',
            name: 'Does it work offline?',
            acceptedAnswer: { '@type': 'Answer', text: 'Yes. Once installed, the checklist, recitations, Tasbih, sleep tracker, and Quran audio work offline. Prayer times need an initial connection then they\'re cached.' },
          },
          {
            '@type': 'Question',
            name: 'Will alarms work when the app is closed?',
            acceptedAnswer: { '@type': 'Answer', text: 'In a PWA, alarms work best when the app is open or recently used. We recommend keeping the app open before sleep or using a backup alarm for Fajr.' },
          },
          {
            '@type': 'Question',
            name: 'Do I need to create an account?',
            acceptedAnswer: { '@type': 'Answer', text: 'No. Open the app, set your location, and start using it. All progress is stored on your device.' },
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to Install SunnahSleep',
        description: 'Download from the App Store on iPhone & iPad, or install the web app as a PWA from Safari, Chrome, or desktop.',
        totalTime: 'PT2M',
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Choose how to install', text: 'On iPhone or iPad, download SunnahSleep from the App Store, or add the web app from Safari. On Android or desktop, install the PWA from Chrome or Edge.' },
          { '@type': 'HowToStep', position: 2, name: 'Open in browser (PWA)', text: 'For the web app, open sunnahsleep.app in Safari (iOS), Chrome (Android), or Chrome/Edge (desktop).' },
          { '@type': 'HowToStep', position: 3, name: 'Find install option', text: 'Tap Share (iOS), Menu (Android), or look for the install icon in the address bar (desktop).' },
          { '@type': 'HowToStep', position: 4, name: 'Add to Home Screen', text: 'Tap "Add to Home Screen" or "Install" to add SunnahSleep to your device.' },
        ],
      },
    ],
  });

  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop'>('desktop');
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detect platform
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setPlatform('ios');
    } else if (/android/.test(userAgent)) {
      setPlatform('android');
    } else {
      setPlatform('desktop');
    }

    // Check if already installed
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(isInStandaloneMode);
  }, []);

  const IOSInstructions = () => (
    <section className="space-y-6" aria-labelledby="install-ios-heading">
      <h2 id="install-ios-heading" className="text-lg font-semibold text-foreground">
        iPhone & iPad
      </h2>

      {APP_STORE_LINKS.appStore.available && (
        <div className="p-4 rounded-xl bg-secondary/30 border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-2">Option 1: App Store (recommended)</h3>
          <p className="text-sm text-cream-dim mb-4">
            Download the native SunnahSleep app from the App Store for the smoothest experience — full-screen bedtime flow, reliable notifications, and offline Quran audio.
          </p>
          <a
            href={APP_STORE_LINKS.appStore.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block ring-1 ring-border/40 hover:ring-gold/40 transition-[box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
            aria-label="Download on the App Store"
          >
            <img
              src={badgeAppStore}
              alt="Download on the App Store"
              className="h-12 sm:h-14 w-auto hover:opacity-90 transition-opacity"
              width={168}
              height={56}
              loading="eager"
            />
          </a>
        </div>
      )}

      <div className="p-4 rounded-xl bg-secondary/30 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {APP_STORE_LINKS.appStore.available ? 'Option 2: Add the web app (Safari)' : 'Install from Safari (PWA)'}
        </h3>
        <p className="text-sm text-cream-dim mb-4">
          You can also add SunnahSleep to your home screen from Safari — it works like an app and stays private on your device.
        </p>
        <ol className="space-y-4" role="list">
          <li className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold">1</div>
            <div>
              <p className="text-foreground font-medium">Open sunnahsleep.app in Safari</p>
              <p className="text-sm text-cream-dim">iOS only supports &quot;Add to Home Screen&quot; from Safari. Copy the URL into Safari if you opened this page elsewhere.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold">2</div>
            <div>
              <p className="text-foreground font-medium">Tap the Share button</p>
              <p className="text-sm text-cream-dim">Look for the <Share className="inline h-4 w-4" /> icon at the bottom or top of Safari.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold">3</div>
            <div>
              <p className="text-foreground font-medium">Scroll and tap &quot;Add to Home Screen&quot;</p>
              <p className="text-sm text-cream-dim">Find the option with the <Plus className="inline h-4 w-4" /> icon in the share sheet.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold">4</div>
            <div>
              <p className="text-foreground font-medium">Tap &quot;Add&quot;</p>
              <p className="text-sm text-cream-dim">SunnahSleep appears on your home screen — open it like any app.</p>
            </div>
          </li>
        </ol>
      </div>

      <div className="p-4 rounded-xl bg-gold/10 border border-gold/30">
        <p className="text-sm text-cream-dim">
          <strong className="text-gold">Note:</strong> The web app must be added from Safari. Chrome and other browsers on iPhone do not support &quot;Add to Home Screen&quot; for PWAs.
        </p>
      </div>
    </section>
  );

  const AndroidInstructions = () => (
    <section className="space-y-6" aria-labelledby="install-android-heading">
      <h2 id="install-android-heading" className="text-lg font-semibold text-foreground sr-only">Install on Android</h2>
      <div className="p-4 rounded-xl bg-secondary/30 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Install on Android (Chrome)</h3>
        <ol className="space-y-4" role="list">
          <li className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold">1</div>
            <div>
              <p className="text-foreground font-medium">Open this page in Chrome</p>
              <p className="text-sm text-cream-dim">Chrome on Android supports installing PWAs. Other browsers may vary.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold">2</div>
            <div>
              <p className="text-foreground font-medium">Tap the menu</p>
              <p className="text-sm text-cream-dim">Tap the <MoreVertical className="inline h-4 w-4" /> three dots in the top-right corner.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold">3</div>
            <div>
              <p className="text-foreground font-medium">Tap "Install app" or "Add to Home screen"</p>
              <p className="text-sm text-cream-dim">The exact wording depends on your Chrome version. You may also see an "Install" banner at the bottom—tap it for a quick install.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold">4</div>
            <div>
              <p className="text-foreground font-medium">Confirm</p>
              <p className="text-sm text-cream-dim">Tap "Install" in the dialog. SunnahSleep will appear on your home screen and in your app drawer.</p>
            </div>
          </li>
        </ol>
      </div>

      <div className="p-4 rounded-xl bg-gold/10 border border-gold/30">
        <p className="text-sm text-cream-dim">
          <strong className="text-gold">Tip:</strong> If you see an "Install" or "Add SunnahSleep to Home screen" banner at the bottom, tap it for a one-step install.
        </p>
      </div>
    </section>
  );

  const DesktopInstructions = () => (
    <section className="space-y-6" aria-labelledby="install-desktop-heading">
      <h2 id="install-desktop-heading" className="text-lg font-semibold text-foreground sr-only">Install on Desktop</h2>
      <div className="p-4 rounded-xl bg-secondary/30 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Install on Desktop</h3>
        {APP_STORE_LINKS.appStore.available && (
          <p className="text-sm text-cream-dim mb-4">
            Using an iPhone or iPad?{' '}
            <a
              href={APP_STORE_LINKS.appStore.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              Download SunnahSleep from the App Store
            </a>
            {' '}for the native experience — or use the steps below to install the web app on this computer.
          </p>
        )}
        <p className="text-sm text-cream-dim mb-4">Chrome, Edge, and other Chromium-based browsers support installing PWAs. Safari on macOS has limited PWA support.</p>
        <ol className="space-y-4" role="list">
          <li className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold">1</div>
            <div>
              <p className="text-foreground font-medium">Look for the install icon</p>
              <p className="text-sm text-cream-dim">In Chrome or Edge, look for a <Download className="inline h-4 w-4" /> or ⊕ icon in the address bar (right side). You may also find "Install SunnahSleep" in the browser menu.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold">2</div>
            <div>
              <p className="text-foreground font-medium">Click "Install"</p>
              <p className="text-sm text-cream-dim">A prompt will appear. Confirm to add SunnahSleep to your applications.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold">3</div>
            <div>
              <p className="text-foreground font-medium">Launch like a native app</p>
              <p className="text-sm text-cream-dim">SunnahSleep will open in its own window. You can pin it to your taskbar or dock for quick access.</p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-night islamic-pattern">
      <article className="max-w-lg mx-auto px-6 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6 text-gold hover:text-gold/80">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to App
          </Button>
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-gold/10">
            <Moon className="h-8 w-8 text-gold" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Install SunnahSleep</h1>
            <p className="text-sm text-cream-dim">
              {APP_STORE_LINKS.appStore.available
                ? 'App Store for iPhone & iPad, or add the web app to your home screen'
                : 'Add to your home screen'}
            </p>
          </div>
        </div>

        {APP_STORE_LINKS.appStore.available && !isStandalone && (
          <p className="text-center text-sm mb-6">
            <a
              href={APP_STORE_LINKS.appStore.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline font-medium"
            >
              Get SunnahSleep on the App Store →
            </a>
          </p>
        )}

        {isStandalone ? (
          <div className="p-6 rounded-2xl bg-gold/10 border border-gold/30 text-center">
            <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-gold" />
            </div>
            <h2 className="text-xl font-semibold text-gold mb-2">Already Installed!</h2>
            <p className="text-cream-dim">
              You're already using SunnahSleep as an installed app. Enjoy your blessed sleep routine!
            </p>
          </div>
        ) : (
          <>
            {/* Why SunnahSleep */}
            <section className="p-5 rounded-2xl bg-gradient-card border border-border mb-6" aria-labelledby="why-sunnahsleep-heading">
              <h2 id="why-sunnahsleep-heading" className="text-lg font-semibold text-gold mb-2">Why SunnahSleep?</h2>
              <p className="text-sm text-cream-dim mb-4">
                SunnahSleep guides you through the Prophetic bedtime routine—from wudu to recitations to Tahajjud. Based on authentic Hadith, with every source linked to Sunnah.com.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-cream-dim">
                  <Check className="h-5 w-5 text-gold flex-shrink-0" />
                  <span>100% free. No account. No ads.</span>
                </li>
                <li className="flex items-center gap-3 text-cream-dim">
                  <Check className="h-5 w-5 text-gold flex-shrink-0" />
                  <span>Works offline—Quran audio and checklist cached</span>
                </li>
                <li className="flex items-center gap-3 text-cream-dim">
                  <Check className="h-5 w-5 text-gold flex-shrink-0" />
                  <span>Fajr, Tahajjud & prayer alarms that adapt to your location</span>
                </li>
                <li className="flex items-center gap-3 text-cream-dim">
                  <Check className="h-5 w-5 text-gold flex-shrink-0" />
                  <span>Your data stays on your device—we never collect or track</span>
                </li>
              </ul>
            </section>

            {/* Platform-specific instructions */}
            {platform === 'ios' && <IOSInstructions />}
            {platform === 'android' && <AndroidInstructions />}
            {platform === 'desktop' && <DesktopInstructions />}

            {/* Platform switcher */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Showing instructions for:</p>
              <div className="flex justify-center gap-2">
                <Button
                  variant={platform === 'ios' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPlatform('ios')}
                  className={platform === 'ios' ? 'bg-gold text-midnight' : 'border-gold/30 text-gold'}
                >
                  iPhone
                </Button>
                <Button
                  variant={platform === 'android' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPlatform('android')}
                  className={platform === 'android' ? 'bg-gold text-midnight' : 'border-gold/30 text-gold'}
                >
                  Android
                </Button>
                <Button
                  variant={platform === 'desktop' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPlatform('desktop')}
                  className={platform === 'desktop' ? 'bg-gold text-midnight' : 'border-gold/30 text-gold'}
                >
                  Desktop
                </Button>
              </div>
            </div>

            {/* FAQ */}
            <section className="mt-10" aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-gold" />
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="space-y-2">
                <AccordionItem value="privacy" className="rounded-xl border border-border px-4 bg-secondary/20">
                  <AccordionTrigger className="hover:no-underline">
                    <span className="flex items-center gap-2 text-foreground">
                      <Shield className="h-4 w-4 text-gold" />
                      Is my data private?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-cream-dim text-sm">
                    Yes. SunnahSleep stores everything locally on your device—checklist, sleep log, alarms, diary. We don't collect, track, or transmit any personal data. No account means no profile, no server, no cloud.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="offline" className="rounded-xl border border-border px-4 bg-secondary/20">
                  <AccordionTrigger className="hover:no-underline">
                    <span className="flex items-center gap-2 text-foreground">
                      <WifiOff className="h-4 w-4 text-gold" />
                      Does it work offline?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-cream-dim text-sm">
                    Yes. Once installed, the checklist, recitations, Tasbih, sleep tracker, and Quran audio work offline. Prayer times need an initial connection to fetch for your location, then they're cached. Alarms work when the app is open or in the background (subject to browser limits).
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="alarms" className="rounded-xl border border-border px-4 bg-secondary/20">
                  <AccordionTrigger className="hover:no-underline">
                    <span className="flex items-center gap-2 text-foreground">
                      <Bell className="h-4 w-4 text-gold" />
                      Will alarms work when the app is closed?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-cream-dim text-sm">
                    In a PWA, alarms work best when the app is open or recently used. Browser power-saving can limit background execution. We recommend keeping the app open before sleep or using a backup alarm for critical wake times like Fajr. Grant notification permission when prompted for the best experience.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="no-account" className="rounded-xl border border-border px-4 bg-secondary/20">
                  <AccordionTrigger className="hover:no-underline">
                    <span className="flex items-center gap-2 text-foreground">Do I need to create an account?</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-cream-dim text-sm">
                    No. Open the app, set your location (or let us detect it), and start using it. All your progress is stored on your device. If you clear browser data, you'll start fresh—by design, for privacy.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </>
        )}

        <footer className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            Made with ❤️ by{' '}
            <a href="https://ummah.build" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
              Ummah.Build
            </a>
          </p>
        </footer>
      </article>
    </div>
  );
}
