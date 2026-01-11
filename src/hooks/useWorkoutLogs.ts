'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getWorkoutLogs, logWorkoutCompletion, WorkoutLog } from '@/services/workoutLogService';

interface UseWorkoutLogsReturn {
  logs: WorkoutLog[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  addLog: (
    workoutId: string,
    workoutName: string,
    duration: number,
    caloriesBurned: number,
    exerciseCount: number
  ) => Promise<WorkoutLog>;
}

export const useWorkoutLogs = (): UseWorkoutLogsReturn => {
  const { user } = useAuth();
  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      const logsData = await getWorkoutLogs(user.uid);
      setLogs(logsData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch logs';
      setError(errorMessage);
      console.error('Error fetching logs:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const addLog = useCallback(
    async (
      workoutId: string,
      workoutName: string,
      duration: number,
      caloriesBurned: number,
      exerciseCount: number
    ) => {
      if (!user) throw new Error('No user logged in');

      try {
        setError(null);
        const newLog = await logWorkoutCompletion(
          user.uid,
          workoutId,
          workoutName,
          duration,
          caloriesBurned,
          exerciseCount
        );
        setLogs((prev) => [newLog, ...prev]);
        return newLog;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to log workout';
        setError(errorMessage);
        throw err;
      }
    },
    [user]
  );

  return {
    logs,
    loading,
    error,
    refetch: fetchLogs,
    addLog,
  };
};
