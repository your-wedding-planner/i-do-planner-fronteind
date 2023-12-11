import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://localhost:5005/api/seatingTables";

function TableEdit({ tableId, reloadTables }) {
  const [loading, setLoading] = useState(true);
  const storedToken = localStorage.getItem("authToken");

  const [formData, setFormData] = useState({
    tableName: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { ...formData };

    setLoading(true);

    axios
      .put(`${API_URL}/${tableId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        toast.success("Table edited successfully");
        reloadTables();
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const getTable = () => {
      console.log(tableId);
      axios
        .get(`${API_URL}/${tableId}`, {
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
      <h3>Edit table</h3>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="tableName"
          value={formData.tableName}
          onChange={handleChange}
        />
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

export default TableEdit;
