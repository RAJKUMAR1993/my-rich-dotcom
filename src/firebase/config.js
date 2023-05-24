import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFireBstore } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

import { getStore } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyAk7hIjjv1spQ4ScPTOMqcS7RMGZSnwx0s",
  authDomain: "fir-crud-d2cf1.firebaseapp.com",
  projectId: "fir-crud-d2cf1",
  storageBucket: "fir-crud-d2cf1.appspot.com",
  messagingSenderId: "388664168673",
  appId: "1:388664168673:web:9e711f6aaf6634602167a0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// export const db = getAuth(app);
export const storage = getAuth(app);

export default app;
