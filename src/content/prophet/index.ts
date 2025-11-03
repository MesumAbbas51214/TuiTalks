import type { ProphetArticle } from "./types";
import { SAMPLE_ARTICLE } from "./sample";

/** Map each interview.id -> article content.
 *  Start by reusing SAMPLE_ARTICLE; later create unique files per interview. */
export const PROPHET_BY_INTERVIEW: Record<string, ProphetArticle> = {
  "albus-dumbledore": SAMPLE_ARTICLE,
  "hermione-granger": SAMPLE_ARTICLE,
  "harry-potter": SAMPLE_ARTICLE,
};
