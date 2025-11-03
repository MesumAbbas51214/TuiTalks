import styles from "./TagPill.module.css";


export function TagPill(
    { label }: { label: string }
){

    
return <span className={styles.pill}>
    <span className={styles.hash}>#</span>{label}</span>;
}
