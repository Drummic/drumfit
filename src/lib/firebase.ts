// ============================================================================
// Filename: firebase.ts
// Path: /fitness-app/src/lib/firebase.ts
// Created At: January 11, 2026
// From: Development Team
// Changed At: N/A
// Functional Description: Firebase SDK initialization and configuration for the
// Fitness App. Sets up Firebase Authentication, Firestore, and Cloud Storage.
// Handles environment variable loading and exports Firebase app instance.
// Dependencies: firebase (v10.7.0), environment variables
// Used In: AuthContext.tsx, auth middleware, all Firebase operations
// ============================================================================

import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Cloud Storage
export const storage = getStorage(app);

// Enable emulators in development (optional)
if (process.env.NODE_ENV === 'development') {
  // Uncomment to use Firebase emulators locally
  // connectAuthEmulator(auth, 'http://localhost:9099');
  // connectFirestoreEmulator(db, 'localhost', 8080);
  // connectStorageEmulator(storage, 'localhost', 9199);
}

export default app;
