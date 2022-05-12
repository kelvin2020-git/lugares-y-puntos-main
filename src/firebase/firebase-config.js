import "firebase/firestore";
import "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { GoogleAuthProvider } from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFcj5TD1jJ20V_JfzgBam1WuVPcz4AjTA",
  authDomain: "prueba-asignacio2.firebaseapp.com",
  projectId: "prueba-asignacio2",
  storageBucket: "prueba-asignacio2.appspot.com",
  messagingSenderId: "766644527473",
  appId: "1:766644527473:web:8604b5884a028f681496d0",
  measurementId: "G-L17GNRD28J"
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const googleAuthProvider = new GoogleAuthProvider();

export {
  db,
  googleAuthProvider,
  doc, //Referencia a documento en Firestore
  setDoc, // Setea Datos en la base de Firestore,
  collection,
  getDocs, // Importar getDocs de firebase/firestore
};
