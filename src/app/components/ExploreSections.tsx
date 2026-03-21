import { ArrowRight, BriefcaseBusiness, ChartColumn, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';

const sections = [
  {
    title: 'Experience',
    description: 'Experience using data to drive decisions across fintech and analytics.',
    href: '/experience',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Projects',
    description: 'Projects focused on payments growth, analytics, and decision-making.',
    href: '/projects',
    icon: ChartColumn,
    featured: true,
  },
  {
    title: 'Beyond Work',
    description: "What I'm into outside of data, analytics, and building.",
    href: '/interests',
    icon: Compass,
    subdued: true,
  },
];

export function ExploreSections() {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="max-w-2xl mb-12 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-[0.24em] text-accent">Explore More</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {sections.map((section, index) => {
            const Icon = section.icon;

            return (
              <motion.button
                key={section.title}
                onClick={() => navigate(section.href)}
                className={[
                  'group rounded-3xl border p-8 text-left transition-colors',
                  'bg-gradient-to-b from-[#1b2130] to-[#131924]',
                  'shadow-[0_18px_50px_rgba(0,0,0,0.18)]',
                  section.featured
                    ? 'border-accent/30 bg-gradient-to-b from-[#21283a] to-[#141b28]'
                    : section.subdued
                      ? 'border-border/45 hover:border-border/70'
                      : 'border-border/55 hover:border-accent/45',
                ].join(' ')}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{
                  y: -8,
                  boxShadow: section.featured
                    ? '0 24px 64px rgba(0, 0, 0, 0.26), 0 0 0 1px rgba(6, 182, 212, 0.08)'
                    : section.subdued
                      ? '0 20px 48px rgba(0, 0, 0, 0.18)'
                      : '0 22px 56px rgba(0, 0, 0, 0.22)',
                }}
                style={
                  section.featured
                    ? {
                        boxShadow: '0 20px 56px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(6, 182, 212, 0.06)',
                      }
                    : undefined
                }
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/6 bg-white/4">
                    <Icon className="w-5 h-5 text-foreground/80" />
                  </div>
                  <ArrowRight className="mt-1 w-5 h-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-[2rem] leading-tight font-semibold tracking-tight text-foreground">
                    {section.title}
                  </h3>
                  <p className="max-w-[26ch] text-base leading-8 text-foreground/68">
                    {section.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
