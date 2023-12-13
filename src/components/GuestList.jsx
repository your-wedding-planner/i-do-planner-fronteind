import React, { useState, useEffect } from "react";
import axios from "axios";
import AddGuestForm from "./AddGuestForm";
import { Link } from "react-router-dom";

function GuestList() {
  const [guestsList, setGuestsList] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => { 
    if(!storedToken) return
    loadGuests();
  }, [storedToken]);

  const loadGuests = () => {
    storedToken
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/guests`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
      .then((response) => {
        setGuestsList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching guests:", error);
      });
  };

  return (
    <div className="container">
      <div>
        <AddGuestForm loadGuests={loadGuests} />
      </div>
    <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Name</th>
              {/* <th>Location</th>
              <th>Website</th> */}
              <th>Status invitation</th>
              <th>Table</th>
              {/* <th>Email</th>
              <th>Phone number</th> */}
            </tr>
          </thead>
          <tbody>
            {guestsList?.length > 0 ? (
              guestsList?.map((guest) => {
                return (
                  <tr>
                    <td>
                    <Link to={`/GuestDetails/${guest._id}`} key={guest._id}>
                      {guest.firstName} {guest.lastName}
                    </Link>
                    </td>
                    <td>
                    <Link to={`/GuestDetails/${guest._id}`} key={guest._id}>
                      {guest.attending}
                    </Link>
                    </td>
                    <td>
                    <Link to={`/GuestDetails/${guest._id}`} key={guest._id}>
                      {guest.seatingTable}
                    </Link>
                    </td>
                    {/* <td>{vendor.location}</td>
                    <td>{vendor.URL}</td>
                    <td>{vendor.description}</td>
                    <td>{vendor.typeOfService}</td>
                    <td>{vendor.email}</td>
                    <td>{vendor.phoneNumber}</td> */}
                  </tr>
                );
              })
            ) : (
              <p>No guests available</p>
            )}
          </tbody>
        </table>
      </div>



{/* 






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
      </div> */}
    </div>
  );
}

export default GuestList;
