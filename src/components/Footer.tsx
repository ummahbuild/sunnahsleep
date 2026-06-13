import { Link } from 'react-router-dom';
import { Moon, BookOpen, Package } from 'lucide-react';
import { APP_STORE_LINKS } from '@/lib/deviceDetection';
import badgeAppStore from '@/assets/badge-appstore.png';

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-[hsl(var(--midnight))]" role="contentinfo">
      {/* Decorative top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Quranic verse */}
        <div className="text-center mb-10">
          <p className="font-arabic text-gold/60 text-xl mb-2">
            وَهُوَ الَّذِي جَعَلَ لَكُمُ اللَّيْلَ لِبَاسًا وَالنَّوْمَ سُبَاتًا
          </p>
          <p className="text-cream-dim text-sm italic">
            "And it is He who has made the night for you as clothing and sleep [a means for] rest"
          </p>
          <a
            href="https://quran.com/25/47"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground text-xs mt-1 hover:text-gold transition-colors inline-block"
          >
            Surah Al-Furqan 25:47 →
          </a>
        </div>

        {/* Footer grid */}
        <nav className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10" aria-label="Footer navigation">
          {/* App */}
          <div>
            <h4 className="text-gold text-sm font-semibold mb-3 flex items-center gap-2">
              <Moon className="h-4 w-4" /> App
            </h4>
            <ul className="space-y-2 text-sm">
              {APP_STORE_LINKS.appStore.available && (
                <li>
                  <a
                    href={APP_STORE_LINKS.appStore.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block ring-1 ring-border/40 hover:ring-gold/40 transition-[box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                  >
                    <img
                      src={badgeAppStore}
                      alt="Download on the App Store"
                      className="h-10 w-auto"
                      width={120}
                      height={40}
                      loading="lazy"
                    />
                  </a>
                </li>
              )}
              <li><Link to="/app" className="text-cream-dim hover:text-gold transition-colors">Dashboard</Link></li>
              <li><Link to="/install" className="text-cream-dim hover:text-gold transition-colors">Install</Link></li>
              <li><Link to="/demo" className="text-cream-dim hover:text-gold transition-colors">Demo</Link></li>
              <li><Link to="/guides" className="text-cream-dim hover:text-gold transition-colors">Guides</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-gold text-sm font-semibold mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/wudu" className="text-cream-dim hover:text-gold transition-colors">Wudu Guide</Link></li>
              <li><Link to="/prophetic-sleep" className="text-cream-dim hover:text-gold transition-colors">Prophetic Sleep</Link></li>
              <li><Link to="/blog" className="text-cream-dim hover:text-gold transition-colors">Blog</Link></li>
              <li>
                <a
                  href="https://github.com/ummahbuild/sunnahsleep"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-dim hover:text-gold transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-gold text-sm font-semibold mb-3 flex items-center gap-2">
              <Package className="h-4 w-4" /> Products
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://praysap.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-dim hover:text-gold transition-colors"
                >
                  PRAYSAP.com
                </a>
              </li>
              <li>
                <a
                  href="https://habibichilll.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-dim hover:text-gold transition-colors"
                >
                  HabibiChill
                </a>
              </li>
              <li>
                <a
                  href="https://tryramadan.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-dim hover:text-gold transition-colors"
                >
                  TryRamadan
                </a>
              </li>
              <li>
                <a
                  href="https://mosquesteps.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-dim hover:text-gold transition-colors"
                >
                  MosqueSteps
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-gold text-sm font-semibold mb-3">About</h4>
            <p className="text-cream-dim text-sm leading-relaxed mb-3">
              SunnahSleep is a free, open-source Islamic sleep companion. No tracking. No ads. Your data stays on your device.
            </p>
            <a
              href="https://ummah.build"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold text-sm hover:underline"
            >
              Ummah.Build
            </a>
          </div>
        </nav>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Moon className="h-5 w-5 text-gold" />
              <span className="font-arabic text-gold text-lg">SunnahSleep</span>
            </div>
            <nav
              className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm"
              aria-label="Legal"
            >
              <Link to="/privacy" className="text-cream-dim hover:text-gold transition-colors">
                Privacy
              </Link>
              <span className="text-muted-foreground/50 select-none" aria-hidden>
                ·
              </span>
              <Link to="/terms" className="text-cream-dim hover:text-gold transition-colors">
                Terms
              </Link>
              <span className="text-muted-foreground/50 select-none" aria-hidden>
                ·
              </span>
              <Link to="/legal" className="text-cream-dim hover:text-gold transition-colors">
                Legal
              </Link>
            </nav>
            <p className="text-muted-foreground text-xs order-3 md:text-right md:justify-self-end">
              © {new Date().getFullYear()}{' '}
              <a
                href="https://ummah.build"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-gold transition-colors underline-offset-2 hover:underline"
              >
                Ummah.Build
              </a>
              {' '}· Made with ❤️ for the Ummah
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
