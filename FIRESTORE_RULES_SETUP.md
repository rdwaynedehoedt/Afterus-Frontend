# Firestore Rules & Indexes Setup

**If you see "Missing or insufficient permissions" when signing in**, your Firestore rules need to be updated. Follow the steps below.

## Rules (required)

1. Go to [Firebase Console](https://console.firebase.google.com/) → **Afterus** → **Firestore Database** → **Rules**
2. Replace all rules with:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if true;
      allow create, update: if request.auth != null && request.auth.uid == userId;
      allow delete: if false;
    }
    match /entries/{entryId} {
      allow read: if resource.data.isPrivate != true || request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

3. Click **Publish**

Or deploy from the project root: `firebase deploy --only firestore:rules`

## Index (for profile page) — REQUIRED

**Click this link to create the index** (one-time setup):

https://console.firebase.google.com/v1/r/project/afterus-5cf15/firestore/indexes?create_composite=Ck1wcm9qZWN0cy9hZnRlcnVzLTVjZjE1L2RhdGFiYXNlcy8oZGVmYXVsdCkvY29sbGVjdGlvbkdyb3Vwcy9lbnRyaWVzL2luZGV4ZXMvXxABGgoKBnVzZXJJZBABGg0KCWNyZWF0ZWRBdBACGgwKCF9fbmFtZV9fEAI

1. Click the link above
2. Sign in to Firebase if needed
3. Click **Create index**
4. Wait 1–2 minutes for the index to build
5. Try the profile page again

Or create manually in **Firestore Database** → **Indexes**:
- `entries`: `isPrivate` (Ascending), `createdAt` (Descending)
- `entries`: `userId` (Ascending), `isPrivate` (Ascending), `createdAt` (Descending)

**Note:** Existing entries without `isPrivate` won't appear in the public feed. Add `isPrivate: false` to them in Firestore Console if needed.
