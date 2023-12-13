import React, { useContext, useState } from "react";
import axios from "axios";
import add_icon from "../assets/add-icon.png";
import toast from "react-hot-toast";
import { AuthContext } from "../context/auth.context";

function AddVendorForm({ loadVendors })  {
  const {user} = useContext(AuthContext)
  const storedToken = localStorage.getItem('authToken');
  const [showVendorsForm, setShowVendorsForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    URL: "",
    description: "",
    typeOfService: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    storedToken
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/vendors`, formData, { headers: { Authorization: `Bearer ${storedToken}`} });
      console.log("Form submitted successfully");
      loadVendors();
      toast.success("Vendor created succesfully");
      setShowVendorsForm(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleButtonClick = () => {
    setShowVendorsForm(true);
  };

  return (
    <div>
      <div>
        <h2>Add new Vendor</h2>
      </div>

      <button onClick={handleButtonClick} className="btn">
        <img src={add_icon} alt="Add Icon" className="home"></img>
      </button>
      {showVendorsForm && (
        <form onSubmit={handleSubmit} className="add-form-vendor">
          <label>
            Name:
            <input
              type="text"
              name="name"
              className="input input-bordered w-full max-w-xs"
              required={true}
              value={formData.name}
              onChange={handleChange}
            />
          </label>          
          <label>
            Location:
            <input
              type="text"
              name="location"
              className="input input-bordered w-full max-w-xs"
              required={true}
              value={formData.location}
              onChange={handleChange}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              className="input input-bordered w-full max-w-xs"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <label>
            URL:
            <input
              type="text"
              name="URL"
              className="input input-bordered w-full max-w-xs"
              value={formData.URL}
              onChange={handleChange}
            />
          </label>
          <label>
            Type of Service:
            <select 
            name="typeOfService" 
            className="select select-bordered w-full max-w-xs"
            required={true} 
            value={formData.typeOfService} 
            onChange={handleChange}>
            <option disabled selected value="">
                Select an option
              </option>
              <option value="Decoration">Decoration</option>
              <option value="Photographer">Photographer</option>
              <option value="Music">Music</option>
              <option value="Food">Food</option>
              <option value="Beauty & Health">Beauty & Health</option>
              <option value="Officials">Officials</option>
              <option value="Location">Location</option>
              <option value="Dress & Accessories">Dress & Accessories</option>
              <option value="Invitations">Invitations</option>
              <option value="Gifts">Gifts</option>
            </select>
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              className="input input-bordered w-full max-w-xs"
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
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </label>
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default AddVendorForm;
