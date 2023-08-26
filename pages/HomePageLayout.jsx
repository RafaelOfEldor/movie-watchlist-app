import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, Outlet, useOutletContext } from "react-router-dom"
import circle from "/icons/circle.svg"
import filters from "/icons/filters.svg"
import messages from "/icons/messages.svg"
import bell from "/icons/bell.svg"
import logo from "/icons/logo.png"
import getMovies from "/api"




export default function HomePageLayout() {

  const [movies, setMovies] = React.useState([])
  const [topbar, setTopbar] = React.useState(false)
  const [search, setSearch] = React.useState(false)
  const [searchText, setSearchText] = React.useState("")

  React.useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDc4ODJlZjZkNWQzZTU2NDhmZmEyNGY5YTEzM2U5YSIsInN1YiI6IjY0ZTc2YWJjNTk0Yzk0MDExYzM1ZjVkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RDrTbC6bUeqcV0uB3d9_8Q1Tp9HPsMYn85BzGfSRhv4'
      }
    };

    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(err => console.error(err));
      
  }, [])

  const changeBackground = () => {
    console.log(window.scrollY)
    if (window.scrollY > 80) {
      setTopbar(true)
    } else {
      setTopbar(false)
    }
  }

  

  function handleChange(e) {
    setSearchText(e.target.value)
    console.log(searchText)
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
        
        <input name="search-bar"type="text" placeholder='Search movies, series, and ...' onChange={(e) => handleChange(e)} value={searchText} />
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

      <Outlet context={{ movies, searchText }}/>
    </div>
  )
}

