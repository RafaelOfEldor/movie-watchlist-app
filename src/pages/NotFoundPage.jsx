import React from "react"
import {NavLink } from "react-router-dom"


export default function NotFOundPage() {
  
  return (
    <div style={{color: "white"}}>
      <NavLink to="/" style={{position: "absolute", top: "50", left: "300"}}><h1>{`<- Return to homepage`}</h1></NavLink>
      <div style={{marginTop: "50vh", marginLeft: "50vw", transform: "translate(-50%, -50%)", textAlign: "center"}}>
        <h1 style={{fontSize: "4rem"}}>page not found</h1>
      </div>
    </div>
  )
}