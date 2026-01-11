// ============================================================================
// Filename: StatsOverview.tsx
// Path: /src/components/activities/StatsOverview.tsx
// Created At: January 11, 2026
// From: Development Team
// Changed At: N/A
// Functional Description: Component to display workout statistics overview
// Dependencies: useWorkoutStats, lucide-react
// Used In: Dashboard, Stats page
// ============================================================================

'use client';

import { useWorkoutStats } from '@/hooks/useWorkoutStats';
import { formatDuration } from '@/services/workoutStatsService';
import {
  Clock,
  Flame,
  Dumbbell,
  TrendingUp,
  Zap,
  Calendar,
} from 'lucide-react';

export const StatsOverview = () => {
  const { stats, loading } = useWorkoutStats();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-slate-800 rounded-lg p-4 animate-pulse h-20" />
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-8 text-slate-400">
        No workout data yet. Start your first workout!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Workouts */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6 border border-blue-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm font-medium mb-1">Total Workouts</p>
              <p className="text-3xl font-bold text-white">{stats.totalWorkouts}</p>
            </div>
            <Dumbbell className="w-10 h-10 text-blue-300" />
          </div>
        </div>

        {/* Total Duration */}
        <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-6 border border-purple-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-200 text-sm font-medium mb-1">Total Time</p>
              <p className="text-3xl font-bold text-white">
                {formatDuration(stats.totalDuration)}
              </p>
            </div>
            <Clock className="w-10 h-10 text-purple-300" />
          </div>
        </div>

        {/* Total Calories */}
        <div className="bg-gradient-to-br from-orange-900 to-orange-800 rounded-lg p-6 border border-orange-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-200 text-sm font-medium mb-1">Calories Burned</p>
              <p className="text-3xl font-bold text-white">{stats.totalCalories}</p>
            </div>
            <Flame className="w-10 h-10 text-orange-300" />
          </div>
        </div>

        {/* Current Streak */}
        <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-lg p-6 border border-red-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-200 text-sm font-medium mb-1">Current Streak</p>
              <p className="text-3xl font-bold text-white">{stats.streakDays} days</p>
            </div>
            <Zap className="w-10 h-10 text-red-300" />
          </div>
        </div>

        {/* This Week */}
        <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-6 border border-green-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-200 text-sm font-medium mb-1">This Week</p>
              <p className="text-3xl font-bold text-white">{stats.workoutsThisWeek}</p>
            </div>
            <Calendar className="w-10 h-10 text-green-300" />
          </div>
        </div>

        {/* Longest Workout */}
        <div className="bg-gradient-to-br from-indigo-900 to-indigo-800 rounded-lg p-6 border border-indigo-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-200 text-sm font-medium mb-1">Longest Workout</p>
              <p className="text-3xl font-bold text-white">
                {formatDuration(stats.longestWorkout)}
              </p>
            </div>
            <TrendingUp className="w-10 h-10 text-indigo-300" />
          </div>
        </div>
      </div>

      {/* Secondary Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Average Duration */}
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-slate-400 text-sm font-medium mb-2">Average Duration</p>
          <p className="text-2xl font-bold text-white">
            {formatDuration(stats.averageDuration)}
          </p>
        </div>

        {/* Average Calories */}
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-slate-400 text-sm font-medium mb-2">Average Calories</p>
          <p className="text-2xl font-bold text-white">{stats.averageCalories}</p>
        </div>

        {/* This Month */}
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-slate-400 text-sm font-medium mb-2">This Month</p>
          <p className="text-2xl font-bold text-white">{stats.workoutsThisMonth}</p>
        </div>
      </div>
    </div>
  );
};
