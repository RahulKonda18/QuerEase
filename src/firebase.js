// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWMhayWuDQRLXGBKJNikjOcdILqdnAQUQ",
  authDomain: "dashboard-c0555.firebaseapp.com",
  projectId: "dashboard-c0555",
  storageBucket: "dashboard-c0555.appspot.com",
  messagingSenderId: "128055103871",
  appId: "1:128055103871:web:96fcb3962aa7ebfac64a4a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
