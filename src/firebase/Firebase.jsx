// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaSeg4GABBUUIRlUMZ9y4Z8ObQAzguxdM",
  authDomain: "budget-tracker-web-app-a98ee.firebaseapp.com",
  databaseURL: "https://budget-tracker-web-app-a98ee-default-rtdb.firebaseio.com",
  projectId: "budget-tracker-web-app-a98ee",
  storageBucket: "budget-tracker-web-app-a98ee.appspot.com",
  messagingSenderId: "655586428386",
  appId: "1:655586428386:web:138005fa254b7ca01765bb",
  measurementId: "G-C8JCQ2TGW6"


  // apiKey: "AIzaSyCfYU_IdSl2qC6gef3CSyn6fwAmepWJHjU",
  // authDomain: "budget-tracker-webapp-d588c.firebaseapp.com",
  // databaseURL: "https://budget-tracker-webapp-d588c-default-rtdb.firebaseio.com",
  // projectId: "budget-tracker-webapp-d588c",
  // storageBucket: "budget-tracker-webapp-d588c.appspot.com",
  // messagingSenderId: "851768641614",
  // appId: "1:851768641614:web:c4e4f7ad340b1dfb011b1f",
  // measurementId: "G-4JLZDPGFG7"

  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

export {app,db}; 