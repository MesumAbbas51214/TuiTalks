import { useEffect, useRef } from "react";
import styles from "./InterviewModalDP.module.css";
import type { Interview } from "../types/content";
import { useBodyLock } from "../hooks/useBodyLock";

type Props = {
  open: boolean;
  interview: Interview | null;
  onClose: () => void;
};

export function InterviewModalDP({ open, interview, onClose }: Props) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useBodyLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !interview) return null;

  // Use interview data for headline, image, etc. Filler body for now.
  const { person, title, image, excerpt, author, dateISO } = interview;
  const filler =
    `${excerpt} ${excerpt} ${excerpt} ` +
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vitae purus ut neque " +
    "consequat mattis. Sed lacinia, nunc id fringilla viverra, est sem tempus justo, sed commodo " +
    "erat nibh a arcu. Integer pretium augue vitae arcu suscipit, vitae dictum ipsum imperdiet.";

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={`${styles.sheet} ${styles.paper}`} onClick={(e) => e.stopPropagation()}>
        <button ref={closeBtnRef} className={`${styles.close} ${styles.trap}`} onClick={onClose}>
          × Close
        </button>

        <div className={styles.frame}>
          {/* Masthead */}
          <div className={styles.masthead}>
            <div className={styles.mhr} />
            <div className={styles.brand}>THE DAILY PROPHET</div>
            <div className={styles.mhr} />
          </div>

          {/* Info row */}
          <div className={styles.infoRow}>
            <div><strong>Campus Edition</strong></div>
            <div>{new Date(dateISO).toLocaleDateString()}</div>
          </div>

          {/* Hero */}
          <img src={image} alt={person} className={styles.hero} />
          <div className={styles.caption}>Photo: campus archives</div>

          {/* Headline */}
          <div className={styles.kicker}>{person}</div>
          <h1 className={styles.headline}>{title}</h1>
          <div className={styles.sublead}>{excerpt}</div>

          {/* Body columns */}
          <div className={`${styles.columns} ${styles.dropcap}`}>
            <p>{filler}</p>
            <p className={styles.pullquote}>
              “Education is not the filling of a pail, but the lighting of a fire.”
            </p>
            <p>{filler}</p>
            <p>{filler}</p>
            <p><em>By {author.name} • TUITALKS</em></p>
          </div>
        </div>
      </div>
    </div>
  );
}
