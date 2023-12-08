import { Link } from "react-router-dom";
import guest_icon from "../assets/guest-icon.png";
import vendor_icon from "../assets/vendor-icon.png";
import CountDown from "../components/CountDown";
import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

function HomePage() {
  const [userDetails, setUserDetails] = useState({});
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
    <>
      <div>
        <div className="verticalcard lg:verticalcard-side bg-base-100 shadow-xl">
          <figure>
            {/* <img
              src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
              alt="Album"
            /> */}
          </figure>
          <div className="verticalcard-body">
            <h2 className="verticalcard-title">{user.name} & {user.namePartner}</h2>
            <p>{formattedWeddingDate}</p>
            <div className="verticalcard-actions justify-end">
            <CountDown weddingDate={weddingDate} />
            </div>
          </div>
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
