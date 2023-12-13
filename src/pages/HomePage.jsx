import { Link } from "react-router-dom";
import guest_icon from "../assets/guest-icon.png";
import vendor_icon from "../assets/vendor-icon.png";
import calculator_icon from "../assets/calculator-icon.png";
import table_icon from "../assets/table-icon.png";
import CountDown from "../components/CountDown";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import wedding_rings from "../assets/wedding-rings.jpeg";

function HomePage() {
  const { user } = useContext(AuthContext);
  const { weddingDate } = user;

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

  return (
    <div className="footer-pin">
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
            <img className="dashboard-icon" src={guest_icon} alt="Guest Icon" />
            Guest List
          </Link>
          </div>
          <div className="dashboard-item">
          <Link to={`/VendorList`}>
            <img className="dashboard-icon" src={vendor_icon} alt="Vendor Icon" />
            Vendor List
          </Link>
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
            <img className="dashboard-icon" src={table_icon} alt="Table Icon" />
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
