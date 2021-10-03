// Import the functions you need from the SDKs you need
import firebase from 'firebase';
require("firebase/firestore");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyBo6jz7D-2R1bZDgseo56jRKvsjAiK-f3c",
  authDomain: "login-8e241.firebaseapp.com",
  projectId: "login-8e241",
  storageBucket: "login-8e241.appspot.com",
  messagingSenderId: "494615803687",
  appId: "1:494615803687:web:e458a75d5956eef9699b02"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;