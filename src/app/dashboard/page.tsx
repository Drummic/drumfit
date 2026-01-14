// ============================================================================
// Filename: page.tsx (Dashboard Page)
// Path: /src/app/dashboard/page.tsx
// Created At: January 11, 2026
// From: Development Team
// Changed At: N/A
// Functional Description: Main dashboard page showing user overview, workout stats,
// recent activities, and navigation to main features (exercises, workouts, meals)
// Dependencies: React, useAuth context, ProtectedRoute component, lucide-react
// Used In: Main app view after user authentication
// ============================================================================

'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useWorkout } from '@/hooks/useWorkout';
import { useWorkoutLogs } from '@/hooks/useWorkoutLogs';
import ProtectedRoute from '@/components/ProtectedRoute';
import ActivityListView from '@/components/activities/ActivityListView';
import ActivityCalendarView from '@/components/activities/ActivityCalendarView';
import ActivityDetails from '@/components/activities/ActivityDetails';
import { StatsOverview } from '@/components/activities/StatsOverview';
import { Utensils, LogOut, Zap, List, Calendar as CalendarIcon } from 'lucide-react';
import { WorkoutLog } from '@/services/workoutLogService';
import Link from 'next/link';

/**
 * DashboardPage Component
 * Protected page visible only to authenticated users
 */
export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { workouts } = useWorkout();
  const { logs } = useWorkoutLogs();
  const [activityView, setActivityView] = useState<'list' | 'calendar'>('list');
  const [selectedLog, setSelectedLog] = useState<WorkoutLog | null>(null);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800">
        {/* Header */}
        <header className="bg-slate-800 border-b border-slate-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Drum Fit</h1>
              <p className="text-slate-400 text-sm">AI-Powered Fitness Tracking</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white font-medium">{user?.name || 'User'}</p>
                <p className="text-slate-400 text-sm">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-300 hover:text-white"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Welcome Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Welcome back, {user?.name?.split(' ')[0] || 'User'}!
            </h2>
            <p className="text-slate-400 text-lg">Let's work towards your fitness goals today.</p>
          </section>

          {/* Quick Stats Grid - Clickable Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Workouts Card */}
            <Link
              href="/workouts"
              className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-blue-500 hover:bg-slate-700 transition cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Workouts</h3>
                <div className="bg-blue-500/10 p-3 rounded-lg group-hover:bg-blue-500/20 transition">
                  <Zap className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <p className="text-3xl font-bold text-white mb-2">{workouts.length}</p>
              <p className="text-slate-400 text-sm">Create, change, and delete</p>
            </Link>

            {/* Meals Card */}
            <Link
              href="/meals"
              className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-orange-500 hover:bg-slate-700 transition cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Meals</h3>
                <div className="bg-orange-500/10 p-3 rounded-lg group-hover:bg-orange-500/20 transition">
                  <Utensils className="w-6 h-6 text-orange-500" />
                </div>
              </div>
              <p className="text-3xl font-bold text-white mb-2">0</p>
              <p className="text-slate-400 text-sm">Manage meal plans</p>
            </Link>
          </div>

          {/* Workout Statistics Section */}
          <section className="mb-12">
            <h3 className="text-xl font-bold text-white mb-6">Workout Statistics</h3>
            <StatsOverview />
          </section>

          {/* Recent Activity Section */}
          <section className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Recent Activities</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setActivityView('list')}
                  className={`p-2 rounded-lg transition ${
                    activityView === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                  title="List View"
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActivityView('calendar')}
                  className={`p-2 rounded-lg transition ${
                    activityView === 'calendar'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                  title="Calendar View"
                >
                  <CalendarIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {activityView === 'list' ? (
              <ActivityListView logs={logs} onSelectLog={setSelectedLog} />
            ) : (
              <ActivityCalendarView logs={logs} onSelectLog={setSelectedLog} />
            )}
          </section>

          {/* Activity Details Modal */}
          <ActivityDetails log={selectedLog} onClose={() => setSelectedLog(null)} />
        </main>
      </div>
    </ProtectedRoute>
  );
}
