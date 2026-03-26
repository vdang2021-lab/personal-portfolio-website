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
    status: 'in-progress',
    title: 'Health & Recovery Dashboard',
    summary: 'Personal analytics project using wearable data to track sleep, activity, and recovery. Currently redesigning the dashboard to improve clarity and long-term trend analysis.',
    tags: ['Looker Studio', 'Personal Analytics', 'Health Data'],
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
