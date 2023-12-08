import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import authService from "../services/auth.service";

const API_URL = "http://localhost:5005"

function Signup(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [weddingDate, setWeddingDate] = useState(new Date())
    const [namePartner, setNamePartner] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    const navigate = useNavigate()

    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    const handleName = (e) => setName(e.target.value)
    const handleWeddingDate = (e) => setWeddingDate(e.target.value)
    const handleNamePartner = (e) => setNamePartner(e.target.value)

    const handleSignupSubmit = (e) => {
        e.preventDefault()

        const requestBody = {
            email, 
            password,
            name, 
            weddingDate,
            namePartner
        }
        console.log(requestBody)

        axios
        .post(`${API_URL}/auth/signup`, requestBody)
        .then((response) => {
          navigate("/login")
        })
        .catch((error) => {
          const errorDescription = error.response.data.message
          setErrorMessage(errorDescription)
        })

        // axios
        // .post(`${API_URL}/auth/signup`, requestBody)
        // //authService.signup()
        // .then((response) => {
        //     navigate("/login") 
        // })
        // .catch((error) => {
        //     const errorDescription = error.response.data.message
        //     setErrorMessage(errorDescription)
        // })
    }

    return (
<div className="card w-96 bg-base-100 shadow-xl">
      <form onSubmit={handleSignupSubmit}>
        <div className="card-body items-center text-center">
          <label className="card-actions">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />
          <label className="card-actions">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
          <label className="card-actions">Your first name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleName}
          />
          <label className="card-actions" for="isoDate">Date of your wedding</label>
          <input
            type="date"
            id="isoDate"
            name="weddingDate"
            value={weddingDate}
            onChange={handleWeddingDate}
          />
          <label className="card-actions">Name of your partner</label>
          <input
            type="text"
            name="namePartner"
            value={namePartner}
            onChange={handleNamePartner}
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
    )
}

export default Signup