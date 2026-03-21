export interface ProjectItem {
  title: string;
  summary: string;
  outcome: string;
  tags: string[];
}

export const projects: ProjectItem[] = [
  {
    title: 'Payment Adoption Dashboard',
    summary: 'Built a Power BI dashboard to track instant payment product adoption, user behavior, and transaction trends across multiple sources.',
    outcome: 'Gave stakeholders a unified view of performance and adoption momentum.',
    tags: ['Power BI', 'SQL', 'Product Analytics'],
  },
  {
    title: 'Customer Segmentation Model',
    summary: 'Developed a model to identify high-potential customers for new financial products and prioritize outreach efforts.',
    outcome: 'Helped support a targeted strategy that drove a major increase in adoption.',
    tags: ['Python', 'Segmentation', 'Customer Analytics'],
  },
  {
    title: 'Marketing Performance Platform',
    summary: 'Created centralized reporting that connected campaign data with customer lifecycle metrics.',
    outcome: 'Made it easier for sales and marketing teams to make faster reporting decisions.',
    tags: ['Looker Studio', 'SQL', 'Marketing Analytics'],
  },
];
