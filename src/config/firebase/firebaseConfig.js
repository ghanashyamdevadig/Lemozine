import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBG21CA9taWohjALEv6SidnI1ayqeeVRyM",
  authDomain: "lemonize-4ce37.firebaseapp.com",
  projectId: "lemonize-4ce37",
  storageBucket: "lemonize-4ce37.firebasestorage.app",
  messagingSenderId: "976547268222",
  appId: "1:976547268222:web:384d4799443349b93c7a2f",
  measurementId: "G-6KSJ65S6YX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Method to add a user
export const addUser = async (user_data) => {
  let { email, password, username, phone } = user_data;
  try {
    await addDoc(collection(firestore, "Users"), {
      username,
      email,
      phone,
      password,
    });
    return { success: true, message: "User added successfully" };
  } catch (error) {
    return { success: false, message: "Error adding user", error };
  }
};

// Method to get a user by mobile number
export const getUser = async (mobile) => {
  try {
    const userQuery = query(
      collection(firestore, "Users"),
      where("mobile", "==", mobile)
    );
    const snapshot = await getDocs(userQuery);

    if (snapshot.empty) {
      return { success: false, message: "User not found" };
    }

    return { success: true, user: snapshot.docs[0].data() };
  } catch (error) {
    return { success: false, message: "Error fetching user", error };
  }
};

// Method to login a user
export const loginUser = async (mobile, password) => {
  try {
    const userQuery = query(
      collection(firestore, "Users"),
      where("mobile", "==", mobile)
    );
    const snapshot = await getDocs(userQuery);

    if (snapshot.empty) {
      return {
        success: false,
        message: "No user found with that mobile number",
      };
    }

    const userData = snapshot.docs[0].data();
    if (userData.password !== password) {
      return { success: false, message: "Incorrect password" };
    }

    return { success: true, message: "Login successful", user: userData };
  } catch (error) {
    return { success: false, message: "Error logging in", error };
  }
};
