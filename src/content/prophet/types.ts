export type ProphetArticle = {
  episode: string;               // e.g. "ISSUE #1"
  interviewee: string;            // e.g. "TUESDAY, 01 JUNE, 2021"
  date: string;                // e.g. "5 KUNTS"
  headline: string;
  dek?: string;                // subheadline
  hero?: { src?: string; alt?: string };
  body: string[];              // paragraphs
  body2?: string[];
  sidebar?: { title: string; items: { img?: string; title: string; text?: string }[] };
  afterword?: { title?: string; body: string[] };
  extendedBody?: {
    title: string;
    image: { src: string; alt?: string };
    body: string[];
  };
};
