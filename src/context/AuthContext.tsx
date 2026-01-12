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
import { doc, setDoc, getDoc, collection, getDocs, query } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { User, AuthContextType } from '@/types';



/**
 * Max Number of users allowed during evaluation phase
 */
const MAX_USERS = 5;

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
            setFirebaseUser(firebaseUserData);
          } else {
            // User has Firebase auth but NO Firestore document
            // Wait a moment in case signup is still in progress
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Check again
            const retrySnap = await getDoc(userDocRef);
            if (retrySnap.exists()) {
              const userData = retrySnap.data() as User;
              setUser(userData);
              setFirebaseUser(firebaseUserData);
            } else {
              // Still no document after retry - log them out
              console.warn('User has no Firestore document - logging out');
              await signOut(auth);
              setUser(null);
              setFirebaseUser(null);
              setError('User profile not found. Please signup again.');
            }
          }
        } else {
          setUser(null);
          setFirebaseUser(null);
        }
      } catch (err) {
        // Suppress "Missing or insufficient permissions" errors during cleanup
        // These occur when a user is being deleted and auth/firestore states are out of sync
        if (err instanceof Error && err.message.includes('Missing or insufficient permissions')) {
          console.debug('Permission check during auth state change (expected during cleanup)');
        } else {
          console.error('Error fetching user data:', err);
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
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

      // Check user limit (evaluation phase - max 10 users)
      const usersSnapshot = await getDocs(query(collection(db, 'users')));
      const userCount = usersSnapshot.size;

      if (userCount >= MAX_USERS) {
        const errorMsg = `User limit reached. This app is in evaluation phase and limited to ${MAX_USERS} users.`;
        setError(errorMsg);
        throw new Error(errorMsg);
      }

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

      console.log('Google sign-in successful, user:', firebaseUserData.uid);

      // Check if user exists in Firestore
      const userDocRef = doc(db, 'users', firebaseUserData.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        console.log('User document does not exist, checking limit...');
        
        try {
          // Check user limit before creating new user (evaluation phase)
          const usersSnapshot = await getDocs(query(collection(db, 'users')));
          const userCount = usersSnapshot.size;

          console.log('Current user count:', userCount, 'Max users:', MAX_USERS);

          if (userCount >= MAX_USERS) {
            // Delete the Firebase auth user that was just created
            await firebaseUserData.delete();
            const errorMsg = `User limit reached. This app is in evaluation phase and limited to ${MAX_USERS} users.`;
            setError(errorMsg);
            throw new Error(errorMsg);
          }
        } catch (limitCheckError) {
          // If it's a limit error, re-throw it
          if (limitCheckError instanceof Error && limitCheckError.message.includes('User limit reached')) {
            throw limitCheckError;
          }
          // For other errors (permission issues), log warning but proceed
          console.warn('Could not check user limit:', limitCheckError);
        }

        // Create new user document
        const newUser: User = {
          uid: firebaseUserData.uid,
          email: firebaseUserData.email || '',
          name: firebaseUserData.displayName || '',
          profilePicture: firebaseUserData.photoURL || undefined,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        console.log('Creating user document:', newUser);
        await setDoc(userDocRef, newUser);
        console.log('User document created successfully');
        
        setUser(newUser);
      } else {
        console.log('User document exists');
        setUser(userDocSnap.data() as User);
      }

      setFirebaseUser(firebaseUserData);
    } catch (err) {
      console.error('Google sign-in error:', err);
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
