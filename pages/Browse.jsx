import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useOutletContext } from "react-router-dom"
import nextPageIcon from "/dist/assets/next-page.svg"
import previousPageIcon from "/dist/assets/previous-page.svg"
import Footer from "/components/Footer"
import { AddToWatchList } from "../components/AddToWatchlist"
import { auth } from "../firebase"



export default function Browse( { children }) {

  const { movies,  searchText, page, setPage } = useOutletContext()
  const moviesResults = movies.results
  let moviesElement = "Loading..."



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

  function addToWatchList(email, id) {
    if (auth?.currentUser) {
        AddToWatchList(email, id)
    } else {
      navigate("/login")
    }
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

  return (
    <div className="movie-elements-search-div">
          <h1 style={{marginLeft: "280px", color: "white"}}>{searchText ? `Search results for: ${searchText}` : `Browse all movies`}</h1>
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