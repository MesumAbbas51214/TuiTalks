import { useState } from "react";
import styles from "./Header.module.css";

const NAV_ITEMS: Array<[label: string, target: string]> = [
  ["Home", "hero"],
  ["Interviews", "interviews"],
  ["Author's Choice", "authors"],
  ["About", "about"],
  ["Contact", "contact"],
];

export function Header({ onNav }: { onNav: (id: string) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.bar} aria-label="Primary">
          <button type="button" className={styles.brand} onClick={() => onNav("hero")}>
            TUI<span className={styles.brandAccent}>TALKS</span>
          </button>
          <ul className={styles.nav}>
            {NAV_ITEMS.map(([label, id]) => (
              <li key={id}>
                <button type="button" className={styles.navBtn} onClick={() => onNav(id)}>
                  {label}
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={styles.menuBtn}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            Menu
          </button>
        </div>
      </div>
      {open && (
        <div className={styles.mobileMenu}>
          {NAV_ITEMS.map(([label, id]) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                onNav(id);
                setOpen(false);
              }}
              className={styles.mobileMenuBtn}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
