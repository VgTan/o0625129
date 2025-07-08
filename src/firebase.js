// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUiWKt6dQxSVONvhpGUiSVmtvdgeCEWMo",
  authDomain: "shopsmart-11111.firebaseapp.com",
  projectId: "shopsmart-11111",
  storageBucket: "shopsmart-11111.firebasestorage.app",
  messagingSenderId: "905942074799",
  appId: "1:905942074799:web:1034dc8df733f0f8d61b5a",
  measurementId: "G-HQ72TNFG42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export const db = getFirestore(app);