// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDiCLDMTcSMJjEiP1Em3k5g8P8Y8LVrGco",
  authDomain: "loginmcart.firebaseapp.com",
  projectId: "loginmcart",
  storageBucket: "loginmcart.firebasestorage.app",
  messagingSenderId: "884789906149",
  appId: "1:884789906149:web:219d2f019b3d5271eb620c",
  measurementId: "G-YP3M51ZFJP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);