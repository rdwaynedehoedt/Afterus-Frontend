import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export interface UserProfile {
  userId: string;
  username: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function getProfile(userId: string): Promise<UserProfile | null> {
  const docRef = doc(db, "users", userId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  const data = snap.data();
  return {
    userId: snap.id,
    username: (data.username as string) ?? "",
    bio: (data.bio as string) ?? "",
    createdAt: (data.createdAt as { toDate?: () => Date })?.toDate?.() ?? new Date(),
    updatedAt: (data.updatedAt as { toDate?: () => Date })?.toDate?.() ?? new Date(),
  };
}

export async function createProfile(
  userId: string,
  data: { username: string; bio?: string }
): Promise<void> {
  const now = new Date();
  const docRef = doc(db, "users", userId);
  await setDoc(docRef, {
    username: data.username.trim(),
    bio: (data.bio ?? "").trim(),
    createdAt: now,
    updatedAt: now,
  });
}

export async function updateProfile(
  userId: string,
  data: { username?: string; bio?: string }
): Promise<void> {
  const docRef = doc(db, "users", userId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) throw new Error("Profile not found");
  const existing = snap.data();
  await setDoc(docRef, {
    username: data.username?.trim() ?? existing.username,
    bio: data.bio !== undefined ? data.bio.trim() : existing.bio,
    createdAt: existing.createdAt,
    updatedAt: new Date(),
  }, { merge: true });
}
