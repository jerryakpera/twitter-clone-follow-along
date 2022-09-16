import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const {
  API_KEY: apiKey,
  AUTH_DOMAIN: authDomain,
  PROJECT_ID: projectId,
  STORAGE_BUCKET: storageBucket,
  MESSAGING_SENDER_ID: messagingSenderId,
  APP_ID: appIds,
} = process.env;

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

export default db;
