import { getAnalytics } from "firebase/analytics";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import useConfig from "./use-config";

export function useFirebase() {
  const { firebase } = useConfig();
  const app = getApps().length ? getApp() : initializeApp(firebase);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const googleProvider = new GoogleAuthProvider();

  if (import.meta.client) {
    getAnalytics(app);
  }

  return { app, auth, db, googleProvider };
}
