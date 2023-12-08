import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import GuestEdit from "./GuestEdit";
import GuestList from "./GuestList";

const API_URL = "http://localhost:5005/api/guests";

function GuestDetails() {
  const [guest, setGuest] = useState({});
  const { guestId } = useParams(); 
  const [guestToDelete, setGuestToDelete] = useState([]);
  const storedToken = localStorage.getItem('authToken');
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get(`${API_URL}/${guestId}`, { headers: { Authorization: `Bearer ${storedToken}`} })
      .then((response) => {
        setGuest(response.data);
      })
      .catch((error) => {
        console.error("Error fetching guest details:", error);
      });
  }, [guestId]);

  const deleteGuest = (guest) => {
    axios
      .delete(`${API_URL}/${guest._id}`, { headers: { Authorization: `Bearer ${storedToken}`} })
      .then((response) => {
        setGuestToDelete(response.data);
        console.log("Guest deleted")
        navigate(`/GuestList`);
      })
      .catch((error) => {
        console.error("Error deleting guest:", error);
         
      });
  };

  return (
    <>
      <div>
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

      <button
        className="btn btn-xs sm:btn-sm md:btn-md btn-wide "
        onClick={() => {
          deleteGuest(guest);
        }}
      >
        Delete
      </button>

      <div className="mt-4">
              <Link to={`/GuestEdit/${guest._id}`}>
                <button className="btn btn-xs sm:btn-sm md:btn-md btn-wide">
                  Edit
                </button>
              </Link>
            </div>
    </>
  );
}

export default GuestDetails;
