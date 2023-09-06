import React, { useContext } from "react"
import {useNavigate, useLocation, NavLink, useOutletContext} from "react-router-dom"
import { signInWithPopup } from "firebase/auth"
import { auth, login, setUser, googleProvider } from "../firebase"
import googleIcon from "../icons/google.svg"

export default function LoginPage() {
  const location = useLocation()
  console.log(location)
  //const [currentUser,  setCurrentUser, login] = useOutletContext()
  const [loading, setLoading] = React.useState(false)
  const {currentUser, setCurrentUser} = useOutletContext()
  
 
  const navigate = useNavigate()
 


  //login page not nice right now, this design right here could provide inspirational:
  //https://colorlib.com/etc/lf/Login_v4/index.html

  //IT WORKS!!!!!! THE FUNCTION BELOW \/\/\/ IT FUCKIN WOOORKS!!!!
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setLoading(true)
      await login(auth, e.target.email.value, e.target.password.value)
      navigate(location.state?.intendedPath ? `${"/" + location.state.intendedPath}` : "/", {replace: true})
    } catch (error) {
      
      console.log(error)
    }
    setLoading(false)
    
  }

  async function signInWithGoogle() {
    try {
      setLoading(true)
      await signInWithPopup(auth, googleProvider)
      navigate(location.state.intendedPath ? `${"/" + location.state.intendedPath}` : "/", {replace: true})
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  

  return (
    <div className="login-form-page">
      
      <div className="login-form-div">
        <h1>{location.state?.message}</h1>
        <h1 style={{color: "purple", marginTop: "7vh"}}>Sign into your account</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          
          <input placeholder="Email address" name="email" />
          
          <input placeholder="Password" name="password"/>
          
          <button disabled={loading}>{loading ? `signing up...` : `Sign up`}</button>
        </form>

        <h3 style={{color: "white"}}>Dont have an account? 
          <NavLink to="/signup" style={{textDecoration: "underline"}}
          state={{intendedPath: location.state?.intendedPath}}> Signup </NavLink>
          here
        </h3>
        <div style={{display: "flex", color: "white"}}>
          <h3>Or sign in with google</h3>
          <img src={googleIcon} style={{marginLeft: "10px", cursor: "pointer"}} onClick={signInWithGoogle}/>
        </div>
      </div>
    </div>
  )
  
}
