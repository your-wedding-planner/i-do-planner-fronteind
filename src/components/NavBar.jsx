import { Link } from "react-router-dom";

function NavBar(){
    return  (
    <>
    <h1> This is the NavBar </h1>
    <Link to={`/GuestList`}>Guest List</Link>
    <br></br>
    <Link to={`/VendorList`}>Vendor List</Link>
    </>
    );
    };
    
    export default NavBar;