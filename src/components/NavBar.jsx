import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import guest_icon from "../assets/guest-icon.png";
import vendor_icon from "../assets/vendor-icon.png";

function NavBar() {
  const { isLoggedIn, user } = useContext(AuthContext);
  return (
    <nav>
      <Link to="/">Home</Link>

      {isLoggedIn && (
        <>
          <Link to={"/GuestList"}>
            <img src={guest_icon} alt="Guest Icon" />
            Guest List
          </Link>
          <br />
          <Link to={"/VendorList"}>
            <img src={vendor_icon} alt="Vendor Icon" />
            Vendor List
          </Link>
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
