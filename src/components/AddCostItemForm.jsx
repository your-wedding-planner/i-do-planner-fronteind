import React, { useContext, useState } from "react";
import axios from "axios";
import add_icon from "../assets/add-icon.png";
import toast from "react-hot-toast";
import { AuthContext } from "../context/auth.context"
import { useNavigate } from "react-router-dom";


function AddCostItemForm() {
  const storedToken = localStorage.getItem('authToken');
  const {user} = useContext(AuthContext)
  const [showCostItems, setShowCostItems] = useState(false);
  const [formData, setFormData] = useState({
    nameVendor: "",
    price: 0,
    description: "",
    typeOfCost: ""
  });

  const navigate = useNavigate()

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
        toast.success("Cost Item created successfully");
        console.log("Cost Item created successfully")
        navigate("/BudgetCalculator") // --> why not working?
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
      <div>
        <h2>Add new Cost Item</h2>
      </div>

      <button onClick={handleButtonClick} className="btn">
        <img src={add_icon} alt="Add Icon" className="home"></img>
      </button>
      {showCostItems && (
        <form onSubmit={handleSubmit}>
          <label>
            Name of Vendor:
            <input
              type="text"
              name="nameVendor"
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
              required={true}
              value={formData.price}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              type="text"
              name="description"
              required={true}
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <br />         
          <label>
            Type of cost:
            <select
              name="typeOfCost"
              value={formData.typeOfCost}
              onChange={handleChange}
            >
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
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default AddCostItemForm;
