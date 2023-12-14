import React, { useEffect } from "react";
import AboutUs from "../components/AboutUs";
import Contact from "../components/Contact";
import WeddingOrganization from "../components/WeddingOrganization";

function LandingPage() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.slice(1);
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <div>
      <section id="weddingOrganization">
        <WeddingOrganization />
      </section>
      <section id="aboutUs">
        <AboutUs />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}

export default LandingPage;
