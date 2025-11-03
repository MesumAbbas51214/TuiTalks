import styles from "./Avatar.module.css";
export function Avatar({ name, src }: { name: string; src?: string }){
const initials = name.split(" ").map(p=>p[0]).slice(0,2).join("").toUpperCase();
return (
<span className={styles.wrap}>
{src ? <img className={styles.img} src={src} alt={name} /> : <span className={styles.badge}>{initials}</span>}
<span className={styles.name}>{name}</span>
</span>
);
}
