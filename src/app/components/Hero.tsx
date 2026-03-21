import { motion, useReducedMotion } from 'motion/react';
import heroImage from '../../assets/vinny-hero.jpeg';

const introParagraphs = [
  "Hey, I'm Vinny! I'm currently on the data team at Triumph Financial, where I work across payments, marketing, customer experience, and sales analytics, supporting products like LoadPay.",
  "I use data to help teams understand what's happening and make better decisions. Before this, I worked at a marketing agency helping clients implement data solutions, and started my career in audit at Grant Thornton.",
  "Outside of work, I'm into fitness and health, trading, and exploring new tech and tools. Feel free to reach out!",
];
const introWords = introParagraphs.map((paragraph) => paragraph.split(' '));
const contactLinks = [
  {
    label: 'LinkedIn (/vincent-dangg)',
    href: 'https://www.linkedin.com/in/vincent-dangg',
  },
  { label: 'X (@vinnnnnyd)', href: 'https://x.com/vinnnnnyd' },
  { label: 'Email', href: 'mailto:vdang2021@gmail.com' },
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const eyebrowInitial = shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 };
  const headingInitial = shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 };
  const paragraphInitial = shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 };
  const contentAnimate = { opacity: 1, y: 0 };
  const contentEase = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="min-h-screen flex items-center justify-center px-8 pt-20">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-16 items-center">
        {/* Left side - Text content */}
        <div className="space-y-8">
          <motion.p
            className="text-sm uppercase tracking-[0.24em] text-accent"
            initial={eyebrowInitial}
            animate={contentAnimate}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.6, delay: 0, ease: contentEase }
            }
          >
            Data Analyst
          </motion.p>

          <motion.h1
            className="text-6xl md:text-7xl font-bold tracking-tight leading-tight"
            initial={headingInitial}
            animate={contentAnimate}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.62, delay: 0.12, ease: contentEase }
            }
          >
            Vinny Dang
          </motion.h1>
          
          <motion.div
            className="max-w-xl space-y-5 text-lg leading-8 text-muted-foreground"
            initial={paragraphInitial}
            animate={contentAnimate}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.6, delay: 0.24, ease: contentEase }
            }
          >
            {introWords.map((words, paragraphIndex) => (
              <motion.p
                key={introParagraphs[paragraphIndex]}
              >
                {words.map((word, wordIndex) => {
                  const globalWordIndex =
                    introWords.slice(0, paragraphIndex).reduce((count, paragraph) => count + paragraph.length, 0) +
                    wordIndex;

                  return (
                    <motion.span
                      key={`${paragraphIndex}-${wordIndex}-${word}`}
                      className="inline-block"
                      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : {
                              duration: 0.26,
                              delay: 0.26 + globalWordIndex * 0.02,
                              ease: contentEase,
                            }
                      }
                    >
                      {word}
                      {wordIndex < words.length - 1 ? '\u00A0' : ''}
                    </motion.span>
                  );
                })}
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            className="max-w-xl text-sm text-muted-foreground"
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.35, delay: 0.52, ease: contentEase }
            }
          >
            {contactLinks.map((link, index) => (
              <span key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="transition-colors hover:text-foreground hover:underline underline-offset-4"
                >
                  {link.label}
                </a>
                {index < contactLinks.length - 1 ? (
                  <span className="px-2 text-muted-foreground/60">·</span>
                ) : null}
              </span>
            ))}
          </motion.div>

        </div>

        {/* Right side - Profile image */}
        <motion.div
          className="flex justify-center md:justify-end"
          initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }
          }
        >
          <motion.div
            className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-accent/20 bg-gradient-to-b from-white/8 via-background to-card"
            whileHover={{
              y: -6,
              boxShadow: '0 24px 60px rgba(6, 182, 212, 0.18)',
              borderColor: 'rgba(6, 182, 212, 0.4)',
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
          >
            <img
              src={heroImage}
              alt="Vinny Dang"
              className="block w-full h-full object-contain object-center scale-140"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
