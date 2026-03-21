export interface SkillCategory {
  category: string;
  description: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Data & Querying',
    description: 'Core tools I use to explore, shape, and validate data.',
    skills: ['SQL', 'Snowflake', 'Athena', 'Python', 'pandas'],
  },
  {
    category: 'Analytics & BI',
    description: 'Reporting systems and dashboarding tools for business decision-making.',
    skills: ['Power BI', 'Looker Studio', 'Dashboard Design', 'Operational Reporting'],
  },
  {
    category: 'Domain Strengths',
    description: 'Business areas where I have the strongest context and pattern recognition.',
    skills: ['Payments', 'Transaction Analytics', 'Fintech', 'Marketing Performance', 'Customer Experience'],
  },
  {
    category: 'Workflow & AI Tools',
    description: 'Tools I use to speed up research, analysis, and communication.',
    skills: ['ChatGPT', 'GitHub Copilot', 'Claude', 'Notion AI'],
  },
];
