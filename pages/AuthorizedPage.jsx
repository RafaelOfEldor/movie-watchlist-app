import React, { useState, useContext } from "react"
import { Navigate, Outlet, useLocation, useOutletContext} from "react-router-dom"
import { auth, signup, setUser } from "../firebase"

export default function LoginPage() {
    const [isAuthorized, setIsAuthorized] = React.useState(false)
    const [authLoading, setAuthLoading] = React.useState(true)
    const location = useLocation()
    const { movies,  searchText, page, setPage, currentUser, setCurrentUser} = useOutletContext()


    //currently have a rough version but it kinda works, so look into how to attach data to users next time
    //this video could be a good starting point https://www.youtube.com/watch?v=2ciHixbc4HE&ab_channel=Fireship
    //this one as well https://www.youtube.com/watch?v=2hR-uWjBAgw&ab_channel=PedroTech


                                  /*!!!!!!!!!!!!!!!!!!!*/ 
    //This video has got it all. Clear and easy to understand authentication including google as provider,
    //as well as how to store and edit data linked to currentuser
    //Link: https://www.youtube.com/watch?v=2hR-uWjBAgw&ab_channel=PedroTech


    //Also, when adding movies to watchlist i can take in two parameter instead of one.
    //I can have a collection called WatchlistMovies, which contains email of user, and 
    //id of movie. That way, when i map through the database of added movies, it can 
    //check and match users to their added movies, instead of making it complicated and
    //making seperate databases for each user. Check this video again for how to do that:
    ////https://www.youtube.com/watch?v=2hR-uWjBAgw&ab_channel=PedroTech

    /*example code of matchin users and movies:
    in map function
    firestore.doc.map(item => {

      if(auth.currentUser.email === doc.email) {
        **get movie where movieId === doc.movieId
        **and put it into a movie card
      }

    }*/

    
    
    
      return (
      auth?.currentUser 
      ? <Outlet context={{movies, searchText, page, setPage, currentUser, setCurrentUser}}/> 
      : <Navigate to="/login"  
      state={{message: location.state?.message, intendedPath: location.state?.intendedPath}}/>
      )
    

    
  
  
}
