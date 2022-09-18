import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const apiKey = process.env.API_KEY;
const authDomain = process.env.AUTH_DOMAIN;
const projectId = process.env.PROJECT_ID;
const storageBucket = process.env.STORAGE_BUCKET;
const messagingSenderId = process.env.MESSAGING_SENDER_ID;
const appIds = process.env.APP_ID;

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appIds,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize firebase auth
const auth = getAuth(app);

export { db, auth };
