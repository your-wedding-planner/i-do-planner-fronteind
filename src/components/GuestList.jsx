import React, { useState, useEffect } from "react";
import axios from "axios";
import AddGuestForm from "./AddGuestForm";
import { Link } from "react-router-dom";

function GuestList() {
  const [guestsList, setGuestsList] = useState([]);
  const [query, setQuery] = useState("")
  const storedToken = localStorage.getItem("authToken");

  const filteredGuests = guestsList.filter((guest) => {
    const firstNameFiltered = guest.firstName.toLowerCase().includes(query.toLowerCase())
    const lastNameFiltered = guest.lastName.toLowerCase().includes(query.toLocaleLowerCase())
    const nameFiltered = firstNameFiltered + ' ' + lastNameFiltered
    return nameFiltered || firstNameFiltered || lastNameFiltered
    //const nameFiltered = `${firstNameFiltered} ${lastNameFiltered}`
    //return nameFiltered
  })

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
        console.log(response.data[1].seatingTable.tableName)
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
      <div>
        <label>
          Search by name:
          <input 
          type="search" 
          className="input input-bordered w-full max-w-xs"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          />
        </label>
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
            {filteredGuests?.length > 0 ? (
              filteredGuests?.map((guest) => {
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
                      {guest.seatingTable && <p>{guest.seatingTable.tableName}</p>}
                      {!guest.seatingTable && <p>No table assigned</p>}
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
