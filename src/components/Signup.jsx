import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import authService from "../services/auth.service";

function Signup(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [weddingDate, setWeddingDate] = useState(new Date())
    const [namePartner, setNamePartner] = useState("")
    const [weddingBudget, setWeddingBudget] = useState(0)
    const [errorMessage, setErrorMessage] = useState(undefined)

    const navigate = useNavigate()

    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    const handleName = (e) => setName(e.target.value)
    const handleWeddingDate = (e) => setWeddingDate(e.target.value)
    const handleNamePartner = (e) => setNamePartner(e.target.value)
    const handleWeddingBudget = (e) => setWeddingBudget(e.target.value)

    const handleSignupSubmit = (e) => {
        e.preventDefault()

        const requestBody = {
            email, 
            password,
            name, 
            weddingDate,
            namePartner, 
            weddingBudget
        }
        console.log(requestBody)

        axios
        .post(`${import.meta.env.VITE_API_URL}/auth/signup`, requestBody)
        .then((response) => {
          navigate("/login")
        })
        .catch((error) => {
          const errorDescription = error.response.data.message
          setErrorMessage(errorDescription)
        })
    }

    return (
      <div className="container">

<div className="signup">
      <img src="../assets/background-signup.jpeg" alt="couple" />
      <form onSubmit={handleSignupSubmit} className="signup-container">
          <label className="card-actions">Email
          <input
            type="email"
            name="email"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            required={true}
            value={email}
            onChange={handleEmail}
          />
          </label>
          <label className="card-actions">Password
          <input
            type="password"
            name="password"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            required={true}
            value={password}
            onChange={handlePassword}
          />
          </label>
          <label className="card-actions">Your first name
          <input
            type="text"
            name="name"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            required={true}
            value={name}
            onChange={handleName}
          />
          </label>
          <label className="card-actions" for="isoDate">Date of your wedding
          <input
            type="date"
            id="isoDate"
            name="weddingDate"
            className="input input-bordered w-full max-w-xs"
            required={true}
            value={weddingDate}
            onChange={handleWeddingDate}
          />
          </label>
          <label className="card-actions">Name of your partner
          <input
            type="text"
            name="namePartner"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            required={true}
            value={namePartner}
            onChange={handleNamePartner}
          />
          </label>
          <label className="card-actions">Wedding Budget
          <input
            type="number"
            name="weddingBudget"
            min="0"
            className="input input-bordered w-full max-w-xs"
            required={true}
            value={weddingBudget}
            onChange={handleWeddingBudget}
          />
          </label>
          <div className="signup-btn-link">
            <button type="submit" className="btn btn-primary">
              Sign up
            </button>
        {errorMessage && <p>{errorMessage}</p>}
        <p>Do you already have an account?</p>
        <Link to={"/signup"}>Click here to login</Link>
      
      </div>
        
      </form>
      </div>
      
    </div>
    
    )
}

export default Signup