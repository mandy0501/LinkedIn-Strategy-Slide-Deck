import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Helper to safely get environment variables
const getEnvVar = (key: string, defaultValue: string) => {
  // Use optional chaining for import.meta.env in case it is undefined at runtime
  const env = (import.meta as any)?.env || {};
  return env[key] || defaultValue;
};

const firebaseConfig = {
  apiKey: getEnvVar("VITE_FIREBASE_API_KEY", "YOUR_API_KEY"),
  authDomain: getEnvVar("VITE_FIREBASE_AUTH_DOMAIN", "YOUR_PROJECT.firebaseapp.com"),
  projectId: getEnvVar("VITE_FIREBASE_PROJECT_ID", "YOUR_PROJECT_ID"),
  storageBucket: getEnvVar("VITE_FIREBASE_STORAGE_BUCKET", "YOUR_PROJECT.appspot.com"),
  messagingSenderId: getEnvVar("VITE_FIREBASE_MESSAGING_SENDER_ID", "SENDER_ID"),
  appId: getEnvVar("VITE_FIREBASE_APP_ID", "APP_ID")
};

// Initialize only if not already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;