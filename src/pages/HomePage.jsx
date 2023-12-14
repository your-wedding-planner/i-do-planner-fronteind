import { Link } from "react-router-dom";
import guest_icon from "../assets/guest-icon.png";
import vendor_icon from "../assets/vendor-icon.png";
import calculator_icon from "../assets/calculator-icon.png";
import table_icon from "../assets/table-icon.png";
import CountDown from "../components/CountDown";
import { AuthContext } from "../context/auth.context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import wedding_rings from "../assets/wedding-rings.jpeg";

function HomePage() {
  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");
  const { weddingDate } = user;
  const [costItemList, setCostItemList] = useState();
  const [totalCosts, setTotalCosts] = useState(0);
  const [budget, setBudget] = useState(user.weddingBudget);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [remainingBudgetPercentage, setRemainingBudgetPercentage] = useState(0);

  const dateToFormat = new Date(weddingDate);
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedWeddingDate = dateToFormat.toLocaleDateString(
    "en-US",
    options
  );

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

  useEffect(() => {
    if (!costItemList) return;
    calculateSumOfCosts(costItemList);
  }, [costItemList]);

  useEffect(() => {
    loadCostItems();
  }, []);

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

  return (
    <div className="container">
      <div>
        <section className="wedding-info-container">
          <div className="card lg:card-side bg-base-96">
            <div className="card-body">
              <div className="justify-center">
                <h2 className="couple-title">
                  {user.name} & {user.namePartner}
                </h2>
              </div>
              <p className="couple-date">{formattedWeddingDate}</p>
              <div className="card-actions justify-center">
                <CountDown weddingDate={weddingDate} />
              </div>
            </div>
          </div>
        </section>

        <section className="dashboard">
          <div className="left-column">
            <div className="dashboard-item">
              <Link to={`/GuestList`}>
                <img
                  className="dashboard-icon"
                  src={guest_icon}
                  alt="Guest Icon"
                />
                Guest List
              </Link>
            </div>
            <div className="dashboard-item">
              <Link to={`/VendorList`}>
                <img
                  className="dashboard-icon"
                  src={vendor_icon}
                  alt="Vendor Icon"
                />
                Vendor List
              </Link>
            </div>
          </div>
          <div className="spacer"></div>
          <div className="budget-container">
            <div className="remaining-budget">
              <h2>
                Remaining: <br></br>
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
          </div>
          <div className="spacer"></div>
          <div className="right-column">
            <div className="dashboard-item">
              <Link to={"/BudgetCalculator"}>
                <img
                  className="dashboard-icon"
                  src={calculator_icon}
                  alt="Calculator Icon"
                />
                Budget Calculator
              </Link>
            </div>
            <div className="dashboard-item">
              <Link to={"/SeatingPlanner"}>
                <img
                  className="dashboard-icon"
                  src={table_icon}
                  alt="Table Icon"
                />
                Seating Planner
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
