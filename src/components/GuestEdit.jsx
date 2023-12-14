import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/auth.context";
import "../css/add-forms.css";

function GuestEdit() {
  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "Adult",
    email: "",
    phoneNumber: "",
    notes: "",
    attending: "Pending",
    seatingTable: null,
  });

  const [loading, setLoading] = useState(true);
  const { guestId } = useParams();

  const [tables, setTables] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    storedToken;
    e.preventDefault();

    const confirmEdit = window.confirm(
      "Are you sure you want to edit this guest?"
    );

    if (confirmEdit) {
      if (formData.seatingTable === "-1") {
        formData.seatingTable = null;
      }

      const requestBody = { ...formData };

      setLoading(true);
      axios
        .put(
          `${import.meta.env.VITE_API_URL}/api/guests/${guestId}`,
          requestBody,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        )
        .then(() => {
          toast.success("Guest edited successfully");
          navigate(`/GuestDetails/${guestId}`);
          updateGuestsLists();
        })
        .catch((error) => console.log(error));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    storedToken;
    const getGuest = () => {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/guests/${guestId}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          const guestData = response.data;
          setFormData(guestData);
        })
        .catch((error) => console.log(error));
    };

    getGuest();
    getTables();
    setLoading(false);
  }, [guestId]);

  const getTables = () => {
    storedToken;
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/seatingTables`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setTables(response.data);
      })
      .catch((error) => console.log(error));
  };

  const updateGuestsLists = () => {
    tables.forEach((table) => {
      const index = table.assignedGuests.findIndex(
        (guest) => guest._id === formData._id
      );
      if (index !== -1) {
        table.assignedGuests = table.assignedGuests.filter(
          (guest, i) => i !== index
        );
        updateTable(table);
      }
    });

    if (formData.seatingTable != null) {
      const table = tables.find((table) => table._id === formData.seatingTable);
      table.assignedGuests.unshift(formData);
      updateTable(table);
    }
  };

  const updateTable = (table) => {
    storedToken;
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/seatingTables/${table._id}`,
        table,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        console.log("Table edited successfully");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="edit-guest-container">
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            className="input input-bordered w-full max-w-xs"
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
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>

        <label>
          Age:
          <select
            name="age"
            className="select select-bordered w-full max-w-xs"
            value={formData.age}
            onChange={handleChange}
          >
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

        <label>
          Notes:
          <input
            type="text"
            name="notes"
            className="input input-bordered w-full max-w-xs"
            value={formData.notes}
            onChange={handleChange}
          ></input>
        </label>

        <label>
          Attending:
          <select
            name="attending"
            className="select select-bordered w-full max-w-xs"
            value={formData.attending}
            onChange={handleChange}
          >
            <option value="Attending">Attending</option>
            <option value="Pending">Pending</option>
            <option value="Declined">Declined</option>
          </select>
        </label>

        <label>
          Table:
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
          <button disabled={loading} type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default GuestEdit;
