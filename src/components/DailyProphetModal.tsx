import { useEffect, useMemo, useRef } from "react";
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

  const sidebarItems = article.sidebar?.items ?? [];

  const supportingStories = useMemo(
    () => [
      {
        title: sidebarItems[0]?.title ?? "Wizard Magician Breaks Statute of Secrecy on Christmas Eve",
        text:
          sidebarItems[0]?.text ??
          "Christmas Eve is a big day for the wizarding world—for both Wizard, Witch and Muggle alike.",
        img:
          sidebarItems[0]?.img ??
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop",
      },
      {
        title: "Heir Of Slytherin To Start At Hogwarts This Year",
        text:
          "In a recent discovery, a modern-day Heir of Slytherin has been identified. The once magical Slytherin has been in hiding from the wizarding world for the last three generations…",
        img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
      },
      {
        title: "Godric Gryffindors Wand Resurfaces At Hogwarts",
        text:
          "Earlier today Kaitlin Black, a 4th year from Ravenclaw, discovered a wand that is now thought to be the Godric Gryffindors Wand. While the magical item is currently being housed by The Ministry of Magic and undergoing tests…",
        img:
          sidebarItems[1]?.img ??
          "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?q=80&w=1200&auto=format&fit=crop",
      },
    ],
    [sidebarItems],
  );

  const marquee = {
    title: "World News",
    blurb:
      article.body[1] ??
      "In a series of unprecedented events, one right after another, the Department of Mysteries and The Department of Magical Creatures have undergone a joint collaboration to understand what the muggle world has identified as COVID-19.",
  };

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

          {/* Lead story */}
          <section className={styles.lead}>
            <div className={styles.leadGrid}>
              <div className={styles.leadCopy}>
                <h2 className={styles.headline}>{article.headline}</h2>
                {article.dek && <p className={styles.dek}>{article.dek}</p>}

                <div className={`${styles.article} ${styles.dropcap}`}>
                  {article.body.map((para, i) => <p key={i}>{para}</p>)}
                  <p className={styles.byline}><em>By {interview.author.name} · TUITALKS</em></p>
                </div>
              </div>

              {article.hero && (
                <figure className={styles.heroWrap}>
                  <img className={styles.hero} src={article.hero.src} alt={article.hero.alt} />
                  <figcaption className={styles.caption}>{article.hero.alt}</figcaption>
                </figure>
              )}
            </div>

            {article.sidebar && (
              <aside className={styles.sidebar}>
                <div className={styles.sidebarTitle}>{article.sidebar.title}</div>
                {article.sidebar.items.map((it, idx) => (
                  <div key={idx} className={styles.sideCard}>
                    {it.img && <img className={styles.sideImg} src={it.img} alt="" />}
                    <strong>{it.title}</strong>
                    {it.text && <p className={styles.sideText}>{it.text}</p>}
                  </div>
                ))}
              </aside>
            )}
          </section>

          <div className={styles.accentRule} />

          {/* Secondary section inspired by the preview screenshot */}
          <section className={styles.secondaryGrid}>
            {supportingStories.map((story, idx) => (
              <article key={story.title} className={styles.storyCard}>
                <header className={styles.cardHeader}>
                  <div className={styles.sectionTag}>{idx === 0 ? "Hot! News" : "Campus Dispatch"}</div>
                  <h3>{story.title}</h3>
                </header>
                <div className={styles.cardBody}>
                  <p>{story.text}</p>
                  <div className={styles.ticketWrap}>
                    <img src={story.img} alt="" />
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section className={styles.marquee}>
            <div className={styles.marqueeLabel}>{marquee.title}</div>
            <p>{marquee.blurb}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
