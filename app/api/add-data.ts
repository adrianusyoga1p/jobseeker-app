import { addDoc, collection } from "firebase/firestore";

export async function addData(dbName: string, data: any) {
  const { db } = await useFirebase();

  return await addDoc(collection(db, dbName), data);
}
