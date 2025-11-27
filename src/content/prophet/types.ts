export type ProphetArticle = {
  issue: string;               // e.g. "ISSUE #1"
  dateText: string;            // e.g. "TUESDAY, 01 JUNE, 2021"
  cost: string;                // e.g. "5 KUNTS"
  headline: string;
  dek?: string;                // subheadline
  hero?: { src?: string; alt?: string };
  body: string[];              // paragraphs
  sidebar?: { title: string; items: { img?: string; title: string; text?: string }[] };
};
