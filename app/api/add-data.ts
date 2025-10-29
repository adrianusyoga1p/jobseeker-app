import { addDoc, collection } from "firebase/firestore";

export async function addData(dbName: string, data: any) {
  const { db } = useFirebase();
  const docRef = collection(db, dbName);

  return await addDoc(docRef, data);
}
