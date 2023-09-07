import React from "react"
import { BrowserRouter, Routes, Route, Link, Outlet, useOutletContext, NavLink, useNavigate } from "react-router-dom"
import Footer from "/components/Footer"
import Browse from "./Browse"
import nextPageIcon from "/dist/assets/next-page.svg"
import previousPageIcon from "/dist/assets/previous-page.svg"
import { AddToWatchList } from "../components/AddToWatchlist"
import { auth } from "../firebase"

export default function HomePage() {


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
 

  
  const { movies,  searchText, watchlistMovie, setWatchlistMovie, page, setPage } = useOutletContext()
  const moviesResults = movies.results
  let moviesElement = "Loading..."
  let actionMovieElement = "Loading..."
  let highRatingMovieElements = "Loading..."
  let trendingMovieElement = "Loading..."
  let comedyMovieElement = "Loading..."
  let category = ""

  function addToWatchList(email, id) {
    if (auth?.currentUser) {
        AddToWatchList(email, id)
    } else {
      navigate("/login")
    }
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
              <button className="active-div-watchlist-button"
              onClick={() => addToWatchList(auth?.currentUser?.email, item.id)}>Add to watchlist</button>
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
    <div className="movie-element-homepage-banner-container">
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
          style={{backgroundImage: `${hover.hover && hover.index === index && hover.category === "trending" ? null : style}
          linear-gradient(to bottom, rgba(2,0,36,0) 0%, rgba(0,0,0,0.7500175070028011) 71%, rgba(5, 2, 15,0.9847514005602241) 90%),
      url(https://image.tmdb.org/t/p/original${item.backdrop_path})`, cursor: "auto"}}

        
        >
          <div>
            <h1 >{item.title}</h1>
            <h4>{item.release_date.split("-").shift()}</h4>
            <h4>{item.overview} / 10</h4>
            <button 
              style={{width: "10vw",}}
              className="active-div-watchlist-button"
              onClick={() => addToWatchList(auth?.currentUser?.email, item.id)}>
              Add to watchlist
            </button>
            <button className="active-div-watchlist-button"
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
            style={{width: "10vw", marginLeft: "20px", color: "black", backgroundColor: "#8797a6"}}>
              Read more</button>
          </div>
      </div>
      {click.click && click.index === index &&
      <div className="movie-element-active-div" style={{
      backgroundImage:
      `linear-gradient(to bottom, rgba(2,0,36,0) 0%, rgba(0,0,0,0.9500175070028011) 61%, rgba(0,0,0,0.7847514005602241) 100%),
      url(https://image.tmdb.org/t/p/original${item.poster_path})`}}>
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
            <button className={watchlistMovie.map(itemTwo => {
              if (itemTwo.movieId === item.id ) {
                return true
              }
            }
            ) ? "active-div-watchlist-button" : "xx"}
            onClick={() => addToWatchList(auth?.currentUser?.email, item.id)}>Add to watchlist</button>
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
            <button className="active-div-watchlist-button"
            onClick={() => addToWatchList(auth?.currentUser?.email, item.id)}>Add to watchlist</button>
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
            <button className="active-div-watchlist-button"
            onClick={() => addToWatchList(auth?.currentUser?.email, item.id)}>Add to watchlist</button>
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
            <button className="active-div-watchlist-button"
            onClick={() => addToWatchList(auth?.currentUser?.email, item.id)}>Add to watchlist</button>
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