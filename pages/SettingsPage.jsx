import React from "react"
import {NavLink } from "react-router-dom"


export default function SettingsPage() {
  
  return (
    <div style={{color: "white"}}>
      <div style={{marginTop: "30vh", marginBottom: "15vh", marginLeft: "50vw", transform: "translate(-50%, -50%)", textAlign: "center"}}>
        <h1 style={{fontSize: "2rem"}}>Currently no settings for you to play with {`:(`}</h1>
        <h1 style={{fontSize: "4rem"}}>Potential future updates for settings and this app:</h1>
      </div>
      <div style={{marginLeft: "50vw", transform: "translate(-50%, -50%)", textAlign: "start", fontSize: "1.5rem", gap: "50px"}}>
          <ul>
            <li style={{marginBottom: "10px"}}>Different color themes to chose from</li>
            <li style={{marginBottom: "10px"}}>Ability to create different watchlists with their own names and descriptions</li>
            <li style={{marginBottom: "10px"}}>Various account settings including the ability to change which email you want to use without losing your associated watchlist{`(s)`}</li>
            <li style={{marginBottom: "10px"}}>Choosing a nickname instead of having your email displayed top-left</li>
            <li style={{marginBottom: "10px"}}>ability to send your watchlists to another user</li>
            <li style={{marginBottom: "10px"}}>small chat feature because why not</li>
            <li style={{marginBottom: "10px"}}>Various accesibility features </li>
          </ul>
        </div>
    </div>
  )
}