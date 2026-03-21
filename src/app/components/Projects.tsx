import { motion } from 'motion/react';

interface Project {
  title: string;
  description: string;
  tags: string[];
}

const projects: Project[] = [
  {
    title: 'Payment Adoption Dashboard',
    description: 'Built comprehensive Power BI dashboard to track instant payment product adoption, user behavior, and transaction trends. Integrated data from multiple sources to provide unified view for stakeholders.',
    tags: ['Power BI', 'SQL', 'Data Integration', 'Product Analytics'],
  },
  {
    title: 'Customer Segmentation Model',
    description: 'Developed predictive model to identify high-potential customers for new financial products. Analysis contributed to targeted outreach strategy that increased adoption by 10x.',
    tags: ['Python', 'Machine Learning', 'Customer Analytics', 'Segmentation'],
  },
  {
    title: 'Marketing Performance Platform',
    description: 'Created centralized reporting platform combining marketing campaign data with customer lifecycle metrics. Enabled data-driven decision making for sales and marketing teams.',
    tags: ['Looker Studio', 'SQL', 'Marketing Analytics', 'Data Visualization'],
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-card border border-border rounded-xl p-6 hover:border-accent transition-colors cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <motion.h3
                className="text-xl font-semibold mb-3"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {project.title}
              </motion.h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <motion.span
                    key={idx}
                    className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
