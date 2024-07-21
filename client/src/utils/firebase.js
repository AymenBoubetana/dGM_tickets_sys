// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "dgm-tickets.firebaseapp.com",
  projectId: "dgm-tickets",
  storageBucket: "dgm-tickets.appspot.com",
  messagingSenderId: "26061299051",
  appId: "1:26061299051:web:14fd211da8c7c90ca4802e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);