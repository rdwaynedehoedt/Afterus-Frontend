import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "./firebase";

export interface JournalEntry {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  createdAt: Date;
}

export async function saveEntry(
  userId: string,
  data: { title: string; subtitle: string; content: string }
): Promise<string> {
  const entriesRef = collection(db, "users", userId, "entries");
  const docRef = await addDoc(entriesRef, {
    title: data.title,
    subtitle: data.subtitle,
    content: data.content,
    createdAt: new Date(),
  });
  return docRef.id;
}

export async function getEntries(userId: string, maxEntries = 50): Promise<JournalEntry[]> {
  const entriesRef = collection(db, "users", userId, "entries");
  const q = query(
    entriesRef,
    orderBy("createdAt", "desc"),
    limit(maxEntries)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      title: data.title ?? "",
      subtitle: data.subtitle ?? "",
      content: data.content ?? "",
      createdAt: data.createdAt?.toDate?.() ?? new Date(),
    };
  });
}
