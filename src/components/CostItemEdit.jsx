import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import "../css/add-forms.css";

function CostItemEdit() {
  const { costItemId } = useParams();
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("authToken");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nameVendor: "",
    price: 0,
    description: "",
    typeOfCost: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    storedToken;

    const confirmEdit = window.confirm(
      "Are you sure you want to edit this cost item?"
    );

    if (confirmEdit) {
      const requestBody = { ...formData };

      setLoading(true);

      axios
        .put(
          `${import.meta.env.VITE_API_URL}/api/costItems/${costItemId}`,
          requestBody,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        )
        .then(() => {
          toast.success("Cost Item edited successfylly");
          navigate("/BudgetCalculator");
        })
        .catch((error) => console.log(error));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

    getCostItem();
    setLoading(false);
  }, costItemId);

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="edit-costitem-container">
        <label>
          Name of Vendor:
          <input
            type="text"
            name="nameVendor"
            className="input input-bordered w-full max-w-xs"
            value={formData.nameVendor}
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            min="0"
            className="input input-bordered w-full max-w-xs"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
        <label>
          Description
          <textarea
            type="text"
            name="description"
            className="input input-bordered w-full max-w-xs"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Type of cost:
          <select
            name="typeOfCost"
            className="select select-bordered w-full max-w-xs"
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
        <div>
          <button disabled={loading} type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default CostItemEdit;
