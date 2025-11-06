import { useId, useMemo, useState } from "react";
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
          <header className={styles.head}>
            <h2 id={`${tabPrefix}-title`} className={styles.title}>
              Interview highlights to keep your feed buzzing
            </h2>
          </header>

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
            <span className={styles.badge}>{active.badge}</span>
          </div>

          <div
            className={styles.carousel}
            role="tabpanel"
            id={activePanelId}
            aria-labelledby={`${tabPrefix}-${tab}`}
          >
            <div className={styles.carouselTrack}>
              {data.map(item => (
                <div key={`${tab}-${item.id}`} className={styles.carouselItem}>
                  <FeaturedCard item={item} badge={active.badge} onOpen={onOpen} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
