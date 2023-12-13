import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AddCostItemForm from "./AddCostItemForm";
import delete_icon from "../assets/delete-icon.png";
import edit_icon from "../assets/edit-icon.png";
import toast from "react-hot-toast";
import CostItemEdit from "./CostItemEdit";
import { AuthContext } from "../context/auth.context";

function BudgetCalculator() {
  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");
  const [costItemList, setCostItemList] = useState();
  const [budget, setBudget] = useState(user.weddingBudget);
  const [totalCosts, setTotalCosts] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [formData, setFormData] = useState({
    nameVendor: "",
    price: 0,
    description: "",
    typeOfCost: "",
  });

  const loadCostItems = () => {
    storedToken;
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/costItems`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setCostItemList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cost items: ", error);
      });
  };

  const calculateSumOfCosts = (itemArray) => {
    const result = itemArray
      .map((costItem) => {
        return costItem.price;
      })
      .reduce((acc, currentvalue) => {
        return acc + currentvalue;
      }, 0);
    setTotalCosts(result);

    const remaining = budget - result;
    setRemainingBudget(remaining);
  };

  useEffect(() => {
    if (!costItemList) return;
    calculateSumOfCosts(costItemList);
  }, [costItemList]);

  useEffect(() => {
    loadCostItems();
  }, []);

  const deleteCostItem = (costItemId) => {
    storedToken;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this cost item?"
    );

    if (confirmDelete) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/api/costItems/${costItemId}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(() => {
          toast.success("Deleted successfully");
          console.log("CostItem deleted");
          calculateSumOfCosts(costItemList);
          loadCostItems();
        })
        .catch((error) => {
          console.log("Error deleting cost item", error);
        });
    }
  };

  return (
    <>
      <div>
        <h3>Budget: {budget}</h3>
        <h3>Total costs: {totalCosts}</h3>
        <h3>Remaining: {remainingBudget}</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Name of vendor</th>
              <th>Cost</th>
              <th>Description</th>
              <th>Type of cost</th>
              <th>Edit cost item</th>
              <th>Delete cost item</th>
            </tr>
          </thead>
          <tbody>
            {costItemList?.length > 0 ? (
              costItemList?.map((costItem) => {
                return (
                  <tr>
                    <td>{costItem.nameVendor}</td>
                    <td>{costItem.price}</td>
                    <td>{costItem.description}</td>
                    <td>{costItem.typeOfCost}</td>
                    <td>
                      <Link to={`/CostItemEdit/${costItem._id}`}>
                        <img
                          className="menu-icon"
                          src={edit_icon}
                          alt="EditCostItem"
                        />
                      </Link>
                    </td>
                    <td>
                      {" "}
                      <button
                        className="btn btn-xs sm:btn-sm md:btn-md btn-wide "
                        onClick={() => deleteCostItem(costItem._id)}
                      >
                        <img
                          className="menu-icon"
                          src={delete_icon}
                          alt="DeleteCostItem"
                        />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <p>There are not cost items yet</p>
            )}
          </tbody>
          <tfoot>
            <tr>
              <th>Name of vendor</th>
              <th>Cost</th>
              <th>Description</th>
              <th>Type of cost</th>
              <th>Edit cost item</th>
              <th>Delete cost item</th>
            </tr>
          </tfoot>
        </table>
        <div>
          <AddCostItemForm loadCostItems={loadCostItems} />
        </div>
      </div>
    </>
  );
}

export default BudgetCalculator;
