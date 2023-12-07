import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import guest_icon from "../assets/guest-icon.png";
import vendor_icon from "../assets/vendor-icon.png";

function NavBar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const handleLogoutButton = () => {
    logOutUser();
  };

  return (
    <nav>
      {isLoggedIn && (
        <>
          <Link to="/">Home</Link>
          <Link to={"/GuestList"}>
            <img src={guest_icon} alt="Guest Icon" />
            Guest List
          </Link>
          <br />
          <Link to={"/VendorList"}>
            <img src={vendor_icon} alt="Vendor Icon" />
            Vendor List
          </Link>
          <button onClick={handleLogoutButton}>Logout</button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to={"/signup"}> Sign Up</Link>
          <Link to={"/login"}>Login</Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;
