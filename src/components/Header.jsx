import { Link } from "react-router-dom";
import home_icon from "../assets/home-icon.png";

function Header() {
  if (
    window.location.href.includes("login") ||
    window.location.href.includes("signup")
  ) {
    return null;
  } else {
    return (
      <>
        <h1> This is the Header </h1>
        <Link to={`/`}>
          <img src={home_icon} alt="Home Icon" className="home"/>
        </Link>
      </>
    );
  }
}
export default Header;
