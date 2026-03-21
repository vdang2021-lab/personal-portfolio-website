import { ArrowUpRight, BriefcaseBusiness, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import triumphMark from '../../assets/logos/triumph-mark.svg';
import loadpayLogo from '../../assets/logos/loadpay-logo.png';
import marcusThomasMark from '../../assets/logos/marcus-thomas-mark.svg';
import grantThorntonLogoAlt from '../../assets/logos/grant-thornton-logo-alt.png';

const companies = [
  {
    name: 'Triumph Financial',
    logo: triumphMark,
    logoAlt: 'Triumph Financial logo',
    note: 'Built analytics, predictive models, and experimentation frameworks to support product, go-to-market, and customer strategy',
  },
  {
    name: 'LoadPay',
    logo: loadpayLogo,
    logoAlt: 'LoadPay logo',
    note: 'Fintech product growth through data and performance insights',
  },
  {
    name: 'Marcus Thomas',
    logo: marcusThomasMark,
    logoAlt: 'Marcus Thomas logo',
    note: 'Delivered data solutions and analytics to drive client performance and strategic decision-making',
  },
  {
    name: 'Grant Thornton',
    logo: grantThorntonLogoAlt,
    logoAlt: 'Grant Thornton logo',
    note: 'Financial data, audit, and data integrity foundation',
  },
];

const currentFocus = [
  'Scaling payments products through data and experimentation',
  'Building predictive models for lead scoring and targeting',
  'Designing experiments to improve sales conversion and GTM strategy',
  'Turning data into actionable decisions across product and go-to-market teams',
];

export function WorkedWith() {
  return (
    <section className="py-24 px-6 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="max-w-3xl mb-12 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-[0.24em] text-accent">Experience Snapshot</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Where I&apos;ve worked and what I&apos;m focused on now.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            I work at the intersection of data and business, helping teams understand
            what&apos;s happening and make better decisions.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
          <motion.div
            className="rounded-3xl border border-border/70 bg-card/50 p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <BriefcaseBusiness className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-semibold">Worked across</h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {companies.map((company, index) => (
                <motion.div
                  key={company.name}
                  className="rounded-2xl border border-border/60 bg-background/60 p-5 hover:border-accent/50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {typeof company.logo === 'string' && company.logo.length <= 2 ? (
                        <div className="flex h-5 min-h-5 w-8 items-center justify-center rounded-md border border-white/8 bg-white/3 text-[10px] font-semibold tracking-[0.16em] text-foreground/55">
                          {company.logo}
                        </div>
                      ) : (
                        <div className="flex h-5 min-h-5 w-5 items-center justify-center text-foreground/70">
                          <img src={company.logo} alt={company.logoAlt ?? `${company.name} logo`} className="h-5 w-5 object-contain opacity-80" />
                        </div>
                      )}
                      <p className="text-lg font-semibold leading-none">{company.name}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{company.note}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="rounded-3xl border border-border/70 bg-card/50 p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-semibold">Currently focused on</h3>
            </div>

            <div className="space-y-3">
              {currentFocus.map((item, index) => (
                <motion.div
                  key={item}
                  className="rounded-2xl border border-border/60 bg-background/60 px-4 py-4 text-muted-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.08 + 0.15 }}
                  whileHover={{ x: 4, borderColor: 'var(--color-accent)' }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
