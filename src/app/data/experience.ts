export interface ExperienceItem {
  period: string;
  company: string;
  location: string;
  title: string;
  summary: string;
  highlights: string[];
}

export const experiences: ExperienceItem[] = [
  {
    period: 'May 2024 - Current',
    company: 'Triumph Financial',
    location: 'Dallas, TX',
    title: 'Data Analyst',
    summary: 'Working at the intersection of payments, customer analytics, and go-to-market reporting.',
    highlights: [
      'Analyzed instant payments adoption and helped identify high-potential users.',
      'Built reporting for sales leadership to prioritize outreach and growth opportunities.',
      'Created Power BI dashboards that unified marketing and payments performance data.',
    ],
  },
  {
    period: 'Jan 2023 - May 2024',
    company: 'Marcus Thomas',
    location: 'Cleveland, OH',
    title: 'Data Analyst',
    summary: 'Supported client-facing analytics across campaign reporting, customer insights, and dashboard strategy.',
    highlights: [
      'Translated stakeholder questions into scalable dashboards and analytical workflows.',
      'Built Power BI and Looker Studio reporting for campaign performance and ROI.',
      'Presented insights directly to clients and guided reporting best practices.',
    ],
  },
  {
    period: 'Sept 2021 - Nov 2022',
    company: 'Grant Thornton',
    location: 'Cincinnati, OH',
    title: 'Audit Associate',
    summary: 'Built a foundation in financial reporting, controls, and data integrity.',
    highlights: [
      'Analyzed financial and operational datasets for accuracy and anomalies.',
      'Evaluated controls and identified opportunities to improve reporting reliability.',
      'Worked with clients to understand data flows and support audit requirements.',
    ],
  },
];
