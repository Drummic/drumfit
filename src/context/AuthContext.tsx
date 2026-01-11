// ============================================================================
// Filename: AuthContext.tsx
// Path: /src/context/AuthContext.tsx
// Created At: January 11, 2026
// From: Development Team
// Changed At: N/A
// Functional Description: React Context for Firebase Authentication management,
// provides authentication state and methods (login, signup, logout) to entire app
// Dependencies: React, Firebase Auth (src/lib/firebase.ts), types from src/types
// Used In: App layout wrapper (_layout.tsx), Login page, all protected routes
// ============================================================================

'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { User, AuthContextType } from '@/types';

/**
 * AuthContext - Provides authentication state and methods to app
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider Component
 * Wraps app to provide authentication context
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Initialize Firebase auth persistence
   */
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch((err) => {
      console.error('Failed to set persistence:', err);
    });
  }, []);

  /**
   * Listen for auth state changes
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUserData) => {
      try {
        if (firebaseUserData) {
          // Fetch user data from Firestore
          const userDocRef = doc(db, 'users', firebaseUserData.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data() as User;
            setUser(userData);
          } else {
            // User logged in but no Firestore document yet
            // This happens after signup but before profile creation
            setUser({
              uid: firebaseUserData.uid,
              email: firebaseUserData.email || '',
              name: '',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
          }
          setFirebaseUser(firebaseUserData);
        } else {
          setUser(null);
          setFirebaseUser(null);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  /**
   * Sign up with email and password
   */
  const signup = async (email: string, password: string, name: string): Promise<void> => {
    try {
      setError(null);
      setLoading(true);

      // Create Firebase auth user
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUserData = result.user;

      // Create Firestore user document
      const newUser: User = {
        uid: firebaseUserData.uid,
        email,
        name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const userDocRef = doc(db, 'users', firebaseUserData.uid);
      await setDoc(userDocRef, newUser);

      setUser(newUser);
      setFirebaseUser(firebaseUserData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Signup failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login with email and password
   */
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setError(null);
      setLoading(true);

      const result = await signInWithEmailAndPassword(auth, email, password);
      setFirebaseUser(result.user);
      // User data will be fetched by onAuthStateChanged listener
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout
   */
  const logout = async (): Promise<void> => {
    try {
      setError(null);
      await signOut(auth);
      setUser(null);
      setFirebaseUser(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Logout failed';
      setError(errorMessage);
      throw err;
    }
  };

  /**
   * Sign in with Google
   */
  const signInWithGoogle = async (): Promise<void> => {
    try {
      setError(null);
      setLoading(true);

      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });

      const result = await signInWithPopup(auth, provider);
      const firebaseUserData = result.user;

      // Check if user exists in Firestore
      const userDocRef = doc(db, 'users', firebaseUserData.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // Create new user document
        const newUser: User = {
          uid: firebaseUserData.uid,
          email: firebaseUserData.email || '',
          name: firebaseUserData.displayName || '',
          profilePicture: firebaseUserData.photoURL || undefined,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        await setDoc(userDocRef, newUser);
        setUser(newUser);
      }

      setFirebaseUser(firebaseUserData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Google sign-in failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update user profile
   */
  const updateProfile = async (updates: Partial<User>): Promise<void> => {
    try {
      if (!firebaseUser) throw new Error('No user logged in');

      setError(null);
      const userDocRef = doc(db, 'users', firebaseUser.uid);

      const updatedUser: User = {
        ...user!,
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      await setDoc(userDocRef, updatedUser, { merge: true });
      setUser(updatedUser);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Update failed';
      setError(errorMessage);
      throw err;
    }
  };

  const value: AuthContextType = {
    user,
    firebaseUser,
    loading,
    error,
    login,
    signup,
    logout,
    updateProfile,
    signInWithGoogle,
    isAuthenticated: !!firebaseUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * useAuth Hook - Use in any component to access auth context
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
