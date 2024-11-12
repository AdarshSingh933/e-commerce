// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxN3ICmYW7v6dCHzxLWz3Be_h7hi4pUn4",
  authDomain: "e-commerce-db-4f136.firebaseapp.com",
  projectId: "e-commerce-db-4f136",
  storageBucket: "e-commerce-db-4f136.firebasestorage.app",
  messagingSenderId: "240761175918",
  appId: "1:240761175918:web:0d7a02ee415e42cfe00b7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);