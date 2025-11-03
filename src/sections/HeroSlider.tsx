import { useId, useState } from "react";
import { INTERVIEWS } from "../types/content";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import styles from "./HeroSlider.module.css";


export function HeroSlider({
  onPick,
  variant = "full",
}: {
  onPick: (id: string) => void;
  variant?: "contained" | "full";
}) {
  const full = variant === "full";
  const wrapperClass = `${styles.root} ${full ? styles.full : styles.contained} ${
    full ? "hero--full" : "hero--contained"
  }`;
  const [activeIndex, setActiveIndex] = useState(0);
  const describedByPrefix = useId();

  return (
    <div className={wrapperClass}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4200, disableOnInteraction: false }}
        effect="fade"
        loop
        role="group"
        aria-roledescription="carousel"
        aria-label="Featured campus interviews"
        aria-live="polite"
        className={styles.slider}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onSwiper={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {INTERVIEWS.map((item, index) => {
          const panelId = `${describedByPrefix}-${item.id}`;
          const isActive = activeIndex === index;

          return (
            <SwiperSlide key={item.id}>
              <button
                type="button"
                className={styles.slideBtn}
                onClick={() => onPick(item.id)}
                aria-label={`Open interview: ${item.person}`}
                aria-describedby={panelId}
                aria-current={isActive ? "true" : undefined}
              >
                <img src={item.image} alt={item.person} className={styles.bg} loading="lazy" />
                <div className={styles.grad} />
                <div
                  className={styles.panel}
                  id={panelId}
                  aria-hidden={isActive ? undefined : true}
                  aria-live={isActive ? "polite" : undefined}
                >
                  <div className={styles.badge}>Featured Interview</div>
                  <div className={styles.title}>{item.person}</div>
                  <div className={styles.desc}>
                    {item.title} — {item.excerpt}
                  </div>
                  <span className={styles.cta}>Read interview</span>
                </div>
                <span className={styles.srOnly}>Tap to open interview details</span>
              </button>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
