import React from "react";
import { Link } from "react-router-dom";
import home_page_example from "../assets/home-page-example.jpeg";

const WeddingOrganization = () => {
  // Bullet icon component
  const BulletIcon = () => {
    return (
      <div className="mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    );
  };

  return (
    <div>
      <div className="wedding-organization-container">
        <h1>Your Dream Wedding, Simplified</h1>
        <div className="flex flex-grow">
          <div className="w-1/3">
            <div className="image-section">
              <img
                className="image-section"
                src={home_page_example}
                alt="Guest Icon"
              ></img>
            </div>
          </div>
          <div
            className="w-2/6"
            style={{ marginLeft: "5vw", display: "flex", alignItems: "center" }}
          >
            <div className="text-section">
              <p className="textAlignedLeft">
                Welcome to our Wedding Organizer - your ultimate solution for
                effortlessly crafting your perfect day. Recognizing the profound
                significance of your wedding day, we're dedicated to providing a
                suite of powerful tools.
              </p>
              <p className="textAlignedLeft">
                Our aim is to empower you through streamlined planning
                processes, freeing up your valuable time to immerse yourself in
                the enchanting moments that make your day truly magical.
              </p>
            </div>
          </div>
        </div>

        <section className="wedding-organization-container">
          <h2>Unparalleled Organization, Tailored for You</h2>

          <div className="organization-section flex justify-around">
            <div className="grid gap-4 definition-cards">
              <div className="card card-compact w-96 bg-base-100 shadow-xl p-6">
                <h3 className="mb-4">Guest List Efficiency</h3>
                <ul className="list-none">
                  <li className="flex items-center mb-2">
                    <BulletIcon />
                    Easily create and manage your guest list.
                  </li>
                  <li className="flex items-center mb-2">
                    <BulletIcon />
                    Flexibility to add, delete, and modify guests.
                  </li>
                  <li className="flex items-center mb-2">
                    <BulletIcon />
                    Assign guests to tables effortlessly.
                  </li>
                </ul>
              </div>

              <div className="card card-compact w-96 bg-base-100 shadow-xl p-6">
                <h3 className="mb-4">Dynamic Seating Planner</h3>
                <ul>
                  <li className="flex items-center mb-2">
                    <BulletIcon />
                    Effortless seating design.
                  </li>
                  <li className="flex items-center mb-2">
                    <BulletIcon />
                    Intuitive guest assignment.
                  </li>
                  <li className="flex items-center mb-2">
                    <BulletIcon />
                    Easy table and guest management.
                  </li>
                </ul>
              </div>

              <div className="card card-compact w-96 bg-base-100 shadow-xl p-6">
                <h3 className="mb-4">Effortless Vendor Collaboration</h3>
                <ul>
                  <li className="flex items-center mb-2">
                    <BulletIcon /> Track all event vendors.
                  </li>
                  <li className="flex items-center mb-2">
                    <BulletIcon /> Store and manage vendor details.
                  </li>
                  <li className="flex items-center mb-2">
                    <BulletIcon /> Easily update or remove information.
                  </li>
                </ul>
              </div>

              <div className="card card-compact w-96 bg-base-100 shadow-xl p-6">
                <h3 className="mb-4">Smart Budgeting</h3>
                <ul>
                  <li className="flex items-center mb-2">
                    <BulletIcon /> Effortless expense monitoring.
                  </li>
                  <li className="flex items-center mb-2">
                    <BulletIcon /> Easily add, edit, or remove cost items.
                  </li>
                  <li className="flex items-center mb-2">
                    <BulletIcon /> Stay within budget, adapt flexibly.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="content-container">
          <h2>Your Vision, Our Tools - Together, Unforgettable</h2>
          <p className="landing-pg-txt-mgn">
            With our user-friendly interface and powerful functionalities, your
            dream wedding is within reach. Sign up now and embark on this
            exciting journey with confidence, knowing that every detail will be
            perfectly orchestrated, leaving you free to cherish every moment.
            Elevate your wedding planning experience. Start today and let us
            transform your dream into an unforgettable reality.
          </p>
          <Link className="sign-up-button" to={"/signup"}>
            Sign Up Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 inline-block ml-2 -mt-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WeddingOrganization;
