import { useMemo, useState } from "react";
import { InterviewCard } from "./InterviewCard";
import styles from "./InterviewsSection.module.css";
import { INTERVIEWS } from "../content/interviews";
import type { Interview } from "../types/content";


export function InterviewsSection({ onOpen }: { onOpen?: (i: Interview) => void }){
const [q, setQ] = useState("");
const [cat, setCat] = useState<string>("All");
const [sort, setSort] = useState<"new"|"old">("new");
const [limit, setLimit] = useState(12);


const categories = useMemo(() => ["All", ...Array.from(new Set(INTERVIEWS.map(i => i.category)))], []);


const items = useMemo(() => {
let list = [...INTERVIEWS];
if (cat !== "All") list = list.filter(i => i.category === cat);
if (q.trim()) {
const t = q.toLowerCase();
list = list.filter(i => (i.title + i.person + i.excerpt + i.tags.join(" ")).toLowerCase().includes(t));
}
list.sort((a,b) => sort === "new" ? (b.dateISO.localeCompare(a.dateISO)) : (a.dateISO.localeCompare(b.dateISO)));
return list;
}, [q, cat, sort]);


const visible = items.slice(0, limit);
const canMore = limit < items.length;


return (
<div>
<div className={styles.controls}>
<input className={styles.input} placeholder="Search interviews…" value={q} onChange={e=>setQ(e.target.value)} />
<select className={styles.select} value={cat} onChange={e=>setCat(e.target.value)}>
{categories.map(c => <option key={c} value={c}>{c}</option>)}
</select>
<select className={styles.select} value={sort} onChange={e=>setSort(e.target.value as "new" | "old")}>
<option value="new">Newest first</option>
<option value="old">Oldest first</option>
</select>
</div>


<div className={styles.grid}>
{visible.map(item => (
<InterviewCard key={item.id} item={item} onOpen={onOpen} />
))}
</div>


{canMore && (
<div className={styles.loadMoreWrap}>
<button className={styles.btn} onClick={() => setLimit(l => l + 12)}>Load more</button>
</div>
)}
</div>
);
}
