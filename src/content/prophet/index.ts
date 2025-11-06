import type { ProphetArticle } from "./types";
import { SAMPLE_ARTICLE } from "./sample";
import { JOHN_HENDERSON_ARTICLE } from "./john-henderson";
import { SARA_ELIAS_ARTICLE } from "./sara-elias";

/** Map each interview.id -> article content.
 *  New interviews can provide their own file; unknown ids fall back to SAMPLE_ARTICLE. */
export const PROPHET_BY_INTERVIEW: Record<string, ProphetArticle> = {
  "john-henderson": JOHN_HENDERSON_ARTICLE,
  "sara-elias": SARA_ELIAS_ARTICLE,
};

export function getProphetArticle(interviewId: string): ProphetArticle {
  return PROPHET_BY_INTERVIEW[interviewId] ?? SAMPLE_ARTICLE;
}
