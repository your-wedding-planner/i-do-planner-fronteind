import { Link } from "react-router-dom";

function Header(){
return  (
    <>
    <h1> This is the Header </h1>
    <Link to={`/`}>Home</Link>
    </>
    );
    };

export default Header;