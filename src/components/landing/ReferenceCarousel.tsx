import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SleepReference {
  type: 'quran' | 'hadith';
  arabic: string;
  translation: string;
  source: string;
  url: string;
  appTab?: string;
}

const SLEEP_REFERENCES: SleepReference[] = [
  {
    type: 'quran',
    arabic: 'وَهُوَ الَّذِي جَعَلَ لَكُمُ اللَّيْلَ لِبَاسًا وَالنَّوْمَ سُبَاتًا',
    translation: '"He is the One who made the night for you as a covering, and sleep as a means of rest."',
    source: 'Surah Al-Furqan 25:47',
    url: 'https://quran.com/25/47',
    appTab: 'quran',
  },
  {
    type: 'quran',
    arabic: 'وَمِنْ آيَاتِهِ مَنَامُكُم بِاللَّيْلِ وَالنَّهَارِ',
    translation: '"And among His signs is your sleep by night and day, and your seeking of His bounty."',
    source: 'Surah Ar-Rum 30:23',
    url: 'https://quran.com/30/23',
    appTab: 'quran',
  },
  {
    type: 'quran',
    arabic: 'وَجَعَلْنَا نَوْمَكُمْ سُبَاتًا',
    translation: '"And We have made your sleep as a thing for rest."',
    source: 'Surah An-Naba 78:9',
    url: 'https://quran.com/78/9',
    appTab: 'quran',
  },
  {
    type: 'hadith',
    arabic: '',
    translation: '"When you go to your bed, perform ablution like that for prayer, then lie on your right side."',
    source: 'Sahih al-Bukhari 247',
    url: 'https://sunnah.com/bukhari:247',
    appTab: 'checklist',
  },
  {
    type: 'hadith',
    arabic: '',
    translation: '"Whoever recites Ayat al-Kursi before sleeping, Allah will send a guardian angel and no devil will come near until morning."',
    source: 'Sahih al-Bukhari 5010',
    url: 'https://sunnah.com/bukhari:5010',
    appTab: 'recitations',
  },
  {
    type: 'hadith',
    arabic: '',
    translation: '"Our Lord descends every night to the lowest heaven during the last third of the night and says: Who is calling upon Me that I may answer?"',
    source: 'Sahih al-Bukhari 1145',
    url: 'https://sunnah.com/bukhari:1145',
    appTab: 'alarms',
  },
  {
    type: 'hadith',
    arabic: '',
    translation: '"Take the Qailulah (midday nap), for the devils do not take a midday nap."',
    source: "Sahih al-Jami' 4431",
    url: 'https://sunnah.com/search?q=qailulah',
    appTab: 'sleep',
  },
];

export function ReferenceCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const total = SLEEP_REFERENCES.length;
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const next = useCallback(() => {
    setDirection('right');
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDirection('left');
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Only respond if this section is roughly in view
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    // Don't add global key listeners - handled via the container's onKeyDown
    return () => {};
  }, [next, prev]);

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    setIsPaused(false);
  };

  const ref = SLEEP_REFERENCES[current];
  const slideAnim = direction === 'right'
    ? 'animate-[slideInRight_0.4s_ease-out]'
    : 'animate-[slideInLeft_0.4s_ease-out]';

  return (
    <div
      className="relative max-w-2xl mx-auto select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
      }}
      tabIndex={0}
      role="region"
      aria-label="Quran and Hadith references carousel"
      aria-roledescription="carousel"
    >
      {/* Arrow buttons (desktop) */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-14 z-10
          w-10 h-10 rounded-full border border-border bg-card/80 backdrop-blur-sm
          flex items-center justify-center
          text-muted-foreground hover:text-primary hover:border-primary/40 hover:shadow-[0_0_12px_hsl(var(--primary)/0.15)]
          transition-all duration-300 opacity-0 sm:opacity-100 group-hover:opacity-100"
        aria-label="Previous reference"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-14 z-10
          w-10 h-10 rounded-full border border-border bg-card/80 backdrop-blur-sm
          flex items-center justify-center
          text-muted-foreground hover:text-primary hover:border-primary/40 hover:shadow-[0_0_12px_hsl(var(--primary)/0.15)]
          transition-all duration-300 opacity-0 sm:opacity-100 group-hover:opacity-100"
        aria-label="Next reference"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Card */}
      <div className="min-h-[220px] flex items-center justify-center overflow-hidden px-2">
        <Link
          to={`/app?tab=${ref.appTab ?? 'checklist'}`}
          key={current}
          className={`block w-full p-6 sm:p-8 rounded-2xl bg-gradient-card border border-border
            hover:border-primary/30 hover:shadow-[0_0_30px_hsl(var(--primary)/0.08)]
            transition-all duration-500 text-center group ${slideAnim}`}
        >
          {/* Type indicator — subtle line instead of icon */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className={`h-px w-8 ${ref.type === 'quran' ? 'bg-accent/40' : 'bg-primary/40'}`} />
            <span className={`text-[10px] uppercase tracking-widest font-medium ${ref.type === 'quran' ? 'text-accent/70' : 'text-primary/70'}`}>
              {ref.type === 'quran' ? 'Quran' : 'Hadith'}
            </span>
            <div className={`h-px w-8 ${ref.type === 'quran' ? 'bg-accent/40' : 'bg-primary/40'}`} />
          </div>

          {ref.arabic && (
            <p className="font-arabic text-primary/80 text-lg sm:text-xl mb-4 leading-loose">{ref.arabic}</p>
          )}

          <p className="text-sm sm:text-base text-foreground leading-relaxed italic mb-4 max-w-lg mx-auto">{ref.translation}</p>

          <p className="text-xs text-muted-foreground group-hover:text-primary transition-colors duration-300">
            {ref.source}
            <span className="inline-block ml-2 text-primary/50 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300">
              Open in app →
            </span>
          </p>
        </Link>
      </div>

      {/* Dots + counter */}
      <div className="flex items-center justify-center gap-4 mt-5">
        <span className="text-[10px] text-muted-foreground tabular-nums w-8 text-right">
          {current + 1}/{total}
        </span>

        <div className="flex gap-1.5">
          {SLEEP_REFERENCES.map((r, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 'right' : 'left');
                setCurrent(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-400
                ${i === current
                  ? `w-8 ${r.type === 'quran' ? 'bg-accent' : 'bg-primary'}`
                  : 'w-1.5 bg-muted-foreground/25 hover:bg-muted-foreground/50'
                }`}
              aria-label={`Go to reference ${i + 1}`}
            />
          ))}
        </div>

        {/* Swipe hint (mobile only) */}
        <span className="text-[10px] text-muted-foreground/50 sm:hidden w-8">swipe</span>
        <span className="text-[10px] text-muted-foreground/50 hidden sm:inline w-8">← →</span>
      </div>

      {/* CSS for slide animations */}
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
