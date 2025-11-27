export type Interview = {
  id: string;
  title: string;
  person: string;
  image: string;
  excerpt: string;
  dateISO: string;
  category: string;
  tags: string[];
  author: { name: string; avatar?: string };
  recommendedTrack?: string;
};
