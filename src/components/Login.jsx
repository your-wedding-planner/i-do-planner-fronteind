import { useContext, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import authService from "../services/auth.service"

const API_URL = "http://localhost:5005"

function Login(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)
  console.log(window.location)

    const navigate = useNavigate()

    const { storeToken, authenticateUser } = useContext(AuthContext)

    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        const requestBody = {email, password}

        axios
        .post(`${API_URL}/auth/login`, requestBody)
        //authService.login()
        .then((response) => {
            console.log("This is the JWT Token", response.data.authToken)
            storeToken(response.data.authToken)
            authenticateUser()
            navigate("/")
        })
        .catch((error) => {
            const errorDescription = error.response.data.message
            setErrorMessage(errorDescription)
        })

    }

  return (
    <div className="login">
        <h2>This is the Login</h2>
      <form className="login-form"
      onSubmit ={handleLoginSubmit}
      >
        
        <div>
          <label
            //htmlFor="email"
            className="label-login-email"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            // className
          />
          <label
            //htmlFor=""
            className="label-login-password"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            //className
          />
          <button type="submit" className="login-button">
            Log in
          </button>
        </div>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>Don't have an account yet?</p>
      <Link to={"/signup"}>Click here to create an account</Link>
    </div>
  );
}

export default Login