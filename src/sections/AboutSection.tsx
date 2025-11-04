import { Section } from "./Section";
import styles from "./AboutSection.module.css";

export function AboutSection() {
  return (
    <Section
      id="about"
      className={`section--vhMinusHeader section--center ${styles.about}`}
    >
      <div className={styles.container}>
        <div className={styles.headingCard} aria-labelledby="about-heading">
          <span className={styles.kicker}>About TUITALKS</span>
          <h2 id="about-heading" className={styles.title}>
            A warm studio for bold campus conversations
          </h2>
          <p className={styles.subtitle}>
            From late-night brainstorms to spotlight interviews, we craft each episode with the care of a
            studio session and the heart of a dorm-room chat.
          </p>
        </div>

        <article className={styles.profileCard}>
          <div className={styles.photoFrame}>
            <img
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=900&q=80"
              alt="Melis — Founder of TUITALKS"
              className={styles.photo}
            />
          </div>

          <div className={styles.profileBody}>
            <div>
              <h3 className={styles.profileName}>Melis</h3>
              <p className={styles.profileRole}>Founder · Host · Interaction Designer</p>
            </div>

            <p className={styles.profileIntro}>
              I’m here to build collaborations that feel effortless and genuine—always ready to listen, create,
              and celebrate the voices that make TU Ilmenau pulse.
            </p>

            <button type="button" className={styles.profileCta}>
              Let&apos;s collaborate
            </button>
          </div>
        </article>
      </div>
    </Section>
  );
}
