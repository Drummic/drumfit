// ============================================================================
// Filename: page.tsx (Workouts Page)
// Path: /src/app/workouts/page.tsx
// Created At: January 11, 2026
// From: Development Team
// Changed At: N/A
// Functional Description: Main workouts management page showing exercises and workouts
// with tabs for managing exercises and creating/editing workouts
// Dependencies: React, useWorkout hook, useExercise hook, useAuth, components
// Used In: Main workouts feature accessible from dashboard
// ============================================================================

'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useExercise } from '@/hooks/useExercise';
import { useWorkout } from '@/hooks/useWorkout';
import ProtectedRoute from '@/components/ProtectedRoute';
import CreateExerciseModal from '@/components/exercises/CreateExerciseModal';
import CreateWorkoutModal from '@/components/workouts/CreateWorkoutModal';
import ExerciseCard from '@/components/exercises/ExerciseCard';
import WorkoutCard from '@/components/workouts/WorkoutCard';
import { Plus, Dumbbell, ArrowLeft, Zap } from 'lucide-react';
import Link from 'next/link';

/**
 * WorkoutsPage Component
 * Protected page for managing workouts and exercises
 */
export default function WorkoutsPage() {
  const { user, logout } = useAuth();
  const {
    exercises,
    muscleGroups,
    loading: exerciseLoading,
    addExercise,
    removeExercise,
  } = useExercise();
  const { workouts, loading: workoutLoading, addWorkout, removeWorkout } = useWorkout();

  const [activeTab, setActiveTab] = useState<'exercises' | 'workouts'>('exercises');
  const [isCreateExerciseModalOpen, setIsCreateExerciseModalOpen] = useState(false);
  const [isCreateWorkoutModalOpen, setIsCreateWorkoutModalOpen] = useState(false);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string | null>(null);
  const [isSeedingExercises, setIsSeedingExercises] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSeedExercises = async () => {
    if (!user) return;
    setIsSeedingExercises(true);
    try {
      const exercises = [
        {
          name: 'Pushups',
          description: 'Bodyweight pushups for chest, shoulders, and triceps',
          muscleGroups: ['chest', 'shoulders', 'triceps'],
          equipment: 'none',
          difficulty: 'beginner' as const,
          userId: user.uid,
          aiGenerated: false
        },
        {
          name: 'Chair Dips',
          description: 'Tricep dips using a chair for upper body strength',
          muscleGroups: ['triceps', 'shoulders'],
          equipment: 'none',
          difficulty: 'beginner' as const,
          userId: user.uid,
          aiGenerated: false
        }
      ];

      for (const exercise of exercises) {
        await addExercise(exercise);
      }

      alert('✅ Exercises created successfully!');
    } catch (error) {
      alert(`❌ Error: ${error instanceof Error ? error.message : 'Failed to create exercises'}`);
    } finally {
      setIsSeedingExercises(false);
    }
  };

  // Filter exercises by selected muscle group
  const filteredExercises =
    selectedMuscleGroup === null
      ? exercises
      : exercises.filter((ex) => ex.muscleGroups.includes(selectedMuscleGroup));

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800">
        {/* Header */}
        <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="p-2 hover:bg-slate-700 rounded-lg transition">
                <ArrowLeft className="w-5 h-5 text-slate-300" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-6 h-6 text-yellow-500" />
                  Manage Workouts
                </h1>
                <p className="text-slate-400 text-sm">Build and manage your custom workouts</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-300"
              >
                ⎋
              </button>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="bg-slate-800 border-b border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-8">
            <button
              onClick={() => setActiveTab('exercises')}
              className={`py-4 px-2 font-medium border-b-2 transition ${
                activeTab === 'exercises'
                  ? 'border-green-500 text-green-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5" />
                Exercises ({exercises.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('workouts')}
              className={`py-4 px-2 font-medium border-b-2 transition ${
                activeTab === 'workouts'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Workouts ({workouts.length})
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'exercises' && (
            <>
              {/* Exercises Tab */}
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">My Exercises</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSeedExercises}
                    disabled={isSeedingExercises}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSeedingExercises ? 'Seeding...' : 'Quick Add (Pushups & Dips)'}
                  </button>
                  <button
                    onClick={() => setIsCreateExerciseModalOpen(true)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Exercise
                  </button>
                </div>
              </div>

              {/* Muscle Group Filters */}
              {muscleGroups.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedMuscleGroup(null)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      selectedMuscleGroup === null
                        ? 'bg-green-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    All ({exercises.length})
                  </button>
                  {muscleGroups.map((group) => (
                    <button
                      key={group}
                      onClick={() => setSelectedMuscleGroup(group)}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        selectedMuscleGroup === group
                          ? 'bg-green-600 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {group} ({exercises.filter((e) => e.muscleGroups.includes(group)).length})
                    </button>
                  ))}
                </div>
              )}

              {/* Exercises List */}
              {exerciseLoading ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-slate-300">Loading exercises...</p>
                </div>
              ) : filteredExercises.length === 0 ? (
                <div className="bg-slate-800 rounded-lg border border-slate-700 p-12 text-center">
                  <Dumbbell className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No exercises yet</h3>
                  <p className="text-slate-400 mb-6">
                    {selectedMuscleGroup
                      ? `No exercises found for ${selectedMuscleGroup}`
                      : 'Create your first custom exercise to get started'}
                  </p>
                  <button
                    onClick={() => setIsCreateExerciseModalOpen(true)}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition inline-flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Exercise
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredExercises.map((exercise) => (
                    <ExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      onDelete={() => removeExercise(exercise.id)}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'workouts' && (
            <>
              {/* Workouts Tab */}
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">My Workouts</h2>
                <button
                  onClick={() => setIsCreateWorkoutModalOpen(true)}
                  disabled={exercises.length === 0}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition flex items-center gap-2"
                  title={exercises.length === 0 ? 'Create exercises first' : ''}
                >
                  <Plus className="w-5 h-5" />
                  Create Workout
                </button>
              </div>

              {/* Workouts List */}
              {workoutLoading ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-slate-300">Loading workouts...</p>
                </div>
              ) : workouts.length === 0 ? (
                <div className="bg-slate-800 rounded-lg border border-slate-700 p-12 text-center">
                  <Zap className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No workouts yet</h3>
                  <p className="text-slate-400 mb-6">
                    {exercises.length === 0
                      ? 'Create some exercises first, then build your workouts'
                      : 'Create your first workout by combining exercises'}
                  </p>
                  {exercises.length > 0 && (
                    <button
                      onClick={() => setIsCreateWorkoutModalOpen(true)}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition inline-flex items-center gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      Create Workout
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {workouts.map((workout) => (
                    <WorkoutCard
                      key={workout.id}
                      workout={workout}
                      onDelete={() => removeWorkout(workout.id)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </main>

        {/* Modals */}
        <CreateExerciseModal
          isOpen={isCreateExerciseModalOpen}
          onClose={() => setIsCreateExerciseModalOpen(false)}
          onExerciseCreated={addExercise}
        />

        <CreateWorkoutModal
          isOpen={isCreateWorkoutModalOpen}
          onClose={() => setIsCreateWorkoutModalOpen(false)}
          onWorkoutCreated={addWorkout}
          exercises={exercises}
        />
      </div>
    </ProtectedRoute>
  );
}
