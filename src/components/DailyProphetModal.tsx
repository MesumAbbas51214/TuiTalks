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
  const article = useMemo(() => getProphetArticle(interview?.id ?? "sample"), [interview]);
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
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
        kicker: article.sidebar?.title ?? "Hot News!",
      },
      {
        title: "Heir Of Slytherin To Start At Hogwarts This Year",
        text:
          "In a recent discovery, a modern-day Heir of Slytherin has been identified. The once magical Slytherin has been in hiding from the wizarding world for the last three generations…",
        img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
        kicker: "Front Page",
      },
      {
        title: "Godric Gryffindors Wand Resurfaces At Hogwarts",
        text:
          "Earlier today Kaitlin Black, a 4th year from Ravenclaw, discovered a wand that is now thought to be the Godric Gryffindors Wand. While the magical item is currently being housed by The Ministry of Magic and undergoing tests…",
        img:
          sidebarItems[1]?.img ??
          "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?q=80&w=1200&auto=format&fit=crop",
        kicker: "Campus Dispatch",
      },
    ],
    [article.sidebar?.title, sidebarItems],
  );

  const rightRailStories = useMemo(
    () => [
      {
        title: sidebarItems[0]?.title ?? "Hot! News!",
        text:
          sidebarItems[0]?.text ??
          "Click through for the latest magical happenings around the castle and beyond.",
        img:
          sidebarItems[0]?.img ??
          "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=700&auto=format&fit=crop",
        label: article.sidebar?.title ?? "Hot News!",
        tone: "feature",
      },
      {
        title: "50% OFF HOGWARTS EXPRESS TICKETS",
        text: "Limited time companion fare for the trip back to school. Present your owl post receipt at Platform 9¾.",
        img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600&auto=format&fit=crop",
        label: "Exclusive",
        tone: "ticket",
      },
      {
        title: "How To Make Chocolate Frogs",
        text:
          "Everybody loves chocolate frogs—especially if you incorporate a secret ingredient. This easy recipe keeps the snap while saving your knuts.",
        img: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?q=80&w=700&auto=format&fit=crop",
        label: "Kitchen Witchery",
        tone: "recipe",
      },
      {
        title: "Quidditch world cup nearing!",
        text:
          "Word has gone out across the wizarding world that the cup is on; full squad lists to be announced tonight at midnight.",
        img: "https://images.unsplash.com/photo-1521417531070-7ec62a0f35cf?q=80&w=800&auto=format&fit=crop",
        label: "Sports Desk",
      },
      {
        title: "Lord Voldemort's REAL childhood revealed!",
        text:
          "Rita Skeeter dives into the archives with a spine-chilling new chapter and never-before-seen photos from the orphanage.",
        img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=650&auto=format&fit=crop",
        label: "Exclusive", 
      },
      {
        title: "Hogwarts to sort students online!",
        text: "A prototype Sorting Hat has been released for students in other schools of magic. Early testers say the soundtrack slaps.",
        img: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?q=80&w=700&auto=format&fit=crop",
        label: "Tech Desk",
        tone: "stamp",
      },
    ],
    [article.sidebar?.title, sidebarItems],
  );

  const marquee = {
    title: "World News",
    blurb:
      article.body[1] ??
      "In a series of unprecedented events, one right after another, the Department of Mysteries and The Department of Magical Creatures have undergone a joint collaboration to understand what the muggle world has identified as COVID-19.",
  };

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
        <button ref={closeRef} className={styles.close} onClick={onClose}>× Close</button>
        <div className={styles.inner}>
          <div className={styles.mastheadWrap}>
            {/* Masthead */}
            <div className={styles.mast}>
              <div className={styles.rule} />
              <div className={styles.brand}>The Daily Prophet</div>
              <div className={styles.rule} />
            </div>

            {/* Issue strip */}
            <div className={styles.issueRow}>
              <span>{article.issue}</span>
              <span>{article.dateText}</span>
              <span>{article.cost}</span>
            </div>
          </div>

          {/* Lead story */}
          <section className={styles.lead}>
            <div className={styles.pageGrid}>
              <div className={styles.mainColumn}>
                <div className={styles.leadHeader}>
                  <h2 className={styles.headline}>{article.headline}</h2>
                  {article.dek && <p className={styles.dek}>{article.dek}</p>}
                </div>

                <div className={styles.leadGrid}>
                  <div className={`${styles.article} ${styles.dropcap}`}>
                    {article.body.map((para, i) => <p key={i}>{para}</p>)}
                    <p className={styles.byline}><em>By {interview.author.name} · TUITALKS</em></p>
                  </div>

                  {article.hero && (
                    <figure className={styles.heroWrap}>
                      <img className={styles.hero} src={article.hero.src} alt={article.hero.alt} />
                      <figcaption className={styles.caption}>{article.hero.alt}</figcaption>
                    </figure>
                  )}
                </div>

                <div className={styles.subGrid}>
                  {supportingStories.slice(1).map((story) => (
                    <article key={story.title} className={styles.storyCard}>
                      <header className={styles.cardHeader}>
                        <div className={styles.sectionTag}>{story.kicker}</div>
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
                </div>

                <section className={styles.marquee}>
                  <div className={styles.marqueeLabel}>{marquee.title}</div>
                  <p>{marquee.blurb}</p>
                </section>
              </div>

              <aside className={styles.sidebarColumn} aria-label="Sidebar stories">
                {rightRailStories.map((story) => (
                  <article key={story.title} className={`${styles.sideCard} ${styles[`tone-${story.tone ?? "default"}`]}`}>
                    <div className={styles.sideCardHeader}>
                      <span className={styles.sideLabel}>{story.label}</span>
                      <h3>{story.title}</h3>
                    </div>
                    {story.img && <img className={styles.sideImg} src={story.img} alt="" />}
                    <p className={styles.sideText}>{story.text}</p>
                  </article>
                ))}
              </aside>
            </div>
          </section>

          <div className={styles.accentRule} />

          {/* Secondary section inspired by the preview screenshot */}
          <section className={styles.secondaryGrid}>
            {supportingStories.map((story) => (
              <article key={story.title} className={styles.bottomCard}>
                <div className={styles.bottomVisual}>
                  <img src={story.img} alt="" />
                </div>
                <div className={styles.bottomCopy}>
                  <div className={styles.sectionTag}>{story.kicker}</div>
                  <h3>{story.title}</h3>
                  <p>{story.text}</p>
                </div>
              </article>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
