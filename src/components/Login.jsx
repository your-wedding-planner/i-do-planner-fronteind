import { useContext, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
//import authService from "../services/auth.service"

function Login(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    const navigate = useNavigate()

    const { storeToken, authenticateUser } = useContext(AuthContext)

    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        const requestBody = {email, password}

        axios
        .post(`${import.meta.env.VITE_API_URL}/auth/login`, requestBody)
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
    <div className="card w-96 bg-base-100 shadow-xl">
      <form onSubmit={handleLoginSubmit}>
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
          <div className="card-actions">
            <button type="submit" className="btn btn-primary">
              Log in
            </button>
          </div>
        </div>
      </form>
      <div className="items-center text-center">
        {errorMessage && <p>{errorMessage}</p>}
        <p>Don't have an account yet?</p>
        <Link to={"/signup"}>Click here to create an account</Link>
      </div>
    </div>
  );
}

export default Login