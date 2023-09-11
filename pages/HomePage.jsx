import React from "react"
import { BrowserRouter, Routes, Route, Link, Outlet, useOutletContext, NavLink, useNavigate } from "react-router-dom"
import Footer from "/components/Footer"
import Browse from "./Browse"
import nextPageIcon from "/dist/assets/next-page.svg"
import previousPageIcon from "/dist/assets/previous-page.svg"
import { AddToWatchList, RemoveFromWatchlist } from "../components/AddToWatchlist"
import { auth } from "../firebase"

export default function HomePage() {


  const navigate = useNavigate()
  const [buttonTimeout, setButtonTimeout] = React.useState(false)

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
 

  
  const { movies,  searchText, watchlistMovie, watchlistStateChangeCounter, setWatchlistStateChangeCounter, setWatchlistMovie, page, setPage } = useOutletContext()
  const moviesResults = movies.results
  let moviesElement = "Loading..."
  let actionMovieElement = "Loading..."
  let highRatingMovieElements = "Loading..."
  let trendingMovieElement = "Loading..."
  let comedyMovieElement = "Loading..."
  let category = ""

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
  setWatchlistStateChangeCounter(prev => prev += 1)
        setTimeout(() => setWatchlistStateChangeCounter(prev => prev += 1), 500)
 }

   function handleReadMore(movieId) {
    navigate(`/browse/movies/about?movieId=${movieId}`)
   setSearchText("")
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
  
  if (moviesResults) {
    let movieCount = 0
    actionMovieElement = moviesResults.map((item, index) => {
      
      if (item.genre_ids.includes(28) && movieCount < 4) {
        movieCount++
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
                  category: "action"
                }
                )
              })
          }}
            style={{backgroundImage: `${hover.hover && hover.index === index && hover.category === "action" ? null : style}
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
  } else {
    return " "
  }
}
)
}

if (moviesResults) {
  let movieCount = 0
  trendingMovieElement = moviesResults.map((item, index) => {
    if (item.popularity > 2000 && movieCount < 1) {
      movieCount++
  return (
    <div 
    style={{backgroundImage: `${hover.hover && hover.index === index && hover.category === "trending" ? null : style}
    linear-gradient(to bottom, rgba(2,0,36,0) 0%, rgba(0,0,0,0.7500175070028011) 71%, rgba(5, 2, 15,0.9847514005602241) 90%),
url(https://image.tmdb.org/t/p/original${item.backdrop_path})`, cursor: "auto"}}
    className="movie-element-homepage-banner-container">
      
      <div 
      
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
        
        className="movie-element-homepage-banner"
        onMouseLeave={() => {
          setHover(prev => {
            return (
              {
                hover: false,
                index: index,
                category: "trending"
              }
              )
            })
        }}
         

        
        >
          <div>
            <h1 >{item.title}</h1>
            <h4>{item.release_date.split("-").shift()}</h4>
            <h4 style={{paddingRight: "500px", fontWeight: "400"}}>{item.overview} / 10</h4>
            
            
              <div style={{display: "flex"}}>
                <button className={checkMovie(item.id) ? "active-div-watchlist-button remove" : "active-div-watchlist-button"}
                style={{maxWidth: "5vw"}}
                onClick={() => checkMovie(item.id) ? removeFromWatchlist(auth?.currentUser?.email, item.id) : addToWatchList(auth?.currentUser?.email, item.id)}
                disabled={buttonTimeout}>
                  {buttonTimeout ? "loading" : checkMovie(item.id) ? "Remove from watchlist" : "Add to watchlist"}
                </button>
                <button className="active-div-watchlist-button"
                onClick={() => handleReadMore(item.id)}
                style={{width: "10vw", marginLeft: "20px", color: "black", backgroundColor: "#8797a6"}}>
                  Read more
                </button>
            </div>
          </div>
      </div>
    </div>
  )
} else {
  return " "
}
}
)
}

if (moviesResults) {
  let movieCount = 0
  highRatingMovieElements = moviesResults.map((item, index) => {
    
    if (item.vote_average > 7 && movieCount < 4) {
      movieCount++
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
                category: "high rating"
              }
              )
            })
        }}
          style={{backgroundImage: `${hover.hover && hover.index === index && hover.category === "high rating" ? null : style}
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
} else {
  return " "
}
}
)
}

if (moviesResults) {
  let movieCount = 0
  comedyMovieElement = moviesResults.map((item, index) => {
    
    if (item.genre_ids.includes(35) && movieCount < 4) {
      movieCount++
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
              index: index,
              category: "comedy"
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
                index: index
              }
              )
            })
        }}
          style={{backgroundImage: `${hover.hover && hover.index === index && category === "comedy" ? null : style}
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
} else {
  return " "
}
}
)
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




  

  //<h1 style={{color: "white", marginLeft: "350px"}}>Popular movies</h1>
  return (
    
    <div className="home-page-div">
      
      <div className="homepage-div banner">
        {moviesResults ? trendingMovieElement : "loading..."}
      </div>

      <div className="homepage-div-row one">
        <h2>What's new?</h2>
      </div>
      <div className="movie-homepage-elements-div-row one">
        {moviesResults ? highRatingMovieElements : "loading..."}
      </div>

      <div className="homepage-div-row two">
        <h2>Action movies:</h2>
      </div>
      <div className="movie-homepage-elements-div-row two">
        {moviesResults ? actionMovieElement : "loading..."}
      </div>

      <div className="homepage-div-row three">
        <h2>Comedy movies:</h2>
      </div>
      <div className="movie-homepage-elements-div-row three">
        {moviesResults ? comedyMovieElement : "loading..."}
      </div>
      <Footer />
    </div>
    
  )
}