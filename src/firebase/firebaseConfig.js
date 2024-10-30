// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVpWj9mbo3wHvbz7qKN4BftbfhiRB53OU",
  authDomain: "foddies-99887.firebaseapp.com",
  projectId: "foddies-99887",
  storageBucket: "foddies-99887.appspot.com",
  messagingSenderId: "856299485869",
  appId: "1:856299485869:web:d3932a084227b3389b6424",
  measurementId: "G-ZT621WTSNX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app)
