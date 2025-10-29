import type { User } from "firebase/auth";

import dayjs from "dayjs";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default () => {
  const registerWithEmailAndPassword = async (email: string, password: string) => {
    const { auth, db } = useFirebase();
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    if (signInMethods && signInMethods.length > 0) {
      throw new Error("This email has been registered as user of Rakamin Academy.");
    }

    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      email: user.email,
      provider: "email",
      role: "applicant",
      createdAt: dayjs().toISOString(),
    });

    return user;
  };

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    const { auth } = useFirebase();

    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  };

  const loginWithGoogle = async () => {
    const { auth, db, googleProvider } = useFirebase();
    // const { setToken, setUser } = useAuthStore();

    if (!auth || !googleProvider) {
      throw new Error("Firebase setup is incomplete or missing necessary objects.");
    }

    const result = await signInWithPopup(auth, googleProvider);
    if (!result)
      return;

    const user = result?.user;

    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // if (!credential)
    //   return;
    // const token = credential.accessToken;

    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      await setDoc(userRef, {
        id: user.uid,
        email: user.email,
        provider: "google",
        role: "applicant",
        createdAt: dayjs().toISOString(),
      });
      // setToken(token as string);
      // setUser({
      //   email: user?.email,
      //   role: "applicant",
      //   id: user.uid,
      //   provider: "google",
      // });
    }

    return user;
  };

  function initializeAuthListener() {
    const { auth } = useFirebase();
    const { setToken, setUser } = useAuthStore();
    onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        console.log("User login", user.uid);
        user.getIdToken().then((idToken) => {
          setToken(idToken);
        });

        setUser({
          id: user.uid,
          email: user.email,
          provider: "google",
          role: "applicant",
        });
      }
      // else {
      //   logout();
      //   console.log("User logout");
      //   navigateTo("/auth/sign-in");
      // }
    });
  }

  return { initializeAuthListener, registerWithEmailAndPassword, loginWithGoogle, loginWithEmailAndPassword };
};
