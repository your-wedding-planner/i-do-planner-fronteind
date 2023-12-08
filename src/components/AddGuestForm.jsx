import React, { useState } from "react";
import axios from "axios";
import add_icon from "../assets/add-icon.png";

const API_URL = "http://localhost:5005/api/guests";
const storedToken = localStorage.getItem('authToken');

function AddGuestForm() {
  const [showGuests, setShowGuests] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "Adult",
    email: "",
    phoneNumber: "",
    notes: "",
    attending: "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData, { headers: { Authorization: `Bearer ${storedToken}`} });
      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleButtonClick = () => {
    setShowGuests(true);
  };
  return (
    <div>
      <div>
        <h2>Add new Guest</h2>
      </div>

      <button onClick={handleButtonClick} className="btn">
        <img src={add_icon} alt="Add Icon" className="home"></img>
      </button>
      {showGuests && (
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Age:
            <select name="age" value={formData.age} onChange={handleChange}>
              <option value="Adult">Adult</option>
              <option value="Child">Child</option>
              <option value="Baby">Baby</option>
            </select>
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Phone Number:
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Notes:
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            ></textarea>
          </label>
          <br />
          <label>
            Attending:
            <select
              name="attending"
              value={formData.attending}
              onChange={handleChange}
            >
              <option value="Attending">Attending</option>
              <option value="Pending">Pending</option>
              <option value="Declined">Declined</option>
            </select>
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default AddGuestForm;
