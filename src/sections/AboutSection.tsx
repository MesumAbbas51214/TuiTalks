import styles from "./AboutSection.module.css";

const futureCrew = [
  {
    role: "Audio Producer",
    description: "Crafts the soundscapes and transitions that make every conversation feel cinematic.",
  },
  {
    role: "Community Editor",
    description: "Curates student voices, coordinates contributors, and keeps the campus pulse alive.",
  },
  {
    role: "Visual Storyteller",
    description: "Shapes our motion graphics, cover art, and studio photography to match the TUITALKS vibe.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className={styles.about} aria-labelledby="about-heading">
      <div className={styles.backgroundGlow} aria-hidden />

      <div className={styles.container}>
        <div className={styles.heading}>
          <span className={styles.kicker}>About TUITALKS</span>
          <h2 id="about-heading" className={styles.title}>
            A warm studio for bold campus conversations
          </h2>
          <p className={styles.subtitle}>
            TUITALKS is where interviews, creative tech, and unapologetic curiosity meet. We design each
            release to feel like a late-night common-room chat—inviting, smart, and a little bit magical.
          </p>
        </div>

        <div className={styles.content}>
          <article className={styles.profile}>
            <div className={styles.photoFrame}>
              <img
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=900&q=80"
                alt="Melis — Founder of TUITALKS"
                className={styles.photo}
              />
              <div className={styles.photoGlow} aria-hidden />
            </div>

            <div className={styles.profileBody}>
              <div>
                <h3 className={styles.profileName}>Melis</h3>
                <p className={styles.profileRole}>Founder · Host · Interaction Designer</p>
              </div>

              <ul className={styles.badges}>
                <li>Story engineering</li>
                <li>Campus strategy</li>
                <li>Creative code</li>
              </ul>

              <p className={styles.profileIntro}>
                I built this space to document the thinkers, builders, and dreamers of TU Ilmenau. Every
                interview is a collaboration—part research, part improv, and always personal.
              </p>
            </div>

            <button type="button" className={styles.profileCta}>
              Let&apos;s collaborate
            </button>
          </article>

          <div className={styles.story}>
            <p>
              We’re not chasing viral trends or churning out filler posts. Instead, TUITALKS is crafted like a
              modern editorial experience: interactive features, layered storytelling, and design flourishes that
              reward curious readers.
            </p>
            <p>
              The goal? Build a living archive of campus energy—founders tinkering at 2 a.m., researchers pushing
              breakthroughs, musicians remixing tradition, and everyone in between. If it moves the conversation
              forward, it belongs here.
            </p>

            <div className={styles.highlights}>
              <div className={styles.highlightCard}>
                <span className={styles.highlightLabel}>What guides us</span>
                <ul>
                  <li>
                    <strong>Depth over noise.</strong> Each story is edited, fact-checked, and produced to feel like a
                    feature piece.
                  </li>
                  <li>
                    <strong>Community-first.</strong> We spotlight collaborators, mentors, and emerging voices across
                    faculties.
                  </li>
                  <li>
                    <strong>Interactive by design.</strong> Expect motion, audio experiments, and immersive layouts that
                    keep the experience fresh.
                  </li>
                </ul>
              </div>

              <div className={styles.highlightCard}>
                <span className={styles.highlightLabel}>Where we&apos;re heading</span>
                <p>
                  The studio will grow with producers, editors, and creatives who share this vision. We already document
                  their beats in our planning board so they can plug in when the timing clicks.
                </p>
              </div>
            </div>

            <div className={styles.teamFuture}>
              <div className={styles.teamHeader}>
                <span className={styles.teamTag}>Future collaborators</span>
                <p>
                  TUITALKS is designed to scale as the crew expands. Here&apos;s who we&apos;re saving seats for—each card becomes a
                  spotlight the moment someone joins the team.
                </p>
              </div>

              <div className={styles.teamGrid}>
                {futureCrew.map((member) => (
                  <div key={member.role} className={styles.teamCard}>
                    <span className={styles.teamRole}>{member.role}</span>
                    <p>{member.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
