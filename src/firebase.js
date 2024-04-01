import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "chat-f8356.firebaseapp.com",
  projectId: "chat-f8356",
  storageBucket: "chat-f8356.appspot.com",
  messagingSenderId: "40151977088",
  appId: "1:40151977088:web:f6cdc064fcffb17ae3aa65"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()