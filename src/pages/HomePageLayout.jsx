import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, Outlet, useOutletContext } from "react-router-dom"
import circle from "/icons/circle.svg"
import filters from "/icons/filters.svg"
import messages from "/icons/messages.svg"
import bell from "/icons/bell.svg"
import logo from "/icons/logo.png"
import getMovies from "/api"
import {db} from "../firebase"
import {getDocs, collection} from "firebase/firestore"
import { auth } from "../firebase"
import { AddToWatchList } from "../components/AddToWatchlist"





export default function HomePageLayout() {
  const [topbar, setTopbar] = React.useState(false)

  const { movies, searchText, page, search, watchlistMovie, typeFilter, watchlistStateChangeCounter,trendingMovies, highRatingMovies, actionMovies, comedyMovies,
    setTrendingMovies, setHighRatingMovies, setActionMovies, setcomedyMovies,
   setWatchlistStateChangeCounter, setWatchlistMovie, setSearchText, setPage,  setMovies, setSearch }= useOutletContext()
  




  //username for the movie db is: anonymous225511
  

  

  const changeBackground = () => {
    
    if (window.scrollY > 80) {
      setTopbar(true)
    } else {
      setTopbar(false)
    }
  }

  

  function handleChange(e) {
    setSearchText(e.target.value)
    window.scrollTo({top: "0", transition: "ease-in-out 1s"})
  }

  window.addEventListener("scroll", changeBackground)

  return (
    <div className='homepage-div'>
      <div className={`homepage-top-layout ${topbar ? "active" : ""}`} style={{transition: "ease-in-out 1s"}} 
      >
        <div className='homepage-top-layout-logo-div'>
          <img src={logo} alt="" className="homepage-top-layout-logo"/>
        </div>
        
        <input name="search-bar" type="text" placeholder='Search movies, series, and ...' onChange={(e) => handleChange(e)} value={searchText} />
        <div className='homepage-top-layout-icons-div'>
          <div className='homepage-circle bell'>
          <img src={circle} alt=""/>
          <img src={bell} alt="" className='homepage-inner-image'/>
          </div>

          <div className='homepage-circle messages'>
          <img src={circle} alt=""/>
          <img src={messages} alt="" className='homepage-inner-image'/>
          </div>

          <div className='homepage-circle filters'>
          <img src={circle} alt=""/>
          <img src={filters} alt="" className='homepage-inner-image'/>
          </div>
        </div>
      </div>

      <Outlet 
      context={{ movies, searchText, page, search, watchlistMovie, typeFilter, watchlistStateChangeCounter,trendingMovies, highRatingMovies, actionMovies, comedyMovies,
        setTrendingMovies, setHighRatingMovies, setActionMovies, setcomedyMovies,
       setWatchlistStateChangeCounter, setWatchlistMovie, setSearchText, setPage,  setMovies, setSearch }}/>
    </div>
  )
}

