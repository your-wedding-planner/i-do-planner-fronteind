import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import guest_icon from "../assets/guest-icon.png";
import vendor_icon from "../assets/vendor-icon.png";
import home_icon from "../assets/home-icon.png";
import table_icon from "../assets/table-icon.png";
import calculator_icon from "../assets/calculator-icon.png";

function NavBarTest() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const handleLogoutButton = () => {
    logOutUser();
  };

  return (
    <nav>
      {isLoggedIn && (
        <div className="navbar bg-base-100" style={{ margin: "0" }}>
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to={"/GuestList"}>
                    <img
                      className="menu-icon"
                      src={guest_icon}
                      alt="Guest Icon"
                    />
                  </Link>
                </li>
                <li>
                  <Link to={"/VendorList"}>
                    <img
                      className="menu-icon"
                      src={vendor_icon}
                      alt="Vendor Icon"
                    />
                  </Link>
                </li>
                <li>
                  <Link to={"/BudgetCalculator"}>
                    <img
                      className="menu-icon"
                      src={calculator_icon}
                      alt="Calculator Icon"
                    />
                  </Link>
                </li>
                <li>
                  <Link to={"/SeatingPlanner"}>
                    <img
                      className="menu-icon"
                      src={table_icon}
                      alt="Table Icon"
                    />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="btn btn-ghost text-xl">
              <Link to={`/`}>
                <img src={home_icon} alt="Home Icon" className="home" />
              </Link>
            </div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to={"/GuestList"}>
                  <img
                    className="menu-icon"
                    src={guest_icon}
                    alt="Guest Icon"
                  />
                </Link>
              </li>
              <li>
                <Link to={"/VendorList"}>
                  <img
                    className="menu-icon"
                    src={vendor_icon}
                    alt="Vendor Icon"
                  />
                </Link>
              </li>
              <li>
                <Link to={"/BudgetCalculator"}>
                  <img
                    className="menu-icon"
                    src={calculator_icon}
                    alt="Calculator Icon"
                  />
                </Link>
              </li>
              <li>
                <Link to={"/SeatingPlanner"}>
                  <img
                    className="menu-icon"
                    src={table_icon}
                    alt="Table Icon"
                  />
                </Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <div className="btn" onClick={handleLogoutButton}>
              Logout
            </div>
          </div>
        </div>
      )}

      {!isLoggedIn && (
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to={"/signup"}> Sign Up</Link>
                </li>
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to={"/signup"}> Sign Up</Link>
              </li>
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end"></div>
        </div>
      )}
    </nav>
  );
}

export default NavBarTest;
