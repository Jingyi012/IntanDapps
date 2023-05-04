// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBa-Hhre9sSvXWsjz8scCby27HY2afvXaw",
  authDomain: "intandapp-276a9.firebaseapp.com",
  projectId: "intandapp-276a9",
  storageBucket: "intandapp-276a9.appspot.com",
  messagingSenderId: "211106829201",
  appId: "1:211106829201:web:6807c5009427af49188030",
  measurementId: "G-PXJH3QYCPK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);