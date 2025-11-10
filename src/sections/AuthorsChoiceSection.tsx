import { useMemo, useState } from "react";
import type { Interview } from "../types/content";
import { INTERVIEWS } from "../content/interviews";
import { FEATURED_IDS, TRENDING_IDS, NEW_IDS } from "../content/featured";
import { InterviewCard } from "../components/InterviewCard";
import styles from "./AuthorsChoiceSection.module.css";

const AUTHORS_CHOICE_IDS = Array.from(new Set([...FEATURED_IDS, ...TRENDING_IDS, ...NEW_IDS]));

function pickByIds(ids: string[]): Interview[] {
  const map = new Map(INTERVIEWS.map(item => [item.id, item]));
  return ids.map(id => map.get(id)).filter(Boolean) as Interview[];
}

export function AuthorsChoiceSection({ onOpen }: { onOpen?: (i: Interview) => void }) {
  const [limit, setLimit] = useState(8);

  const curated = useMemo(() => pickByIds(AUTHORS_CHOICE_IDS), []);
  const items = curated.slice(0, limit);
  const canMore = limit < curated.length;

  return (
    <section id="authors" className={`section ${styles.wrap}`} aria-labelledby="authors-title">
      <div className="container-ultra">
        <div className={styles.inner}>
          <header className={styles.headerRow}>
            <div>
              <h2 id="authors-title" className={styles.title}>
               Spotlight
              </h2>
              <p className={styles.subtitle}>
                Hand-picked reads from the editorial desk. Short, sharp interviews you can finish between classes.
              </p>
            </div>
            <p className={styles.helper}>Curated moments</p>
          </header>

          <div className={styles.grid}>
            {items.map(item => (
              <div key={item.id} className={styles.item}>
                <InterviewCard item={item} onOpen={onOpen} />
              </div>
            ))}
          </div>

          {canMore && (
            <div className={styles.moreWrap}>
              <button className={styles.btn} onClick={() => setLimit(l => l + 6)}>
                Show more picks
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
