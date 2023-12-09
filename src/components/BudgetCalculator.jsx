import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddCostItemForm from "./AddCostItemForm";
import delete_icon from "../assets/delete-icon.png"
import edit_icon from "../assets/edit-icon.png"

function BudgetCalculator () {
    const [costItemList, setCostItemList] = useState([])
    const storedToken = localStorage.getItem('authToken');


    //Insert a field to create a budget amount(only create, read and update?)
    //Insert a field that gives the remaining budget 
    //Make calculations so remaing budget is updated
    //Create a graph that shows the division of cost types
    

    const loadCostItems = () => {
        axios
          .get("http://localhost:5005/api/costItems", { headers: { Authorization: `Bearer ${storedToken}`} })
          .then((response) => {
            setCostItemList(response.data);
          })
          .catch((error) => {
            console.error("Error fetching vendors:", error);
          });
      };

      useEffect(() => {
        loadCostItems();
      }, []);

      const deleteCostItem = () => {
        // axios.delete("http://localhost:5005/api/costItems", )
        //need to get the ID of this specific CostItem
      }

      const editCostItem = () => {
        //need to get the ID of this specific CostItem
      }

      return (
        <>
        <div>
            <h1>Cost Items:</h1>
            {costItemList.length > 0 ? (
                costItemList.map((costItem) => {
                    return (
                      <div>
                        <h3>{costItem.nameVendor}</h3>
                        <h3>{costItem.price}</h3>
                        <h3>{costItem.description}</h3>
                        <h3>{costItem.typeOfCost}</h3>
                        <button
                          className="btn btn-xs sm:btn-sm md:btn-md btn-wide "
                          onClick={deleteCostItem}
                        >
                          <img src={delete_icon} alt="DeleteCostItem" />
                        </button>
                        <button
                          className="btn btn-xs sm:btn-sm md:btn-md btn-wide "
                          onClick={editCostItem}
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
      )
}

export default BudgetCalculator