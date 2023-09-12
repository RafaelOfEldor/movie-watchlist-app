// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  connectAuthEmulator, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider
} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import "firebase/auth"



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxjbckaw92KjdowodrAphj5IaZd8bja6E",
  authDomain: "movie-auth-production-19e49.firebaseapp.com",
  projectId: "movie-auth-production-19e49",
  storageBucket: "movie-auth-production-19e49.appspot.com",
  messagingSenderId: "758123319765",
  appId: "1:758123319765:web:656c21a8794dee72b06d5c"
};

//Might have to export every function from firebase auth for this to work
//for instance: signInWithEmailAndPassword, ConnectAuthEmulator etc.
//watch this video for proper setup: https://www.youtube.com/watch?v=rbuSx1yEgV8&ab_channel=Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
//connectAuthEmulator(auth, "http://localhost:9099")
export const setUser = onAuthStateChanged
export const login = signInWithEmailAndPassword
export const signup = createUserWithEmailAndPassword
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)
/*export const auth = getAuth(app);

export const signIn = signInWithEmailAndPassword()


export const loginEmailPassword = async (mail, password) => {
  const loginEmail = mail
  const loginPassword = password
  try {
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    console.log(userCredential.user);
  } catch(error) {
    console.log(error)
  } finally {
  }
}

export const createAccount = async (mail, password, confirmPassword) => {
  const signupEmail = mail
  const signupPassword = password
  const signupConfirmPassword = confirmPassword
  if (signupPassword === signupConfirmPassword) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log(userCredential.user);
    } catch(error) {
      console.log(error)
      showLogin(error)
    }
  } else {
    return "Passwords do not match!"
  }
  
}*/





