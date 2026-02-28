import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export interface MoodData {
  state: string;
  intensity: number;
  briefInsight?: string;
}

export interface JournalEntry {
  id: string;
  userId: string;
  authorName: string;
  title: string;
  subtitle: string;
  content: string;
  createdAt: Date;
  mood?: MoodData;
}

function getAuthorName(user: { displayName?: string | null; email?: string | null }): string {
  if (user.displayName?.trim()) return user.displayName.trim();
  if (user.email) {
    const beforeAt = user.email.split("@")[0];
    return beforeAt ? beforeAt.charAt(0).toUpperCase() + beforeAt.slice(1).toLowerCase() : "Kyl";
  }
  return "Kyl";
}

export async function saveEntry(
  userId: string,
  authorName: string,
  data: { title: string; subtitle: string; content: string }
): Promise<string> {
  const entriesRef = collection(db, "entries");
  const docRef = await addDoc(entriesRef, {
    userId,
    authorName,
    title: data.title,
    subtitle: data.subtitle,
    content: data.content,
    createdAt: new Date(),
  });
  return docRef.id;
}

export async function getAllEntries(maxEntries = 50): Promise<JournalEntry[]> {
  const entriesRef = collection(db, "entries");
  const q = query(
    entriesRef,
    orderBy("createdAt", "desc"),
    limit(maxEntries)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => docToEntry(d));
}

export async function getEntriesByUser(userId: string, maxEntries = 50): Promise<JournalEntry[]> {
  const entriesRef = collection(db, "entries");
  const q = query(
    entriesRef,
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(maxEntries)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => docToEntry(d));
}

export async function getEntry(id: string): Promise<JournalEntry | null> {
  const docRef = doc(db, "entries", id);
  const d = await getDoc(docRef);
  if (!d.exists()) return null;
  return docToEntry(d);
}

export async function updateEntry(
  id: string,
  data: {
    title?: string;
    subtitle?: string;
    content?: string;
    mood?: MoodData;
  }
): Promise<void> {
  const docRef = doc(db, "entries", id);
  const updates: Record<string, unknown> = {};
  if (data.title !== undefined) updates.title = data.title;
  if (data.subtitle !== undefined) updates.subtitle = data.subtitle;
  if (data.content !== undefined) updates.content = data.content;
  if (data.mood !== undefined) {
    updates.mood = data.mood;
    updates.moodAnalyzedAt = new Date();
  }
  if (Object.keys(updates).length > 0) {
    await updateDoc(docRef, updates);
  }
}

export async function deleteEntry(id: string): Promise<void> {
  const docRef = doc(db, "entries", id);
  await deleteDoc(docRef);
}

function docToEntry(d: { id: string; data: () => Record<string, unknown> }): JournalEntry {
  const data = d.data();
  const moodRaw = data.mood as
    | { state?: string; intensity?: number; briefInsight?: string }
    | undefined;
  const mood: MoodData | undefined =
    moodRaw?.state && typeof moodRaw.intensity === "number"
      ? {
          state: moodRaw.state,
          intensity: moodRaw.intensity,
          briefInsight: moodRaw.briefInsight,
        }
      : undefined;
  return {
    id: d.id,
    userId: (data.userId as string) ?? "",
    authorName: (data.authorName as string) ?? "Kyl",
    title: (data.title as string) ?? "",
    subtitle: (data.subtitle as string) ?? "",
    content: (data.content as string) ?? "",
    createdAt: (data.createdAt as { toDate?: () => Date })?.toDate?.() ?? new Date(),
    mood,
  };
}

export { getAuthorName };
