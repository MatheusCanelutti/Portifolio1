// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEwMpQ365GeYEcpjkIC74oWLQo9JbkrF8",
  authDomain: "doaja-ec642.firebaseapp.com",
  projectId: "doaja-ec642",
  storageBucket: "doaja-ec642.appspot.com",
  messagingSenderId: "603640255302",
  appId: "1:603640255302:web:162b5c1d415adb8937cb47",
  measurementId: "G-GV6XWBMK2B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);