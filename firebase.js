// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
// Your web app's Firebase configuration
const ENV_DATA = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MSG_ID,
  appId: import.meta.env.VITE_APP_ID,
};
const firebaseConfig = {
  apiKey: ENV_DATA.apiKey,
  authDomain: ENV_DATA.authDomain,
  projectId: ENV_DATA.projectId,
  storageBucket: ENV_DATA.storageBucket,
  messagingSenderId: ENV_DATA.messagingSenderId,
  appId: ENV_DATA.appId,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const fdb = getFirestore(app);
const f_func = getFunctions(app);

export { auth, fdb, f_func };
