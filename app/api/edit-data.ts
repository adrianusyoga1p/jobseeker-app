import { doc, updateDoc } from "firebase/firestore";

export async function editData(dbName: string, id: string, data: any) {
  const { db } = await useFirebase();
  const docRef = doc(db, dbName, id);

  return await updateDoc(docRef, data);
}
