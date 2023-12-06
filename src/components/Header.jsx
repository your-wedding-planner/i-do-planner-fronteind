import { Link } from "react-router-dom";

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
        <Link to={`/`}>Home</Link>
      </>
    );
  }
}
export default Header;
