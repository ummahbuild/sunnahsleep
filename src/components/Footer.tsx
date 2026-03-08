import { Link } from 'react-router-dom';
import { Moon, Droplets, Download, ExternalLink, BookOpen, FileText, Shield, Scale } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-[hsl(var(--midnight))]">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* App */}
          <div>
            <h4 className="text-gold text-sm font-semibold mb-3 flex items-center gap-2">
              <Moon className="h-4 w-4" /> App
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/app" className="text-cream-dim hover:text-gold transition-colors">Dashboard</Link></li>
              <li><Link to="/install" className="text-cream-dim hover:text-gold transition-colors flex items-center gap-1"><Download className="h-3 w-3" />Install</Link></li>
              <li><Link to="/demo" className="text-cream-dim hover:text-gold transition-colors">Demo</Link></li>
              <li><Link to="/guides" className="text-cream-dim hover:text-gold transition-colors">Guides</Link></li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h4 className="text-gold text-sm font-semibold mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> Learn
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/wudu" className="text-cream-dim hover:text-gold transition-colors flex items-center gap-1"><Droplets className="h-3 w-3" />Wudu Guide</Link></li>
              <li><Link to="/prophetic-sleep" className="text-cream-dim hover:text-gold transition-colors">Prophetic Sleep</Link></li>
              <li><Link to="/blog" className="text-cream-dim hover:text-gold transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-gold text-sm font-semibold mb-3 flex items-center gap-2">
              <Scale className="h-4 w-4" /> Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-cream-dim hover:text-gold transition-colors flex items-center gap-1"><Shield className="h-3 w-3" />Privacy</Link></li>
              <li><Link to="/terms" className="text-cream-dim hover:text-gold transition-colors flex items-center gap-1"><FileText className="h-3 w-3" />Terms</Link></li>
              <li><Link to="/legal" className="text-cream-dim hover:text-gold transition-colors">Legal</Link></li>
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
              className="text-gold text-sm hover:underline inline-flex items-center gap-1"
            >
              Ummah.Build <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Moon className="h-5 w-5 text-gold" />
            <span className="font-arabic text-gold text-lg">SunnahSleep</span>
          </div>
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Ummah.Build · Made with ❤️ for the Ummah
          </p>
        </div>
      </div>
    </footer>
  );
}
