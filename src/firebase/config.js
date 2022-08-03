// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ5jbOOsGodsnlZP6muylwrGExbHoZqFI",
  authDomain: "react-curso-1c4d7.firebaseapp.com",
  projectId: "react-curso-1c4d7",
  storageBucket: "react-curso-1c4d7.appspot.com",
  messagingSenderId: "130856845999",
  appId: "1:130856845999:web:b215167c97edff3f06ca5a"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );