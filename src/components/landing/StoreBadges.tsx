import { Link } from 'react-router-dom';
import { Download, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { APP_STORE_LINKS, type DeviceType } from '@/lib/deviceDetection';
import badgeAppStore from '@/assets/badge-appstore.png';
import badgeApk from '@/assets/badge-apk-download.png';
import badgePlayStore from '@/assets/badge-playstore-soon.png';

const BADGE_CLASS = 'h-12 sm:h-14 hover:opacity-90 transition-opacity';

export function StoreBadges({ device }: { device: DeviceType }) {
  const { appStore, playStore } = APP_STORE_LINKS;

  return (
    <div className="flex flex-col items-center gap-4" role="group" aria-label="Download options">
      {/* Badge row — App Store, Google Play, then Android APK */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {/* App Store */}
        <a
          href={appStore.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0"
          aria-label="Download on the App Store"
        >
          <img src={badgeAppStore} alt="Download on the App Store" className={BADGE_CLASS} loading="lazy" width="168" height="56" />
        </a>

        {/* Google Play */}
        {playStore.available && (
          <a
            href={playStore.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
            aria-label="Get it on Google Play"
          >
            <img src={badgePlayStore} alt="Get it on Google Play" className={BADGE_CLASS} loading="lazy" width="168" height="56" />
          </a>
        )}

        {/* APK Download */}
        <Link to="/download" className="flex-shrink-0" aria-label="Download Android APK">
          <img src={badgeApk} alt="Download Android APK" className={BADGE_CLASS} loading="lazy" width="168" height="56" />
        </Link>
      </div>

      {/* PWA fallback */}
      <Link to="/install">
        <Button variant="outline" size="sm" className="border-border text-muted-foreground hover:text-gold hover:border-gold/30 gap-2">
          {device === 'desktop' ? <Download className="h-4 w-4" /> : <Smartphone className="h-4 w-4" />}
          Install as PWA
        </Button>
      </Link>
    </div>
  );
}
