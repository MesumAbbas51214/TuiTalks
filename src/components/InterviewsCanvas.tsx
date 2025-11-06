import { useId, useMemo, useState } from "react";
import { FEATURED_IDS, NEW_IDS, TRENDING_IDS } from "../content/featured";
import { INTERVIEWS } from "../content/interviews";
import { FeaturedCard } from "./FeaturedCard";
import type { Interview } from "../types/content";
import styles from "./InterviewsCanvas.module.css";

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
    badge: "Fresh voices every week",
    ids: FEATURED_IDS,
  },
  trending: {
    label: "Trending now",
    badge: "Campus favourite",
    ids: TRENDING_IDS,
  },
  new: {
    label: "New arrivals",
    badge: "Just in",
    ids: NEW_IDS,
  },
};

function pickByIds(ids: string[]): Interview[] {
  const map = new Map(INTERVIEWS.map(item => [item.id, item]));
  return ids.map(id => map.get(id)).filter(Boolean) as Interview[];
}

export function InterviewsCanvas({ onOpen }: { onOpen?: (i: Interview) => void }) {
  const [tab, setTab] = useState<TabKey>("featured");
  const tabPrefix = useId();
  const active = TAB_CONFIG[tab];
  const activePanelId = `${tabPrefix}-panel-${tab}`;

  const data = useMemo(() => pickByIds(TAB_CONFIG[tab].ids), [tab]);

  return (
    <div className={styles.wrap}>
      <header className={styles.head}>
        <h2 className={styles.title}>Interviews</h2>
        <p className={styles.subtitle}>
          Meet the makers, dreamers, and campus voices shaping the future of TUIs. Dive into in-depth
          conversations that bring their stories and inspirations to life.
        </p>
      </header>

      <div className={styles.controls}>
        <div className={styles.tabs} role="tablist" aria-label="Interview collections">
          {(Object.entries(TAB_CONFIG) as Array<[TabKey, (typeof TAB_CONFIG)[TabKey]]>).map(([key, cfg]) => (
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
        <span className={styles.badge}>{active.badge}</span>
      </div>

      <div className={styles.carousel} role="tabpanel" id={activePanelId} aria-labelledby={`${tabPrefix}-${tab}`}>
        <div className={styles.carouselTrack}>
          {data.map(item => (
            <div key={`${tab}-${item.id}`} className={styles.carouselItem}>
              <FeaturedCard item={item} badge={active.badge} onOpen={onOpen} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
