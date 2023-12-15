import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import delete_icon from "../assets/delete-icon.png";
import edit_icon from "../assets/edit-icon.png";

import decoration_icon from "../assets/decoration-icon.png";
import photo_icon from "../assets/photo-icon.png";
import music_icon from "../assets/vendor-music-icon.png";
import food_icon from "../assets/food-icon.png";
import beauty_icon from "../assets/beauty-icon.png";
import official_icon from "../assets/official-icon.png";
import location_icon from "../assets/vendor-location-icon.png";
import dress_icon from "../assets/dress-icon.png";
import invitation_icon from "../assets/vendor-invitation-icon.png";
import gift_icon from "../assets/gift-icon.png";
import default_icon from "../assets/default-icon.jpeg";

function VendorDetails() {
  const [vendor, setVendor] = useState({});
  const [icon, setIcon] = useState(default_icon);
  const { vendorId } = useParams();
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const setImage = (category) => {
    if (category === "Decoration") {
      return setIcon(decoration_icon);
    } else if (category === "Photographer") {
      return setIcon(photo_icon);
    } else if (category === "Music") {
      return setIcon(music_icon);
    } else if (category === "Food") {
      return setIcon(food_icon);
    } else if (category === "Beauty & Health") {
      return setIcon(beauty_icon);
    } else if (category === "Officials") {
      return setIcon(official_icon);
    } else if (category === "Location") {
      return setIcon(location_icon);
    } else if (category === "Dress & Accessories") {
      return setIcon(dress_icon);
    } else if (category === "Invitations") {
      return setIcon(invitation_icon);
    } else if (category === "Gifts") {
      return setIcon(gift_icon);
    }
  };

  useEffect(() => {
    storedToken;
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/vendors/${vendorId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setVendor(response.data);
        setImage(response.data.typeOfService);
      })
      .catch((error) => {
        console.error("Error fetching vendor details:", error);
      });
  }, [vendorId]);

  const deleteVendor = () => {
    storedToken;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vendor?"
    );

    if (confirmDelete) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/api/vendors/${vendor._id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(() => {
          toast.success("Deleted successfully");
          console.log("Vendor deleted");
          navigate(`/VendorList`);
        })
        .catch((error) => {
          console.error("Error deleting vendor:", error);
        });
    }
  };

  return vendor ? (
    <div className="container">
      <div className="details-container">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src={icon} />
          </div>
        </div>

        <div className="details-name">
          <h1>{vendor.name}</h1>
        </div>

        <div className="details-text">
          <p>Location: {vendor.location}</p>
          <p>Description: {vendor.description}</p>
          <p>Type of Service: {vendor.typeOfService}</p>
        </div>

        <div className="details-text">
          <h3>Contact Information:</h3>
          <p>Email: {vendor.email}</p>
          <p>Phone Number: {vendor.phoneNumber}</p>
          <p>Website: {vendor.URL}</p>
        </div>

        <div className="details-btn">
          <Link to={`/VendorEdit/${vendor._id}`}>
            <button className="btn">
              <img className="details-icons" src={edit_icon} al="EditGuest" />
            </button>
          </Link>
        </div>

        <button className="btn" onClick={deleteVendor}>
          <img className="details-icons" src={delete_icon} al="DeleteGuest" />
        </button>
      </div>
    </div>
  ) : (
    <p>loading</p>
  );
}

export default VendorDetails;
