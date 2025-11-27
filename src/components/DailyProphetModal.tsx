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

  // Always resolve article + derived content to keep hook order stable.
  const article = getProphetArticle(interview?.id ?? "sample");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    setTimeout(() => closeRef.current?.focus(), 0);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !interview) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={`${styles.window} ${styles.paper}`} onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} className={styles.close} onClick={onClose}>X Close</button>
        <div className={styles.inner}>
          {/* Masthead */}
          <div className={styles.mast}>
            <div className={styles.rule} />
            <div className={styles.brand}>TUI TALKS</div>
            <div className={styles.rule} />
          </div>

          {/* Issue strip */}
          <div className={styles.issueRow}>
            <span>{article.episode}</span>
            <span>{article.interviewee}</span>
            <span>{article.date}</span>
          </div>

          {/* Headline & dek */}
          <h2 className={styles.headline}>{article.headline}</h2>
          {article.dek && <p className={styles.dek}>{article.dek}</p>}

          {/* Two-column layout (article + sidebar) */}
          <div className={styles.layout}>
            <div>
              {article.hero && (
                <img className={styles.hero} src={article.hero.src} alt={article.hero.alt ?? ""} />
              )}

              <div className={`${styles.article} ${styles.dropcap}`}>
                {article.body.map((para, i) => <p key={i}>{para}</p>)}
                {/* Signature using the interview data */}
                <p><em>By {interview.author.name} - TUITALKS</em></p>
              </div>
            </div>

            {article.sidebar && (
              <aside className={styles.sidebar}>
                <div className={styles.sidebarTitle}>{article.sidebar.title}</div>
                {article.sidebar.items.map((it, idx) => (
                  <div key={idx} className={styles.sideCard}>
                    {it.img && (
                      <div className={styles.sideImgWrap}>
                        <img className={styles.sideImg} src={it.img} alt="" />
                        <span className={styles.smoke} aria-hidden="true" />
                      </div>
                    )}
                    <strong>{it.title}</strong>
                    {it.text && <p style={{ margin: 0 }}>{it.text}</p>}
                  </div>
                ))}
                <img
                  className={styles.sidebarGif}
                  src="https://i.gifer.com/IYYR.gif"
                  alt="Animated wizardly parchment unfurling in green smoke"
                />
              </aside>
            )}
          </div>

          {article.afterword && (
            <div className={styles.afterword}>
              {article.afterword.title && <h3 className={styles.afterwordTitle}>{article.afterword.title}</h3>}
              <div className={styles.afterwordBody}>
                {article.afterword.body.map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
