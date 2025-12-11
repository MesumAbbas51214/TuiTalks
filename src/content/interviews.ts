import type { Interview } from "../types/content";
import sameerImage from "../assets/sameer1.jpg";

export const INTERVIEWS: Interview[] = [
  {
    id: "sameer",
    title: "Navigating Creative Careers",
    person: "Sameer Kazmi",
    image: sameerImage,
    excerpt: "A candid chat about storytelling, campus theatre and building confidence on stage.",
    dateISO: "2025-02-14",
    category: "Creative Arts",
    tags: ["theatre", "confidence", "mentorship"],
    author: { name: "Marla Singh" },
    recommendedTrack:
      "https://cdn.pixabay.com/download/audio/2021/09/02/audio_d49e0155f5.mp3?filename=acoustic-guitar-1106.mp3",
  },
];
