import React from 'react';
import ReactDOM from 'react-dom/client';
import {NavLink, Outlet } from "react-router-dom"
import browse from "/icons/browse.svg"
import discover from "/icons/discover.svg"
import home from "/icons/home.svg"
import settings from "/icons/settings.svg"
import logout from "/icons/logout.svg"
import watchlist from "/icons/watchlist.svg"

//potential fix for icons turning green on hover is to download a second svg for each icon with their color being blue,
//and then conditionally swap them rather than using the filter style in css

export default function SideBar() {

  const activeStyle = {
    
    color: "#00C2FF",
    filter: "invert(60%) sepia(700%) saturate(1000%) hue-rotate(157deg) brightness(100%) contrast(108%)"
  }
  return (
    <div className='sidebar-layout'>
      <div className='sidebar-main-div'>
        <div>
          <div className='sidebar-sub-div menu'>
            <h3 style={{marginLeft: "20px"}}>Menu</h3>
          </div>
          
          <NavLink className='sidebar-sub-div home'
          to="."
          end
          style={({isActive}) => isActive ? activeStyle : null}>
            <img src={home} alt="" />
            <h3 style={{marginLeft: "20px"}}>Home</h3>
          </NavLink>

          <NavLink className='sidebar-sub-div browse'
          to="browse"
          style={({isActive}) => isActive ? activeStyle : null}>
            <img src={browse} alt="" />
            <h3 style={{marginLeft: "20px"}}>Browse</h3>
          </NavLink>
          <NavLink className='sidebar-sub-div discover'
          to="discover"
          style={({isActive}) => isActive ? activeStyle : null}>
            <img src={discover} alt="" />
            <h3 style={{marginLeft: "20px"}}>Discover</h3>
          </NavLink>
        </div>

        <div>
        <hr style={{width: "90%"}}/>
          <div className='sidebar-sub-div personal'>
            <h3 style={{marginLeft: "20px"}}>Personal</h3>
          </div>
          
          <NavLink className='sidebar-sub-div watchlist'
          to="watchlist"
          style={({isActive}) => isActive ? activeStyle : null}>
            <img src={watchlist} alt="" />
            <h3 style={{marginLeft: "20px"}}>Watchlist</h3>
          </NavLink>
          <NavLink className='sidebar-sub-div settings'
          to="settings"
          style={({isActive}) => isActive ? activeStyle : null}>
            <img src={settings} alt="" />
            <h3 style={{marginLeft: "20px"}}>Settings</h3>
          </NavLink>
          <NavLink className='sidebar-sub-div logout'
          to="">
            <img src={logout} alt="" />
            <h3 style={{marginLeft: "20px"}}>Log out</h3>
          </NavLink>
        </div>
      </div>
      <Outlet /> 
    </div>
    )
}