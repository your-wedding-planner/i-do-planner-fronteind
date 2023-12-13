import React, { useContext, useState } from "react";
import axios from "axios";
import add_icon from "../assets/add-icon.png";
import toast from "react-hot-toast";
import { AuthContext } from "../context/auth.context"

function AddCostItemForm({loadCostItems}) {
  const storedToken = localStorage.getItem('authToken');
  const {user} = useContext(AuthContext)
  const [showCostItems, setShowCostItems] = useState(false);
  const [formData, setFormData] = useState({
    nameVendor: "",
    price: 0,
    description: "",
    typeOfCost: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    storedToken
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/costItems`, formData, {
        headers: { Authorization: `Bearer ${storedToken}` }
      } )
      .then(() => {
        console.log("Cost Item created successfully")
        loadCostItems()
        toast.success("Cost Item created successfully");
        setShowCostItems(false)
      })
      .catch((error) => {
        console.log("Error creating cost item..", error)
      })
  };

  const handleButtonClick = () => {
    setShowCostItems(true);
  };

  return (
    <div>
      <button onClick={handleButtonClick} className="btn">
        <img src={add_icon} alt="Add Icon" className="home"></img>
      </button>
      {showCostItems && (
        <form onSubmit={handleSubmit} className="add-from-costitem">
          <label >
            Name of Vendor:
            <input
              type="text"
              name="nameVendor"
              className="input input-bordered w-full max-w-xs"
              placeholder="Type here"
              required={true}
              value={formData.nameVendor}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Price:
            <input
              type="number"
              name="price"
              min="0"
              className="input input-bordered w-full max-w-xs"
              required={true}
              value={formData.price}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Description:
            <input
              type="text"
              name="description"
              className="input input-bordered w-full max-w-xs"
              placeholder="Type here"
              required={true}
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <br />         
          <label >
            Type of cost:
            <select
              name="typeOfCost"
              className="select select-bordered w-full max-w-xs"
              value={formData.typeOfCost}
              required={true}
              onChange={handleChange}
            >
              <option disabled selected value="">
                Select the type
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
          <br />
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default AddCostItemForm;
