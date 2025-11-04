import type { Interview } from "../types/content";

export const INTERVIEWS: Interview[] = [
  {
    id: "albus-dumbledore",
    title: "On Wisdom & Curiosity",
    person: "Albus Dumbledore",
    image:
      "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=1600&auto=format&fit=crop",
    excerpt: "A conversation about learning, leadership, and the pursuit of knowledge.",
    dateISO: "2025-08-14",
    category: "Leadership",
    tags: ["wisdom", "learning"],
    author: { name: "Editor Team" },
  },
  {
    id: "hermione-granger",
    title: "Studying Smarter",
    person: "Hermione Granger",
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1600&auto=format&fit=crop",
    excerpt: "On discipline, note-taking, and building a campus research culture.",
    dateISO: "2025-09-03",
    category: "Academics",
    tags: ["study", "notes", "research"],
    author: { name: "Campus Desk" },
  },
  {
    id: "harry-potter",
    title: "Courage on Campus",
    person: "Harry Potter",
    image:
      "https://images.unsplash.com/photo-1520975922284-0d12f58fd1a5?q=80&w=1600&auto=format&fit=crop",
    excerpt: "Facing challenges, balancing studies, and supporting peers.",
    dateISO: "2025-07-22",
    category: "Student Life",
    tags: ["support", "community"],
    author: { name: "Student Voice" },
  },
];
