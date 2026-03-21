import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { projects } from '../data/projects';

export default function ProjectsPage() {
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
            <p className="text-sm uppercase tracking-[0.24em] text-accent">Projects</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Selected analytics work, presented more clearly.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              These are the kinds of reporting and analysis projects I enjoy most:
              practical, cross-functional, and tied to business decisions.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                className="rounded-3xl border border-border/70 bg-card/45 p-7"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <div className="space-y-5">
                  <div className="space-y-3">
                    <h2 className="text-2xl font-semibold">{project.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">{project.summary}</p>
                  </div>

                  <div className="rounded-2xl border border-accent/20 bg-accent/6 px-4 py-4">
                    <p className="text-sm uppercase tracking-[0.18em] text-accent mb-2">Outcome</p>
                    <p className="text-sm leading-relaxed text-foreground/90">{project.outcome}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border/60 bg-background/70 px-3 py-1.5 text-sm text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
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
