import { Link } from "react-router-dom";
import guest_icon from "../assets/guest-icon.png"; 
function HomePage(){
    return(
        <>
            <h1>I do Planner</h1>
            <div>
                <Link to={`/GuestList`}>
                    <img src={guest_icon} alt="Guest Icon" />
                    Guest Icon
                </Link>
                <br />
                <Link to={`/VendorList`}>Vendor List</Link>
            </div>
        </>
    );
}

export default HomePage;
