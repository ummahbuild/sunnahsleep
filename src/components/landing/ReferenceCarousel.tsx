import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SleepReference {
  type: 'quran' | 'hadith';
  arabic: string;
  translation: string;
  source: string;
  url: string;
  appTab?: string; // tab name in the app to link to
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
  const total = SLEEP_REFERENCES.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  const ref = SLEEP_REFERENCES[current];

  return (
    <div
      className="relative max-w-2xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Card */}
      <div className="min-h-[200px] flex items-center justify-center">
        <Link
          to={`/app?tab=${ref.appTab ?? 'checklist'}`}
          key={current}
          className="block w-full p-6 sm:p-8 rounded-2xl bg-gradient-card border border-border hover:border-gold/30 transition-all duration-500 animate-fade-in text-center group"
        >
          <span className={`inline-block mb-3 w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center ${ref.type === 'quran' ? 'bg-accent/20 text-accent' : 'bg-primary/20 text-primary'}`}>
            {ref.type === 'quran' ? 'Q' : 'H'}
          </span>

          {ref.arabic && (
            <p className="font-arabic text-primary/80 text-lg sm:text-xl mb-3 leading-relaxed">{ref.arabic}</p>
          )}

          <p className="text-sm sm:text-base text-foreground leading-relaxed italic mb-3">{ref.translation}</p>

          <p className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
            {ref.source} · <span className="text-primary/60">Open in app →</span>
          </p>
        </Link>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button onClick={prev} className="p-2 rounded-full border border-border hover:border-primary/30 text-muted-foreground hover:text-primary transition-colors" aria-label="Previous">
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Dots */}
        <div className="flex gap-1.5">
          {SLEEP_REFERENCES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-primary w-6' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button onClick={next} className="p-2 rounded-full border border-border hover:border-primary/30 text-muted-foreground hover:text-primary transition-colors" aria-label="Next">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
