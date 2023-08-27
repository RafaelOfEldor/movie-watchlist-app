import React from "react"
import { BrowserRouter, Routes, Route, Link, Outlet, useOutletContext, NavLink } from "react-router-dom"
import Footer from "/components/Footer"
import Browse from "./Browse"
import nextPageIcon from "/dist/assets/next-page.svg"
import previousPageIcon from "/dist/assets/previous-page.svg"

export default function HomePage() {

  

      

  const [click, setClick] = React.useState({
    click: false,
    index: -1
  })

  const [hover, setHover] = React.useState({
    hover: false,
    index: -1,
    category: ""
  })

  

  
  const style = `linear-gradient(to bottom, rgba(2,0,36, 0.1) 0%, rgba(0,0,0,0.9) 61%, rgba(0,0,0,0.9) 100%),` 
  const navLinksStyle = {
    color: "green"
  }
  //to do:
  //each line should have a category above them to the left, and "see all (category)" navlink above them to the right that
  //can be clicked to get a list (kinda the way the homepage is now) where you can scroll down a little, before moving pages
  //Potential solution for future filters:
  //Create if else inside mapping to seperate categories and have a navlink that says "see all (category)"
  //for the respective movies
 function addToWatchList(id) {
  alert("Function not yet added, but keep clicking anyway for fun :)")
 }

  
  const { movies,  searchText, page, setPage } = useOutletContext()
  const moviesResults = movies.results
  console.log(moviesResults)
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
              onClick={() => addToWatchList(index)}>Add to watchlist</button>
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
    
    if (item.popularity > 2000 && movieCount < 4) {
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
            onClick={() => addToWatchList(index)}>Add to watchlist</button>
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
            onClick={() => addToWatchList(index)}>Add to watchlist</button>
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
            onClick={() => addToWatchList(index)}>Add to watchlist</button>
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
            onClick={() => addToWatchList(index)}>Add to watchlist</button>
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
    searchText !== "" ?
    
      <div className="movie-elements-search-div">
          <h1 style={{marginLeft: "280px", color: "white"}}>Results for: {searchText}</h1>
        <div className="movie-elements-search-elements">
          {moviesElement}
        </div>

        <div className="page-buttons-div">
          <img src={`${previousPageIcon}`} onClick={prevPage} />
          <h3>{page}</h3>
          <img src={`${nextPageIcon}`} onClick={nextPage}/>
        </div>

        <Footer/>
      </div>
    
    
    :
    <div className="home-page-div" style={{backgroundImage: "url(/icons\blue-wavy-background.jpg)"}}>
      
      <div className="category-div action">
        <h1>Trending:</h1>
        <NavLink
        to="."
        style={navLinksStyle}>
          See all trending movies {`->`}
        </NavLink>
      </div>
      <div className="movie-elements-div action">
        {moviesResults ? trendingMovieElement : "loading..."}
      </div>

      <div className="category-div action">
        <h1>High rating movies:</h1>
        <NavLink
        to="."
        style={navLinksStyle}>
          See all high rating movies {`->`}
        </NavLink>
      </div>
      <div className="movie-elements-div action">
        {moviesResults ? highRatingMovieElements : "loading..."}
      </div>

      <div className="category-div action">
        <h1>Action movies:</h1>
        <NavLink
        to="."
        style={navLinksStyle}>
          See all action movies {`->`}
        </NavLink>
      </div>
      <div className="movie-elements-div action">
        {moviesResults ? actionMovieElement : "loading..."}
      </div>

      <div className="category-div action">
        <h1>Comedy movies:</h1>
        <NavLink
        to="."
        style={navLinksStyle}>
          See all comedy movies {`->`}
        </NavLink>
      </div>
      <div className="movie-elements-div action">
        {moviesResults ? comedyMovieElement : "loading..."}
      </div>
      <Footer />
    </div>
    
  )
}