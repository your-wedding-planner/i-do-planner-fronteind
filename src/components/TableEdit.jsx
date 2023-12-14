import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/auth.context";

function TableEdit({ tableId, reloadTables }) {
  const {user} = useContext(AuthContext)
  const [loading, setLoading] = useState(true);
  const storedToken = localStorage.getItem("authToken");

  const [formData, setFormData] = useState({
    tableName: "",
    createdBy: user._id
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    storedToken

    const confirmEdit = window.confirm(
      "Are you sure you want to edit this table?"
    );

    if(confirmEdit) {
      const requestBody = { ...formData }

    setLoading(true);

    axios
      .put(`${import.meta.env.VITE_API_URL}/api/seatingTables/${tableId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        toast.success("Table edited successfully");
        reloadTables();
      })
      .catch((error) => console.log(error));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const getTable = () => {
      storedToken
      console.log(tableId);
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/seatingTables/${tableId}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          const tableData = response.data;
          setFormData(tableData);
        })
        .catch((error) => console.log(error));
    };

    getTable();
    setLoading(false);
  }, [tableId]);

  return (
    <div>

      <form onSubmit={handleSubmit} className="edittable">
        <label>Name:</label>
        <input
          type="text"
          name="tableName"
          className="input input-bordered w-full max-w-xs"
          value={formData.tableName}
          onChange={handleChange}
        />
        <button
          disabled={loading}
          type="submit"
          className="btn btn-primary"
          >
          Save
        </button>
      </form>
    </div>
  );
}

export default TableEdit;
