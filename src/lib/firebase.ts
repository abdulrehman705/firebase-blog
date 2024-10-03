// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  signOut,
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpjy2drXUrli6W5txafhUrTdchp6iyiUU",
  authDomain: "blog-f7e8d.firebaseapp.com",
  projectId: "blog-f7e8d",
  storageBucket: "blog-f7e8d.appspot.com",
  messagingSenderId: "439966660046",
  appId: "1:439966660046:web:bf9035d7c22669da0b279f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, signInWithPopup, signOut, db };
