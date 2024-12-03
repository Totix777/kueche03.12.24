import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDdbHhkrTnhbybAs5OlSeA8ZKLnAYJgfMc",
  authDomain: "kueche-hygiene.firebaseapp.com",
  projectId: "kueche-hygiene",
  storageBucket: "kueche-hygiene.appspot.com",
  messagingSenderId: "243807796866",
  appId: "1:243807796866:web:f4cc7e4be13c8d4ab73e9b",
  measurementId: "G-K0M29YRZPD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);