import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

const API_URL = "http://localhost:5005"

function Signup(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [weddingDate, setWeddingDate] = useState(new Date())
    const [namePartner, setNameParter] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)
    //const [guestList, setGuestList] = useState([])
    //const [vendorList, setVendorList] = useState([])

    const navigate = useNavigate()

    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    const handleName = (e) => setName(e.target.value)
    const handleWeddingDate = (e) => setWeddingDate(e.target.value)
    const hanleNamePartner = (e) => setNameParter(e.target.value)

    const handleSignupSubmit = (e) => {
        e.preventDefault()

        const requestBody = {
            email, 
            password,
            name, 
            weddingDate,
            namePartner
        }

        axios
        .post(`${API_URL}/auth/signup`, requestBody)
        //authService.signup()
        .then((response) => {
            navigate("/login") 
        })
        .catch((error) => {
            const errorDescription = error.response.data.message
            setErrorMessage(errorDescription)
        })
    }

    return (
      <div className="signup">
        <h2>This is the Signup</h2>
        <form className="signup-form" onSubmit={handleSignupSubmit}>
          <div>
            <label>Email</label>
            <input 
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            />

            <label>Password</label>
            <input 
            type="password" 
            name="password"
            value={password}
            onChange={handlePassword}
            />

            <label>Name</label>
            <input 
            type="text" 
            name="name"
            value={name}
            onChange={handleName}
            />

            <label>Date of wedding</label>
            <input 
            type="date"
            name="weddingDate"
            value={weddingDate}
            onChange={handleWeddingDate}
             />

            <label>Name of partner</label>
             <input 
             type="text"
             name="namePartner"
             value={namePartner}
             onChange={hanleNamePartner}
              />

              <button type="submit" className="signup-button">
                Sign up
              </button>
          </div>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>Do you already have an account</p>
        <Link to={"/login"}>Click here to go to login</Link>
      </div>
    );

}

export default Signup