// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6sZ3ChZ6STcu0shKKKpw6A3KEZAwRHrY",
  authDomain: "fir-9-d322a.firebaseapp.com",
  projectId: "fir-9-d322a",
  storageBucket: "fir-9-d322a.appspot.com",
  messagingSenderId: "706963719016",
  appId: "1:706963719016:web:ac148e7532201db8a94cdd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);