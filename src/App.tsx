import { useState } from "react";
import { Header } from "./components/Header";
import { Section } from "./sections/Section";
import { HeroSlider } from "./sections/HeroSlider";
import { InterviewsCanvas } from "./components/InterviewsCanvas";
import type { Interview } from "./types/content";
import { DailyProphetModal } from "./components/DailyProphetModal";
import { AuthorsChoiceSection } from "./sections/AuthorsChoiceSection";
import { AboutSection } from "./sections/AboutSection";
import { ContactSection } from "./sections/ContactSection";
import { FavoriteBookSection } from "./sections/FavoriteBookSection";


export default function App(){
  const onNav = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const goToInterview = () => { onNav("interviews"); };

  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Interview | null>(null);

  return (
    <div className="page">
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

      {/* FAVORITE BOOK MOMENT */}
      <FavoriteBookSection />

      {/* ABOUT */}
      <AboutSection />

      {/* CONTACT */}
      <ContactSection />

      <div style={{ height: 24 }} />

      {/* Daily Prophet Modal */}
      <DailyProphetModal
        open={open}
        interview={current}
        onClose={() => setOpen(false)}
        trackUrl={current?.recommendedTrack}
      />
    </div>
  );
}
