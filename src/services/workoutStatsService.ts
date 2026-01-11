// ============================================================================
// Filename: workoutStatsService.ts
// Path: /src/services/workoutStatsService.ts
// Created At: January 11, 2026
// From: Development Team
// Changed At: N/A
// Functional Description: Service for calculating and retrieving workout statistics
// Dependencies: Firebase Firestore, workoutLogService
// Used In: Stats dashboard, activity tracking
// ============================================================================

import { WorkoutLog } from '@/services/workoutLogService';

export interface WorkoutStats {
  totalWorkouts: number;
  totalDuration: number; // seconds
  totalCalories: number;
  totalExercises: number;
  averageDuration: number; // seconds
  averageCalories: number;
  longestWorkout: number; // seconds
  workoutsThisWeek: number;
  workoutsThisMonth: number;
  streakDays: number;
}

/**
 * Calculate statistics from workout logs
 */
export const calculateWorkoutStats = (logs: WorkoutLog[]): WorkoutStats => {
  if (logs.length === 0) {
    return {
      totalWorkouts: 0,
      totalDuration: 0,
      totalCalories: 0,
      totalExercises: 0,
      averageDuration: 0,
      averageCalories: 0,
      longestWorkout: 0,
      workoutsThisWeek: 0,
      workoutsThisMonth: 0,
      streakDays: 0,
    };
  }

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const totalDuration = logs.reduce((sum, log) => sum + log.duration, 0);
  const totalCalories = logs.reduce((sum, log) => sum + log.caloriesBurned, 0);
  const totalExercises = logs.reduce((sum, log) => sum + log.exerciseCount, 0);
  const longestWorkout = Math.max(...logs.map((log) => log.duration), 0);

  const workoutsThisWeek = logs.filter(
    (log) => new Date(log.completedAt) >= weekAgo
  ).length;

  const workoutsThisMonth = logs.filter(
    (log) => new Date(log.completedAt) >= monthAgo
  ).length;

  // Calculate streak (consecutive days with workouts)
  const streakDays = calculateStreak(logs);

  return {
    totalWorkouts: logs.length,
    totalDuration,
    totalCalories,
    totalExercises,
    averageDuration: Math.round(totalDuration / logs.length),
    averageCalories: Math.round(totalCalories / logs.length),
    longestWorkout,
    workoutsThisWeek,
    workoutsThisMonth,
    streakDays,
  };
};

/**
 * Calculate consecutive day streak
 */
function calculateStreak(logs: WorkoutLog[]): number {
  if (logs.length === 0) return 0;

  // Sort logs by date (newest first)
  const sortedLogs = [...logs].sort(
    (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  );

  const uniqueDates = new Set<string>();
  sortedLogs.forEach((log) => {
    const date = new Date(log.completedAt).toDateString();
    uniqueDates.add(date);
  });

  const dates = Array.from(uniqueDates)
    .map((d) => new Date(d).getTime())
    .sort((a, b) => b - a);

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const date of dates) {
    const logDate = new Date(date);
    const daysDiff = Math.floor((currentDate.getTime() - logDate.getTime()) / (24 * 60 * 60 * 1000));

    if (daysDiff === 0 || daysDiff === 1) {
      streak++;
      currentDate = logDate;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Format duration in human readable format
 */
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  if (mins > 0) {
    return `${mins}m ${secs}s`;
  }
  return `${secs}s`;
};
