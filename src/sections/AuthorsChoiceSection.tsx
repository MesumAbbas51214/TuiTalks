import { useId, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import type { Interview } from "../types/content";
import { INTERVIEWS } from "../content/interviews";
import { FEATURED_IDS, TRENDING_IDS, NEW_IDS } from "../content/featured";
import { FeaturedCard } from "../components/FeaturedCard";
import styles from "./AuthorsChoiceSection.module.css";

type TabKey = "featured" | "trending" | "new";

const TAB_CONFIG: Record<
  TabKey,
  {
    label: string;
    badge: string;
    ids: string[];
  }
> = {
  featured: {
    label: "Spotlight",
    badge: "Editor’s Spotlight",
    ids: FEATURED_IDS,
  },
  trending: {
    label: "Common Room",
    badge: "Campus Favourite",
    ids: TRENDING_IDS,
  },
  new: {
    label: "Fresh Off The Press",
    badge: "New Arrival",
    ids: NEW_IDS,
  },
};

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
                Browse quick hits from the newsroom—just a handful of editor picks to start your queue.
              </p>
            </header>
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
              slidesPerView={1.05}
              spaceBetween={16}
              breakpoints={{
                480: { slidesPerView: 1.4, spaceBetween: 18 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1100: { slidesPerView: 3, spaceBetween: 22 },
                1440: { slidesPerView: 3.6, spaceBetween: 24 },
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
