import { Link } from "react-router-dom";
import guest_icon from "../assets/guest-icon.png";
import vendor_icon from "../assets/vendor-icon.png";

function HomePage(){
    return(
        <>
         
            <h1>I do Planner</h1>
            <div>
                <Link to={`/GuestList`}>
                    <img src={guest_icon} alt="Guest Icon" />
                    Guest List
                </Link>
                <br />
                <Link to={`/VendorList`}>
                <img src={vendor_icon} alt="Vendor Icon" />
                Vendor List
                </Link>
            </div>
        </>
    );
}

export default HomePage;
