import { useState } from "react";
import { INTERVIEWS } from "../types/content";
import type { Interview } from "../types/content";

import { InterviewCard } from "./InterviewCard";
import styles from "./InterviewsCanvas.module.css";

export function InterviewsCanvas({ onOpen }: { onOpen?: (i: Interview) => void }){
  const [limit, setLimit] = useState(20);
  const items = INTERVIEWS.slice(0, limit);
  const canMore = limit < INTERVIEWS.length;

  return (
    <div>
      <div className={styles.headerRow}>
        <div>
          <span className={styles.eyebrow}>Spotlight series</span>
          <h2 className={styles.title}>Interviews</h2>
          <p className={styles.subtitle}>
            These are the conversations we&apos;ve captured with the people building the future of TUITalks—dive in and
            discover what&apos;s inspiring them next.
          </p>
        </div>
        <p className={styles.helper}>Fresh voices every week</p>
      </div>

      <div className={styles.grid}>
        {items.map(item => (
          <div key={item.id} className={styles.item}>
            <InterviewCard item={item} onOpen={onOpen} />
          </div>
        ))}
      </div>

      {canMore && (
        <div className={styles.moreWrap}>
          <button className={styles.btn} onClick={() => setLimit(l => l + 12)}>Load more</button>
        </div>
      )}
    </div>
  );
}
