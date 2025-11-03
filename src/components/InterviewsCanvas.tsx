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
          <h2 className={styles.title}>Interviews</h2>
          <p className={styles.subtitle}>People, ideas, and stories shaping campus life.</p>
        </div>
      </div>

      <div className={styles.grid}>
        {items.map(item => (
          <div key={item.id} className="hover-pop">
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
