import React, {useState, useContext} from "react"
import { Outlet, useOutletContext } from "react-router-dom"
import { auth } from "../firebase"

export function AuthContext()  {
  const [isAuthorized, setIsAuthorized] = useState(false)
  
  
  const { movies, searchText, page, search, watchlistMovie, watchlistStateChangeCounter, setWatchlistStateChangeCounter,  setWatchlistMovie, setPage, setSearchText, setMovies, setSearch } = useOutletContext()
  



  //Might have to import every function from firebase auth for this to work
  //for instance: signInWithEmailAndPassword, ConnectAuthEmulator etc.
  //watch this video for proper setup: https://www.youtube.com/watch?v=rbuSx1yEgV8&ab_channel=Firebase

  //got firebase auth to work, but now i have to restructure my router so that the right contexts get to the right places

  return <Outlet context={{movies, searchText, page, search, watchlistMovie, watchlistStateChangeCounter, setWatchlistStateChangeCounter, setWatchlistMovie, setPage, setSearchText, setMovies, setSearch}}/>
}