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
  const [costItemList, setCostItemList] = useState([]);
  const [itemsBackup, setItemsBackup] = useState();
  const [query, setQuery] = useState("");
  const [budget, setBudget] = useState(user.weddingBudget);
  const [totalCosts, setTotalCosts] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [remainingBudgetPercentage, setRemainingBudgetPercentage] = useState(0);
  const [formData, setFormData] = useState({
    nameVendor: "",
    price: 0,
    description: "",
    typeOfCost: "",
  });
  const [filterCost, setFilterCost] = useState("");

  useEffect(() => {
  //  switch(query, filterCost) {
  //   case true, true: 
  //   break
  //   case true, false:
  //  }
    const filtered = query
      ? filterCost
        ? 
            itemsBackup.filter(
              (costItem) =>
                costItem.nameVendor
                  .toLowerCase()
                  .includes(query.toLowerCase()) &&
                costItem.typeOfCost.toLowerCase() === filterCost.toLowerCase()
            )
          
        : 
            itemsBackup.filter((costItem) =>
              costItem.nameVendor.toLowerCase().includes(query.toLowerCase())
            )
          
      : setCostItemList(itemsBackup);
   

    setCostItemList(filtered)

    !query && filterCost &&
       setCostItemList(
          itemsBackup.filter(
            (cost) => cost.typeOfCost.toLowerCase() === filterCost.toLowerCase()
          )
        )


        !query && !filterCost && setCostItemList(itemsBackup)
      
  }, [query, filterCost]);


  
  function costItemSelect(e) {
    e.preventDefault();
    console.log(e.target.value);
    setFilterCost(e.target.value);
    const selectedList = costItemList.filter((costItem) => {
      return costItem.typeOfCost === e.target.value;
    });

    setCostItemList(selectedList); //not setCostItemList??
    //If we click after this, CostItemList will only have the filtered type as we clicked before. So it will never show other types
  }

  const sortCostLow = () => {
    const toSortLow = [...costItemList];
    const sortedLow = toSortLow.sort((a, b) => {
      return a.price - b.price;
    });
    setCostItemList(sortedLow);
  };

  const sortCostHigh = () => {
    const toSortHigh = [...costItemList];
    const sortedHigh = toSortHigh.sort((a, b) => {
      return b.price - a.price;
    });
    setCostItemList(sortedHigh);
  };

  const loadCostItems = () => {
    storedToken;
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/costItems`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setCostItemList(response.data);
        setItemsBackup(response.data);
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
    const percentageRemaining = (100 / budget) * remaining;
    const roundedPercentage = percentageRemaining.toFixed(1);
    setRemainingBudget(remaining);
    setRemainingBudgetPercentage(roundedPercentage);
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
    <div className="container">
      <div className="budget-container">
        <h3>
          Budget:{" "}
          {budget.toLocaleString("en-US", {
            style: "currency",
            currency: "EUR",
          })}
        </h3>
        <div className="remaining-budget">
          <h2>
            Remaining:{" "}
            {remainingBudget.toLocaleString("en-US", {
              style: "currency",
              currency: "EUR",
            })}
          </h2>
          <div
            className="radial-progress text-success"
            style={{ "--value": remainingBudgetPercentage }}
            role="progressbar"
          >
            {remainingBudgetPercentage}%
          </div>
        </div>
        <h3>
          Total costs:{" "}
          {totalCosts.toLocaleString("en-US", {
            style: "currency",
            currency: "EUR",
          })}
        </h3>
      </div>
      <div className="btn-secondary btn-add-costitem">
        <AddCostItemForm loadCostItems={loadCostItems} />
      </div>

    
        <div className="filter-costitems">
          <label >
            Search by name:</label>
            <input
              type="search"
              className="input input-bordered w-full max-w-xs"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          
          <label>Filter by type of cost:</label>
          <select
            name="typeOfCost"
            className="select select-bordered w-full max-w-xs"
            onChange={costItemSelect}
          >
            <option value={""}>All types</option>
            <option value={"Decoration"}>Decoration</option>
            <option value={"Photographer"}>Photographer</option>
            <option value={"Music"}>Music</option>
            <option value={"Food"}>Food</option>
            <option value={"Beauty & Health"}>Beauty & Health</option>
            <option value={"Officials"}>Officials</option>
            <option value={"Location"}>Location</option>
            <option value={"Dress & Accessories"}>Dress & Accessories</option>
            <option value={"Invitations"}>Invitations</option>
            <option value={"Gifts"}>Gifts</option>
          </select>
          <button
            className="btn btn-primary"
            onClick={() => {
              sortCostLow();
            }}
          >
            Sort low-high
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              sortCostHigh();
            }}
          >
            Sort high-low
          </button>
        </div>

        {/* <div>
          
        </div>

        <div>
          <label>Filter by type of cost:</label>
          <select
            name="typeOfCost"
            className="select select-bordered w-full max-w-xs"
            onChange={costItemSelect}
          >
            <option value={""}>All types</option>
            <option value={"Decoration"}>Decoration</option>
            <option value={"Photographer"}>Photographer</option>
            <option value={"Music"}>Music</option>
            <option value={"Food"}>Food</option>
            <option value={"Beauty & Health"}>Beauty & Health</option>
            <option value={"Officials"}>Officials</option>
            <option value={"Location"}>Location</option>
            <option value={"Dress & Accessories"}>Dress & Accessories</option>
            <option value={"Invitations"}>Invitations</option>
            <option value={"Gifts"}>Gifts</option>
          </select>
        </div> */}
  

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
                    <td>
                      {costItem.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </td>
                    <td>{costItem.description}</td>
                    <td>{costItem.typeOfCost}</td>
                    <td>
                      <Link to={`/CostItemEdit/${costItem._id}`}>
                        <img
                          className="costitem-icons"
                          src={edit_icon}
                          alt="EditCostItem"
                        />
                      </Link>
                    </td>
                    <td>
                      {" "}
                      <button onClick={() => deleteCostItem(costItem._id)}>
                        <img
                          className="costitem-icons"
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
        </table>
      </div>
    </div>
  );
}

export default BudgetCalculator;
