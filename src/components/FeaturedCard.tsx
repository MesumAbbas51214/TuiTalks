import React from "react";
import type { Interview } from "../types/content";
import styles from "./FeaturedCard.module.css";

export function FeaturedCard({
  item,
  badge = "Editor's Pick",
  onOpen,
}: {
  item: Interview;
  badge?: string;
  onOpen?: (i: Interview) => void;
}) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <img className={styles.img} src={item.image} alt="" loading="lazy" />
        <div className={styles.grad} />
        <span className={styles.badge}>{badge}</span>
        <div className={styles.caption}>
          <div className={styles.person}>{item.person}</div>
          <div className={styles.title}>{item.title}</div>
        </div>
        <button className={styles.open} aria-label={`Open ${item.person}`} onClick={() => onOpen?.(item)} />
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span>{item.category}</span>
          <span>{new Date(item.dateISO).toLocaleDateString()}</span>
        </div>
      </div>
    </article>
  );
}
