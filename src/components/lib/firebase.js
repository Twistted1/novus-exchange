import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD8BNHHUFfkCGJRUN-VHPH0llZaFKgJ5qY",
  authDomain: "novus-exchange-cms.firebaseapp.com",
  projectId: "novus-exchange-cms",
  storageBucket: "novus-exchange-cms.firebasestorage.app",
  messagingSenderId: "103100897243",
  appId: "1:103100897243:web:77aba09fcb9e784d0bf9fe",
  measurementId: "G-HBW88BWZSK"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
