import React, { useState, useEffect } from "react";
import axios from "axios";
import AddGuestForm from "./AddGuestForm";
import GuestDetails from "./GuestDetails";
import { Link } from "react-router-dom";

function GuestList() {
  const [guestsList, setGuestsList] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    loadGuests();
  }, []);

  const loadGuests = () => {
    axios
      .get("http://localhost:5005/api/guests", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setGuestsList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching guests:", error);
      });
  };

  return (
    <>
      <div>
        <h1>Guest List</h1>
        {guestsList.length > 0 ? (
          guestsList.map((guest) => (
            <Link to={`/GuestDetails/${guest._id}`} key={guest._id}>
              <div>
                <h3>
                  {guest.firstName} {guest.lastName}
                </h3>
              </div>
            </Link>
          ))
        ) : (
          <p>No guests available</p>
        )}
      </div>
      <div>
        <AddGuestForm loadGuests={loadGuests} />
      </div>
    </>
  );
}

export default GuestList;
