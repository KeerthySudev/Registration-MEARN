// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration object from the Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyCxHi6XDSgZ7YLORTNIJThYnlOlp-5q6jQ",
    authDomain: "otp-verification-af263.firebaseapp.com",
    projectId: "otp-verification-af263",
    storageBucket: "otp-verification-af263.appspot.com",
    messagingSenderId: "1048068806342",
    appId: "1:1048068806342:web:4bd823f5424746c52929c7",
    measurementId: "G-P59C4GJKVS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
