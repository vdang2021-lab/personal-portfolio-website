import { Fragment, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import rawSalesCaseStudy from '../content/case_study_sales_targeting_model.md?raw';
import rawSlackCaseStudy from '../content/case_study_ai_powered_slack_data_assistant.md?raw';
import { getProjectBySlug } from '../data/projects';

type MarkdownBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'list'; items: string[]; ordered: boolean };

function splitSections(markdown: string) {
  const sections = new Map<string, string>();
  const matches = [...markdown.matchAll(/^##\s+(.+)$/gm)];

  matches.forEach((match, index) => {
    const title = match[1].trim();
    const start = match.index ? match.index + match[0].length : 0;
    const end = index + 1 < matches.length && matches[index + 1].index ? matches[index + 1].index : markdown.length;
    const body = markdown.slice(start, end).replace(/^[-\s]+|[-\s]+$/g, '').trim();
    sections.set(title, body);
  });

  return sections;
}

function parseBlocks(content: string): MarkdownBlock[] {
  const lines = content.split('\n');
  const blocks: MarkdownBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line || line === '---') {
      index += 1;
      continue;
    }

    if (/^-\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^-\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^-\s+/, ''));
        index += 1;
      }
      blocks.push({ type: 'list', items, ordered: false });
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ''));
        index += 1;
      }
      blocks.push({ type: 'list', items, ordered: true });
      continue;
    }

    const paragraphLines: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      lines[index].trim() !== '---' &&
      !/^-\s+/.test(lines[index].trim()) &&
      !/^\d+\.\s+/.test(lines[index].trim())
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    const paragraph = paragraphLines.join(' ');
    const headingOnly = paragraph.match(/^\*\*(.+)\*\*$/);

    if (headingOnly) {
      blocks.push({ type: 'subheading', text: headingOnly[1] });
      continue;
    }

    blocks.push({ type: 'paragraph', text: paragraph });
  }

  return blocks;
}

function renderInlineMarkdown(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={`${part}-${index}`} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
  });
}

function SectionBlock({ title, content }: { title: string; content: string }) {
  const blocks = parseBlocks(content);

  return (
    <motion.section
      className="rounded-3xl border border-border/70 bg-card/45 px-6 py-7 md:px-8 md:py-9"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45 }}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-accent">{title}</p>
        </div>

        <div className="space-y-5">
          {blocks.map((block, index) => {
            if (block.type === 'subheading') {
              return (
                <h3 key={`${title}-subheading-${index}`} className="text-lg font-semibold text-foreground">
                  {renderInlineMarkdown(block.text)}
                </h3>
              );
            }

            if (block.type === 'list') {
              const ListTag = block.ordered ? 'ol' : 'ul';

              return (
                <ListTag
                  key={`${title}-list-${index}`}
                  className={`space-y-3 pl-5 text-base leading-8 text-foreground/82 ${
                    block.ordered ? 'list-decimal' : 'list-disc'
                  }`}
                >
                  {block.items.map((item) => (
                    <li key={item}>{renderInlineMarkdown(item)}</li>
                  ))}
                </ListTag>
              );
            }

            return (
              <p key={`${title}-paragraph-${index}`} className="text-base leading-8 text-foreground/78">
                {renderInlineMarkdown(block.text)}
              </p>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

const caseStudyContentBySlug = {
  'sales-targeting-model': {
    markdown: rawSalesCaseStudy,
    sectionOrder: [
      'Overview',
      'Problem',
      'Approach',
      'Iteration: What Changed',
      'Key Insights',
      'Impact',
      "Reflection: What I'd Do Differently",
    ],
  },
  'ai-powered-slack-data-assistant': {
    markdown: rawSlackCaseStudy,
    sectionOrder: [
      'Overview',
      'Problem',
      'Approach',
      'System Design',
      'Designing for Accuracy',
      'Guardrails & Constraints',
      'Handling Ambiguity',
      'Agent Design',
      'Output Design',
      'What We Built',
      'Example Use Cases',
      'What Success Looks Like',
      'Limitations',
      'Reflection',
    ],
  },
} as const;

export default function ProjectCaseStudyPage() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const caseStudyConfig = slug ? caseStudyContentBySlug[slug as keyof typeof caseStudyContentBySlug] : undefined;

  if (!project || !slug || !caseStudyConfig) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navigation />
        <main className="flex-1 px-6 pt-28 pb-20">
          <div className="max-w-4xl mx-auto space-y-6">
            <button
              type="button"
              onClick={() => navigate('/projects')}
              className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Projects
            </button>
            <div className="rounded-3xl border border-border/70 bg-card/45 px-6 py-8">
              <p className="text-lg text-muted-foreground">That case study couldn’t be found.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const caseStudySections = splitSections(caseStudyConfig.markdown);
  const overview = caseStudySections.get('Overview') ?? '';
  const outcome = caseStudySections.get('Outcome') ?? project.outcome;
  const displayTitle = caseStudyConfig.markdown
    .match(/^#\s+(.+)$/m)?.[1]
    ?.replace(/^Case Study:\s*/, '') ?? project.title;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      <main className="flex-1 px-6 pt-28 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.button
            onClick={() => navigate('/projects')}
            className="flex items-center gap-2 text-muted-foreground hover:text-accent mb-10 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </motion.button>

          <motion.div
            className="space-y-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-[0.24em] text-accent">Project Case Study</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight max-w-4xl">{displayTitle}</h1>
            <p className="text-lg leading-8 text-muted-foreground max-w-3xl">{overview}</p>

            <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
              <div className="rounded-3xl border border-border/70 bg-card/45 px-6 py-6">
                <p className="text-sm uppercase tracking-[0.18em] text-accent mb-3">Outcome</p>
                <p className="text-base leading-8 text-foreground/82">{outcome}</p>
              </div>

              <div className="rounded-3xl border border-border/70 bg-card/45 px-6 py-6">
                <p className="text-sm uppercase tracking-[0.18em] text-accent mb-3">Tools</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border/60 bg-background/70 px-3 py-1.5 text-sm text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-8">
            {caseStudyConfig.sectionOrder.map((sectionTitle) => {
              const content = caseStudySections.get(sectionTitle);

              if (!content) {
                return null;
              }

              const displaySectionTitle =
                sectionTitle === 'Iteration: What Changed'
                  ? 'Iteration'
                  : sectionTitle === "Reflection: What I'd Do Differently"
                    ? 'Reflection'
                    : sectionTitle;

              return (
                <SectionBlock
                  key={sectionTitle}
                  title={displaySectionTitle}
                  content={content}
                />
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
