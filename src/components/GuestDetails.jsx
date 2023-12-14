import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import delete_icon from "../assets/delete-icon.png";
import edit_icon from "../assets/edit-icon.png";

function GuestDetails() {
  const [guest, setGuest] = useState({});
  const { guestId } = useParams();
  const [guestToDelete, setGuestToDelete] = useState([]);
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    storedToken;
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/guests/${guestId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setGuest(response.data);
      })
      .catch((error) => {
        console.error("Error fetching guest details:", error);
      });
  }, [guestId]);

  const deleteGuest = (guest) => {
    storedToken;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this guest?"
    );
    if (confirmDelete) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/api/guests/${guest._id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setGuestToDelete(response.data);
          console.log("Guest deleted");
          toast.success("Guest deleted successfully");
          navigate(`/GuestList`);
        })
        .catch((error) => {
          console.error("Error deleting guest:", error);
        });
    }
  };

  const getGuestInitials = (guest) => {
    if (guest && guest.firstName && guest.lastName) {
      return guest.firstName[0] + guest.lastName[0];
    } else {
      return "";
    }
  };

  return (
    <div className="container">
      <div className="details-container">
        <div className="avatar placeholder">
          <div className="bg-secondary text-neutral-content rounded-full w-24">
            <span className="text-3xl">{getGuestInitials(guest)}</span>
          </div>
        </div>
        <div className="details-name">
          <h1>
            {guest.firstName} {guest.lastName}
          </h1>
        </div>
        <div className="details-text">
          <p>Age: {guest.age}</p>
          <p>Notes: {guest.notes}</p>
          <p>Attending: {guest.attending}</p>
        </div>
        <div className="details-text">
          <h3>Contact information:</h3>
          <p>Email: {guest.email}</p>
          <p>Phone number: {guest.phoneNumber}</p>
        </div>

        <div className="details-btn">
          <Link to={`/GuestEdit/${guest._id}`}>
            <button className="btn">
              <img className="details-icons" src={edit_icon} al="EditGuest" />
            </button>
          </Link>
        </div>
        <div>
          <button
            className="btn"
            onClick={() => {
              deleteGuest(guest);
            }}
          >
            <img className="details-icons" src={delete_icon} al="DeleteGuest" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default GuestDetails;
