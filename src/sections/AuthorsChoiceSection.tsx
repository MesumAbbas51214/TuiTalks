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
    vibe: "A quick pulse of marquee conversations to open your week.",
    badge: "Editor’s Spotlight",
    ids: FEATURED_IDS,
  },
  trending: {
    label: "Common Room",
    caption: "Most discussed",
    note: "Stories our community is currently debating",
    vibe: "Tune into the chatter you’ll overhear between classes.",
    badge: "Campus Favourite",
    ids: TRENDING_IDS,
  },
  new: {
    label: "Fresh Off The Press",
    caption: "Just in",
    note: "Arrived within the past seven days",
    vibe: "Fresh reporting that just hit the newsroom desk.",
    badge: "New Arrival",
    ids: NEW_IDS,
  },
};

const INSIGHTS = [
  "🎙️ Weekly sit-downs with campus voices",
  "📰 Save a feature to revisit in the Daily Prophet",
  "☕ Perfect queue for a coffee break read",
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
      <div className="container-ultra">
        <div className={styles.inner}>
          <div className={styles.topline}>
            <header className={styles.head}>
              <span className={styles.kicker}>Campus Conversations</span>
              <h2 id={`${tabPrefix}-title`} className={styles.title}>
                Interview highlights to keep your feed buzzing
              </h2>
              <p className={styles.sub}>
                Swipe through rotating interviews curated by our editors—from marquee spotlights to the stories everyone is
                discussing in the quad.
              </p>

              <ul className={styles.insights}>
                {INSIGHTS.map(insight => (
                  <li key={insight}>{insight}</li>
                ))}
              </ul>
            </header>

            <aside className={styles.memo} aria-live="polite">
              <span className={styles.memoLabel}>{active.caption}</span>
              <h3 className={styles.memoTitle}>{active.label}</h3>
              <p className={styles.memoNote}>{active.note}</p>
              <p className={styles.memoVibe}>{active.vibe}</p>
            </aside>
          </div>

          <div className={styles.controls}>
            <div className={styles.tabs} role="tablist" aria-label="Campus conversation filters">
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
              slidesPerView={1.08}
              spaceBetween={18}
              breakpoints={{
                560: { slidesPerView: 1.5, spaceBetween: 18 },
                900: { slidesPerView: 2.2, spaceBetween: 20 },
                1200: { slidesPerView: 3.1, spaceBetween: 22 },
                1600: { slidesPerView: 4, spaceBetween: 24 },
              }}
            >
              {data.map(item => (
                <SwiperSlide key={`${tab}-${item.id}`}>
                  <FeaturedCard item={item} badge={active.badge} onOpen={onOpen} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
