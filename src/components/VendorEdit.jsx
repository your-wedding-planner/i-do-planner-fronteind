import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/auth.context";
import "../css/add-forms.css"


function VendorEdit() {
  const {user} = useContext(AuthContext)
  const storedToken = localStorage.getItem("authToken");
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    URL: "",
    description: "",
    typeOfService: "Decoration",
    email: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(true);
  const { vendorId } = useParams();
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    storedToken

    const confirmEdit = window.confirm(
      "Are you sure you want to edit this vendor?"
    );

    if (confirmEdit) {
      const requestBody = { ...formData };

    setLoading(true);

    axios
      .put(`${import.meta.env.VITE_API_URL}/api/vendors/${vendorId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        toast.success("Vendor edited successfully");
        navigate(`/VendorDetails/${vendorId}`);
      })
      .catch((error) => console.log(error));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const getVendor = () => {
      storedToken
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/vendors/${vendorId}`, {
          headers: { Authorization: `Bearer ${storedToken}` }
        })
        .then((response) => {
          const vendorData = response.data;
          setFormData(vendorData);
        })
        .catch((error) => console.log(error));
    };

    getVendor();
    setLoading(false);
  }, [vendorId]);

  const handleButtonClick = () => {
    setShowVendorsForm(true);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="edit-vendor-container">
        <label>Name: 
        <input
          type="text"
          name="name"
          className="input input-bordered w-full max-w-xs"
          value={formData.name}
          onChange={handleChange}
        />
        </label>

        <label>Location: 
        <input
          type="text"
          name="location"
          className="input input-bordered w-full max-w-xs"
          value={formData.location}
          onChange={handleChange}
        />
        </label>

        <label>URL: 
        <input
          type="text"
          name="URL"
          className="input input-bordered w-full max-w-xs"
          value={formData.URL}
          onChange={handleChange}
        />
        </label>

        <label>Description: 
        <input
          type="text"
          name="description"
          className="input input-bordered w-full max-w-xs"
          value={formData.description}
          onChange={handleChange}
        />
        </label>

        <label>TypeOfService: 
        <select
          name="typeOfService"
          className="select select-bordered w-full max-w-xs"
          value={formData.typeOfService}
          onChange={handleChange}
        >
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
        <div>
        <button
          disabled={loading}
          type="submit"
          className="btn btn-primary"
        >
          Save
        </button>
        </div>
      </form>
    </div>
  );
}

export default VendorEdit;
