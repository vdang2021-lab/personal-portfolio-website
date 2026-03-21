import { motion } from 'motion/react';
import { ArrowLeft, Compass, Camera, Dumbbell, Plane } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

const interestAreas = [
  {
    title: 'Life Outside Work',
    description: 'A place to share a few of the routines, hobbies, and experiences that shape how I think and recharge.',
    icon: Compass,
  },
  {
    title: 'Places & Travel',
    description: 'A future section for travel moments, memorable trips, and the environments that inspire me.',
    icon: Plane,
  },
  {
    title: 'Health & Routine',
    description: 'A future section for fitness, habits, consistency, and the systems I like building in everyday life.',
    icon: Dumbbell,
  },
  {
    title: 'Photos & Visuals',
    description: 'A future section for selected photos, visual snapshots, and moments worth remembering.',
    icon: Camera,
  },
];

export default function InterestsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      <main className="flex-1 px-6 pt-28 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-accent mb-10 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </motion.button>

          <motion.div
            className="max-w-3xl space-y-5 mb-14"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-[0.24em] text-accent">Interests</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              A quieter page for the things that matter outside of work.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This is a starter layout for interests. We can grow it into something more personal
              over time with photos, favorite activities, routines, or travel moments.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {interestAreas.map((area, index) => {
              const Icon = area.icon;

              return (
                <motion.article
                  key={area.title}
                  className="rounded-3xl border border-dashed border-border/70 bg-card/35 p-7"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  whileHover={{ y: -4, borderColor: 'rgba(6, 182, 212, 0.35)' }}
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/70 bg-background/80">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Wireframe
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h2 className="text-2xl font-semibold">{area.title}</h2>
                      <p className="text-muted-foreground leading-relaxed">{area.description}</p>
                    </div>

                    <div className="rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-sm text-muted-foreground">
                      Placeholder content block for future notes, images, or stories.
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
