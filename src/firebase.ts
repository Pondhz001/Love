import { initializeApp } from 'firebase/app';
import { getFirestore, doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "zeta-geode-1dw25",
  appId: "1:1001809701027:web:36f3d2b2f39030e1483716",
  apiKey: "AIzaSyB-IWow3RUnZwAuYcYIQZfjDTJ0eSMhUnQ",
  authDomain: "zeta-geode-1dw25.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-aoeys36thbirthda-30904983-c20d-4107-89a7-710f783bdce0",
  storageBucket: "zeta-geode-1dw25.firebasestorage.app",
  messagingSenderId: "1001809701027",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);

// Specify the custom database ID as the second argument to getFirestore
export const db = getFirestore(app, "ai-studio-aoeys36thbirthda-30904983-c20d-4107-89a7-710f783bdce0");

export const gameStateRef = doc(db, 'game', 'state');
