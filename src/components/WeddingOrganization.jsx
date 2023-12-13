import React from "react";
import { Link } from "react-router-dom";

const WeddingOrganization = () => {
  return (
    <div className="footer-pin">
      <div className="wedding-organization-container">
        <h1>Your Dream Wedding, Simplified</h1>
        <p>
          Welcome to our Wedding Organizer - the ultimate solution to crafting
          your perfect day effortlessly. We understand the significance of your
          wedding day and are here to empower you with a suite of powerful tools
          that streamline the planning process, leaving you more time to revel
          in the magic.
        </p>

        <section className="organization-section">
          <h2>Unparalleled Organization, Tailored for You</h2>

          <div className="functionality-section">
            <h3>Seamlessly Manage Your Guest List</h3>
            <p>
              Easily create and manage your guest list, with the flexibility to
              add, delete, and modify entries effortlessly. Store contact
              information, RSVP statuses, and personalized notes for each guest.
              Seamlessly assign guests to tables to ensure a harmonious
              reception layout.
            </p>
          </div>

          <div className="functionality-section">
            <h3>Dynamic Seating Planner</h3>
            <p>
              Design and personalize seating arrangements effortlessly. Use our
              intuitive drag-and-drop feature to assign guests to tables.
              Flexibility at your fingertips: add, edit, or remove tables while
              accessing and modifying guest details directly within the seating
              planner.
            </p>
          </div>

          <div className="functionality-section">
            <h3>Vendor Collaboration Made Simple</h3>
            <p>
              Keep track of all vendors involved in your big day. Store and
              manage vendor names, locations, service types, contact details,
              and more. Effortlessly update or remove vendor information as your
              plans evolve.
            </p>
          </div>

          <div className="functionality-section">
            <h3>Smart Budgeting, Stress-Free Spending</h3>
            <p>
              Monitor and manage your wedding expenses effortlessly. Add, edit,
              or remove cost items with vendor details, prices, and
              descriptions. Stay within your budget while having the flexibility
              to adapt as needed.
            </p>
          </div>
        </section>

        <h2>Your Vision, Our Tools - Together, Unforgettable</h2>
        <p>
          With our user-friendly interface and powerful functionalities, your
          dream wedding is within reach. Sign up now and embark on this exciting
          journey with confidence, knowing that every detail will be perfectly
          orchestrated, leaving you free to cherish every moment.
        </p>

        <Link className="sign-up-button" to={"/signup"}>
          {" "}
          Sign Up Now
        </Link>
        <p>
          Elevate your wedding planning experience. Start today and let us
          transform your dream into an unforgettable reality.
        </p>
      </div>
    </div>
  );
};

export default WeddingOrganization;
