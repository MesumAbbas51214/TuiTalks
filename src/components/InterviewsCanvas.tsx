import { useMemo } from "react";
import { FEATURED_IDS } from "../content/featured";
import { INTERVIEWS } from "../content/interviews";
import { FeaturedCard } from "./FeaturedCard";
import type { Interview } from "../types/content";
import styles from "./InterviewsCanvas.module.css";

function pickByIds(ids: string[]): Interview[] {
  const map = new Map(INTERVIEWS.map(item => [item.id, item]));
  return ids.map(id => map.get(id)).filter(Boolean) as Interview[];
}

const FEATURED_LABEL = "Spotlight";
const FEATURED_BADGE = "Fresh voices every week";

export function InterviewsCanvas({ onOpen }: { onOpen?: (i: Interview) => void }) {
  const data = useMemo(() => pickByIds(FEATURED_IDS), []);

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <header className={styles.headerRow}>
          <div className={styles.headerCopy}>
            <h2 className={styles.title}>Interviews</h2>
            <p className={styles.subtitle}>
              Meet the makers, dreamers, and campus voices shaping the future of TUIs. Dive into in-depth
              conversations that bring their stories and inspirations to life.
            </p>
          </div>

          <div className={styles.badgeStack}>
            <span className={styles.kicker}>{FEATURED_LABEL}</span>
            <span className={styles.badge}>{FEATURED_BADGE}</span>
          </div>
        </header>

        <div className={styles.grid} role="list">
          {data.map(item => (
            <div key={item.id} className={styles.gridItem} role="listitem">
              <FeaturedCard item={item} badge={FEATURED_BADGE} onOpen={onOpen} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
