import React from "react";
import julia_profile_photo from "../assets/julia-profile-photo.png";
import elise_profile_photo from "../assets/elise-profile-photo.png";

const AboutUs = () => {
  return (
    <div>
      <div className="about-us-container">
        <h1>About Us</h1>
        <p className="landing-pg-txt-mgn">
          We are Elise Jonkers and Júlia Sendra, two junior full-stack
          developers. Together, we've created this platform in just a week to
          simplify wedding planning for couples. Our goal is straightforward: to
          provide a comprehensive set of tools that streamline the wedding
          planning process. We understand the importance of this day and aim to
          make it stress-free and enjoyable for you. Thank you for choosing our
          platform to assist you in this special journey. We're excited to be a
          part of your wedding planning experience!
        </p>
      </div>

      <div className="flex justify-center">
        <div
          className="card w-full bg-base-100 shadow-xl grid grid-cols-2"
          style={{ margin: "20px", padding: "20px", paddingBottom: "60px" }}
        >
          <figure className="px-10 pt-10 col-span-1">
            <img
              src={elise_profile_photo}
              alt="Shoes"
              className="rounded-xl"
              style={{ width: "200px", height: "266px" }}
            />
          </figure>
          <div className="card-body col-span-1 flex flex-col justify-center">
            <h2 className="card-title">Elise Jonkers</h2>
            <p className="text-left">
              Even though I am from a small town in the north of the
              Netherlands, I love to discover the world. I aim to do this
              through the beauty of traveling, especially to Latin America. New
              cultures, places and people give me the opportunity to step
              outside of my comfort zone and enrich my life.
            </p>
          </div>
        </div>

        <div
          className="card w-full bg-base-100 shadow-xl grid grid-cols-2"
          style={{ margin: "20px", padding: "20px", paddingBottom: "60px" }}
        >
          <div className="card-body col-span-1 flex flex-col justify-center">
            <h2 className="card-title">Júlia Sendra</h2>
            <p className="text-left">
              I am from a town in Valencia and have a profound love for
              photography and activities in nature. Exploring the outdoors,
              capturing moments through the lens, and immersing myself in the
              beauty of natural landscapes are passions that drive and inspire
              me.
            </p>
          </div>
          <figure className="px-10 pt-10 col-span-1">
            <img
              src={julia_profile_photo}
              alt="Shoes"
              className="rounded-xl"
              style={{ width: "200px", height: "266px" }}
            />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
