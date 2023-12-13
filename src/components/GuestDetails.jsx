import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

function GuestDetails() {
  const [guest, setGuest] = useState({});
  const { guestId } = useParams();
  const [guestToDelete, setGuestToDelete] = useState([]);
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    storedToken
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
    storedToken

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

  return (
    <>
      <div className="footer-pin">
        <h2>Guest Details</h2>
        <p>
          Name: {guest.firstName} {guest.lastName}
        </p>
        <p>Age: {guest.age}</p>
        <p>Email: {guest.email}</p>
        <p>Phone number: {guest.phoneNumber}</p>
        <p>Notes: {guest.notes}</p>
        <p>Attending: {guest.attending}</p>
      </div>

      <div className="mt-4">
        <Link to={`/GuestEdit/${guest._id}`}>
          <button className="btn btn-xs sm:btn-sm md:btn-md btn-wide">
            Edit
          </button>
        </Link>
      </div>

      <button
        className="btn btn-xs sm:btn-sm md:btn-md btn-wide "
        onClick={() => {
          deleteGuest(guest);
        }}
      >
        Delete
      </button>
    </>
  );
}

export default GuestDetails;
