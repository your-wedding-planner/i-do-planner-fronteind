import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


function NavBar(){
    
        const {isLoggedIn, user } = useContext(AuthContext)
        return  (
            <nav>
                <Link to ="/">
                    Home
                </Link>

                {isLoggedIn && (
                    <>
                    <Link to={"/GuestList"}>Guest List</Link>
                    <br/>
                    <Link to={"/VendorList"}>Vendor List</Link>
                    </>
                )}

                {!isLoggedIn && (
                    <>
                    <Link to={"/signup"}> Sign Up</Link>
                    <Link to={"/login"}>Login</Link>
                    </>
                )}
            </nav>
            );
    }
    

    
    export default NavBar;