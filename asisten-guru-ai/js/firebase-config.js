// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDGoP_ENCZyleF8ljl8PO2OMy5M1ukjBBc",
  authDomain: "projek-pjok-4-asisten-guru-ai.firebaseapp.com",
  databaseURL: "https://projek-pjok-4-asisten-guru-ai-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "projek-pjok-4-asisten-guru-ai",
  storageBucket: "projek-pjok-4-asisten-guru-ai.firebasestorage.app",
  messagingSenderId: "506753728976",
  appId: "1:506753728976:web:22cf0ad9f688f62478f9d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };