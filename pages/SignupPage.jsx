import React, { useRef, useContext } from "react"
import {useNavigate, useLocation, useOutletContext, NavLink } from "react-router-dom"
import { signInWithPopup } from "firebase/auth"
import { auth, signup, setUser, googleProvider } from "../firebase"
import googleIcon from "../icons/google.svg"

export default function LoginPage() {
  const location = useLocation()
  const {currentUser, setCurrentUser} = useOutletContext()
  const navigate = useNavigate()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [responseMessage, setResponseMessage] = React.useState("")
  const [loading, setLoading] = React.useState(false)


  //login page not nice right now, this design right here could provide inspirational:
  //https://colorlib.com/etc/lf/Login_v4/index.html
  
    async function handleSubmit(e) {
      e.preventDefault()
      if (e.target.password.value === e.target.confirmPassword.value & e.target.password.value !== "") {

        try {
          setLoading(true)
          await signup(auth, e.target.email.value, e.target.password.value)
          navigate(location.state.intendedPath ? `${"/" + location.state.intendedPath}` : "/", {replace: true})
        } catch (error) {
          console.log(error)
        }
        setLoading(false)
      } else {
        if (e.target.email.value === "" | e.target.password.value === "" | e.target.confirmPassword.value=== "") {
          setResponseMessage("all fields must be filled!")
        } else {
          setResponseMessage("passwords do not match!")
        }
      }

      //navigate("/watchlist")
      
      
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

    React.useEffect(() => {
      const unsubscribe = setUser(auth, user => {
        setCurrentUser(user)
      })

      return unsubscribe
    }, [])
      

  return (
    <div className="login-form-page">
      
      <div className="login-form-div">
        <h1>{location.state?.message}</h1>
        {responseMessage && <h2 style={{margin: "0"}}>{responseMessage}</h2>}
        <h1 style={{color: "purple", marginTop: "7vh"}}>Create your account</h1>
        <form onSubmit={handleSubmit}>
          
          <input placeholder="Email address" ref={emailRef} name="email"/>
          
          <input placeholder="Password" ref={passwordRef} type="password" name="password"/>

          <input placeholder="Confirm assword" ref={passwordConfirmRef} type="password" name="confirmPassword"/>
          
          <button disabled={loading}> {loading ? `signing up...` : `Sign up`} </button>
        </form>
        <div style={{display: "flex", color: "white"}}>
          <h3>Or sign in with google</h3>
          <img src={googleIcon} style={{marginLeft: "10px", cursor: "pointer", maxHeight: "50px", maxWidth: "50px", margin: "0", borderRadius: "50px"}} onClick={signInWithGoogle}/>
        </div>
      </div>
    </div>
  )
  
}
