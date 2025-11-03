import { INTERVIEWS } from "../types/content";
import styles from "./InterviewsGrid.module.css";

export function InterviewsGrid() {
  return (
    <div className={styles.grid}>
      {INTERVIEWS.map((it) => (
        <article key={it.id} id={`card-${it.id}`} tabIndex={0} className={styles.card}>
          <div className={styles.thumb}><img src={it.image} alt="" loading="lazy" /></div>
          <div className={styles.content}>
            <div className={styles.title}>{it.person}</div>
            <p className={styles.teaser}>{it.title} - {it.excerpt}</p>
          </div>
          <button
            aria-label={`Open Interview ${it.person}`}
            style={{ position: "absolute", inset: 0, border: 0, background: "none", cursor: "pointer" }}
          />
        </article>
      ))}

      {Array.from({ length: 3 }).map((_, i) => (
        <article key={`ph-${i}`} className={styles.card}>
          <div className={styles.thumb} />
          <div className={styles.content}>
            <div className={styles.title} style={{ color: "#6b7280" }}>Coming soon</div>
            <p className={styles.teaser}>New interview in editing.</p>
          </div>
        </article>
      ))}
    </div>
  );
}

