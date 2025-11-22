import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginmcart.firebaseapp.com",
  projectId: "loginmcart",
  storageBucket: "loginmcart.firebasestorage.app",
  messagingSenderId: "884789906149",
  appId: "1:884789906149:web:219d2f019b3d5271eb620c",
  measurementId: "G-YP3M51ZFJP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}