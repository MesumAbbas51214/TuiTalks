import { useId, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import type { Interview } from "../types/content";
import { INTERVIEWS } from "../types/content";
import { FEATURED_IDS, TRENDING_IDS, NEW_IDS } from "../content/featured";
import { FeaturedCard } from "../components/FeaturedCard";
import styles from "./AuthorsChoiceSection.module.css";

type TabKey = "featured" | "trending" | "new";

const TAB_CONFIG: Record<
  TabKey,
  {
    label: string;
    caption: string;
    note: string;
    vibe: string;
    badge: string;
    ids: string[];
  }
> = {
  featured: {
    label: "Spotlight",
    caption: "Editor’s picks",
    note: "Hand-selected for the week’s reading club agenda",
    badge: "Editor’s Spotlight",
    ids: FEATURED_IDS,
  },
  trending: {
    label: "Common Room",
    caption: "Most discussed",
    note: "Stories our community is currently debating",
    badge: "Campus Favourite",
    ids: TRENDING_IDS,
  },
  new: {
    label: "Fresh Off The Press",
    caption: "Just in",
    note: "Arrived within the past seven days",
    badge: "New Arrival",
    ids: NEW_IDS,
  },
};

const INSIGHTS = [
  "✨ Updated every Thursday morning",
  "📚 Tap a card to bookmark it to the Daily Prophet",
  "☕ Pair today’s read with your favourite study nook",
];

function pickByIds(ids: string[]): Interview[] {
  const map = new Map(INTERVIEWS.map(i => [i.id, i]));
  return ids.map(id => map.get(id)).filter(Boolean) as Interview[];
}

export function AuthorsChoiceSection({
  onOpen,
}: {
  onOpen?: (i: Interview) => void;
}) {
  const [tab, setTab] = useState<TabKey>("featured");
  const tabPrefix = useId();
  const active = TAB_CONFIG[tab];
  const activePanelId = `${tabPrefix}-panel-${tab}`;

  const data = useMemo(() => {
    return pickByIds(TAB_CONFIG[tab].ids);
  }, [tab]);

  return (
    <section
      id="authors"
      className={`section section--vhMinusHeader ${styles.wrap}`}
      aria-labelledby={`${tabPrefix}-title`}
    >
      <div className={styles.texture} aria-hidden />
      <div className="container-ultra">
        <div className={styles.inner}>
          <header className={styles.head}>
            <span className={styles.kicker}>Editorial Suite</span>
            <h2 id={`${tabPrefix}-title`} className={styles.title}>
              A calm corner for this week’s essential campus reads
            </h2>
            <p className={styles.sub}>
              Drift between our spotlight features, the conversations echoing through the halls, and the latest arrivals from
              the newsroom. Every selection keeps the magazine’s warm, lively tone intact.
            </p>
          </header>

          <div className={styles.controls}>
            <div className={styles.tabs} role="tablist" aria-label="Editorial filters">
              {(Object.entries(TAB_CONFIG) as Array<[TabKey, typeof active]>).map(([key, cfg]) => (
                <button
                  key={key}
                  id={`${tabPrefix}-${key}`}
                  className={`${styles.tab} ${tab === key ? styles.tabActive : ""}`}
                  role="tab"
                  type="button"
                  aria-selected={tab === key}
                  tabIndex={tab === key ? 0 : -1}
                  aria-controls={`${tabPrefix}-panel-${key}`}
                  onClick={() => setTab(key)}
                >
                  <span className={styles.tabLabel}>{cfg.label}</span>
                  <span className={styles.tabCaption}>{cfg.caption}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.surface}>
            <div
              className={styles.carousel}
              role="tabpanel"
              id={activePanelId}
              aria-labelledby={`${tabPrefix}-${tab}`}
            >
              <Swiper
                modules={[Navigation, FreeMode]}
                navigation
                freeMode={{ enabled: true, momentum: true }}
                grabCursor
                slidesPerView={1.1}
                spaceBetween={18}
                breakpoints={{
                  560: { slidesPerView: 1.6, spaceBetween: 18 },
                  900: { slidesPerView: 2.4, spaceBetween: 20 },
                  1200: { slidesPerView: 3.2, spaceBetween: 22 },
                  1600: { slidesPerView: 4.2, spaceBetween: 24 },
                }}
              >
                {data.map(item => (
                  <SwiperSlide key={`${tab}-${item.id}`}>
                    <FeaturedCard item={item} badge={active.badge} onOpen={onOpen} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <aside className={styles.note}>
              <span className={styles.noteLabel}>Reading club memo</span>
              <p className={styles.noteBody}>{active.note}</p>
            </aside>
          </div>

          <ul className={styles.insights}>
            {INSIGHTS.map(insight => (
              <li key={insight}>{insight}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
