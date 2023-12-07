import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import VendorEdit from "./VendorEdit";
import VendorList from "./VendorList";

const API_URL = "http://localhost:5005/api/vendors";

function VendorDetails() {
  const [vendor, setVendor] = useState({});
  const { vendorId } = useParams();
  const [vendorToDelete, setVendorToDelete] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/${vendorId}`)
      .then((response) => {
        setVendor(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vendor details:", error);
      });
  }, [vendorId]);

  const deleteVendor = (vendor) => {
    axios
      .delete(`${API_URL}/${vendor._id}`)
      .then((response) => {
        setVendorToDelete(response.data);
        console.log("Vendor deleted");
        navigate(`/VendorList`);
      })
      .catch((error) => {
        console.error("Error deleting vendor:", error);
      });
  };

  return (
    <>
      <div>
        <h2>Vendor Details</h2>
        <p>Name: {vendor.name}</p>
        <p>Location: {vendor.location}</p>
        <p>Web: {vendor.URL}</p>
        <p>Description: {vendor.description}</p>
        <p>Type of service: {vendor.typeOfService}</p>
        <p>Email: {vendor.email}</p>
        <p>Phone: {vendor.phoneNumber}</p>
      </div>

      <button
        className="btn btn-xs sm:btn-sm md:btn-md btn-wide "
        onClick={() => {
          deleteVendor(vendor);
        }}
      >
        Delete
      </button>

     
       <div className="mt-4">
        <Link to={`/VendorEdit/${vendor._id}`}>
          <button className="btn btn-xs sm:btn-sm md:btn-md btn-wide">
            Edit
          </button>
        </Link>
      </div>
       
    </>
  );
}

export default VendorDetails;
