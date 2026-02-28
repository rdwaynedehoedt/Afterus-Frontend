import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnntvJ0FmsrDH3n5OTtuIAwIVXZaoUqTk",
  authDomain: "afterus-5cf15.firebaseapp.com",
  projectId: "afterus-5cf15",
  storageBucket: "afterus-5cf15.firebasestorage.app",
  messagingSenderId: "389199992351",
  appId: "1:389199992351:web:037151ea5ca1194c25672a",
  measurementId: "G-NMRPEZ0BE6",
};

const app: FirebaseApp = (getApps()[0] as FirebaseApp) ?? initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export default app;
