import { Link } from "react-router-dom";
import home_icon from "../assets/home-icon.png";
import i_do_planner_cover_logo from "../assets/i-do-planner-cover-logo.png";

function Header() {
  // if (
  //   window.location.href.includes("login") ||
  //   window.location.href.includes("signup")
  // ) {
  //   return null;
  // } else {
  return (
    <div className="bg-base-100">
      <Link to={`/`}>
        <img
          className="cover-logo"
          src={i_do_planner_cover_logo}
          alt="I do planner cover icon"
        />
      </Link>
    </div>
  );
}
export default Header;
