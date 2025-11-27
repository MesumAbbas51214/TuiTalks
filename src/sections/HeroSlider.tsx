import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import styles from "./HeroSlider.module.css";
import sameerImage from "../assets/sameer.jpg";

const SLIDES = [
  {
    id: "sameer",
    image: sameerImage,
    title: "GOD, Mother and GLORY. IN THAT ORDER",
   
  },
];

export function HeroSlider({
  variant = "full",
}: {
  onPick?: (id: string) => void;
  variant?: "contained" | "full";
}) {
  const full = variant === "full";
  const wrapperClass = `${styles.root} ${full ? styles.full : styles.contained} ${
    full ? "hero--full" : "hero--contained"
  }`;

  const canLoop = SLIDES.length > 1;

  return (
    <div className={wrapperClass}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation
        pagination={{ clickable: true }}
        autoplay={canLoop ? { delay: 5200, disableOnInteraction: false } : false}
        effect="fade"
        loop={canLoop}
        role="group"
        aria-roledescription="carousel"
        aria-label="Hero spotlight"
        aria-live="polite"
        className={styles.slider}
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.id} role="group" aria-roledescription="slide">
            <div className={styles.slide}>
              <img src={slide.image} alt="Sameer adjusting his tie" className={styles.bg} loading="eager" />
              <div className={styles.grad} />
              <div className={styles.tint} />
              <div className={styles.copy}>
             
                <h1 className={styles.title}>{slide.title}</h1>
               
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
