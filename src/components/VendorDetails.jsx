import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

function VendorDetails() {
  const [vendor, setVendor] = useState({});
  const { vendorId } = useParams();
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/vendors/${vendorId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setVendor(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vendor details:", error);
      });
  }, [vendorId]);

  const deleteVendor = () => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/vendors/${vendor._id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        toast.success("Deleted succesfuly"); //successfully?
        console.log("Vendor deleted");
        navigate(`/VendorList`);
      })
      .catch((error) => {
        console.error("Error deleting vendor:", error);
      });
  };

  return vendor ? (
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

      <div className="mt-4">
        <Link to={`/VendorEdit/${vendor._id}`}>
          <button className="btn btn-xs sm:btn-sm md:btn-md btn-wide">
            Edit
          </button>
        </Link>
      </div>

      <button
        className="btn btn-xs sm:btn-sm md:btn-md btn-wide "
        onClick={deleteVendor}
      >
        Delete
      </button>
    </>
  ) : (
    <p>loading</p>
  );
}

export default VendorDetails;
