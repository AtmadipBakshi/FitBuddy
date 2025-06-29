// firebase-auth.js

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaiPhTvX1fLMeqhTkKPP4FxfsrtkqvzLg",
  authDomain: "fitbuddy-56ab3.firebaseapp.com",
  projectId: "fitbuddy-56ab3",
  storageBucket: "fitbuddy-56ab3.appspot.com",  // ✅ FIXED here!
  messagingSenderId: "93386800490",
  appId: "1:93386800490:web:6a4c6af7fce132964bb913"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign Up function
window.signupUser = async function () {
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("✅ Account created successfully!");
    window.location.href = "bmi.html";
  } catch (error) {
    alert("❌ Signup failed: " + error.message);
  }
};

// Login function
window.loginUser = async function () {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("✅ Login successful!");
    window.location.href = "bmi.html";
  } catch (error) {
    alert("❌ Login failed: " + error.message);
  }
};
