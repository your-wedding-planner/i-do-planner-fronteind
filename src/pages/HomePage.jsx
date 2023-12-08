import { Link } from "react-router-dom";
import guest_icon from "../assets/guest-icon.png";
import vendor_icon from "../assets/vendor-icon.png";
import CountDown from "../components/CountDown";
import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import axios from "axios"

function HomePage(){
    const [userDetails, setUserDetails] = useState({})
    const {user} = useContext(AuthContext)
    const {weddingDate} = user
    
    const dateToFormat = new Date(weddingDate)
    const options = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'}
    const formattedWeddingDate = dateToFormat.toLocaleDateString('en-US', options)
    
    return(
        <>
         
            <h1>I do Planner</h1>
            <div>
                <div>
                <h1>{user.name} & {user.namePartner}</h1>
                <h2>{formattedWeddingDate}</h2>
                <CountDown weddingDate={weddingDate}/>
                </div>
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
