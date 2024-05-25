import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnV3PW00MqRNdFC5pGoX3tzHtK6UcBntM",
  authDomain: "intelliagric-c1df6.firebaseapp.com",
  projectId: "intelliagric-c1df6",
  storageBucket: "intelliagric-c1df6.appspot.com",
  messagingSenderId: "60875006287",
  appId: "1:60875006287:web:0cf393ef83a3667cb3a53a",
  measurementId: "G-GHPT15P4E2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app

