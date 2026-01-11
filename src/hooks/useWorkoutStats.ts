// ============================================================================
// Filename: useWorkoutStats.ts
// Path: /src/hooks/useWorkoutStats.ts
// Created At: January 11, 2026
// From: Development Team
// Changed At: N/A
// Functional Description: Hook for managing and calculating workout statistics
// Dependencies: useWorkoutLogs, workoutStatsService
// Used In: Stats dashboard, activity tracking pages
// ============================================================================

import { useMemo } from 'react';
import { useWorkoutLogs } from './useWorkoutLogs';
import { calculateWorkoutStats, WorkoutStats } from '@/services/workoutStatsService';

export const useWorkoutStats = () => {
  const { logs, loading, error } = useWorkoutLogs();

  const stats: WorkoutStats | null = useMemo(() => {
    if (!logs) return null;
    return calculateWorkoutStats(logs);
  }, [logs]);

  return {
    stats,
    loading,
    error,
  };
};
