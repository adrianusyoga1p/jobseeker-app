import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

export async function getDataList(dbName: string, key?: string, value?: string) {
  const { db } = await useFirebase();
  const dbRef = collection(db, dbName);
  let response;

  if (key) {
    const q = query(dbRef, where(key, "==", value));
    response = await getDocs(q);
  }
  else {
    response = await getDocs(dbRef);
  }
  return response;
}

export async function getDataDetail(dbName: string, id: string) {
  const { db } = await useFirebase();
  const response = await getDoc(doc(db, dbName, id));
  return response;
}
