import React from "react";
import { useNavigate } from "react-router-dom";
import flowers_icon from "../assets/flowers-icon.png";

function Footer() {
  const navigateTo = useNavigate();

  const handleLinkClick = (sectionId) => {
    navigateTo("/landingPage");
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <footer
      className="footer p-10  text-base-content "
      style={{ margin: "0" }}
    >
      <aside>
        <img
          src={flowers_icon}
          alt="Flowers icon"
          width="50"
          height="auto"
        ></img>
        <p>
          I do planner
          <br />
          Copyright © 2023 - All rights reserved
        </p>
      </aside>
      <div>
        <header className="footer-title">Services</header>
        <button
          onClick={() => handleLinkClick("weddingOrganization")}
          className="link link-hover"
        >
          Wedding Organization
        </button>
      </div>
      <div>
        <header className="footer-title">Company</header>
        <button
          onClick={() => handleLinkClick("aboutUs")}
          className="link link-hover"
        >
          About us
        </button>
        <button
          onClick={() => handleLinkClick("contact")}
          className="link link-hover"
        >
          Contact
        </button>
      </div>
    </footer>
  );
}

export default Footer;
