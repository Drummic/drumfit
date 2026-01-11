// ============================================================================
// Filename: useExercise.ts
// Path: /src/hooks/useExercise.ts
// Created At: January 11, 2026
// From: Development Team
// Changed At: N/A
// Functional Description: Custom React hook for managing exercise state and operations.
// Provides exercises list, loading state, error handling, and CRUD methods
// Dependencies: React, exerciseService, useAuth hook
// Used In: Exercise pages and components
// ============================================================================

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  createExercise,
  getExercises,
  updateExercise,
  deleteExercise,
  getMuscleGroups,
  getExercisesByMuscleGroup,
} from '@/services/exerciseService';
import { Exercise } from '@/types';

interface UseExerciseReturn {
  exercises: Exercise[];
  muscleGroups: string[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  addExercise: (
    exerciseData: Omit<Exercise, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<Exercise>;
  updateExerciseData: (exerciseId: string, updates: Partial<Exercise>) => Promise<void>;
  removeExercise: (exerciseId: string) => Promise<void>;
  getByMuscleGroup: (muscleGroup: string) => Exercise[];
}

/**
 * useExercise Hook
 * Manages exercise data and operations
 */
export const useExercise = (): UseExerciseReturn => {
  const { user } = useAuth();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [muscleGroups, setMuscleGroups] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch exercises and muscle groups
   */
  const fetchExercises = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const [exercisesData, groupsData] = await Promise.all([
        getExercises(user.uid),
        getMuscleGroups(user.uid),
      ]);

      setExercises(exercisesData);
      setMuscleGroups(groupsData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch exercises';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [user]);

  /**
   * Initial fetch on mount
   */
  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  /**
   * Add new exercise
   */
  const addExercise = useCallback(
    async (exerciseData: Omit<Exercise, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
      if (!user) {
        throw new Error('No user logged in');
      }

      try {
        setError(null);
        // Add userId to the exercise data
        const fullExerciseData = {
          ...exerciseData,
          userId: user.uid,
        } as Omit<Exercise, 'id' | 'createdAt' | 'updatedAt'>;

        const newExercise = await createExercise(user.uid, fullExerciseData);

        setExercises((prev) => [...prev, newExercise]);

        // Update muscle groups if new ones were added
        if (exerciseData.muscleGroups.length > 0) {
          const groups = new Set(muscleGroups);
          exerciseData.muscleGroups.forEach((g) => groups.add(g));
          setMuscleGroups(Array.from(groups).sort());
        }

        return newExercise;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create exercise';
        setError(errorMessage);
        throw err;
      }
    },
    [user, muscleGroups]
  );

  /**
   * Update exercise
   */
  const updateExerciseData = useCallback(
    async (exerciseId: string, updates: Partial<Exercise>) => {
      if (!user) throw new Error('No user logged in');

      try {
        setError(null);
        await updateExercise(user.uid, exerciseId, updates);

        // Update local state
        setExercises((prev) =>
          prev.map((ex) =>
            ex.id === exerciseId ? { ...ex, ...updates, updatedAt: new Date().toISOString() } : ex
          )
        );

        // Refetch muscle groups in case they changed
        const groupsData = await getMuscleGroups(user.uid);
        setMuscleGroups(groupsData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update exercise';
        setError(errorMessage);
        throw err;
      }
    },
    [user]
  );

  /**
   * Delete exercise
   */
  const removeExercise = useCallback(
    async (exerciseId: string) => {
      if (!user) throw new Error('No user logged in');

      try {
        setError(null);
        await deleteExercise(user.uid, exerciseId);

        // Update local state
        setExercises((prev) => prev.filter((ex) => ex.id !== exerciseId));

        // Refetch muscle groups
        const groupsData = await getMuscleGroups(user.uid);
        setMuscleGroups(groupsData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to delete exercise';
        setError(errorMessage);
        throw err;
      }
    },
    [user]
  );

  /**
   * Get exercises by muscle group
   */
  const getByMuscleGroup = useCallback(
    (muscleGroup: string) => {
      return exercises.filter((ex) => ex.muscleGroups.includes(muscleGroup));
    },
    [exercises]
  );

  return {
    exercises,
    muscleGroups,
    loading,
    error,
    refetch: fetchExercises,
    addExercise,
    updateExerciseData,
    removeExercise,
    getByMuscleGroup,
  };
};
