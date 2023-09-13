import React from "react"
import { BrowserRouter, Routes, Route, Link, Outlet, useOutletContext, NavLink, useNavigate, useSearchParams } from "react-router-dom"
import Footer from "/components/Footer"
import Browse from "./Browse"
import nextPageIcon from "/assets/next-page.svg"
import previousPageIcon from "/assets/previous-page.svg"
import { AddToWatchList, RemoveFromWatchlist } from "../components/AddToWatchlist"
import { auth } from "../firebase"
import YouTube from 'react-youtube';
import ReactPlayer from 'react-player/youtube';
import playIcon from "/icons/playIcon.png"


export default function HomePage() {

  const [buttonTimeout, setButtonTimeout] = React.useState(false)
  const [month, setMonth] = React.useState()


      const navigate = useNavigate()

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
  //to do:
  //each line should have a category above them to the left, and "see all (category)" navlink above them to the right that
  //can be clicked to get a list (kinda the way the homepage is now) where you can scroll down a little, before moving pages
  //Potential solution for future filters:
  //Create if else inside mapping to seperate categories and have a navlink that says "see all (category)"
  //for the respective movies
 

  
  const { searchText, watchlistMovie, watchlistStateChangeCounter, setWatchlistStateChangeCounter, setWatchlistMovie, page, setPage } = useOutletContext()
  const [searchParams, setSearchParams] = useSearchParams()
  const [movies, setMovies] = React.useState()
  const [moviesVideos, setMoviesVideos] = React.useState()
  const [movieGenre, setMovieGenre] = React.useState([])
  const [actors, setActors] = React.useState([])
  const [crew, setCrew] = React.useState([])
  const [movieCreationInfo, setMovieCreationInfo] = React.useState([])
  const movieParam = searchParams.get("movieId")

  

  

  React.useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDc4ODJlZjZkNWQzZTU2NDhmZmEyNGY5YTEzM2U5YSIsInN1YiI6IjY0ZTc2YWJjNTk0Yzk0MDExYzM1ZjVkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RDrTbC6bUeqcV0uB3d9_8Q1Tp9HPsMYn85BzGfSRhv4'
      }
    };

    if (searchParams.get("movieId")){
      fetch(`https://api.themoviedb.org/3/movie/${movieParam}?language=en-US&with_crew=AND`, options)
        .then(response => response.json())
        .then(data => setMovies(data))
        .then(err => console.error(err))

        fetch(`https://api.themoviedb.org/3/movie/${movieParam}/videos?language=en-US`, options)
        .then(response => response.json())
        .then(data => setMoviesVideos(data.results))
        .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/movie/${movieParam}/credits?language=en-US`, options)
        .then(response => response.json())
        .then(data => setMovieCreationInfo(data))
        .catch(err => console.error(err));
  }

  
  
    
  }, [])

  React.useEffect(() => {
    setActors(movieCreationInfo.cast)
    setCrew(movieCreationInfo.crew)
  }, [movieCreationInfo])
  

  let movieVideoTrailers = []
  if (moviesVideos) {
     moviesVideos.map(item => {
      if (item.type === "Trailer") {
        movieVideoTrailers.push(item.key)
      } else {
        return 
      }
    })
  }

  let actorsOfMovie = []
  let actorsOfMoviePicture = []
  let actorsOfMovieRole = []
  if (actors) {
    actors.map((item, index) => {
      if (index < 6) {
        actorsOfMovie.push(item.name)
        actorsOfMoviePicture.push(item.profile_path)
        actorsOfMovieRole.push(item.character)
      } else {
        return 
      }
    })
  }


  let crewOfMovie = []
  if (crew) {
     crew.map((item, index) => {
      let i = 0
      if (item.job === "Director" & i < 6) {
        crewOfMovie.push(item.name)
        i++
      } else {
        return 
      }
    })
  }
  const moviesResults = movies
  
  
  
  


  function addToWatchList(email, id) {
    let tempBool = true
    if (auth?.currentUser) {
      setButtonTimeout(true)
      setWatchlistStateChangeCounter(prev => prev += 1)
      setTimeout(() => setButtonTimeout(false), 700)
      watchlistMovie.map((item, index) => {
        if (item.userEmail === email & item.movieId === id) {
          tempBool = false
        } 
        if (watchlistMovie.length === index + 1 & item.id !== id) {
          if (tempBool) {
            AddToWatchList(email, id)
            
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
            tempBoolean = true
          } 
        })
      }
  } else {
    tempBoolean = false
  } 
   return tempBoolean
 }

   React.useEffect(() => {
    if (moviesResults) {
      setMovieGenre(moviesResults?.genres)
    }

    if (moviesResults) {
      switch (moviesResults?.release_date.split("-")[1].toString()) {
        
        case `01`: setMonth("January")
        break;
        case `02`: setMonth("February")
        break;
        case `03`: setMonth("March")
        break;
        case `04`: setMonth("April")
        break;
        case `05`: setMonth("May")
        break;
        case `06`: setMonth("June")
        break;
        case `07`: setMonth("July")
        break;
        case `08`: setMonth("August")
        break;
        case `09`: setMonth("September")
        break;
        case `10`: setMonth("October")
        break;
        case `11`: setMonth("November")
        break;
        case `12`: setMonth("December")
        break;
      }
    }
 
      
  }, [moviesResults])


   



  const genreElement = movieGenre.map((item, index) => {
    return (
        <h4 style={{marginBottom: "0", marginTop: "0", fontWeight: "400"}}>{item.name} {index + 1 === movieGenre.length ? "" : ","}</h4>
      )
   
    }
  )

  const actorsElement = actorsOfMovie.map((item, index) => {
    return (
      
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "center", flexDirection: "column", margin: "40px", padding: "0", }}>
        <h4 style={{display: "flex", flexWrap: "wrap", maxWidth: "200px",  marginBottom: "0", marginTop: "0", fontWeight: "400", justifyContent: "center"}}>
           <b style={{marginBottom: "20px"}}>{item}</b>
        </h4>
        <img src={`https://image.tmdb.org/t/p/original${actorsOfMoviePicture[index]}`} style={{height: "300px", marginTop: "0",}} />
        <h4 style={{display: "flex", flexWrap: "wrap", maxWidth: "200px",  marginBottom: "0", marginTop: "10px", fontWeight: "400", justifyContent: "center"}}>
        as {actorsOfMovieRole[index]}
        </h4>
      </div>
      )
   
    }
  )

  const crewElement = crewOfMovie.map((item, index) => {
    return (
        <h4 style={{display: "flex", marginBottom: "0", marginTop: "0", fontWeight: "400"}}>{item} {index + 1 === crewOfMovie.length ? "." : ","}</h4>
      )
   
    }
  )




  

  //<h1 style={{color: "white", marginLeft: "350px"}}>Popular movies</h1>
  if (movies){
  return (
    <div>

    
    
      <div className="home-page-div">
        
        <div className="homepage-div banner">
        <div 
        style={{backgroundImage: `${hover.hover && hover.index && hover.category === "trending" ? null : style}
        linear-gradient(to bottom, rgba(2,0,36,0) 0%, rgba(0,0,0,0.7500175070028011) 71%, rgba(5, 2, 15,0.9847514005602241) 90%),
    url(https://image.tmdb.org/t/p/original${moviesResults.backdrop_path})`, cursor: "auto"}}
        
        className="movie-element-homepage-banner-container">
          
        <div 
        
        
          
          className="movie-info-page"
          
            

          
          >
            <div>
            <button style={{maxWidth: "12vw", minWidth: "12vw"}}
            className={checkMovie(moviesResults.id) ? "active-div-watchlist-button remove" : "active-div-watchlist-button"}
                onClick={() => checkMovie(moviesResults.id) ? removeFromWatchlist(auth?.currentUser?.email, movieParam) : addToWatchList(auth?.currentUser?.email, movieParam)}
                disabled={buttonTimeout}>
                  {buttonTimeout ? "loading" : checkMovie(moviesResults.id) ? "Remove from watchlist" : "Add to watchlist"}
                </button>
              
              <h1 style={{display: "flex", gap: "20px", alignItems: "center", textAlign: "center" }}>{movies.title}</h1>
              <h4 style={{marginBottom: "0", marginTop: "0", fontWeight: "400"}}>{(movies.runtime/60).toString().split(".", 1)} hours {(parseInt((movies.runtime/60).toString().split(".")[1].slice(0, 1))/10*60).toString().slice(0, 3).split(".", 2).slice(0).shift()} minutes</h4>
              
              <div style={{display: "flex", gap: "10px", alignItems: "center",  marginBottom: "0px", marginTop: "0"}}>
                <h4>Genres:</h4>
                  {genreElement}
              </div>

              
              
              <h4 style={{paddingRight: "800px", marginTop: "0", fontWeight: "400"}}>{movies.overview}</h4>
              
                

              
              
            </div>
            <h1 style={{display: "flex", gap: "10px", marginBottom: "0", marginTop: "50px"}}>Trailers:</h1>

            
            <div style={{display: "flex", gap: "10px", marginBottom: "0", marginTop: "2"}} className="movie-info-page-videos">
            {movieVideoTrailers[0] && <ReactPlayer height="270" width="480" light playIcon={movieVideoTrailers[0] && <img src="/icons/playIcon.png" style={{maxHeight: "100px"}}/>}
            controls className="movie-info-page-embedded-youtube" url={`https://www.youtube.com/watch?v=${moviesVideos && movieVideoTrailers[0]}`} />}
            
            {movieVideoTrailers[1] && <ReactPlayer height="270" width="480" light playIcon={movieVideoTrailers[1] && <img src="/icons/playIcon.png" style={{maxHeight: "100px"}}/>}
            controls className="movie-info-page-embedded-youtube" url={`https://www.youtube.com/watch?v=${moviesVideos && movieVideoTrailers[1]}`} />}
            
            {movieVideoTrailers[2] && <ReactPlayer height="270" width="480" light playIcon={movieVideoTrailers[2] && <img src="/icons/playIcon.png" style={{maxHeight: "100px"}}/>}
            controls className="movie-info-page-embedded-youtube" url={`https://www.youtube.com/watch?v=${moviesVideos && movieVideoTrailers[2]}`} />}
          </div>

          <div style={{display: "flex", gap: "10px", marginBottom: "0", marginTop: "0"}}>
                <h4 style={{marginBottom: "0", marginTop: "0", fontWeight: "400"}}>Released:</h4>
                <h4 style={{marginBottom: "0", marginTop: "0", fontWeight: "400"}}>{month} {movies.release_date.split("-")[2]}, {movies.release_date.split("-").shift()}</h4>
              </div>
              <div style={{display: "flex", gap: "10px", marginBottom: "0", marginTop: "0", padding: "none"}}>
                <h4 style={{marginBottom: "0", marginTop: "0", fontWeight: "400"}}>Score:</h4>
                <h4 style={{marginBottom: "0", marginTop: "0", fontWeight: "400"}}>{movies.vote_average.toString().split(".").shift()} / 10</h4>
              </div>

          <div style={{display: "flex", flexWrap: "wrap", gap: "15px", alignItems: "center",  marginBottom: "20px", marginTop: "40px"}}>
                <h2>Actors:</h2>
                <div style={{display: "flex", flexWrap: "wrap", gap: "10px"}}>
                  {actorsElement}
                </div>
          </div>

          <div style={{display: "flex", flexWrap: "wrap", gap: "15px", alignItems: "center",  marginBottom: "20px", marginTop: "0"}}>
                <h4>Directors:</h4>
                <div style={{display: "flex", flexWrap: "wrap", gap: "10px"}}>
                  {crewElement}
                </div>
          </div>
            
        </div>
      </div>
    </div>

    
    
      </div>
      <Footer />
    </div>
    
  )

}
}