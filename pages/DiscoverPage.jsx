import React from "react"
import { BrowserRouter, Routes, Route, Link, Outlet, useOutletContext, NavLink, useSearchParams, useNavigate } from "react-router-dom"
import Footer from "/components/Footer"
import Browse from "./Browse"
import nextPageIcon from "/assets/next-page.svg"
import previousPageIcon from "/assets/previous-page.svg"
import carouselLeft from "/icons/carousel-arrow-left.png"
import carouselRight from "/icons/carousel-arrow-right.png"
import { AddToWatchList, RemoveFromWatchlist } from "../components/AddToWatchlist"
import { auth } from "../firebase"

export default function DiscoverPage() {

  const [buttonTimeout, setButtonTimeout] = React.useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const trendingRef = React.useRef(null)
  const highRatingRef = React.useRef(null)
  const actionRef = React.useRef(null)
  const comedyRef = React.useRef(null)
  const navigate = useNavigate()


  const [clickTrending, setClickTrending] = React.useState({
    click: false,
    index: -1
  })

  const [hover, setHover] = React.useState({
    hover: false,
    index: -1,
    category: ""
  })

  const [clickHighRating, setClickHighRating] = React.useState({
    click: false,
    index: -1
  })

 
  const [clickAction, setClickAction] = React.useState({
    click: false,
    index: -1
  })


  const [clickComedy, setClickComedy] = React.useState({
    click: false,
    index: -1
  })



  

  
  const style = `linear-gradient(to bottom, rgba(2,0,36, 0.001) 0%,  rgba(0,0,0,0.1) 61%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.9) 100%),` 
  const navLinksStyle = {
    color: "green",
    marginRight: "80px"
  }
  //to do:
  //each line should have a category above them to the left, and "see all (category)" navlink above them to the right that
  //can be clicked to get a list (kinda the way the homepage is now) where you can scroll down a little, before moving pages
  //Potential solution for future filters:
  //Create if else inside mapping to seperate categories and have a navlink that says "see all (category)"
  //for the respective movies
  
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


 function handleReadMore(movieId) {
   navigate(`/browse/movies/about?movieId=${movieId}`)
   setCanScroll(true)
  setSearchText("")
  setWatchlistStateChangeCounter(prev => prev += 1)
  setTimeout(() => setWatchlistStateChangeCounter(prev => prev += 1), 500)
 }

  
  const { movies, searchText, page, search, watchlistMovie, typeFilter, watchlistStateChangeCounter, canScroll, setCanScroll, trendingMovies, highRatingMovies, actionMovies, comedyMovies,
    setTrendingMovies, setHighRatingMovies, setActionMovies, setcomedyMovies,
   setWatchlistStateChangeCounter, setWatchlistMovie, setSearchText, setPage,  setMovies, setSearch } = useOutletContext()
  const moviesResults = movies.results
  const trendingMoviesResults = trendingMovies.results
  const highRatingMoviesResults = highRatingMovies.results
  const actionMoviesResults = actionMovies.results
  const comedyMoviesResults = comedyMovies.results
  let moviesElement = "Loading..."
  let actionMovieElement = "Loading..."
  let highRatingMovieElements = "Loading..."
  let trendingMovieElement = "Loading..."
  let comedyMovieElement = "Loading..."
  let category = ""

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
  
  if (actionMoviesResults) {
    actionMovieElement = actionMoviesResults.map((item, index) => {
      
    return (
      <div>
        <div 
        onClick={() => {
          setCanScroll(false)
          setClickAction(prev => {
            return (
              {
                click: !prev.click,
                index: index,
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
          
          className="discover-movie-element-div"
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
        {clickAction.click && clickAction.index === index &&
        <div>


          <div className="background-of-active-div" 
          onClick={() => {
            setCanScroll(true)
            setClickAction(prev => {
              return (
                {
                  click: !prev.click,
                  index: -1
                }
                )
              })
            }}></div>
          <div className="movie-element-active-div" style={{
          backgroundImage:
          `linear-gradient(to bottom, rgba(2,0,36,0) 0%, rgba(0,0,0,0.9500175070028011) 61%, rgba(0,0,0,0.7847514005602241) 100%),
          url(https://image.tmdb.org/t/p/original${item.backdrop_path})`}}>
            
            <button onClick={() => {
              setCanScroll(true)
              setClickAction(prev => {
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
        </div>
        }
      </div>
    )

}
)
}

if (trendingMoviesResults) {
  let movieCount = 0
  trendingMovieElement = trendingMoviesResults.map((item, index) => {
  return (
    <div>
      <div 
      onClick={() => {
        setCanScroll(false)
        setClickTrending(prev => {
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
        
        className="discover-movie-element-div"
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
          style={{backgroundImage: `${hover.hover && hover.index === index && hover.category === "trending" ? null : style}
          url(https://image.tmdb.org/t/p/original${item.poster_path})`}}

        
        >
          <div>
            <h1 >{item.title}</h1>
            <h3>{item.vote_average} / 10</h3>
          </div>
      </div>
      {clickTrending.click && clickTrending.index === index &&

    <div>


      <div className="background-of-active-div" 
      onClick={() => {
        setCanScroll(true)
        setClickTrending(prev => {
          return (
            {
              click: !prev.click,
              index: -1
            }
            )
          })
        }}></div>
        <div className="movie-element-active-div" style={{
        backgroundImage:
        `linear-gradient(to bottom, rgba(2,0,36,0) 0%, rgba(0,0,0,0.9500175070028011) 61%, rgba(0,0,0,0.7847514005602241) 100%),
        url(https://image.tmdb.org/t/p/original${item.backdrop_path})`}}>
          <button onClick={() => {
            setCanScroll(true)
            setClickTrending(prev => {
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
      </div>
      }
    </div>
  )

}
)
}

if (highRatingMoviesResults) {
  let movieCount = 0
  highRatingMovieElements = highRatingMoviesResults.map((item, index) => {
    
  return (
    <div>
      <div 
      onClick={() => {
        setCanScroll(false)
        setClickHighRating(prev => {
          return (
            {
              click: !prev.click,
              index: index,
              category: "high rating"
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
        
        className="discover-movie-element-div"
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
      {clickHighRating.click && clickHighRating.index === index &&

    <div>


      <div className="background-of-active-div" 
      onClick={() => {
        setCanScroll(true)
        setClickHighRating(prev => {
          return (
            {
              click: !prev.click,
              index: -1
            }
            )
          })
        }}></div>
        <div className="movie-element-active-div" style={{
        backgroundImage:
        `linear-gradient(to bottom, rgba(2,0,36,0) 0%, rgba(0,0,0,0.9500175070028011) 61%, rgba(0,0,0,0.7847514005602241) 100%),
        url(https://image.tmdb.org/t/p/original${item.backdrop_path})`}}>
          <button onClick={() => {
            setCanScroll(true)
            setClickHighRating(prev => {
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
      </div>
      }
    </div>
  )

}
)
}

if (comedyMoviesResults) {
  comedyMovieElement = comedyMoviesResults.map((item, index) => {
  return (
    <div>
      <div 
      onClick={() => {
        setCanScroll(false)
        setClickComedy(prev => {
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
        
        className="discover-movie-element-div"
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
      {clickComedy.click && clickComedy.index === index &&
      <div>


        <div className="background-of-active-div" 
        onClick={() => {
          setCanScroll(true)
          setClickComedy(prev => {
            return (
              {
                click: !prev.click,
                index: -1
              }
              )
            })
          }}></div>
        <div className="movie-element-active-div" style={{
        backgroundImage:
        `linear-gradient(to bottom, rgba(2,0,36,0) 0%, rgba(0,0,0,0.9500175070028011) 61%, rgba(0,0,0,0.7847514005602241) 100%),
        url(https://image.tmdb.org/t/p/original${item.backdrop_path})`}}>
          <button onClick={() => {
            setCanScroll(true)
            setClickComedy(prev => {
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
      </div>
      }
    </div>
  )

}
)
}



function handleFilterChange(value) {
  navigate(`/browse/movies?type=${value}`)
  window.scrollTo(0, 0)
}




  

  function handleCarousel(tag, scrollOffset) {
    if (tag === "trending") {
      trendingRef.current.scrollLeft += scrollOffset
    } else if (tag === "high rating") {
      highRatingRef.current.scrollLeft += scrollOffset
    } else if (tag === "action") {
      actionRef.current.scrollLeft += scrollOffset
    } else if (tag === "comedy") {
      comedyRef.current.scrollLeft += scrollOffset
    } 
  }
  return (
    
    <div className="discover-page-div" style={{marginTop: "20vh"}}>

      <div className="category-div action">
        <h1>Trending:</h1>
        <NavLink
        onClick={() => window.scrollTo(0, 0)}
        to={`/browse/movies?type=trending`}
        style={navLinksStyle}>
          See all trending movies {`->`}
        </NavLink>
      </div>
      <div className="discover-page-slide-wrapper">
        <div className="category-elements-div trending" ref={trendingRef}>
          {trendingMoviesResults ? trendingMovieElement : "loading..."}
        </div>
      </div>

      <div className="discover-carousel-arrow-div">
        <img src={carouselLeft} onClick={() => handleCarousel("trending", -1650)}/>
        <img src={carouselRight} onClick={() => handleCarousel("trending", 1650)}/>
      </div>

      <div className="category-div action">
        <h1>High rating movies:</h1>
        <NavLink
        onClick={() => window.scrollTo(0, 0)}
        to={`/browse/movies?type=trending`}
        style={navLinksStyle}>
          
          See all high rating movies {`->`}
        </NavLink>
      </div>
      <div className="discover-page-slide-wrapper">
        <div className="category-elements-div high-rating" ref={highRatingRef}>
          {highRatingMoviesResults ? highRatingMovieElements : "loading..."}
        </div>
      </div>

      <div className="discover-carousel-arrow-div" >
        <img src={carouselLeft} onClick={() => handleCarousel("high rating", -1650)}/>
        <img src={carouselRight} onClick={() => handleCarousel("high rating", 1650)}/>
      </div>

      <div className="category-div action">
        <h1>Action movies:</h1>
        <NavLink
        onClick={() => window.scrollTo(0, 0)}
        to={`/browse/movies?type=action`}
        style={navLinksStyle}>
          See all action movies {`->`}
        </NavLink>
      </div>
      <div className="discover-page-slide-wrapper" >
        <div className="category-elements-div action" ref={actionRef}>
          {actionMoviesResults ? actionMovieElement : "loading..."}
        </div>
      </div>

      <div className="discover-carousel-arrow-div">
        <img src={carouselLeft} onClick={() => handleCarousel("action", -1650)}/>
        <img src={carouselRight} onClick={() => handleCarousel("action", 1650)}/>
      </div>

      <div className="category-div action">
        <h1>Comedy movies:</h1>
        <NavLink
        onClick={() => window.scrollTo(0, 0)}
        to={`/browse/movies?type=comedy`}
        style={navLinksStyle}>
          See all comedy movies {`->`}
        </NavLink>
      </div>
      <div className="discover-page-slide-wrapper" >

        <div className="category-elements-div comedy" ref={comedyRef}>
            {comedyMoviesResults ? comedyMovieElement : "loading..."}
        </div>
      </div>

        <div className="discover-carousel-arrow-div" >
            <img src={carouselLeft} onClick={() => handleCarousel("comedy", -1650)}/>
            <img src={carouselRight} onClick={() => handleCarousel("comedy", 1650)}/>
        </div>
        
      <Footer />
    </div>
    
  )
}