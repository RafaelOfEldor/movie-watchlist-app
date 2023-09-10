import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useOutletContext, useNavigate, NavLink, useSearchParams } from "react-router-dom"
import nextPageIcon from "/dist/assets/next-page.svg"
import previousPageIcon from "/dist/assets/previous-page.svg"
import Footer from "/components/Footer"
import { AddToWatchList, RemoveFromWatchlist } from "../components/AddToWatchlist"
import { auth } from "../firebase"



export default function Browse( { children }) {

  const { movies,  searchText, setSearchText, watchlistMovie, watchlistStateChangeCounter, setWatchlistStateChangeCounter, setWatchlistMovie, page, setPage } = useOutletContext()
  const [searchParams, setSearchParams] = useSearchParams()
  const [watchlistButtonState, setWatchlistButtonState] = React.useState("")
  const [tempBooleanState, setTempBooleanState] = React.useState(false)
  const [buttonTimeout, setButtonTimeout] = React.useState(false)
  const navigate = useNavigate()
  const moviesResults = movies.results
  const typeFilter = searchParams.get("type")
  let moviesElement = "Loading..."

  const activeStyle = {
    
      height: "7vh",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "10px 10px",
      minWidth: "10vw",
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: "#00C2FF",
      backgroundColor: "rgb(52, 20, 112)",
      borderRadius: "10px",
      transition: "ease-in-out 0.01s",
      cursor: "pointer"
  }


  
  
  
  function nextPage() {
    setPage(prev => prev + 1)
    window.scrollTo({top: 0, left: 0, behavior: "smooth"})
  }

  function prevPage() {
    if (page > 1) {
      setPage(prev => prev -1)
      window.scrollTo({top: 0, left: 0, behavior: "smooth"})
    }
  }

  const [click, setClick] = React.useState({
    click: false,
    index: -1
  })

  const [hover, setHover] = React.useState({
    hover: false,
    index: -1,
    category: ""
  })

  const style = `linear-gradient(to bottom, rgba(2,0,36, 0.001) 0%,  rgba(0,0,0,0.1) 61%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.9) 100%),` 
  const navLinksStyle = {
    color: "green"
  }

  function addToWatchList(email, id) {
    let tempBool = true
    if (auth?.currentUser) {
      setButtonTimeout(true)
      setWatchlistStateChangeCounter(prev => prev += 1)
      setTimeout(() => setButtonTimeout(false), 700)
      watchlistMovie.map((item, index) => {
        if (item.userEmail === email & item.movieId === id) {
          tempBool = false
        } else if (watchlistMovie.length === index + 1 & item.id !== id) {
          if (tempBool) {
            console.log(email)
            console.log(item.userEmail)
            console.log(item.movieId)
            console.log(id)
            console.log(watchlistMovie.length)
            console.log(index + 1)
            AddToWatchList(email, id)
            console.log(watchlistStateChangeCounter)
            
            setTimeout(() => setWatchlistStateChangeCounter(prev => prev += 1), 500)
          }
        }
      })
    } else {
      navigate("/login")
    }
   }

    function removeFromWatchlist(email, id) {
    
     watchlistMovie.map(item => {
      if (`${item.userEmail}` === `${email}` & `${item.movieId}` === `${id}`){
        setButtonTimeout(true)
        setTimeout(() => setButtonTimeout(false), 700)
        RemoveFromWatchlist(item.id)
        setWatchlistStateChangeCounter(prev => prev += 1)
        setTimeout(() => setWatchlistStateChangeCounter(prev => prev += 1), 500)
        console.log(watchlistStateChangeCounter)
      }
      
      
    }
  )
  
}

  function checkMovie(movieId) {
    let tempBoolean = false
    if (auth?.currentUser) {
        if (watchlistMovie.length > 0) {
          watchlistMovie.map(item => {
            if (item.movieId === movieId & item.userEmail === auth?.currentUser.email) {
              console.log("yurr")
              tempBoolean = true
            } 
          })
        }
    } else {
      tempBoolean = false
    } 
     return tempBoolean
   }
 

   function handleReadMore(movieId) {
     navigate(`/browse/movies/about?movieId=${movieId}`)
    setSearchText("")
   }
   
  if (moviesResults) {
    moviesElement = moviesResults.map((item, index) => {
    return (
      <div>
        <div 
        onClick={() => {
          setClick(prev => {
            return (
              {
                click: !prev.click,
                index: index
              }
              )
            })
          }}
        onMouseOver={() => {
          setHover(prev => {
            return (
              {
                hover: true,
                index: index
              }
              )
            })
        }}
          
          className="movie-element-div browse"
          onMouseLeave={() => {
            setHover(prev => {
              return (
                {
                  hover: false,
                  index: index,
                }
                )
              })
          }}
            style={{backgroundImage: `${hover.hover && hover.index === index? null : style}
            url(https://image.tmdb.org/t/p/original${item.poster_path})`}}
  
          
          >
            <div>
              <h3>{item.title}</h3>
              <h3>{item.vote_average} / 10</h3>
            </div>
        </div>
        {click.click && click.index === index && 
        <div className="movie-element-active-div" style={{
        backgroundImage:
        `linear-gradient(to bottom, rgba(2,0,36,0) 0%, rgba(0,0,0,0.9500175070028011) 61%, rgba(0,0,0,0.7847514005602241) 100%),
        url(https://image.tmdb.org/t/p/original${item.backdrop_path})`}}>
          <button onClick={() => {
            setClick(prev => {
              return (
                {
                  click: !prev.click,
                  index: -1
                }
                )
              })
          }}className="active-div-back-button"
          > {`<-`} Go back</button>
  
          <div className="active-div-title-div">
            <h1>{item.title}</h1>
            <div style={{margin: "0"}}>
            <h3>{item.vote_average} / 10</h3>
            <h4>({item.release_date.split("-").shift()})</h4>
            </div>
  
            <div className="active-div-info-div">
              
              <div style={{display: "flex"}}>
                <button className={checkMovie(item.id) ? "active-div-watchlist-button remove" : "active-div-watchlist-button"}
                onClick={() => checkMovie(item.id) ? removeFromWatchlist(auth?.currentUser?.email, item.id) : addToWatchList(auth?.currentUser?.email, item.id)}
                disabled={buttonTimeout}>
                  {buttonTimeout ? "loading" : checkMovie(item.id) ? "Remove from watchlist" : "Add to watchlist"}
                </button>
                <button className="active-div-watchlist-button"
                style={{width: "10vw", marginLeft: "20px", color: "black", backgroundColor: "#8797a6"}}
                onClick={() => handleReadMore(item.id)}
                disabled={buttonTimeout}>Read more</button>
              </div>
              
              
              <h3>{item.overview}</h3>
            </div>
          </div>
            
          
        </div>
        }
      </div>
    )
  
  })}


  



  return (
    <div className="movie-elements-search-div">
          <div className='browse-categories-cards'>
            <NavLink className='category-card-div'
            to="."
            style={typeFilter ? null : activeStyle}
            
            >All</NavLink>

            <NavLink className='category-card-div'
            onClick={() => setSearchText("")}
            style={typeFilter === "action" ? activeStyle : null}
            to={`?type=action`}
            >Action</NavLink>

            <NavLink className='category-card-div'
            onClick={() => setSearchText("")}
            style={typeFilter === "trending" ? activeStyle : null}
            to={`?type=trending`}
            >Trending</NavLink>

            <NavLink className='category-card-div'
            onClick={() => setSearchText("")}
            style={typeFilter === "comedy" ? activeStyle : null}
            to={`?type=comedy`}
            >Comedy</NavLink>

            <NavLink className='category-card-div'
            onClick={() => setSearchText("")}
            style={typeFilter === "fantasy" ? activeStyle : null}
            to={`?type=fantasy`}
            >Fantasy</NavLink>

            <NavLink className='category-card-div'
            onClick={() => setSearchText("")}
            style={typeFilter === "animation" ? activeStyle : null}
            to={`?type=animation`}
            >Animation</NavLink>

            <NavLink className='category-card-div'
            onClick={() => setSearchText("")}
            style={typeFilter === "mystery" ? activeStyle : null}
            to={`?type=mystery`}
            >Mystery</NavLink>

            <NavLink className='category-card-div'
            onClick={() => setSearchText("")}
            style={typeFilter === "thriller" ? activeStyle : null}
            to={`?type=thriller`}
            >Thriller</NavLink>

            <NavLink className='category-card-div'
            onClick={() => setSearchText("")}
            style={typeFilter === "romance" ? activeStyle : null}
            to={`?type=romance`}
            >Romance</NavLink>

            <NavLink className='category-card-div'
            onClick={() => setSearchText("")}
            style={typeFilter === "drama" ? activeStyle : null}
            to={`?type=drama`}
            >Drama</NavLink>

            <NavLink className='category-card-div'
            onClick={() => setSearchText("")}
            style={typeFilter === "adventure" ? activeStyle : null}
            to={`?type=adventure`}
            >Adventure</NavLink>

          </div>
          <h1 style={{marginLeft: "280px", marginTop: "50px", color: "white"}}>{searchText ? `Search results for: ${searchText}` : `Browse ${typeFilter !== null ? typeFilter : "all"} movies:`}</h1>
        <div className="movie-elements-div browse">
          {moviesElement}
        </div>

        <div className="page-buttons-div">
          <img src={`${previousPageIcon}`} onClick={prevPage} />
          <h3>{page}</h3>
          <img src={`${nextPageIcon}`} onClick={nextPage}/>
        </div>
      

        <Footer/>
    </div>
  )
}