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
              A few projects that show how I think through problems.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Less about dashboards, more about helping teams understand what to do next.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                className={`rounded-3xl border p-7 ${
                  project.status === 'complete'
                    ? 'border-border/70 bg-card/45'
                    : 'border-border/45 bg-card/25'
                }`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <button
                  type="button"
                  onClick={project.slug ? () => navigate(`/projects/${project.slug}`) : undefined}
                  className={`w-full space-y-5 text-left ${
                    project.slug ? 'cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <div className="space-y-3">
                    {project.status === 'in-progress' ? (
                      <p className="text-sm uppercase tracking-[0.18em] text-foreground/45">In Progress</p>
                    ) : null}
                    {project.status === 'coming-soon' ? (
                      <p className="text-sm uppercase tracking-[0.18em] text-foreground/45">Coming Soon</p>
                    ) : null}
                    <h2 className="text-2xl font-semibold">{project.title}</h2>
                    <p
                      className={`leading-relaxed ${
                        project.status === 'complete' ? 'text-muted-foreground' : 'text-foreground/68'
                      }`}
                    >
                      {project.summary}
                    </p>
                  </div>

                  {project.outcome ? (
                    <div className="rounded-2xl border border-accent/20 bg-accent/6 px-4 py-4">
                      <p className="text-sm uppercase tracking-[0.18em] text-accent mb-2">Outcome</p>
                      <p className="text-sm leading-relaxed text-foreground/90">{project.outcome}</p>
                    </div>
                  ) : null}

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full border px-3 py-1.5 text-sm ${
                          project.status === 'complete'
                            ? 'border-border/60 bg-background/70 text-muted-foreground'
                            : 'border-border/45 bg-background/55 text-foreground/58'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.slug ? (
                    <p className="text-sm text-accent">View how I approached this</p>
                  ) : null}
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
