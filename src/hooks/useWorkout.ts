// ============================================================================
// Filename: useWorkout.ts
// Path: /src/hooks/useWorkout.ts
// Created At: January 11, 2026
// From: Development Team
// Changed At: N/A
// Functional Description: Custom React hook for managing workout state and operations.
// Provides workouts list, loading state, error handling, and CRUD methods
// Dependencies: React, workoutService, useAuth hook
// Used In: Workout pages and components
// ============================================================================

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  createWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
  getWorkoutsByDuration,
} from '@/services/workoutService';
import { Workout } from '@/types';

interface UseWorkoutReturn {
  workouts: Workout[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  addWorkout: (workoutData: Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Workout>;
  updateWorkoutData: (workoutId: string, updates: Partial<Workout>) => Promise<void>;
  removeWorkout: (workoutId: string) => Promise<void>;
  getByDuration: (duration: 'short' | 'medium' | 'long') => Workout[];
}

/**
 * useWorkout Hook
 * Manages workout data and operations
 */
export const useWorkout = (): UseWorkoutReturn => {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch workouts
   */
  const fetchWorkouts = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const workoutsData = await getWorkouts(user.uid);
      setWorkouts(workoutsData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch workouts';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [user]);

  /**
   * Initial fetch on mount
   */
  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  /**
   * Add new workout
   */
  const addWorkout = useCallback(
    async (workoutData: Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>) => {
      if (!user) {
        throw new Error('No user logged in');
      }

      try {
        setError(null);
        // Add userId to the workout data
        const fullWorkoutData = {
          ...workoutData,
          userId: user.uid,
        } as Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>;

        const newWorkout = await createWorkout(user.uid, fullWorkoutData);

        setWorkouts((prev) => [...prev, newWorkout]);

        return newWorkout;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create workout';
        setError(errorMessage);
        throw err;
      }
    },
    [user]
  );

  /**
   * Update workout
   */
  const updateWorkoutData = useCallback(
    async (workoutId: string, updates: Partial<Workout>) => {
      if (!user) throw new Error('No user logged in');

      try {
        setError(null);
        await updateWorkout(user.uid, workoutId, updates);

        // Update local state
        setWorkouts((prev) =>
          prev.map((w) =>
            w.id === workoutId ? { ...w, ...updates, updatedAt: new Date().toISOString() } : w
          )
        );
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update workout';
        setError(errorMessage);
        throw err;
      }
    },
    [user]
  );

  /**
   * Remove workout
   */
  const removeWorkout = useCallback(
    async (workoutId: string) => {
      if (!user) throw new Error('No user logged in');

      try {
        setError(null);
        await deleteWorkout(user.uid, workoutId);
        setWorkouts((prev) => prev.filter((w) => w.id !== workoutId));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to delete workout';
        setError(errorMessage);
        throw err;
      }
    },
    [user]
  );

  /**
   * Filter workouts by duration
   */
  const getByDuration = useCallback(
    (duration: 'short' | 'medium' | 'long') => {
      return workouts.filter((w) => w.duration === duration);
    },
    [workouts]
  );

  /**
   * Refetch workouts
   */
  const refetch = useCallback(async () => {
    await fetchWorkouts();
  }, [fetchWorkouts]);

  return {
    workouts,
    loading,
    error,
    refetch,
    addWorkout,
    updateWorkoutData,
    removeWorkout,
    getByDuration,
  };
};
