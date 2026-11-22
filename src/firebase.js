// Firebase Configuration and Realtime Database Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  push,
  onValue,
  off,
  update,
  remove,
  onDisconnect,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCoUwxCSLxLljmtVQGevizmaWqqufjd2iM",
  authDomain: "chor-police-game-fb6ab.firebaseapp.com",
  databaseURL: "https://chor-police-game-fb6ab-default-rtdb.firebaseio.com",
  projectId: "chor-police-game-fb6ab",
  storageBucket: "chor-police-game-fb6ab.firebasestorage.app",
  messagingSenderId: "407225690905",
  appId: "1:407225690905:web:0392fcabb5dedf02237388",
  measurementId: "G-1PP1VS95JE"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export {
  ref,
  set,
  get,
  push,
  onValue,
  off,
  update,
  remove,
  onDisconnect,
  serverTimestamp
};
