import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { experiences } from '../data/experience';

export default function ExperiencePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      <main className="flex-1 px-6 pt-28 pb-20">
        <div className="max-w-5xl mx-auto">
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
            <p className="text-sm uppercase tracking-[0.24em] text-accent">Experience</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Professional work, without the wall of text.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A concise view of the roles that shaped my background across fintech,
              analytics, marketing reporting, and audit.
            </p>
          </motion.div>

          <div className="space-y-6">
            {experiences.map((experience, index) => (
              <motion.article
                key={experience.company}
                className="rounded-3xl border border-border/70 bg-card/45 p-8"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <div className="grid gap-8 md:grid-cols-[220px_1fr]">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{experience.period}</p>
                    <h2 className="text-2xl font-semibold">{experience.company}</h2>
                    <p className="text-muted-foreground">{experience.title}</p>
                    <p className="text-sm text-muted-foreground">{experience.location}</p>
                  </div>

                  <div className="space-y-5">
                    <p className="text-base leading-relaxed text-foreground/90">{experience.summary}</p>
                    <div className="grid gap-3">
                      {experience.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="rounded-2xl border border-border/60 bg-background/70 px-4 py-4 text-muted-foreground leading-relaxed"
                        >
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
