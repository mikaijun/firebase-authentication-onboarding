import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, OAuthProvider, UserCredential, getAuth, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIRE_BASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIRE_BASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIRE_BASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIRE_BASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIRE_BASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIRE_BASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIRE_BASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIRE_BASE_MEASUREMENT_ID
};

if (!getApps()?.length) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const db = getFirestore();

// see: https://zenn.dev/jun0723/articles/46441864f6dbbd
export const googleLogin = (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

// see: https://firebase.google.com/docs/auth/web/apple?hl=ja#web-modular-api
// TODO: Apple Developer Programに参加する必要がありそう
export const appleLogin = (): Promise<UserCredential> => {
  const provider = new OAuthProvider('apple.com');
  return signInWithPopup(auth, provider);
};

export const logout = (): Promise<void> => {
  return signOut(auth);
};
