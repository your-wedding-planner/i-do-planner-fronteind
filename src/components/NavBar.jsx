import { Link } from "react-router-dom";
import guest_icon from "../assets/guest-icon.png";
import vendor_icon from "../assets/vendor-icon.png";

function NavBar(){
    if(window.location.href.includes("login") || window.location.href.includes("signup")) {
return null;
    } else {
        return  (
            <>
            <h1> This is the NavBar </h1>
            <Link to={`/GuestList`}>
            <img src={guest_icon} alt="Guest Icon" />
                Guest List</Link>
            <br></br>
            <Link to={`/VendorList`}>
            <img src={vendor_icon} alt="Vendor Icon" />
                Vendor List</Link>
            </>
            );
    }
    
    };
    
    export default NavBar;