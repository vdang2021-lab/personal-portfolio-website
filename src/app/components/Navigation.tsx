import { motion } from 'motion/react';
import { Linkedin, Github, Twitter } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollToContact = () => {
    if (location.pathname !== '/') {
      navigate('/');
      window.setTimeout(() => {
        const section = document.getElementById('get-in-touch');
        section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
      return;
    }

    const section = document.getElementById('get-in-touch');
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Interests', href: '/interests' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 md:px-8 md:py-5">
        <motion.div
          className="flex flex-1 items-center gap-4 text-sm sm:gap-6 md:flex-none md:gap-12 md:text-base"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;

            return (
              <motion.button
                key={item.href}
                onClick={() => navigate(item.href)}
                className={isActive ? 'text-foreground transition-colors' : 'text-muted-foreground hover:text-accent transition-colors'}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {item.label}
              </motion.button>
            );
          })}
          <motion.button
            onClick={scrollToContact}
            className="text-muted-foreground hover:text-accent transition-colors"
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Get In Touch
          </motion.button>
        </motion.div>

        <motion.div
          className="hidden items-center gap-4 md:flex"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.a
            href="https://www.linkedin.com/in/vincent-dangg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-colors"
            whileHover={{ y: -2, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Linkedin className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="https://github.com/vdang2021-lab"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-colors"
            whileHover={{ y: -2, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Github className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="https://x.com/vinnnnnyd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-colors"
            whileHover={{ y: -2, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Twitter className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </nav>
  );
}
