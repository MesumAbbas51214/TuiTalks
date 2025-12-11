import { Section } from "./Section";
import styles from "./FavoriteBookSection.module.css";

const highlights = [
  "A nook for slow evenings and underlined pages",
  "Quotes that still ring in your head days later",
  "Textures of paper, candlelight, and a playlist on loop",
];

export function FavoriteBookSection() {
  return (
    <Section id="favorite-book" className={`section section--vhMinusHeader ${styles.wrap}`}>
      <div className="container-edge">
        <div className={styles.inner}>
          <div className={styles.mediaBlock}>
            <div className={styles.mediaFrame}>
              <img
                src="https://i.gifer.com/82WK.gif"
                alt="Looping animation of a book flipping through its pages"
                className={styles.media}
              />
            </div>
            <p className={styles.mediaNote}>A favorite scene on repeat.</p>
          </div>

          <article className={styles.copy} aria-labelledby="favorite-book-title">
            <p className={styles.kicker}>Favorite book energy</p>
            <h2 id="favorite-book-title" className={styles.title}>
              A quiet corner made of words
            </h2>
            <p className={styles.lead}>
              When a story becomes a shelter, even a simple flip of the page feels like ritual. This space is a
              little altar to that feeling — warm light, soft paper, and the soundtrack of someone reading aloud.
            </p>
            <ul className={styles.list}>
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={styles.note}>
              Keep your own favorite within reach. Revisit the lines that softened you. That&apos;s the only rule here.
            </p>
          </article>
        </div>
      </div>
    </Section>
  );
}
