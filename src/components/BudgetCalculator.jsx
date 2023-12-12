import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AddCostItemForm from "./AddCostItemForm";
import delete_icon from "../assets/delete-icon.png"
import edit_icon from "../assets/edit-icon.png"
import toast from "react-hot-toast";

const DEFAULT_COSTITEM_FORM_VALUES = {
    nameVendor: "",
    price: 0,
    description: "",
    typeOfCost: ""
}

function BudgetCalculator () {
    const [costItemList, setCostItemList] = useState()
    const [budget, setBudget] = useState(50000)
    const [totalCosts, setTotalCosts] = useState(0)
    const [remainingBudget, setRemainingBudget] = useState(0)
    //const [costItemUpdated, setCostItemUpdated] = ({...DEFAULT_COSTITEM_FORM_VALUES})
    const storedToken = localStorage.getItem('authToken');
    const navigate = useNavigate();

    console.log(costItemList)

    const loadCostItems = () => {
      storedToken
        axios
          .get(`${import.meta.env.VITE_API_URL}/api/costItems`, { headers: { Authorization: `Bearer ${storedToken}`} })
          .then((response) => {
            setCostItemList(response.data);
          })
          .catch((error) => {
            console.error("Error fetching cost items: ", error);
          });
      };

    const calculator = (itemArray) => {
      const result = itemArray
        .map((costItem) => {
          return costItem.price;
        })
        .reduce((acc, currentvalue) => {
          return acc + currentvalue;
        }, 0);
      setTotalCosts(result)

      const finalRemainingBudget = budget - totalCosts
      setRemainingBudget(finalRemainingBudget)
    };

      useEffect(() => {
        if(!costItemList) return
        calculator(costItemList)
      }, [costItemList]);

      useEffect(() => {
        loadCostItems();
      }, []);

      const deleteCostItem = (costItemId) => {
        storedToken
        axios.delete(`${import.meta.env.VITE_API_URL}/api/costItems/${costItemId}`, { headers: { Authorization: `Bearer ${storedToken}`} })
          .then(() => {
            toast.success("Deleted successfully")
            console.log("CostItem deleted")
            navigate("/BudgetCalculator") // necessary --> already on this page?
          })
          .catch((error) => {
            console.log("Error deleting cost item", error)
          })
      }

      const editCostItem = (costItemId) => {
        storedToken
        
      }
//Put the following below in a table? --> format of Daisy
      return (
        <>
        <div>
          <h3>Budget: {budget}</h3>
          <h3>Remaining: {remainingBudget}</h3>
          <h3>Total costs: {totalCosts}</h3>
        </div>
          <div>
            <h1>Cost Items:</h1>
            {costItemList?.length > 0 ? (
              costItemList?.map((costItem) => {
                return (
                  <div>
                    <h3>{costItem.nameVendor}</h3>
                    <h3>{costItem.price}</h3>
                    <h3>{costItem.description}</h3>
                    <h3>{costItem.typeOfCost}</h3>
                    <button
                      className="btn btn-xs sm:btn-sm md:btn-md btn-wide "
                      onClick={() => deleteCostItem(costItem._id)} // on each click, I want to pass costItem._id as an argument
                    >
                      <img src={delete_icon} alt="DeleteCostItem" />
                    </button>
                    <button
                      className="btn btn-xs sm:btn-sm md:btn-md btn-wide "
                      onClick={() => editCostItem(costItem._id)}
                    >
                      <img src={edit_icon} alt="DeleteCostItem" />
                    </button>
                  </div>
                );
              })
            ) : (
              <p>There are not cost items yet</p>
            )}
          </div>
          <div>
            <AddCostItemForm loadCostItems={loadCostItems} />
          </div>
        </>
      );
}

export default BudgetCalculator