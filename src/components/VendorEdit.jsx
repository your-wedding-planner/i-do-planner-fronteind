import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/auth.context";


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
    <div className="footer-pin">
      <h3>Edit vendor</h3>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Location: </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        <label>URL: </label>
        <input
          type="text"
          name="URL"
          value={formData.URL}
          onChange={handleChange}
        />

        <label>Description: </label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label>TypeOfService: </label>
        <select
          name="typeOfService"
          value={formData.typeOfService}
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

export default VendorEdit;
