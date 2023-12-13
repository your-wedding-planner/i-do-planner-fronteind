import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function CostItemEdit() {
  const {costItemId} = useParams()
  const navigate = useNavigate()
  const storedToken = localStorage.getItem("authToken");
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    nameVendor: "",
    price: 0,
    description: "",
    typeOfCost: ""
  })

 const handleSubmit = (e) => {
    e.preventDefault()
    
    storedToken

    const confirmEdit = window.confirm(
      "Are you sure you want to edit this cost item?"
    );

    if(confirmEdit) {
      const requestBody = {...formData}

    setLoading(true)

    axios
    .put(`${import.meta.env.VITE_API_URL}/api/costItems/${costItemId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        toast.success("Cost Item edited successfylly")
        navigate("/BudgetCalculator")
      })
      .catch((error) => console.log(error))
    }
 }

 const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
}

useEffect(() => {
  const getCostItem = () => {
    storedToken;
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/costItems/${costItemId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const vendorData = response.data;
        setFormData(vendorData);
      })
      .catch((error) => console.log(error));
  };

  getCostItem()
  setLoading(false)
}, costItemId);

return (
  <div>
    <h3>Edit Cost Item</h3>
    <form onSubmit={handleSubmit}>
      <label>Name of Vendor:</label>
      <input
        type="text"
        name="nameVendor"
        value={formData.nameVendor}
        onChange={handleChange}
      />
      <label>Price:</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
      />
      <label>Description</label>
      <textarea
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <label>Type of cost:</label>
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
      <button 
      disabled={loading}
      type="submit"
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 transition duration-150 ease-in-out"
      >
        Save
        </button>
    </form>
  </div>
);

}

export default CostItemEdit;
