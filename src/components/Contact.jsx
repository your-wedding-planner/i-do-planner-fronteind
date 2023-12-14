import React from 'react';
import linkedin_icon from "../assets/linkedin-icon.png";
import github_icon from "../assets/github-icon.png";

const Contact = () => {
  return (
    <div className="contact-page">
    <h1>Contact Us</h1>

    <div className="contact-intro">
      <p>
        Thank you for your interest in contacting us. Please feel free to reach out to us!
        <br></br>
        Below are our contact details and links to our profiles on LinkedIn and GitHub.
      </p>
    </div>

      <div className="contact-column">
        <h2>Elise</h2>
      
        <a href="https://www.linkedin.com/in/elise-jonkers-2236a1151/">
        <img className="social-media-icons" src={linkedin_icon} alt="LinkedIn icon" />
         </a>
      
        <a href="https://github.com/elisejonkers">
        <img className="social-media-icons" src={github_icon} alt="Github icon" />
        </a>
      </div>

      <div className="contact-column">
        <h2>Júlia</h2>
      
        <a href="https://www.linkedin.com/in/júlia-sendra-giménez/">
        <img className="social-media-icons" src={linkedin_icon} alt="LinkedIn icon" />
         </a>
      
        <a href="https://github.com/juliasendra">
        <img className="social-media-icons" src={github_icon} alt="Github icon" />
        </a>
      </div>
      
    </div>
  );
};

export default Contact;
