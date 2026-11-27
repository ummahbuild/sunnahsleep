import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getDeviceType } from '@/lib/deviceDetection';
import DownloadPage from './Download';

vi.mock('@/hooks/usePageMeta', () => ({ usePageMeta: vi.fn() }));
vi.mock('@/components/Footer', () => ({ Footer: () => null }));
vi.mock('@/components/landing/StoreBadges', () => ({ StoreBadges: () => null }));
vi.mock('@/lib/deviceDetection', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/lib/deviceDetection')>()),
  getDeviceType: vi.fn(),
}));

describe('SunnahSleep download page', () => {
  afterEach(() => vi.useRealTimers());

  it('keeps one native APK link available even when a transfer never completes', () => {
    vi.useFakeTimers();
    vi.mocked(getDeviceType).mockReturnValue('android');
    render(<MemoryRouter><DownloadPage /></MemoryRouter>);

    const apk = screen.getByRole('link', { name: /download apk/i });
    expect(apk).toHaveAttribute('href', '/app/sunnah-sleep.apk');
    expect(apk).toHaveAttribute('download', 'sunnah-sleep.apk');
    expect(apk.querySelector('button, [role="button"]')).toBeNull();

    // Simulate a blocked or cancelled transfer, not a real APK download.
    apk.addEventListener('click', event => event.preventDefault());
    fireEvent.click(apk);
    act(() => { vi.advanceTimersByTime(30_000); });
    expect(screen.getByRole('link', { name: /download apk/i })).toBe(apk);
    expect(screen.queryByText(/download complete/i)).not.toBeInTheDocument();
    expect(screen.getByText(/browser.s downloads/i)).toBeInTheDocument();
  });

  it('keeps installation on iOS as a single link and does not show an APK link', () => {
    vi.mocked(getDeviceType).mockReturnValue('ios');
    render(<MemoryRouter><DownloadPage /></MemoryRouter>);
    expect(screen.queryByRole('link', { name: /download apk/i })).not.toBeInTheDocument();
    const install = screen.getByRole('link', { name: /^install as pwa$/i });
    expect(install).toHaveAttribute('href', '/install');
    expect(install.querySelector('button, [role="button"]')).toBeNull();
  });
});
