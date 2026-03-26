import { Mail, Linkedin, Twitter, Github } from 'lucide-react';
import { motion } from 'motion/react';

const contactLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/vincent-dangg',
    value: 'Connect professionally',
    icon: Linkedin,
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com',
    value: 'Thoughts, ideas, and updates',
    icon: Twitter,
  },
  {
    label: 'GitHub',
    href: 'https://github.com',
    value: 'Projects, experiments, and code',
    icon: Github,
  },
  {
    label: 'Email',
    href: 'mailto:vdang2021@gmail.com',
    value: 'vdang2021@gmail.com',
    icon: Mail,
  },
];

export function GetInTouch() {
  return (
    <section id="get-in-touch" className="py-24 px-6 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="max-w-2xl mb-12 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-[0.24em] text-accent">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Feel free to reach out, always open to connecting.
          </h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {contactLinks.map((link, index) => {
            const Icon = link.icon;

            return (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="rounded-3xl border border-border/65 bg-card/45 px-6 py-6 transition-colors hover:border-accent/45"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/8 bg-white/4">
                    <Icon className="w-4 h-4 text-foreground/80" />
                  </div>
                  <p className="text-lg font-semibold">{link.label}</p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{link.value}</p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
