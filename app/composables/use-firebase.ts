import { getAnalytics, isSupported } from "firebase/analytics";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { getFirestore } from "firebase/firestore";

import useConfig from "./use-config";

export async function useFirebase() {
  const config = useConfig();
  const app = getApps().length ? getApp() : initializeApp(config.firebase);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const googleProvider = new GoogleAuthProvider();

  if (import.meta.client && (await isSupported())) {
    getAnalytics(app);
  }

  return { app, auth, db, googleProvider };
}
