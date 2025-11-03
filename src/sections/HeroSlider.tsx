import { INTERVIEWS } from "../types/content";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import styles from "./HeroSlider.module.css";


export function HeroSlider({ onPick, variant = "full" }: { onPick: (id: string) => void; variant?: "contained" | "full"; }) {
const full = variant === "full";
return (
<div className={full ? "hero--full" : "hero--contained"} style={{ border: full ? "none" : "1px solid var(--border)", borderRadius: full ? 0 : "16px", overflow: "hidden", position: "relative" }}>
<Swiper modules={[Navigation, Pagination, Autoplay, EffectFade]} navigation pagination={{ clickable: true }} autoplay={{ delay: 4200, disableOnInteraction: false }} effect="fade" loop style={{ height: "100%" }}>
{INTERVIEWS.map((item) => (
<SwiperSlide key={item.id}>
<button className={styles.slideBtn} onClick={() => onPick(item.id)} aria-label={`Open interview: ${item.person}`}>
<img src={item.image} alt={item.person} className={styles.bg} loading="lazy" />
<div className={styles.grad} />
<div className={styles.panel}>
<div className={styles.badge}>Featured Interview</div>
<div className={styles.title}>{item.person}</div>
<div className={styles.desc}>{item.title} — {item.excerpt}</div>
<span className={styles.cta}>Read interview</span>
</div>
</button>
</SwiperSlide>
))}
</Swiper>
</div>
);
}
