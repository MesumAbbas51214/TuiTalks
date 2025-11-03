import styles from "./AboutSection.module.css";

export function AboutSection() {
  return (
    <section id="about" className={styles.about}>
     <div className={styles.left}>
  <div className={styles.photoFrame}>
    <img
      src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=900&q=80"
      alt="Melis — Editor of TUITALKS"
      className={styles.photo}
    />
  </div>


        <div className={styles.right}>
          <h2 className={styles.title}>About the Editor</h2>

          <div className={styles.intro}>
            <span className={styles.typing}>Hi, I’m Melis — the storyteller behind TUITALKS.</span>
          </div>

          <p className={styles.text}>
            I started <strong>TUITALKS</strong> as a creative space to capture the voices, ambitions,
            and stories of our campus community. Inspired by the Daily Prophet’s charm and the
            power of real conversations, this platform is where design meets dialogue.
          </p>

          <p className={styles.text}>
            From tech projects to interviews, I love blending logic with imagination — whether
            that’s in code, design, or conversation. If you’re passionate about ideas, stories,
            and learning, you’ll feel right at home here.
          </p>

          <p className={styles.signature}>– Melis, TU Ilmenau 🦉</p>
        </div>
      </div>
    </section>
  );
}
