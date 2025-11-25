import { useEffect, useRef } from "react";
import type { Interview } from "../types/content";
import styles from "./DailyProphetModal.module.css";
import { useBodyLock } from "../hooks/useBodyLock";
import { getProphetArticle } from "../content/prophet";

export function DailyProphetModal({
  open,
  interview,
  onClose,
}: {
  open: boolean;
  interview: Interview | null;
  onClose: () => void;
}) {
  useBodyLock(open);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    setTimeout(() => closeRef.current?.focus(), 0);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !interview) return null;

  // Pull article by interview.id; fallback to a sample.
  const article = getProphetArticle(interview.id);

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={`${styles.window} ${styles.paper}`} onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} className={styles.close} onClick={onClose}>× Close</button>
        <div className={styles.inner}>
          {/* Masthead */}
          <div className={styles.mast}>
            <div className={styles.rule} />
            <div className={styles.brand}>TUI TALKS</div>
            <div className={styles.rule} />
          </div>

          {/* Issue strip */}
          <div className={styles.issueRow}>
            <span>{article.issue}</span>
            <span>{article.dateText}</span>
            <span>{article.cost}</span>
          </div>

          {/* Headline & dek */}
          <h2 className={styles.headline}>{article.headline}</h2>
          {article.dek && <p className={styles.dek}>{article.dek}</p>}

          {/* Two-column layout (article + sidebar) */}
          <div className={styles.layout}>
            <div>
              {article.hero && (
                <img className={styles.hero} src={article.hero.src} alt={article.hero.alt} />
              )}

              <div className={`${styles.article} ${styles.dropcap}`}>
                {article.body.map((para, i) => <p key={i}>{para}</p>)}
                {/* Signature using the interview data */}
                <p><em>By {interview.author.name} · TUITALKS</em></p>
              </div>
            </div>

            {article.sidebar && (
              <aside className={styles.sidebar}>
                <div className={styles.sidebarTitle}>{article.sidebar.title}</div>
                {article.sidebar.items.map((it, idx) => (
                  <div key={idx} className={styles.sideCard}>
                    {it.img && <img className={styles.sideImg} src={it.img} alt="" />}
                    <strong>{it.title}</strong>
                    {it.text && <p style={{ margin: 0 }}>{it.text}</p>}
                  </div>
                ))}
              </aside>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
