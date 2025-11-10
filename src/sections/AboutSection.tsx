import { Section } from "./Section";
import styles from "./AboutSection.module.css";
import mesumPhoto from "../assets/mesum_edit.jpg";


export function AboutSection() {
  return (
    <Section id="about" className={`section--center ${styles.about}`}>
      <div className={styles.inner}>
        <figure className={styles.mediaBlock} aria-labelledby="about-media-caption">
          <div className={styles.mediaFrame}>
           
<img
  src={mesumPhoto}
  alt="Portrait of Melis recording a podcast"
  className={styles.photo}
/>
            <div className={styles.mediaGlow} aria-hidden="true" />
          </div>
          <figcaption id="about-media-caption" className={styles.mediaCaption}>
            <span className={styles.mediaName}>Mesum</span>
            <span className={styles.mediaRole}>Founder · Host</span>
          </figcaption>
        </figure>

        <article className={styles.storyBlock} aria-labelledby="about-heading">
          <span className={styles.kicker}>About TUITALKS</span>
          <h2 id="about-heading" className={styles.title}>
            Bridging Ideas and Hearts at TU Ilmenau – Our Story
          </h2>

          <div className={styles.storyBody}>
            <p>Hello, you.</p>
            <p>I'm glad you're here.</p>
            <p>
              Migurl Alvarez once said, <em>"You'll know when you get there. For now, just keep typing."</em> I didn’t know a silly conversation with a friend on a sunny, rainy day at the Mensa would one day lead me here. But it did. And somehow, so did you. All because I wanted to write.
            </p>
            <p>
              Growing up — through my teens, and later to kind of an adult aircraft at my university in Pakistan
              where I'd spend most of my free time — I always wanted to write. But somewhere along the way, I lost
              it.
            </p>
            <p>Maybe it was the first heartbreak.</p>
            <p>Maybe it was choosing engineering over art.</p>
            <p>
              Maybe it was the never-ending assignments, or the race to chase things society said I should want.
            </p>
            <p>It got buried under everything else.</p>
            <p>So this is my way back.</p>
            <p>This is for the words. For the voice that got quiet.</p>
            <p>
              It's a space to talk about life, books, heartbreak, healing, and sometimes about the less poetic
              things too — like technology, making money, startups, and entrepreneurship.
            </p>
            <p>And mostly, it's a space to talk about you.</p>
          </div>

          <div className={styles.signature}>
            <span className={styles.signatureName}>Mesum</span>
            <span className={styles.signatureRole}>Founder, TUITALKS</span>
          </div>
        </article>
      </div>
    </Section>
  );
}
