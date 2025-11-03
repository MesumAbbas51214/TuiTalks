import { useRef, useState } from "react";
import { Header } from "./components/Header";
import { Section } from "./sections/Section";
import { HeroSlider } from "./sections/HeroSlider";
import { InterviewsCanvas } from "./components/InterviewsCanvas";
import type { Interview } from "./types/content";
import { DailyProphetModal } from "./components/DailyProphetModal";
import { useSectionSnap } from "./hooks/useSectionSnap";
import { AuthorsChoiceSection } from "./sections/AuthorsChoiceSection";


export default function App(){
  const pageRef = useRef<HTMLDivElement>(null);
  const scrollToSection = useSectionSnap(pageRef);
  const onNav = (id: string) => {
    if (!scrollToSection(id)) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const goToInterview = () => { onNav("interviews"); };

  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Interview | null>(null);

  return (
    <div className="page" ref={pageRef}>
      <Header onNav={onNav} />

      {/* HERO – FULL PAGE */}
      <Section id="hero" flush>
        <HeroSlider onPick={goToInterview} variant="full" />
      </Section>

      {/* INTERVIEWS – FULL PAGE */}
      <Section id="interviews" className="section--vhMinusHeader">
        <div className="container-ultra">
          <InterviewsCanvas onOpen={(i) => { setCurrent(i); setOpen(true); }} />
        </div>
      </Section>

      {/* AUTHORS / CAMPUS PULSE */}
      <AuthorsChoiceSection onOpen={(i) => { setCurrent(i); setOpen(true); }} />

      {/* ABOUT */}
      <Section id="about">
        <div className="container-edge">
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800 }}>About Us</h2>
          <p className="text-muted" style={{ marginTop: 8 }}>TUITALKS is a single-page campus blog built with React + TypeScript and CSS Modules.</p>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact">
        <div className="container-edge">
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800 }}>Contact</h2>
          <form style={{ marginTop: 16, display: "grid", gap: 12, maxWidth: 720 }}>
            <label>
              <div style={{ fontSize: ".9rem", fontWeight: 600 }}>Name</div>
              <input style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid #e5e7eb" }} placeholder="Your name" />
            </label>
            <label>
              <div style={{ fontSize: ".9rem", fontWeight: 600 }}>Email</div>
              <input type="email" style={{ width: "100%", padding: "10px 12px", borderRadius: 12, border: "1px solid #e5e7eb" }} placeholder="you@example.com" />
            </label>
            <label>
              <div style={{ fontSize: ".9rem", fontWeight: 600 }}>Message</div>
              <textarea style={{ width: "100%", minHeight: 120, padding: "10px 12px", borderRadius: 12, border: "1px solid #e5e7eb" }} placeholder="Tell us about your story idea…" />
            </label>
            <div><button style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: ".6rem 1rem", fontWeight: 700, background: "#111", color: "#fff", cursor: "pointer" }}>Send</button></div>
          </form>
        </div>
      </Section>

      <div style={{ height: 24 }} />

      {/* Daily Prophet Modal */}
      <DailyProphetModal open={open} interview={current} onClose={() => setOpen(false)} />
    </div>
  );
}
