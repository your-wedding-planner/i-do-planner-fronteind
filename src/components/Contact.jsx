import React from "react";
import linkedin_icon from "../assets/linkedin-icon.png";
import github_icon from "../assets/github-icon.png";

const Contact = () => {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>

      <div className="contact-intro">
        <p className="landing-pg-txt-mgn">
          Thank you for your interest in contacting us. Please feel free to
          reach out to us!
        </p>
      </div>

      <div className="contact-column">
        <h2 style={{ marginTop: "20px" }}>Elise</h2>

        <div style={{ justifyContent: "center", display: "flex" }}>
          <button
            className="flex items-center space-x-2 px-4 py-2 rounded-md btn margin10"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/elise-jonkers-2236a1151/",
                "_blank"
              )
            }
          >
            <img
              className="social-media-icons"
              src={linkedin_icon}
              alt="LinkedIn icon"
            />
            <span>LinkedIn</span>
          </button>

          <button
            className="flex items-center space-x-2 px-4 py-2 rounded-md btn margin10"
            onClick={() =>
              window.open("https://github.com/elisejonkers", "_blank")
            }
          >
            <img
              className="social-media-icons"
              src={github_icon}
              alt="Github icon"
            />
            <span>Github</span>
          </button>
        </div>
      </div>

      <div className="contact-column">
        <h2 style={{ marginTop: "20px" }}>Júlia</h2>

        <div style={{ justifyContent: "center", display: "flex" }}>
          <button
            className="flex items-center space-x-2 px-4 py-2 rounded-md btn margin10"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/júlia-sendra-giménez/",
                "_blank"
              )
            }
          >
            <img
              className="social-media-icons"
              src={linkedin_icon}
              alt="LinkedIn icon"
            />
            <span>LinkedIn</span>
          </button>

          <button
            className="flex items-center space-x-2 px-4 py-2 rounded-md btn margin10"
            onClick={() =>
              window.open("https://github.com/juliasendra", "_blank")
            }
          >
            <img
              className="social-media-icons"
              src={github_icon}
              alt="Github icon"
            />
            <span>Github</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
