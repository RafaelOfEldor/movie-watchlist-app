import React from 'react';
import ReactDOM from 'react-dom/client';
import {NavLink, Outlet, useOutletContext, useNavigate, useSearchParams } from "react-router-dom"
import browse from "/icons/browse.svg"
import discover from "/icons/discover.svg"
import home from "/icons/home.svg"
import settings from "/icons/settings.svg"
import logout from "/icons/logout.svg"
import watchlist from "/icons/watchlist.svg"
import guestUser from "/icons/guest.png"
import loginIcon from "/icons/login.png"
import { auth, signup, setUser } from "/firebase"
import { signOut } from "firebase/auth"
import {db} from "/firebase"
import {getDocs, collection} from "firebase/firestore"

//potential fix for icons turning green on hover is to download a second svg for each icon with their color being blue,
//and then conditionally swap them rather than using the filter style in css

export default function SideBar() {

  const [searchText, setSearchText] = React.useState("")
  const [searchParams, setSearchParams] = useSearchParams()
  const [movies, setMovies] = React.useState([])
  const [trendingMovies, setTrendingMovies] = React.useState([])
  const [highRatingMovies, setHighRatingMovies] = React.useState([])
  const [actionMovies, setActionMovies] = React.useState([])
  const [comedyMovies, setcomedyMovies] = React.useState([])
  const [watchlistMovie, setWatchlistMovie] = React.useState([])
  const [search, setSearch] = React.useState(false)
  const [page, setPage] = React.useState(1)
  const [watchlistStateChangeCounter, setWatchlistStateChangeCounter] = React.useState(0)
  const renderCount = React.useRef(0)
  const navigate = useNavigate()
  const searchFilter = searchParams.get("query")
  const typeFilter = searchParams.get("type")
  const movieParam = searchParams.get("movieId")
  const [category, setCategory] = React.useState(null)

  let j = 0

  React.useEffect(() => {
    
    const moviesCollectionRef = collection(db, "Watchlist-Movies")
  
    const getMovieList = async () => {
      try {
        const data = await getDocs(moviesCollectionRef)
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
           id: doc.id,
          }))
          setWatchlistMovie(filteredData)
          
        
      } catch(err) {
        console.error(err)
      }
    }
    
    getMovieList();

    

  }, [watchlistStateChangeCounter])


  React.useEffect(() => {
    setPage(1)

  }, [searchParams])
  

  React.useEffect(() => {
    if (renderCount.current === 1) {
      setPage(1)
    }
  }, [])

  React.useEffect(() => {
    switch (typeFilter) {
      case "action": setCategory(28) 
      break;
      case "comedy": setCategory(35)
      break;
      case "fantasy": setCategory(14)
      break;
      case "animation": setCategory(16)
      break;
      case "mystery": setCategory(9648)
      break;
      case "thriller": setCategory(53)
      break;
      case "romance": setCategory(10749)
      break;
      case "drama": setCategory(18)
      break;
      case "adventure": setCategory(12)
      break;
      case "trending": setCategory("trending")
      break;
      case "top rated": setCategory("top rated")
      break;
    }
  }, [searchParams])

  

  React.useEffect(() => {
    

    

    
      

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDc4ODJlZjZkNWQzZTU2NDhmZmEyNGY5YTEzM2U5YSIsInN1YiI6IjY0ZTc2YWJjNTk0Yzk0MDExYzM1ZjVkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RDrTbC6bUeqcV0uB3d9_8Q1Tp9HPsMYn85BzGfSRhv4'
      }
    };

    
  
      if (searchText) {
        setCategory(null)
        setSearchParams({query: `${searchFilter}`})
        navigate(`browse/movies?query=${searchText}`)
        const timeoutId = setTimeout(() => {
          fetch(`https://api.themoviedb.org/3/search/movie?query=${searchFilter}&include_adult=false&language=en-US&page=${page}`, options)
          .then(response => response.json())
          .then(data => setMovies(data))
          .catch(err => console.error(err))
      }, 500)
  
      return () => clearTimeout(timeoutId)
        
          
      } else if (searchParams.get("type")){
          return;
      } else if (searchParams.get("movieId")){
        return;
    } else {
        setSearchParams({})
        fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`, options) 
          .then(response => response.json())
          .then(data => setMovies(data))
          .catch(err => console.error(err))

          fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`, options) 
          .then(response => response.json())
          .then(data => setTrendingMovies(data))
          .catch(err => console.error(err))

          fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`, options) 
          .then(response => response.json())
          .then(data => setHighRatingMovies(data))
          .catch(err => console.error(err))

          fetch(`https://api.themoviedb.org/3/discover/movie?api_key=xxx&with_genres=28&page=1`, options) 
          .then(response => response.json())
          .then(data => setActionMovies(data))
          .catch(err => console.error(err))

          fetch(`https://api.themoviedb.org/3/discover/movie?api_key=xxx&with_genres=35&page=1`, options) 
          .then(response => response.json())
          .then(data => setcomedyMovies(data))
          .catch(err => console.error(err))
      }
      
      
    
    
    

    

    
    renderCount.current += 1

   

  
    
    
    
    
  }, [searchText, page, searchParams])

  React.useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDc4ODJlZjZkNWQzZTU2NDhmZmEyNGY5YTEzM2U5YSIsInN1YiI6IjY0ZTc2YWJjNTk0Yzk0MDExYzM1ZjVkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RDrTbC6bUeqcV0uB3d9_8Q1Tp9HPsMYn85BzGfSRhv4'
      }
    };

    if (searchParams.get("type")){
      if (category !== "trending" & category !== "top rated") {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=xxx&with_genres=${category}&page=${page}`, options) 
          .then(response => response.json())
          .then(data => setMovies(data))
          .catch(err => console.error(err))
      } else if (category === "trending") {
        fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`, options) 
          .then(response => response.json())
          .then(data => setMovies(data))
          .catch(err => console.error(err))
      }else if (category === "top rated") {
        fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`, options) 
          .then(response => response.json())
          .then(data => setMovies(data))
          .catch(err => console.error(err))
      }
      
  }
    
  }, [category, page])

  

  React.useEffect(() => {
    setPage(1)
  }, [searchText])

const [currentUser, setCurrentUser] = React.useState(null)

  const activeStyle = {
    
    color: "#00C2FF",
    filter: "invert(60%) sepia(700%) saturate(1000%) hue-rotate(157deg) brightness(100%) contrast(108%)"
  }

  const [isLoggedIn, setIsLoggedIn] = React.useState(null)
  

  React.useEffect(() => {
    const unsubscribe = setUser(auth, user => {
      if (user) {
        setCurrentUser(auth.currentUser)
      } else {
        setCurrentUser(null)
      }
    })

    return unsubscribe
    }, [])
    

  

  async function logOut() {
    try {
      await signOut(auth)
    } catch (error) {
      console.error(error)
    }
  }

  function resetStates() {
    window.scrollTo({top: 0, left: 0, behavior: "smooth"})
    setPage(1)
    setSearchText("")
  }

  return (
    <div className='sidebar-layout'>
      
      <div className='sidebar-main-div'>
          
        <div className='user-siderbar-div'>
          <img src={`${guestUser}`} />
          <h3>{currentUser ? `${currentUser.email}` : `guest`}</h3>
        </div>
      
        <div>
        <hr style={{width: "90%", marginTop: "20px"}}/>
          <div className='sidebar-sub-div menu'>
            <h3 style={{marginLeft: "20px"}}>Menu</h3>
          </div>
          
          <NavLink className='sidebar-sub-div home'
          onClick={resetStates}
          to="."
          end
          style={({isActive}) => isActive ? activeStyle : null}>
            <img src={home} alt="" />
            <h3 style={{marginLeft: "20px"}}>Home</h3>
          </NavLink>

          <NavLink className='sidebar-sub-div browse'
          onClick={resetStates}
          to="browse/movies"
          style={({isActive}) => isActive ? activeStyle : null}>
            <img src={browse} alt="" />
            <h3 style={{marginLeft: "20px"}}>Browse</h3>
          </NavLink>

          <NavLink className='sidebar-sub-div discover'
          onClick={resetStates}
          to="discover"
          style={({isActive}) => isActive ? activeStyle : null}>
            <img src={discover} alt="" />
            <h3 style={{marginLeft: "20px"}}>Discover</h3>
          </NavLink>
        </div>

        <div>
        <hr style={{width: "90%"}}/>
          <div className='sidebar-sub-div personal'>
            <h3 style={{marginLeft: "20px"}}>Personal</h3>
          </div>
          
          <NavLink className='sidebar-sub-div watchlist'
          onClick={resetStates}
          to="watchlist"
          state={{message: "You must be logged in to see watchlist", intendedPath: "watchlist"}}
          style={({isActive}) => isActive ? activeStyle : null}>
            <img src={watchlist} alt="" />
            <h3 style={{marginLeft: "20px"}}>Watchlist</h3>
          </NavLink>

          <NavLink className='sidebar-sub-div settings'
          onClick={resetStates}
          to="settings"
          state={{message: "You must be logged in to see your settings", intendedPath: "settings"}}
          style={({isActive}) => isActive ? activeStyle : null}>
            <img src={settings} alt="" />
            <h3 style={{marginLeft: "20px"}}>Settings</h3>
          </NavLink>
          {
            currentUser ?
            <div 
            className='sidebar-sub-div logout'
            onClick={logOut}>
              <img src={logout} alt="" />
              <h3 style={{marginLeft: "20px"}}>
                Log out
              </h3>
            </div>
            :
            <NavLink className='sidebar-sub-div login'
            onClick={resetStates}
            to="login">
              <img src={loginIcon} alt="" />
              <h3 style={{marginLeft: "20px"}}>
                Log in
              </h3>
            </NavLink>
          }
        </div>
      </div>
      <Outlet 
      context={{ movies, searchText, page, search, watchlistMovie, typeFilter, watchlistStateChangeCounter,trendingMovies, highRatingMovies, actionMovies, comedyMovies,
         setTrendingMovies, setHighRatingMovies, setActionMovies, setcomedyMovies,
        setWatchlistStateChangeCounter, setWatchlistMovie, setSearchText, setPage,  setMovies, setSearch }} />
    </div>
    )
}