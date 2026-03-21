import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  return (
    <footer className="py-12 px-6 bg-secondary/30 border-t border-border">
      <div className="max-w-7xl mx-auto">        
        <motion.div
          className="text-center text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          © {new Date().getFullYear()} Vinny Dang. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
}