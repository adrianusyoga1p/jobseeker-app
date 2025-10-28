import dayjs from "dayjs";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default () => {
  const registerWithEmailAndPassword = async (email: string, password: string) => {
    const { auth, db } = await useFirebase();
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
    const { auth } = await useFirebase();

    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  };

  const loginWithGoogle = async () => {
    const { auth, db, googleProvider } = await useFirebase();

    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      await setDoc(userRef, {
        id: user.uid,
        email: user.email,
        displayName: user.displayName,
        provider: "google",
        role: "applicant",
        createdAt: new Date(),
      });
    }

    return user;
  };

  return { registerWithEmailAndPassword, loginWithGoogle, loginWithEmailAndPassword };
};
