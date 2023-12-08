import { Link } from "react-router-dom";
import guest_icon from "../assets/guest-icon.png";
import vendor_icon from "../assets/vendor-icon.png";
import CountDown from "../components/CountDown";
import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

function HomePage(){
    const [userDetails, setUserDetails] = useState({})
    //const [weddingDate, setWeddingDate] = useState(new Date())
    const {user} = useContext(AuthContext)
    const {weddingDate} = user
    console.log(weddingDate)


    return(
        <>
         
            <h1>I do Planner</h1>
            <div>
                <CountDown weddingDate={weddingDate}/>
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
