import { Link } from 'react-router-dom';
import { Download, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { APP_STORE_LINKS, type DeviceType } from '@/lib/deviceDetection';
import badgeAppStore from '@/assets/badge-appstore.png';
import badgeApk from '@/assets/badge-apk-download.png';
import badgePlayStore from '@/assets/badge-playstore-soon.png';

const BADGE_CLASS = 'h-12 sm:h-14 rounded-lg hover:opacity-90 transition-opacity';

export function StoreBadges({ device }: { device: DeviceType }) {
  const { apk, appStore } = APP_STORE_LINKS;

  return (
    <div className="flex flex-col items-center gap-4" role="group" aria-label="Download options">
      {/* Badge row */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {/* APK Download */}
        <Link to="/download" className="flex-shrink-0" aria-label="Download Android APK">
          <img src={badgeApk} alt="Download Android APK" className={BADGE_CLASS} loading="lazy" width="168" height="56" />
        </Link>

        {/* App Store */}
        {appStore.available ? (
          <a
            href={appStore.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
            aria-label="Download on the App Store"
          >
            <img src={badgeAppStore} alt="Download on the App Store" className={BADGE_CLASS} loading="lazy" width="168" height="56" />
          </a>
        ) : (
          <span className="flex-shrink-0 opacity-70 cursor-not-allowed" aria-label="Coming soon to App Store">
            <img src={badgeAppStore} alt="Coming soon to App Store" className={BADGE_CLASS} loading="lazy" width="168" height="56" />
          </span>
        )}

        {/* Play Store — Coming Soon */}
        <span className="flex-shrink-0 opacity-70 cursor-not-allowed" aria-label="Coming soon to Google Play">
          <img src={badgePlayStore} alt="Coming soon to Google Play" className={BADGE_CLASS} loading="lazy" width="168" height="56" />
        </span>
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
