import { Link } from 'react-router-dom';
import { ListChecks, BookOpen, Star, Headphones, Bell, Clock, ChevronRight, CheckCircle2, Circle, Play, Pause, Volume2, Moon, Droplets, AlarmClock, TrendingUp, Bed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

/* ─── Mini UI Preview Components ─── */

function ChecklistPreview() {
  const [checked, setChecked] = useState([true, true, false, false]);
  const items = [
    { label: 'Pray Isha', icon: Moon },
    { label: 'Perform Wudu', icon: Droplets },
    { label: 'Dust Bed 3×', icon: Bed },
    { label: 'Lie on Right Side', icon: Moon },
  ];
  return (
    <div className="mt-4 space-y-2">
      {items.map((item, i) => (
        <button
          key={item.label}
          onClick={() => setChecked(prev => { const n = [...prev]; n[i] = !n[i]; return n; })}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg border transition-all duration-300 cursor-pointer group/item
            ${checked[i]
              ? 'bg-primary/10 border-primary/30 scale-[0.98]'
              : 'bg-secondary/30 border-border hover:border-primary/20 hover:bg-secondary/50'
            }`}
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300
            ${checked[i] ? 'border-primary bg-primary scale-110' : 'border-muted-foreground group-hover/item:border-primary/50'}`}>
            {checked[i] && <CheckCircle2 className="h-3 w-3 text-primary-foreground" />}
          </div>
          <item.icon className={`h-3.5 w-3.5 transition-colors duration-300 ${checked[i] ? 'text-primary' : 'text-muted-foreground'}`} />
          <span className={`text-xs font-medium transition-all duration-300 ${checked[i] ? 'text-primary line-through opacity-70' : 'text-foreground'}`}>
            {item.label}
          </span>
        </button>
      ))}
      <div className="flex items-center justify-between pt-1 px-1">
        <span className="text-[10px] text-muted-foreground">{checked.filter(Boolean).length}/4 completed</span>
        <div className="w-16 h-1.5 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${(checked.filter(Boolean).length / 4) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function RecitationsPreview() {
  const [active, setActive] = useState<number | null>(null);
  const surahs = [
    { name: 'Ayat al-Kursi', arabic: 'آية الكرسي', ref: '2:255' },
    { name: 'Al-Ikhlas', arabic: 'الإخلاص', ref: '112' },
    { name: 'Al-Falaq', arabic: 'الفلق', ref: '113' },
    { name: 'An-Nas', arabic: 'الناس', ref: '114' },
  ];
  return (
    <div className="mt-4 space-y-2">
      {surahs.map((s, i) => (
        <button
          key={s.name}
          onClick={() => setActive(active === i ? null : i)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all duration-300 cursor-pointer
            ${active === i
              ? 'bg-accent/15 border-accent/40 shadow-[0_0_12px_hsl(var(--accent)/0.15)]'
              : 'bg-secondary/30 border-border hover:border-accent/20'
            }`}
        >
          <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300
            ${active === i ? 'bg-accent text-accent-foreground scale-110' : 'bg-secondary text-muted-foreground'}`}>
            {active === i ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 ml-0.5" />}
          </div>
          <div className="flex-1 text-left">
            <span className={`text-xs font-medium block transition-colors ${active === i ? 'text-accent' : 'text-foreground'}`}>{s.name}</span>
            <span className="text-[10px] text-muted-foreground">Surah {s.ref}</span>
          </div>
          <span className={`font-arabic text-sm transition-all duration-300 ${active === i ? 'text-accent scale-105' : 'text-muted-foreground'}`}>
            {s.arabic}
          </span>
        </button>
      ))}
    </div>
  );
}

function TasbihPreview() {
  const [counts, setCounts] = useState([0, 0, 0]);
  const targets = [33, 33, 34];
  const labels = ['SubhanAllah', 'Alhamdulillah', 'Allahu Akbar'];
  const activeIdx = counts[0] < 33 ? 0 : counts[1] < 33 ? 1 : 2;

  const handleTap = () => {
    setCounts(prev => {
      const n = [...prev];
      if (n[activeIdx] < targets[activeIdx]) n[activeIdx]++;
      return n;
    });
  };

  const total = counts.reduce((a, b) => a + b, 0);
  const progress = (total / 100) * 100;

  return (
    <div className="mt-4">
      {/* Counter circle */}
      <div className="flex justify-center mb-3">
        <button
          onClick={handleTap}
          className="relative w-20 h-20 rounded-full border-2 border-primary/30 flex items-center justify-center
            hover:border-primary hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] active:scale-95
            transition-all duration-200 cursor-pointer group/tap"
        >
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="36" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
            <circle
              cx="40" cy="40" r="36" fill="none" stroke="hsl(var(--primary))"
              strokeWidth="3" strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 36}`}
              strokeDashoffset={`${2 * Math.PI * 36 * (1 - progress / 100)}`}
              className="transition-all duration-300"
            />
          </svg>
          <div className="text-center">
            <span className="text-lg font-bold text-primary block leading-none">{total}</span>
            <span className="text-[9px] text-muted-foreground">tap</span>
          </div>
        </button>
      </div>

      {/* Labels */}
      <div className="grid grid-cols-3 gap-1.5">
        {labels.map((label, i) => (
          <div
            key={label}
            className={`text-center px-1.5 py-1.5 rounded-lg border transition-all duration-300
              ${i === activeIdx ? 'bg-primary/10 border-primary/30 scale-105' : 'bg-secondary/20 border-border'}`}
          >
            <span className={`text-[10px] font-medium block ${i === activeIdx ? 'text-primary' : 'text-muted-foreground'}`}>
              {label.split(/(?=[A-Z])/).join('\u200B')}
            </span>
            <span className={`text-xs font-bold ${i === activeIdx ? 'text-primary' : 'text-foreground'}`}>
              {counts[i]}/{targets[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuranPlayerPreview() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const tracks = ['Al-Mulk', 'Yaseen', 'Ar-Rahman', 'Al-Kahf'];

  return (
    <div className="mt-4 space-y-3">
      {/* Now playing */}
      <div className={`p-3 rounded-xl border transition-all duration-500
        ${playing ? 'bg-accent/10 border-accent/30 shadow-[0_0_20px_hsl(var(--accent)/0.1)]' : 'bg-secondary/30 border-border'}`}>
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => setPlaying(!playing)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300
              ${playing ? 'bg-accent text-accent-foreground scale-110 shadow-[0_0_12px_hsl(var(--accent)/0.4)]' : 'bg-secondary text-muted-foreground hover:bg-accent/20'}`}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
          </button>
          <div className="flex-1 min-w-0">
            <span className="text-xs font-medium text-foreground block">Surah Al-Mulk</span>
            <span className="text-[10px] text-muted-foreground">Mishary Al-Afasy</span>
          </div>
          <Volume2 className={`h-4 w-4 transition-colors ${playing ? 'text-accent animate-pulse' : 'text-muted-foreground'}`} />
        </div>
        {/* Progress bar */}
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-muted-foreground w-6">2:14</span>
          <div className="flex-1 h-1 rounded-full bg-secondary overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${playing ? 'bg-accent' : 'bg-muted-foreground'}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[9px] text-muted-foreground w-6">6:23</span>
        </div>
      </div>

      {/* Queue */}
      <div className="flex gap-1.5">
        {tracks.map((t, i) => (
          <span
            key={t}
            className={`text-[10px] px-2 py-1 rounded-full border transition-all duration-200
              ${i === 0 ? 'bg-accent/10 border-accent/30 text-accent' : 'bg-secondary/30 border-border text-muted-foreground hover:border-accent/20 cursor-pointer'}`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function AlarmsPreview() {
  const [enabled, setEnabled] = useState([true, true, false]);
  const alarms = [
    { name: 'Fajr', time: '5:23 AM', icon: AlarmClock },
    { name: 'Tahajjud', time: '3:45 AM', icon: Moon },
    { name: 'Isha', time: '8:15 PM', icon: Bell },
  ];
  return (
    <div className="mt-4 space-y-2">
      {alarms.map((a, i) => (
        <div
          key={a.name}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all duration-300
            ${enabled[i] ? 'bg-primary/5 border-primary/20' : 'bg-secondary/20 border-border opacity-60'}`}
        >
          <a.icon className={`h-4 w-4 ${enabled[i] ? 'text-primary' : 'text-muted-foreground'}`} />
          <div className="flex-1">
            <span className={`text-xs font-medium ${enabled[i] ? 'text-foreground' : 'text-muted-foreground'}`}>{a.name}</span>
          </div>
          <span className={`text-sm font-bold tabular-nums ${enabled[i] ? 'text-primary' : 'text-muted-foreground'}`}>{a.time}</span>
          <button
            onClick={() => setEnabled(prev => { const n = [...prev]; n[i] = !n[i]; return n; })}
            className={`w-8 h-4.5 rounded-full transition-all duration-300 relative cursor-pointer
              ${enabled[i] ? 'bg-primary' : 'bg-secondary'}`}
            style={{ height: '18px' }}
          >
            <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white shadow transition-all duration-300
              ${enabled[i] ? 'left-[calc(100%-16px)]' : 'left-0.5'}`} />
          </button>
        </div>
      ))}
    </div>
  );
}

function SleepTrackerPreview() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const hours = [7.2, 6.8, 7.5, 6.5, 7.0, 8.2, 7.8];
  const maxH = Math.max(...hours);

  return (
    <div className="mt-4">
      {/* Week chart */}
      <div className="flex items-end gap-1.5 h-16 mb-2 px-1">
        {days.map((d, i) => (
          <div key={d + i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-t-sm bg-primary/20 hover:bg-primary/40 transition-all duration-300 relative group/bar cursor-pointer"
              style={{ height: `${(hours[i] / maxH) * 100}%` }}
            >
              <div className="absolute inset-0 bg-primary/60 rounded-t-sm scale-y-0 group-hover/bar:scale-y-100 origin-bottom transition-transform duration-300" />
              {/* Tooltip */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-card border border-border text-[9px] text-primary px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                {hours[i]}h
              </div>
            </div>
            <span className="text-[9px] text-muted-foreground">{d}</span>
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
        <div className="text-center">
          <TrendingUp className="h-3 w-3 text-primary mx-auto mb-0.5" />
          <span className="text-xs font-bold text-foreground block">7.3h</span>
          <span className="text-[9px] text-muted-foreground">avg sleep</span>
        </div>
        <div className="text-center">
          <CheckCircle2 className="h-3 w-3 text-green-400 mx-auto mb-0.5" />
          <span className="text-xs font-bold text-foreground block">6/7</span>
          <span className="text-[9px] text-muted-foreground">Fajr made</span>
        </div>
        <div className="text-center">
          <Star className="h-3 w-3 text-primary mx-auto mb-0.5" />
          <span className="text-xs font-bold text-foreground block">12</span>
          <span className="text-[9px] text-muted-foreground">day streak</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Preview map ─── */
const PREVIEW_COMPONENTS: Record<number, React.FC> = {
  1: ChecklistPreview,
  2: RecitationsPreview,
  3: TasbihPreview,
  4: QuranPlayerPreview,
  5: AlarmsPreview,
  6: SleepTrackerPreview,
};

const FEATURE_STEPS = [
  {
    step: 1,
    icon: ListChecks,
    title: 'Sunnah Bedtime Checklist',
    description: 'Follow the Prophetic routine step by step — from Isha prayer to wudu to lying on your right side.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    step: 2,
    icon: BookOpen,
    title: 'Quran Recitations & Duas',
    description: 'Ayat al-Kursi, Three Quls, last two verses of Al-Baqarah, and bedtime duas — with audio and Arabic text.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    step: 3,
    icon: Star,
    title: 'Tasbih Counter (33-33-34)',
    description: 'Complete the dhikr the Prophet ﷺ recommended: 33 SubhanAllah, 33 Alhamdulillah, 34 Allahu Akbar.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    step: 4,
    icon: Headphones,
    title: 'Quran Sleep Player',
    description: 'Fall asleep to full surah recitations — Al-Mulk, Yaseen, Ar-Rahman and more. Sleep timer included.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    step: 5,
    icon: Bell,
    title: 'Tahajjud & Fajr Alarms',
    description: 'Location-based prayer alarms. Wake for Tahajjud in the blessed last third of the night.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    step: 6,
    icon: Clock,
    title: 'Sleep Tracker',
    description: 'Track your Isha-to-Fajr sleep window. See weekly stats, streaks, and consistency — all local.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
];

export function FeatureSteps() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-arabic text-foreground mb-3">
          Your Nightly Routine, <span className="text-gradient-gold">Step by Step</span>
        </h2>
        <p className="text-cream-dim max-w-xl mx-auto">
          SunnahSleep guides you through the Prophetic bedtime routine — from Isha prayer to waking for Tahajjud.
        </p>
      </div>

      {/* Vertical timeline on md+, cards on mobile */}
      <div className="relative">
        {/* Vertical line (desktop) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-8 md:space-y-12">
          {FEATURE_STEPS.map(({ step, icon: Icon, title, description, color, bgColor }, idx) => {
            const isLeft = idx % 2 === 0;
            const PreviewComponent = PREVIEW_COMPONENTS[step];
            return (
              <div
                key={step}
                className="relative md:flex md:items-start md:gap-8"
              >
                {/* Step dot on timeline */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-card border-2 border-primary items-center justify-center z-10">
                  <span className="text-primary text-sm font-bold">{step}</span>
                </div>

                {/* Card - alternates sides */}
                <div className={`md:w-[calc(50%-2rem)] ${isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                  <div className="group p-5 sm:p-6 rounded-2xl bg-gradient-card border border-border
                    hover:border-primary/30 hover:shadow-[0_0_30px_hsl(var(--primary)/0.08)]
                    transition-all duration-500">
                    <div className="flex items-start gap-4">
                      {/* Mobile step number */}
                      <div className={`md:hidden flex-shrink-0 w-8 h-8 rounded-full ${bgColor} flex items-center justify-center`}>
                        <span className={`text-xs font-bold ${color}`}>{step}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`p-1.5 rounded-lg ${bgColor} transition-transform duration-300 group-hover:scale-110`}>
                            <Icon className={`h-4 w-4 ${color}`} />
                          </div>
                          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                        </div>
                        <p className="text-sm text-cream-dim leading-relaxed">{description}</p>

                        {/* Interactive UI Preview */}
                        {PreviewComponent && <PreviewComponent />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center mt-12">
        <Link to="/app">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 glow-gold">
            Begin Your Routine <ChevronRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
