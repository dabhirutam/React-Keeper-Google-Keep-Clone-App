// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3k_gOAD4CFBX0TBnQTE8pj5l8oVt6dVI",
  authDomain: "react--keep-clone-app.firebaseapp.com",
  projectId: "react--keep-clone-app",
  storageBucket: "react--keep-clone-app.firebasestorage.app",
  messagingSenderId: "1041477078622",
  appId: "1:1041477078622:web:43bd2af2f7cd5b5cd12ecf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();