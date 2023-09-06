import React, { useContext } from "react"
import {useNavigate, useLocation, NavLink, useOutletContext} from "react-router-dom"
import { signInWithPopup } from "firebase/auth"
import { auth, login, setUser, googleProvider } from "../firebase"
import googleIcon from "../icons/google.svg"
import {db} from "../firebase"
import {getDocs, collection, addDoc} from "firebase/firestore"

const moviesCollectionRef = collection(db, "Watchlist-Movies")

export const AddToWatchList = async (email, id) => {

  try {
    await addDoc(moviesCollectionRef, {userEmail: email, movieId: id})
  } catch(err) {
    console.error(err)
  }
}
 