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
            <span className={styles.mediaName}>Melis</span>
            <span className={styles.mediaRole}>Founder · Host</span>
          </figcaption>
        </figure>

        <article className={styles.storyBlock} aria-labelledby="about-heading">
          <span className={styles.kicker}>About TUITALKS</span>
          <h2 id="about-heading" className={styles.title}>
            Bridging Ideas and Hearts at TU Ilmenau – Our Story
          </h2>
          <p className={styles.subtitle}>
            TUITALKS began as a hallway idea and grew into a studio where every student story is recorded with
            intention, empathy, and delight.
          </p>

          <div className={styles.storyBody}>
            <p>
              When the campus quiets down, our microphones switch on. Each session is a chance to spotlight the
              curiosity, courage, and creativity that make TU Ilmenau so electric. We turn thoughtful
              conversations into audio experiences that feel like gathering around a living room table.
            </p>
            <p>
              From the first hello to the final edit, we design collaborations that are relaxed yet intentional.
              Expect warm lighting, real talk, and space to explore the ideas that keep you up at night. This is
              your invitation to bring your story to the studio.
            </p>
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
