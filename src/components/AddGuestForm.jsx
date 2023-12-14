import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import add_icon from "../assets/add-icon.png";
import toast from "react-hot-toast";
import { AuthContext } from "../context/auth.context";
import "../css/add-forms.css"

function AddGuestForm({ loadGuests }) {
  const storedToken = localStorage.getItem("authToken");
  const {user} = useContext(AuthContext)
  const [showGuests, setShowGuests] = useState(false);
  const [tables, setTables] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    phoneNumber: "",
    notes: "",
    attending: "",
    seatingTable: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    storedToken
    if (formData.seatingTable === "-1") {
      formData.seatingTable = null;
    }

    try {
      await axios
        .post(`${import.meta.env.VITE_API_URL}/api/guests`, formData, {
          headers: { Authorization: `Bearer ${storedToken}` }
        })
        .then((response) => {
          updateTable(response.data);
          setFormData({
            firstName: "",
            lastName: "",
            age: "",
            email: "",
            phoneNumber: "",
            notes: "",
            attending: "",
            seatingTable: null,
          })
        });
      console.log("Form submitted successfully");
      toast.success("Guest created successfully");
      setShowGuests(false);
      loadGuests();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleButtonClick = () => {
    setShowGuests(true);
  };

  useEffect(() => {
    const getTables = () => {
      storedToken
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/seatingTables`, {
          headers: { Authorization: `Bearer ${storedToken}` }
        })
        .then((response) => {
          setTables(response.data);
        })
        .catch((error) => console.log(error));
    };
    getTables();
  }, []);

  const updateTable = (newGuest) => {
    storedToken
    if (formData.seatingTable != null) {
      const table = tables.find((table) => table._id === formData.seatingTable);
      table.assignedGuests.unshift(newGuest);
      axios
        .put(`${import.meta.env.VITE_API_URL}/api/seatingTables/${table._id}`, table, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(() => {
          console.log("Table edited successfully");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
    <div>
      <div>
      <button onClick={handleButtonClick} className="btn float-center text-blue-500">
        <img src={add_icon} alt="Add Icon" className="home"></img>
      </button>
      </div>

     
      {showGuests && (
        <form onSubmit={handleSubmit} className="add-form-guest">
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              className="input input-bordered w-full max-w-xs"
              placeholder="Type here"
              required={true}
              value={formData.firstName}
              onChange={handleChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              className="input input-bordered w-full max-w-xs"
              placeholder="Type here"
              required={true}
              value={formData.lastName}
              onChange={handleChange}
            />
          </label>
          <label>
            Age:
            <select 
            name="age" 
            className="select select-bordered w-full max-w-xs"
            required={true} 
            value={formData.age} 
            onChange={handleChange}>
            <option disabled selected value="">
                Select an option
              </option>
              <option value="Adult">Adult</option>
              <option value="Child">Child</option>
              <option value="Baby">Baby</option>
            </select>
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              className="input input-bordered w-full max-w-xs"
              placeholder="Type here"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Phone Number:
            <input
              type="text"
              name="phoneNumber"
              className="input input-bordered w-full max-w-xs"
              placeholder="Type here"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </label>
          <label>
            Notes:
            <input
              name="notes"
              className="input input-bordered w-full max-w-xs"
              placeholder="Type here"
              value={formData.notes}
              onChange={handleChange}
            ></input>
          </label>
          <label>
            Attending:
            <select
              name="attending"
              className="select select-bordered w-full max-w-xs"
              required={true}
              value={formData.attending}
              onChange={handleChange}
            >
              <option disabled selected value="">
                Select an option
              </option>
              <option value="Attending">Attending</option>
              <option value="Pending">Pending</option>
              <option value="Declined">Declined</option>
            </select>
          </label>
          <label>Table: 
          <select
            name="seatingTable"
            className="select select-bordered w-full max-w-xs"
            value={formData.seatingTable}
            onChange={handleChange}
          >
            <option value="-1">Unassigned table</option>
            {tables.map((table) => (
              <option value={table._id}>{table.tableName}</option>
            ))}
          </select>
          </label>
          <div>
          <button className="btn btn-primary" type="submit">Submit</button>
          </div>
        </form>
      )}
    </div>
    </div>
  );
}

export default AddGuestForm;
