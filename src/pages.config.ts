/**
 * Page Metadata Configuration
 * 
 * Centralized SEO metadata for all static pages. Single source of truth
 * for titles and descriptions to ensure consistency across the site.
 * 
 * @module pages.config
 */

interface PageMeta {
  title: string;
  description: string;
  heading?: string;
  intro?: string;
}

export const pagesConfig = {
  home: {
    title: 'Home',
    description: 'Portfolio of Samuel Manchajm — Machine Learning Engineer. ML/data projects, case studies, and career journey.',
  },
  
  projects: {
    title: 'Projects',
    description: 'Case studies and projects in machine learning, data science, and production ML systems.',
    heading: 'Projects',
    intro: 'ML and data projects where I document the problem, approach, technical choices, and outcomes.',
  },
  
  decisions: {
    title: 'Decisions',
    description: 'A log of technical and architectural decisions in ML and data engineering contexts.',
    heading: 'Decisions',
    intro: 'Trade-offs from real projects: context, alternatives considered, and reasoning behind each choice.',
  },
  
  journey: {
    title: 'Journey',
    description: 'Key milestones in my path through machine learning, data science, and software engineering.',
    heading: 'Journey',
    intro: 'Moments that shaped my growth: education, standout projects, and technical learnings.',
  },
  
  writing: {
    title: 'Writing',
    description: 'Articles and notes on machine learning, data, and production deployment.',
    heading: 'Writing',
    intro: 'Reflections and lessons from modeling, experimentation, and shipping data-driven systems.',
  },

  speaking: {
    title: 'Speaking',
    description: 'Talks, workshops, and presentations on machine learning and data.',
    heading: 'Speaking',
    intro: 'Public presentations and discussions on ML, data, and engineering topics.',
  },
  
  uses: {
    title: 'Uses',
    description: 'Tools, frameworks, and environment I use day to day for ML and data work.',
    heading: 'Uses',
    intro: 'A transparent look at my technical setup: languages, libraries, infra, and workflow tools.',
  },
  
  contact: {
    title: 'Contact',
    description: 'Get in touch to discuss opportunities, collaborations, or ML/data projects.',
    heading: 'Let\'s talk',
  },
} as const;

export type PagesConfig = typeof pagesConfig;
export type PageConfig = PageMeta;
