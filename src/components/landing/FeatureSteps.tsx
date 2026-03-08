import { Link } from 'react-router-dom';
import { ListChecks, BookOpen, Star, Headphones, Bell, Clock, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FEATURE_STEPS = [
  {
    step: 1,
    icon: ListChecks,
    title: 'Sunnah Bedtime Checklist',
    description: 'Follow the Prophetic routine step by step — from Isha prayer to wudu to lying on your right side.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    // Mini preview elements
    previewItems: ['Pray Isha', 'Make Wudu', 'Dust Bed 3×', 'Lie on Right Side'],
  },
  {
    step: 2,
    icon: BookOpen,
    title: 'Quran Recitations & Duas',
    description: 'Ayat al-Kursi, Three Quls, last two verses of Al-Baqarah, and bedtime duas — with audio and Arabic text.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    previewItems: ['Ayat al-Kursi', 'Al-Ikhlas', 'Al-Falaq', 'An-Nas'],
  },
  {
    step: 3,
    icon: Star,
    title: 'Tasbih Counter (33-33-34)',
    description: 'Complete the dhikr the Prophet ﷺ recommended: 33 SubhanAllah, 33 Alhamdulillah, 34 Allahu Akbar.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    previewItems: ['SubhanAllah ×33', 'Alhamdulillah ×33', 'Allahu Akbar ×34'],
  },
  {
    step: 4,
    icon: Headphones,
    title: 'Quran Sleep Player',
    description: 'Fall asleep to full surah recitations — Al-Mulk, Yaseen, Ar-Rahman and more. Sleep timer included.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    previewItems: ['Al-Mulk', 'Yaseen', 'Ar-Rahman', 'Al-Kahf'],
  },
  {
    step: 5,
    icon: Bell,
    title: 'Tahajjud & Fajr Alarms',
    description: 'Location-based prayer alarms. Wake for Tahajjud in the blessed last third of the night.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    previewItems: ['Fajr Alarm', 'Tahajjud Alarm', 'Isha Reminder'],
  },
  {
    step: 6,
    icon: Clock,
    title: 'Sleep Tracker',
    description: 'Track your Isha-to-Fajr sleep window. See weekly stats, streaks, and consistency — all local.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    previewItems: ['Weekly Stats', 'Sleep Streak', 'Fajr Adherence'],
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
          {FEATURE_STEPS.map(({ step, icon: Icon, title, description, color, bgColor, previewItems }, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={step}
                className="relative md:flex md:items-center md:gap-8"
              >
                {/* Step dot on timeline */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-card border-2 border-primary items-center justify-center z-10">
                  <span className="text-primary text-sm font-bold">{step}</span>
                </div>

                {/* Card - alternates sides */}
                <div className={`md:w-[calc(50%-2rem)] ${isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                  <div className="group p-6 rounded-2xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      {/* Mobile step number */}
                      <div className={`md:hidden flex-shrink-0 w-8 h-8 rounded-full ${bgColor} flex items-center justify-center`}>
                        <span className={`text-xs font-bold ${color}`}>{step}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className={`h-5 w-5 ${color}`} />
                          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                        </div>
                        <p className="text-sm text-cream-dim leading-relaxed mb-3">{description}</p>

                        {/* Mini preview chips — animated */}
                        <div className="flex flex-wrap gap-1.5">
                          {previewItems.map((item, i) => (
                            <span
                              key={item}
                              className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border border-border ${bgColor} ${color} opacity-0 animate-fade-in`}
                              style={{ animationDelay: `${i * 150}ms`, animationFillMode: 'forwards' }}
                            >
                              <CheckCircle2 className="h-3 w-3" />
                              {item}
                            </span>
                          ))}
                        </div>
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
