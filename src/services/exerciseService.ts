// ============================================================================
// Filename: exerciseService.ts
// Path: /src/services/exerciseService.ts
// Created At: January 11, 2026
// From: Development Team
// Changed At: N/A
// Functional Description: Service layer for Exercise CRUD operations in Firestore.
// Handles creating, reading, updating, and deleting exercises for authenticated users
// Dependencies: Firebase Firestore (db), types (Exercise), auth context
// Used In: Exercise pages, components, and custom hooks
// ============================================================================

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Exercise } from '@/types';

/**
 * Create a new exercise
 */
export const createExercise = async (
  userId: string,
  exerciseData: Omit<Exercise, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Exercise> => {
  try {
    // Ensure user document exists
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
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

    const exercisesRef = collection(db, 'users', userId, 'exercises');

    const docRef = await addDoc(exercisesRef, {
      ...exerciseData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return {
      id: docRef.id,
      ...exerciseData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('❌ Firestore error:', error);
    throw error;
  }
};

/**
 * Get all exercises for a user
 */
export const getExercises = async (userId: string): Promise<Exercise[]> => {
  try {
    const exercisesRef = collection(db, 'users', userId, 'exercises');
    const querySnapshot = await getDocs(exercisesRef);

    const exercises: Exercise[] = [];
    querySnapshot.forEach((doc) => {
      exercises.push({
        id: doc.id,
        ...doc.data(),
      } as Exercise);
    });

    return exercises;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw error;
  }
};

/**
 * Get a single exercise by ID
 */
export const getExerciseById = async (
  userId: string,
  exerciseId: string
): Promise<Exercise | null> => {
  try {
    const exerciseRef = doc(db, 'users', userId, 'exercises', exerciseId);
    const exerciseSnap = await getDoc(exerciseRef);

    if (exerciseSnap.exists()) {
      return {
        id: exerciseSnap.id,
        ...exerciseSnap.data(),
      } as Exercise;
    }

    return null;
  } catch (error) {
    console.error('Error fetching exercise:', error);
    throw error;
  }
};

/**
 * Update an existing exercise
 */
export const updateExercise = async (
  userId: string,
  exerciseId: string,
  updates: Partial<Omit<Exercise, 'id' | 'userId' | 'createdAt'>>
): Promise<void> => {
  try {
    const exerciseRef = doc(db, 'users', userId, 'exercises', exerciseId);

    await updateDoc(exerciseRef, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error updating exercise:', error);
    throw error;
  }
};

/**
 * Delete an exercise
 */
export const deleteExercise = async (userId: string, exerciseId: string): Promise<void> => {
  try {
    const exerciseRef = doc(db, 'users', userId, 'exercises', exerciseId);
    await deleteDoc(exerciseRef);
  } catch (error) {
    console.error('Error deleting exercise:', error);
    throw error;
  }
};

/**
 * Get exercises by muscle group
 */
export const getExercisesByMuscleGroup = async (
  userId: string,
  muscleGroup: string
): Promise<Exercise[]> => {
  try {
    const exercises = await getExercises(userId);
    return exercises.filter((ex) => ex.muscleGroups.includes(muscleGroup));
  } catch (error) {
    console.error('Error filtering exercises:', error);
    throw error;
  }
};

/**
 * Get all unique muscle groups for a user
 */
export const getMuscleGroups = async (userId: string): Promise<string[]> => {
  try {
    const exercises = await getExercises(userId);
    const muscleGroups = new Set<string>();

    exercises.forEach((ex) => {
      ex.muscleGroups.forEach((mg) => muscleGroups.add(mg));
    });

    return Array.from(muscleGroups).sort();
  } catch (error) {
    console.error('Error fetching muscle groups:', error);
    throw error;
  }
};
