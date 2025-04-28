import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID } from '@/constants/config';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
};

// Initialize Firebase
if (!getApps().length) {
  initializeApp(firebaseConfig);
}
// Initialize Firebase auth
export const auth = getAuth();
