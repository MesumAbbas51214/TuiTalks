import { useRef, useState } from "react";
import { Header } from "./components/Header";
import { Section } from "./sections/Section";
import { HeroSlider } from "./sections/HeroSlider";
import { InterviewsCanvas } from "./components/InterviewsCanvas";
import type { Interview } from "./types/content";
import { DailyProphetModal } from "./components/DailyProphetModal";
import { useSectionSnap } from "./hooks/useSectionSnap";
import { AuthorsChoiceSection } from "./sections/AuthorsChoiceSection";
import { AboutSection } from "./sections/AboutSection";
import { ContactSection } from "./sections/ContactSection";


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
      <AboutSection />

      {/* CONTACT */}
      <Section id="contact" className="section--vhMinusHeader" flush>
        <ContactSection />
      </Section>

      <div style={{ height: 24 }} />

      {/* Daily Prophet Modal */}
      <DailyProphetModal open={open} interview={current} onClose={() => setOpen(false)} />
    </div>
  );
}
