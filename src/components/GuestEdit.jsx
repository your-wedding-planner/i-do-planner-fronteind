import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://localhost:5005/api/guests";

function GuestEdit() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "Adult",
    email: "",
    phoneNumber: "",
    notes: "",
    attending: "Pending",
  });
  const [loading, setLoading] = useState(true);
  const { guestId } = useParams();
  const storedToken = localStorage.getItem("authToken");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { ...formData };

    setLoading(true);
    axios
      .put(`${API_URL}/${guestId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        toast.success("Guest edited successfully");
        navigate(`/GuestDetails/${guestId}`);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const getGuest = () => {
      axios
        .get(`${API_URL}/${guestId}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          const guestData = response.data;
          setFormData(guestData);
        })
        .catch((error) => console.log(error));
    };

    getGuest();
    setLoading(false);
  }, [guestId]);

  return (
    <div>
      <h3>Edit guest</h3>
      <form onSubmit={handleSubmit}>
        <label>First Name: </label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        <label>Last Name: </label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <label>Age: </label>
        <select name="age" value={formData.age} onChange={handleChange}>
          <option value="Adult">Adult</option>
          <option value="Child">Child</option>
          <option value="Baby">Baby</option>
        </select>

        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Phone Number: </label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />

        <label>Notes: </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        ></textarea>

        <label>Attending: </label>
        <select
          name="attending"
          value={formData.attending}
          onChange={handleChange}
        >
          <option value="Attending">Attending</option>
          <option value="Pending">Pending</option>
          <option value="Declined">Declined</option>
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

export default GuestEdit;
