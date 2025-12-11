import type { ProphetArticle } from "./types";
import { SAMPLE_ARTICLE } from "./sample";
import { SAMEER_ARTICLE } from "./Sameer";

/** Map each interview.id -> article content.
 *  New interviews can provide their own file; unknown ids fall back to SAMPLE_ARTICLE. */
export const PROPHET_BY_INTERVIEW: Record<string, ProphetArticle> = {
  sameer: SAMEER_ARTICLE,
};

export function getProphetArticle(interviewId: string): ProphetArticle {
  return PROPHET_BY_INTERVIEW[interviewId] ?? SAMPLE_ARTICLE;
}
