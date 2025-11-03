import React, { useMemo, useState } from "react";
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

  const data = useMemo(() => {
    if (tab === "featured")  return pickByIds(FEATURED_IDS);
    if (tab === "trending")  return pickByIds(TRENDING_IDS);
    return pickByIds(NEW_IDS);
  }, [tab]);

  const badge = tab === "featured" ? "Editor's Pick" : tab === "trending" ? "Trending" : "New";

  return (
    <section id="authors" className={styles.wrap}>
      <div className="container-wide">
        <div className={styles.head}>
          <div>
            <h2 className={styles.title}>Author’s Choice</h2>
            <p className={styles.sub}>Handpicked highlights and what the campus is reading now.</p>
          </div>
          <div className={styles.tabs} role="tablist" aria-label="Authors Choice Tabs">
            <button className={styles.tab} aria-pressed={tab==="featured"} onClick={()=>setTab("featured")}>Featured</button>
            <button className={styles.tab} aria-pressed={tab==="trending"} onClick={()=>setTab("trending")}>Trending</button>
            <button className={styles.tab} aria-pressed={tab==="new"} onClick={()=>setTab("new")}>New</button>
          </div>
        </div>

        <div className={styles.carousel}>
          <Swiper
            modules={[Navigation, FreeMode]}
            navigation
            freeMode={{ enabled: true, momentum: true }}
            slidesPerView={1.1}
            spaceBetween={14}
            breakpoints={{
              560: { slidesPerView: 2.1, spaceBetween: 16 },
              900: { slidesPerView: 3.1, spaceBetween: 18 },
              1200:{ slidesPerView: 4.1, spaceBetween: 20 },
              1600:{ slidesPerView: 5.1, spaceBetween: 22 },
            }}
          >
            {data.map(item => (
              <SwiperSlide key={`${tab}-${item.id}`}>
                <FeaturedCard item={item} badge={badge} onOpen={onOpen} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
