import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useOutletContext } from "react-router-dom"
import nextPageIcon from "/dist/assets/next-page.svg"
import previousPageIcon from "/dist/assets/previous-page.svg"
import Footer from "/components/Footer"
import { auth } from "../firebase"
import {db} from "../firebase"
import {getDocs, collection} from "firebase/firestore"
import { RemoveFromWatchlist } from "../components/AddToWatchlist"



export default function WatchlistPage( { children }) {
  const [watchlistMovieElement, setWatchlistMovieElement] = React.useState([])
  const { movies, searchText, page, watchlistMovie, watchlistStateChangeCounter, setWatchlistStateChangeCounter, setWatchlistMovie, setPage, currentUser, setCurrentUser  } = useOutletContext()
  const renderCount = React.useRef(0)


  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDc4ODJlZjZkNWQzZTU2NDhmZmEyNGY5YTEzM2U5YSIsInN1YiI6IjY0ZTc2YWJjNTk0Yzk0MDExYzM1ZjVkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RDrTbC6bUeqcV0uB3d9_8Q1Tp9HPsMYn85BzGfSRhv4'
    }
  };

  


  React.useEffect(() => {
    setWatchlistMovieElement([])
    
    if (renderCount.current > 0) {
      watchlistMovie.map(item => {
        if (`${item.userEmail}` === `${auth.currentUser.email}`) {
        fetch(`https://api.themoviedb.org/3/movie/${item.movieId}?language=en-US`, options)
        .then(response => response.json())
        .then(data => setWatchlistMovieElement(prev => ([
          ...prev,
          data,
        ])))
        .catch(err => console.error(err));
        }
        }
      )
    }
    renderCount.current += 1
    console.log(renderCount.current)
    

    
  }, [watchlistMovie, watchlistStateChangeCounter])




  
  

  
  
  

  const moviesResults = movies.results
  
  let moviesElement = "Loading..."


  function removeFromWatchlist(email, id) {
    
    watchlistMovie.map(item => {
     if (`${item.userEmail}` === `${email}` & `${item.movieId}` === `${id}`){
       RemoveFromWatchlist(item.id)
       setWatchlistStateChangeCounter(prev => prev += 1)
       setTimeout(() => setWatchlistStateChangeCounter(prev => prev += 1), 3000)
       console.log(watchlistStateChangeCounter)
     }
   }
 )
 
}
  

  function nextPage() {
    setPage(prev => prev + 1)
    window.scrollTo({top: "0", transition: "ease-in-out 1s"})
  }

  function prevPage() {
    if (page > 1) {
      setPage(prev => prev -1)
      window.scrollTo({top: "0", transition: "ease-in-out 1s"})
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

  /*
  fetch('https://api.themoviedb.org/3/movie/157336?language=en-US', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
  */



  console.log(watchlistMovieElement)

  if (watchlistMovieElement) {
    moviesElement = watchlistMovieElement.map((item, index) => {
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
          
          className="movie-element-div"
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
              <h1 >{item.title}</h1>
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
              <button className="active-div-watchlist-button remove"
              onClick={() => {
                removeFromWatchlist(auth?.currentUser?.email, item.id)
                setClick(prev => {
                  return (
                    {
                      click: !prev.click,
                      index: -1
                    }
                    )
                  })
              } }>Remove from watchlist</button>
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
          <h1 style={{marginLeft: "50vw", display: "flex", alignItems: "center", textAlign: "center", 
          color: "rgba(104, 190, 203, 1)"}}>My watchlist:</h1>
        <div className="movie-elements-search-elements">
          {watchlistMovieElement.length > 0 ? moviesElement : "Your watchlist is currently empty"}
        </div>

        <Footer/>
    </div>
  )
}