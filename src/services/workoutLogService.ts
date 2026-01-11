// ============================================================================
// Filename: workoutLogService.ts
// Path: /src/services/workoutLogService.ts
// Created At: January 11, 2026
// From: Development Team
// Changed At: N/A
// Functional Description: Service for logging and retrieving completed workouts
// Dependencies: Firebase Firestore
// Used In: Workout runner, activity tracking
// ============================================================================

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface WorkoutLog {
  id: string;
  userId: string;
  workoutId: string;
  workoutName: string;
  duration: number; // seconds
  caloriesBurned: number;
  completedAt: string;
  exerciseCount: number;
}

/**
 * Save a completed workout to the log
 */
export const logWorkoutCompletion = async (
  userId: string,
  workoutId: string,
  workoutName: string,
  duration: number,
  caloriesBurned: number,
  exerciseCount: number
): Promise<WorkoutLog> => {
  try {
    console.log('📝 Logging workout completion:', { workoutName, duration, caloriesBurned });

    const docRef = await addDoc(collection(db, `users/${userId}/workoutLogs`), {
      workoutId,
      workoutName,
      duration,
      caloriesBurned,
      exerciseCount,
      completedAt: new Date().toISOString(),
      createdAt: serverTimestamp(),
    });

    console.log('✅ Workout logged with ID:', docRef.id);

    return {
      id: docRef.id,
      userId,
      workoutId,
      workoutName,
      duration,
      caloriesBurned,
      completedAt: new Date().toISOString(),
      exerciseCount,
    };
  } catch (error) {
    console.error('❌ Error logging workout:', error);
    throw error;
  }
};

/**
 * Get all workout logs for a user
 */
export const getWorkoutLogs = async (userId: string): Promise<WorkoutLog[]> => {
  try {
    console.log('🔍 Fetching workout logs for user:', userId);

    const q = query(
      collection(db, `users/${userId}/workoutLogs`),
      orderBy('completedAt', 'desc')
    );

    const snapshot = await getDocs(q);
    const logs: WorkoutLog[] = [];

    snapshot.forEach((doc) => {
      logs.push({
        id: doc.id,
        userId,
        ...(doc.data() as Omit<WorkoutLog, 'id' | 'userId'>),
      });
    });

    console.log('✅ Retrieved', logs.length, 'workout logs');
    return logs;
  } catch (error) {
    console.error('❌ Error fetching workout logs:', error);
    throw error;
  }
};

/**
 * Get workout logs for a specific date
 */
export const getWorkoutLogsForDate = async (
  userId: string,
  date: Date
): Promise<WorkoutLog[]> => {
  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const q = query(
      collection(db, `users/${userId}/workoutLogs`),
      where('completedAt', '>=', startOfDay.toISOString()),
      where('completedAt', '<=', endOfDay.toISOString()),
      orderBy('completedAt', 'desc')
    );

    const snapshot = await getDocs(q);
    const logs: WorkoutLog[] = [];

    snapshot.forEach((doc) => {
      logs.push({
        id: doc.id,
        userId,
        ...(doc.data() as Omit<WorkoutLog, 'id' | 'userId'>),
      });
    });

    return logs;
  } catch (error) {
    console.error('❌ Error fetching logs for date:', error);
    return [];
  }
};
