// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebaseKeys from "./firebase-keys";
// imported required files to Google signIn
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: firebaseKeys.apiKey,
    authDomain: firebaseKeys.authDomain,
    projectId: firebaseKeys.projectId,
    storageBucket: firebaseKeys.storageBucket,
    messagingSenderId: firebaseKeys.messagingSenderId,
    appId: firebaseKeys.appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);

// firebase login
// firebase init

/*
Put your static files (e.g., HTML, CSS, JS) in your app's deploy directory (the default is "public"). 
Then, run this command from your app's root directory:

Command: firebase deploy
*/