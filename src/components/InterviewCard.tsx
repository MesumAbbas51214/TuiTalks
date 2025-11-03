import type { Interview } from "../types/content";
import styles from "./InterviewCard.module.css";


function fmt(dateISO: string){
try { return new Date(dateISO).toLocaleDateString(undefined, { year:"numeric", month:"short", day:"2-digit" }); } catch { return dateISO; }
}


export function InterviewCard({ item, onOpen }: { item: Interview; onOpen?: (i: Interview) => void }){
return (
<article className={styles.card} id={`card-${item.id}`} tabIndex={0}>
<div className={styles.media}>
<img src={item.image} alt="" className={styles.img} loading="lazy" />
<div className={styles.overlay} />
<div className={styles.topline}>
<span className={styles.topBadge}>{item.category}</span>
</div>
<div className={styles.caption}>
<div className={styles.kicker}>{item.person}</div>
<div className={styles.title}>{item.title}</div>
<div className={styles.excerpt}>{item.excerpt}</div>
</div>
{onOpen && <button className={styles.button} aria-label={`Open interview ${item.person}`} onClick={() => onOpen(item)} />}
</div>
<div className={styles.body}>
<div className={styles.metaRow}>
<span>{item.author.name}</span>
<span>{fmt(item.dateISO)}</span>
</div>
<div className={styles.tags}>
{item.tags.slice(0,3).map(t => <span key={t} style={{ border:"1px solid #e5e7eb", borderRadius:999, padding:"4px 8px", fontSize:".8rem" }}>#{t}</span>)}
</div>
</div>
</article>
);
}