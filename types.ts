export type SlideType = 'intro' | 'agenda' | 'concept' | 'resource' | 'outro';

export interface SlideItem {
  text: string;
  icon?: string; // Lucide icon name or emoji
  subtext?: string;
  highlight?: boolean;
}

export interface SlideData {
  id: string;
  type: SlideType;
  title: string;
  subtitle?: string;
  content?: string; // Main body text or HTML-like snippets
  callout?: string; // The blue box content
  codeBlock?: {
    title?: string;
    content: string;
  };
  items?: SlideItem[]; // For bullet points or agenda cards
  footerText?: string;
  author?: string;
}

export interface AppSettings {
  allowPdfDownload: boolean;
  requireAuthForDownload: boolean;
}