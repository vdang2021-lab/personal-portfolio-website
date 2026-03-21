import { Circle } from 'lucide-react';
import { motion } from 'motion/react';

interface ExperienceItem {
  period: string;
  company: string;
  location: string;
  title: string;
  responsibilities: string[];
}

const experiences: ExperienceItem[] = [
  {
    period: 'May 2024 - Current',
    company: 'Triumph Financial',
    location: 'Dallas, TX',
    title: 'Data Analyst',
    responsibilities: [
      'Analyzed customer transaction behavior during the rollout of a new instant payments product and identified high-potential users, contributing to adoption growth from a few hundred to over 5,000 active users.',
      'Built prospect prioritization reporting for sales leadership, helping teams focus outreach on customers most likely to adopt the product.',
      'Partnered with product, sales, marketing, and customer experience teams to answer business questions and deliver analytics that support decision-making.',
      'Developed Power BI dashboards that unified marketing and payments data into a centralized view, giving stakeholders clearer visibility into performance and customer trends.',
      'Investigated payment and transaction lifecycle data to support reporting and maintain consistency across operational and business systems.',
    ],
  },
  {
    period: 'Jan 2023 - May 2024',
    company: 'Marcus Thomas',
    location: 'Cleveland, OH',
    title: 'Data Analyst',
    responsibilities: [
      'Partnered directly with client stakeholders to gather reporting requirements and translate business questions into scalable dashboards and analytical solutions.',
      'Designed and delivered interactive dashboards in Power BI and Looker Studio to track campaign performance, customer behavior, and ROI, enabling clients to optimize marketing strategy.',
      'Served as the primary analytics point of contact for multiple client accounts, presenting insights and advising stakeholders on data structure, reporting strategy, and best practices.',
    ],
  },
  {
    period: 'Sept 2021 - Nov 2022',
    company: 'Grant Thornton',
    location: 'Cincinnati, OH',
    title: 'Audit Associate',
    responsibilities: [
      'Analyzed financial and operational datasets to validate data accuracy, identify anomalies, and ensure integrity of reporting systems.',
      'Evaluated internal controls and data processes, identifying control gaps and recommending improvements to reduce risk and improve data reliability.',
      'Collaborated with client stakeholders to gather documentation, understand data flows, and support audit and reporting requirements.',
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          Experience
        </motion.h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-border" />
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="relative pl-12"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-accent bg-background"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  whileHover={{ scale: 1.5 }}
                />
                
                <motion.div
                  className="space-y-3 p-6 rounded-xl bg-card/50 border border-transparent hover:border-accent/50 transition-colors"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{exp.period}</p>
                    <p className="text-base text-muted-foreground">
                      {exp.company} | {exp.location}
                    </p>
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                  </div>
                  
                  <ul className="space-y-2 text-muted-foreground">
                    {exp.responsibilities.map((resp, idx) => (
                      <motion.li
                        key={idx}
                        className="flex gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.05 }}
                      >
                        <span className="text-accent mt-2">•</span>
                        <span className="flex-1">{resp}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
