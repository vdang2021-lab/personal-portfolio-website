export interface ProjectItem {
  slug?: string;
  status?: 'complete' | 'in-progress' | 'coming-soon';
  title: string;
  summary: string;
  outcome?: string;
  tags: string[];
}

export const projects: ProjectItem[] = [
  {
    slug: 'sales-targeting-model',
    status: 'complete',
    title: 'Sales Prioritization Model',
    summary: 'Built a two-stage machine learning model to rank 79,000+ prospects by expected revenue and focus sales outreach where it mattered most.',
    outcome: 'Delivered a production-ready model that improved sales targeting efficiency by 2.2x and identified $35M in realistic pipeline opportunity.',
    tags: [
      'Python',
      'Machine Learning',
      'Classification & Regression',
      'Predictive Modeling',
      'Revenue Forecasting',
      'Feature Engineering',
      'Experimentation',
    ],
  },
  {
    slug: 'ai-powered-slack-data-assistant',
    status: 'complete',
    title: 'AI-Powered Slack Data Assistant',
    summary: 'Explored a Slack-based AI assistant that could turn plain-English data questions into Snowflake queries and return answers directly in workflow.',
    outcome: 'Hackathon prototype that mapped out a practical path to faster, lower-friction data access for common stakeholder questions.',
    tags: ['AI', 'Data Systems', 'Snowflake', 'Slack', 'LLMs'],
  },
  {
    status: 'coming-soon',
    title: 'Marketing Performance Analysis',
    summary: 'Exploring campaign performance and user behavior patterns to better understand conversion, engagement, and reporting opportunities. Case study coming soon.',
    tags: ['Marketing Analytics', 'SQL', 'Reporting'],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
