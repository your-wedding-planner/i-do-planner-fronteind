import React, { useState, useEffect } from "react";
import axios from "axios";
import add_icon from "../assets/add-icon.png";
import toast from "react-hot-toast";

const API_URL = "http://localhost:5005/api/seatingTables";

function AddTableForm({ reloadTables }) {
  const storedToken = localStorage.getItem('authToken');
  const [showTableForm, setShowTableForm] = useState(false);
  const [formData, setFormData] = useState({
    tableName: "",
    assignedGuests: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData, { headers: { Authorization: `Bearer ${storedToken}`} });
      console.log("Form submitted successfuxlly");
      toast.success("Table created successfully");
      setShowTableForm(false);
      // Clear the form after submission
      reloadTables();
      setFormData({ tableName: "", assignedGuests: [] });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleButtonClick = () => {
    setShowTableForm(true);
  };

  return (
    <div>
      <div>
        <h2>Add new Table</h2>
      </div>
      <button onClick={handleButtonClick} className="btn">
        <img src={add_icon} alt="Add Icon" className="home" />
      </button>
      {showTableForm && (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="tableName"
              value={formData.tableName}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}

    </div>
  );
}

export default AddTableForm;
