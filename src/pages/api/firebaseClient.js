import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD5T-QKh5eY125JHhvPemGwAqwJqCjVR00",
  authDomain: "mass-livery.firebaseapp.com",
  projectId: "mass-livery",
  storageBucket: "mass-livery.firebasestorage.app",
  messagingSenderId: "1044735106586",
  appId: "1:1044735106586:web:da245d510a0a078edefba3",
  measurementId: "G-E5GEKME5JN"
};

// Initialize Firebase app
if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const db = getFirestore();

// Get all JSON documents from the 'localized' collection
export const getAllJson = async () => {
  const colRef = collection(db, "localized");
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Post (add) a JSON document to the 'localized' collection
export const postJson = async (jsonData) => {
  const colRef = collection(db, "localized");
  const docRef = await addDoc(colRef, jsonData);
  return { id: docRef.id };
};