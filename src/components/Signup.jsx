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
<div className="card w-96 bg-base-100 shadow-xl">
      <form onSubmit={handleSignupSubmit}>
        <div className="card-body items-center text-center">
          <label className="card-actions">Email</label>
          <input
            type="email"
            name="email"
            required={true}
            value={email}
            onChange={handleEmail}
          />
          <label className="card-actions">Password</label>
          <input
            type="password"
            name="password"
            required={true}
            value={password}
            onChange={handlePassword}
          />
          <label className="card-actions">Your first name</label>
          <input
            type="text"
            name="name"
            required={true}
            value={name}
            onChange={handleName}
          />
          <label className="card-actions" for="isoDate">Date of your wedding</label>
          <input
            type="date"
            id="isoDate"
            name="weddingDate"
            required={true}
            value={weddingDate}
            onChange={handleWeddingDate}
          />
          <label className="card-actions">Name of your partner</label>
          <input
            type="text"
            name="namePartner"
            required={true}
            value={namePartner}
            onChange={handleNamePartner}
          />
          <label className="card-actions">Wedding Budget</label>
          <input
            type="number"
            name="weddingBudget"
            required={true}
            value={weddingBudget}
            onChange={handleWeddingBudget}
          />
          <div className="card-actions">
            <button type="submit" className="btn btn-primary">
              Sign up
            </button>
          </div>
        </div>
      </form>
      <div className="items-center text-center">
        {errorMessage && <p>{errorMessage}</p>}
        <p>Do you already have an account?</p>
        <Link to={"/signup"}>Click here to login</Link>
      </div>
    </div>
    </div>
    )
}

export default Signup