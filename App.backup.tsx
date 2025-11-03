import React from "react";
import { DailyProphetModal } from "./src/components/DailyProphetModal";
import { AboutSection } from "./src/sections/AboutSection";
import { AuthorsChoiceSection } from "./src/sections/AuthorsChoiceSection";
import type { Interview } from "./src/types/content"; // already present in your file
import { ContactSection } from "./src/sections/ContactSection";

// then in JSX:




export default function App(){
const onNav = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };
const goToInterview = (id: string) => { onNav("interviews"); };


return (
<div className="page">
<Header onNav={onNav} />


{/* HERO �?" FULL PAGE */}
<Section id="hero" flush>
<HeroSlider onPick={goToInterview} variant="full" />
</Section>


{/* INTERVIEWS �?" FULL PAGE */}
<Section id="interviews" className="section--vhMinusHeader section--airyXL">
  <div className="container-ultra">
<InterviewsCanvas />
</div>
</Section>


{/* AUTHORS */}
<section id="authors" className={styles.wrap}>
  <div className="container-ultra">
  <AuthorsChoiceSection onOpen={(i: Interview) => { setCurrent(i); setOpen(true); }} />
    </div>
</Section>


{/* ABOUT */}
<AboutSection />


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
<textarea style={{ width: "100%", minHeight: 120, padding: "10px 12px", borderRadius: 12, border: "1px solid #e5e7eb" }} placeholder="Tell us about your story idea�?�" />
</label>
<div><button style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: ".6rem 1rem", fontWeight: 700, background: "#111", color: "#fff", cursor: "pointer" }}>Send</button></div>
</form>
</div>
</Section>


<div style={{ height: 24 }} />
</div>
);
}

