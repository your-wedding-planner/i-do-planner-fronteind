import React from 'react';

const Contact = () => {
  return (
  <div>
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>Feel free to connect with us on LinkedIn:</p>
      
      <div className="linkedin-profiles">
        <div className="profile">
          <h3>Elise Jonkers</h3>
          <a href="https://www.linkedin.com/in/elise-jonkers-2236a1151/" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
        </div>
        <div className="profile">
          <h3>Júlia Sendra</h3>
          <a href="https://www.linkedin.com/in/j%C3%BAlia-sendra-gim%C3%A9nez" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
        </div>
      </div>

      <p>Additionally, you can find our projects and contributions on GitHub:</p>
      
      <div className="github-profiles">
        <div className="profile">
          <h3>Elise Jonkers</h3>
          <a href="https://github.com/elisejonkers" target="_blank" rel="noopener noreferrer">GitHub Profile</a>
        </div>
        <div className="profile">
          <h3>Júlia Sendra</h3>
          <a href="https://github.com/juliasendra" target="_blank" rel="noopener noreferrer">GitHub Profile</a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Contact;
