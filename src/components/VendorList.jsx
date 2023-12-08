import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddVendorForm from "./AddVendorForm";

function VendorList() {
  const [vendorsList, setVendorsList] = useState([]);
  const storedToken = localStorage.getItem('authToken');

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = () => {
    axios
      .get("http://localhost:5005/api/vendors", { headers: { Authorization: `Bearer ${storedToken}`} })
      .then((response) => {
        setVendorsList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vendors:", error);
      });
  };

  return (
    <>
      <div>
        <h1>Vendors List</h1>
        {vendorsList.length > 0 ? (
          vendorsList.map((vendor) => (
            <Link to={`/VendorDetails/${vendor._id}`} key={vendor._id}> 
              <div>
                <h3>{vendor.name}</h3>
                <h3>{vendor.location}</h3>
                <h3>{vendor.URL}</h3>
                <h3>{vendor.description}</h3>
                <h3>{vendor.typeOfService}</h3>
              </div>
              <h3>{vendor.email}</h3>
              <h3>{vendor.phoneNumber}</h3>
            </Link>
          ))
        ) : (
          <p>No vendors available</p>
        )}
      </div>
      <div>
        <AddVendorForm
          loadVendors={loadVendors}
        />
      </div>
    </>
  );
}

export default VendorList;
