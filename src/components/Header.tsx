import { useState } from "react";
import styles from "./Header.module.css";


export function Header({ onNav }: { onNav: (id: string) => void }) {
const [open, setOpen] = useState(false);
const items: Array<[string,string]> = [
["Home","hero"],
["Interviews","interviews"],
["Author's Choice","authors"],
["About","about"],
["Contact","contact"],
];


return (
<header className={styles.wrap}>
<div className={styles.inner}>
<div className={styles.bar} aria-label="Primary">
<button className={styles.brand} onClick={() => onNav("hero")}>TUI<span style={{ color: "#2563eb" }}>TALKS</span></button>
<ul className={styles.nav}>
{items.map(([label,id]) => (
<li key={id}>
<button className={styles.navBtn} onClick={() => onNav(id)}>{label}</button>
</li>
))}
</ul>
<button className={styles.menuBtn} onClick={() => setOpen(v=>!v)} aria-expanded={open}>Menu</button>
</div>
</div>
{open && (
<div style={{ position:"fixed", top: "calc(var(--header-h))", right: 12, zIndex: 50, background: "#fff", border: "1px solid var(--border)", borderRadius: 12, boxShadow: "var(--shadow)", padding: 8 }}>
{items.map(([label,id]) => (
<button key={id} onClick={() => { onNav(id); setOpen(false); }} style={{ display:"block", width: 180, textAlign: "left", padding: "8px 10px", border: 0, background: "#fff", cursor: "pointer" }}>{label}</button>
))}
</div>
)}
</header>
);
}
