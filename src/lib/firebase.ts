
import { initializeApp } from "firebase/app";
import {getAuth} from"firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyDKK6CKwIiWiAf6OQ_vBh6D6N6GVVaD5xQ",
  authDomain: "ecommerce-bc70e.firebaseapp.com",
  projectId: "ecommerce-bc70e",
  storageBucket: "ecommerce-bc70e.appspot.com",
  messagingSenderId: "53259572933",
  appId: "1:53259572933:web:88332f8754763bfd45c2ac"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app)