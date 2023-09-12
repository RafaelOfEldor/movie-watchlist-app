import React, { useContext } from "react"
import {useNavigate, useLocation, NavLink, useOutletContext} from "react-router-dom"
import { signInWithPopup } from "firebase/auth"
import { auth, login, setUser, googleProvider } from "../firebase"
import googleIcon from "../icons/google.svg"
import {db} from "/firebase"
import {getDocs, collection, addDoc, deleteDoc, doc} from "firebase/firestore"

const moviesCollectionRef = collection(db, "Watchlist-Movies")

export const AddToWatchList = async (email, id) => {

  try {
    await addDoc(moviesCollectionRef, {userEmail: email, movieId: id })
  } catch(err) {
    console.error(err)
  }
}

export const RemoveFromWatchlist = async (id) => {
  const movieDoc = doc(db, "Watchlist-Movies", id)
  try {
    await deleteDoc(movieDoc)
  } catch(err) {
    console.error(err)
  }
}
 

