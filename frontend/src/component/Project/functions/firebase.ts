import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDnbE_tJhryw_w5y6e0390SBQuW3ddQPV0",
  authDomain: "coco-50e51.firebaseapp.com",
  databaseURL: "https://coco-50e51-default-rtdb.firebaseio.com",
  projectId: "coco-50e51",
  storageBucket: "coco-50e51.appspot.com",
  messagingSenderId: "592143844942",
  appId: "1:592143844942:web:f336b7e86e81d7c16ae51f",
  measurementId: "G-H55BYJBT0Z",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
