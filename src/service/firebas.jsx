// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3QtMUFrELzTum5VQxD-NVd2KPAuqVvD0",
  authDomain: "carrito-santiago-camarda.firebaseapp.com",
  databaseURL: "https://carrito-santiago-camarda-default-rtdb.firebaseio.com",
  projectId: "carrito-santiago-camarda",
  storageBucket: "carrito-santiago-camarda.firebasestorage.app",
  messagingSenderId: "108652637402",
  appId: "1:108652637402:web:f97f5095e239b1af30c9e3",
  measurementId: "G-C2G9HE5BVR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db= getFirestore(app);

