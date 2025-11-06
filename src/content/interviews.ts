import type { Interview } from "../types/content";

export const INTERVIEWS: Interview[] = [
  {
    id: "john-henderson",
    title: "Navigating Creative Careers",
    person: "John Henderson",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1600&auto=format&fit=crop",
    excerpt: "A candid chat about storytelling, campus theatre and building confidence on stage.",
    dateISO: "2025-02-14",
    category: "Creative Arts",
    tags: ["theatre", "confidence", "mentorship"],
    author: { name: "Marla Singh" },
  },
  {
    id: "sara-elias",
    title: "Designing Inclusive Spaces",
    person: "Sara Elias",
    image:
      "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=1600&auto=format&fit=crop",
    excerpt: "How collaborative design studios are making campus life more welcoming for everyone.",
    dateISO: "2025-03-02",
    category: "Innovation",
    tags: ["design", "community", "accessibility"],
    author: { name: "Campus Desk" },
  },
];
