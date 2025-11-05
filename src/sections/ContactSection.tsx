import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import styles from "./ContactSection.module.css";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
type Errors = Partial<Record<keyof FormState, string>>;

const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactSection() {
  const [data, setData] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const errors: Errors = useMemo(() => {
    const e: Errors = {};
    if (!data.name.trim()) e.name = "Required";
    if (!emailRx.test(data.email)) e.email = "Enter a valid email";
    if (!data.subject.trim()) e.subject = "Required";
    if (data.message.trim().length < 10) e.message = "Min 10 characters";
    return e;
  }, [data]);

  const valid = Object.keys(errors).length === 0;

  function onChange<K extends keyof FormState>(key: K, v: FormState[K]) {
    setData((d) => ({ ...d, [key]: v }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setSending(true);
    // Simulate request – plug your API/EmailJS/Forms backend here
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    setData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 3500);
  }

  return (
    <section id="contact" className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* LEFT: Info */}
          <div className={styles.infoCard}>
            <h2 className={styles.title}>Let’s talk</h2>
            <p className={styles.subtitle}>
              Tell me about your story idea, collaboration, or feedback. I read every message. ✉️
            </p>

            <ul className={styles.channels}>
              <li>
                <a href="mailto:editor@tuitalks.example" className={styles.chip} aria-label="Email">
                  <span>📧</span> editor@tuitalks.example
                </a>
              </li>
              <li>
                <a href="https://instagram.com/" target="_blank" className={styles.chip} rel="noreferrer" aria-label="Instagram">
                  <span>📸</span> @tuitalks
                </a>
              </li>
              <li className={styles.chip} aria-label="Location">
                <span>📍</span> TU Ilmenau · Campus
              </li>
            </ul>

            <div className={styles.sideNote}>
              <strong>Office hours:</strong> Mon–Fri, 10:00–17:00 CET  
              <br />
              I’ll try to get back within 24–48h.
            </div>
          </div>

          {/* RIGHT: Form */}
          <form className={styles.formCard} onSubmit={onSubmit} noValidate>
            <div className={styles.fields}>
              <div className={`${styles.field} ${data.name ? styles.filled : ""} ${errors.name ? styles.err : ""}`}>
                <input
                  id="name"
                  value={data.name}
                  onChange={(e) => onChange("name", e.target.value)}
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                />
                <label htmlFor="name">Your name</label>
                {errors.name && <span className={styles.error}>{errors.name}</span>}
              </div>

              <div className={`${styles.field} ${data.email ? styles.filled : ""} ${errors.email ? styles.err : ""}`}>
                <input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                />
                <label htmlFor="email">Email</label>
                {errors.email && <span className={styles.error}>{errors.email}</span>}
              </div>

              <div className={`${styles.field} ${data.subject ? styles.filled : ""} ${errors.subject ? styles.err : ""}`}>
                <input
                  id="subject"
                  value={data.subject}
                  onChange={(e) => onChange("subject", e.target.value)}
                  aria-invalid={!!errors.subject}
                />
                <label htmlFor="subject">Subject</label>
                {errors.subject && <span className={styles.error}>{errors.subject}</span>}
              </div>

              <div className={`${styles.field} ${styles.textarea} ${data.message ? styles.filled : ""} ${errors.message ? styles.err : ""}`}>
                <textarea
                  id="message"
                  value={data.message}
                  onChange={(e) => onChange("message", e.target.value)}
                  rows={6}
                  aria-invalid={!!errors.message}
                />
                <label htmlFor="message">Message</label>
                {errors.message && <span className={styles.error}>{errors.message}</span>}
              </div>
            </div>

            <div className={styles.actions}>
              <button className={styles.button} disabled={!valid || sending} aria-busy={sending}>
                {sending ? "Sending…" : "Send message"}
              </button>
              <span className={`${styles.toast} ${sent ? styles.show : ""}`} role="status" aria-live="polite">
                ✅ Message sent! I’ll reply soon.
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
