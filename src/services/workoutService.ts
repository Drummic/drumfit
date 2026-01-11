// ============================================================================
// Filename: workoutService.ts
// Path: /src/services/workoutService.ts
// Created At: January 11, 2026
// From: Development Team
// Changed At: N/A
// Functional Description: Service layer for Workout CRUD operations in Firestore.
// Handles creating, reading, updating, and deleting workouts for authenticated users
// Dependencies: Firebase Firestore (db), types (Workout), auth context
// Used In: Workout pages, components, and custom hooks
// ============================================================================

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Workout } from '@/types';

/**
 * Create a new workout
 */
export const createWorkout = async (
  userId: string,
  workoutData: Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Workout> => {
  try {
    console.log('🔧 workoutService.createWorkout - Starting');
    console.log('👤 userId:', userId);
    console.log('📊 workoutData:', workoutData);

    // Ensure user document exists
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      console.log('📝 Creating user document');
      // Create a minimal user document to allow subcollections
      await setDoc(
        userDocRef,
        {
          uid: userId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    }

    console.log('📂 Getting workouts collection reference');
    const workoutsRef = collection(db, 'users', userId, 'workouts');

    console.log('💾 Adding workout document');
    const docRef = await addDoc(workoutsRef, {
      ...workoutData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    console.log('✅ Workout created with ID:', docRef.id);
    return {
      id: docRef.id,
      ...workoutData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('❌ Error in createWorkout:', error);
    if (error instanceof Error) {
      console.error('📝 Error message:', error.message);
      console.error('🔍 Error code:', (error as any).code);
    }
    throw error;
  }
};

/**
 * Get all workouts for a user
 */
export const getWorkouts = async (userId: string): Promise<Workout[]> => {
  try {
    const workoutsRef = collection(db, 'users', userId, 'workouts');
    const querySnapshot = await getDocs(workoutsRef);

    const workouts: Workout[] = [];
    querySnapshot.forEach((doc) => {
      workouts.push({
        id: doc.id,
        ...doc.data(),
      } as Workout);
    });

    return workouts;
  } catch (error) {
    throw error;
  }
};

/**
 * Get a single workout by ID
 */
export const getWorkoutById = async (userId: string, workoutId: string): Promise<Workout> => {
  try {
    const docRef = doc(db, 'users', userId, 'workouts', workoutId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('Workout not found');
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Workout;
  } catch (error) {
    throw error;
  }
};

/**
 * Update a workout
 */
export const updateWorkout = async (
  userId: string,
  workoutId: string,
  updates: Partial<Workout>
): Promise<void> => {
  try {
    const docRef = doc(db, 'users', userId, 'workouts', workoutId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a workout
 */
export const deleteWorkout = async (userId: string, workoutId: string): Promise<void> => {
  try {
    const docRef = doc(db, 'users', userId, 'workouts', workoutId);
    await deleteDoc(docRef);
  } catch (error) {
    throw error;
  }
};

/**
 * Get all workouts by duration
 */
export const getWorkoutsByDuration = async (
  userId: string,
  duration: 'short' | 'medium' | 'long'
): Promise<Workout[]> => {
  try {
    const allWorkouts = await getWorkouts(userId);
    return allWorkouts.filter((w) => w.duration === duration);
  } catch (error) {
    throw error;
  }
};
