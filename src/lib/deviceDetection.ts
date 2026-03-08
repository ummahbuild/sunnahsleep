export type DeviceType = 'ios' | 'android' | 'desktop';

export function getDeviceType(): DeviceType {
  const ua = navigator.userAgent || navigator.vendor || '';
  if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
    return 'ios';
  }
  if (/android/i.test(ua)) {
    return 'android';
  }
  return 'desktop';
}

export interface AppStoreLinks {
  apk: { url: string; available: boolean };
  appStore: { url: string; available: boolean };
  playStore: { url: string; available: boolean };
}

export const APP_STORE_LINKS: AppStoreLinks = {
  apk: { url: 'https://sunnahsleep.app/download/sunnahsleep.apk', available: true },
  appStore: { url: '#', available: false },
  playStore: { url: '#', available: false },
};
