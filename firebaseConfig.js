import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC38hYM0LpEwHl3U33gu6Jq4q97rWuZTII",
  authDomain: "home-c7c0f.firebaseapp.com",
  databaseURL: "https://home-c7c0f-default-rtdb.firebaseio.com",
  projectId: "home-c7c0f",
  storageBucket: "home-c7c0f.firebasestorage.app",
  messagingSenderId: "904563254867",
  appId: "1:904563254867:web:e5d6ae5f62fe9bfa58c8a6",
  measurementId: "G-6NJT4FL16G",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
