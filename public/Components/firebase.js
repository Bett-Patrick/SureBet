// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDn9DSMfE6s5_ybxeZEgzdvmsV-8mhogaU",
  authDomain: "surebet-auth.firebaseapp.com",
  projectId: "surebet-auth",
  storageBucket: "surebet-auth.firebasestorage.app",
  messagingSenderId: "16896038590",
  appId: "1:16896038590:web:b9beafb90b178080fab0ef",
  measurementId: "G-WK1JWC8BLR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth();
export default app;