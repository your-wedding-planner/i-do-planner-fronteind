import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddVendorForm from "./AddVendorForm";

function VendorList() {
  const [vendorsList, setVendorsList] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = () => {
    storedToken;
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/vendors`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setVendorsList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vendors:", error);
      });
  };

  return (
    <div className="container">
      <div>
        <AddVendorForm loadVendors={loadVendors} />
      </div>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Name of vendor</th>
              {/* <th>Location</th>
              <th>Website</th> */}
              <th>Description</th>
              <th>Type of service</th>
              {/* <th>Email</th>
              <th>Phone number</th> */}
            </tr>
          </thead>
          <tbody>
            {vendorsList?.length > 0 ? (
              vendorsList?.map((vendor) => {
                return (
                  <tr>
                    <td>
                    <Link to={`/VendorDetails/${vendor._id}`} key={vendor._id}>
                      {vendor.name}
                    </Link>
                    </td>
                    <td>
                    <Link to={`/VendorDetails/${vendor._id}`} key={vendor._id}>
                      {vendor.description}
                    </Link>
                    </td> <td>
                    <Link to={`/VendorDetails/${vendor._id}`} key={vendor._id}>
                      {vendor.typeOfService}
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
              <p>No vendors available</p>
            )}
          </tbody>
        </table>
      </div>

    </>
  );
}

export default VendorList;
