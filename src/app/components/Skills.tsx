import { motion } from 'motion/react';

interface SkillCategory {
  category: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    category: 'Programming & Data',
    skills: ['SQL (Snowflake, Athena)', 'Python (pandas, numpy)', 'Data Modeling & ETL Concepts'],
  },
  {
    category: 'Analytics & BI',
    skills: ['Payments & Transaction Analytics', 'BI & Dashboards (Power BI, Looker Studio)', 'Financial & Operational Reporting'],
  },
  {
    category: 'AI-Assisted Analytics',
    skills: ['ChatGPT', 'GitHub Copilot', 'Claude', 'Notion AI'],
  },
  {
    category: 'Core Domains',
    skills: [
      'Payments & Transaction Analytics',
      'Fintech & Transportation Data',
      'Go-to-Market & Sales Enablement Analytics',
      'Marketing Performance',
      'Customer Experience',
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          Skills
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-colors"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.h3
                className="text-xl font-semibold mb-4 text-accent"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {category.category}
              </motion.h3>
              <ul className="space-y-2">
                {category.skills.map((skill, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-3 text-muted-foreground"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-accent mt-1">•</span>
                    <span>{skill}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
