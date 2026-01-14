// ============================================================================
// Filename: page.tsx (Exercises Page)
// Path: /src/app/exercises/page.tsx
// Created At: January 11, 2026
// From: Development Team
// Changed At: N/A
// Functional Description: Main exercises management page showing all user exercises
// organized by muscle groups, with options to create, edit, and delete exercises
// Dependencies: React, useExercise hook, useAuth, components, lucide-react
// Used In: Main exercises feature accessible from dashboard
// ============================================================================

'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useExercise } from '@/hooks/useExercise';
import ProtectedRoute from '@/components/ProtectedRoute';
import CreateExerciseModal from '@/components/exercises/CreateExerciseModal';
import EditExerciseModal from '@/components/exercises/EditExerciseModal';
import ExerciseDetailModal from '@/components/exercises/ExerciseDetailModal';
import ExerciseCard from '@/components/exercises/ExerciseCard';
import { Plus, Dumbbell, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Exercise } from '@/types';

/**
 * ExercisesPage Component
 * Protected page for managing exercises
 */
export default function ExercisesPage() {
  console.log('🏋️ ExercisesPage rendered');
  const { user, logout } = useAuth();
  const { exercises, muscleGroups, loading, error, addExercise, removeExercise, updateExerciseData } = useExercise();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string | null>(null);

  console.log(
    '📊 Page state - isCreateModalOpen:',
    isCreateModalOpen,
    'isEditModalOpen:',
    isEditModalOpen,
    'exercises:',
    exercises.length
  );

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleEditExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsEditModalOpen(true);
  };

  const handleExerciseUpdated = async (exerciseId: string, exerciseData: Partial<Exercise>) => {
    try {
      await updateExerciseData(exerciseId, exerciseData);
      setIsEditModalOpen(false);
      setSelectedExercise(null);
    } catch (error) {
      console.error('Failed to update exercise:', error);
    }
  };

  const handleViewExerciseDetail = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsDetailModalOpen(true);
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
                  <Dumbbell className="w-6 h-6 text-green-500" />
                  Exercises
                </h1>
                <p className="text-slate-400 text-sm">Manage your custom exercises</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Exercise
              </button>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-300"
              >
                ⎋
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
              {error}
            </div>
          )}

          {/* Muscle Groups Filter */}
          {muscleGroups.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
                Filter by Muscle Group
              </h3>
              <div className="flex flex-wrap gap-2">
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
                    {group} ({exercises.filter((ex) => ex.muscleGroups.includes(group)).length})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-300">Loading exercises...</p>
              </div>
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
                onClick={() => setIsCreateModalOpen(true)}
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
                  onEdit={handleEditExercise}
                  onViewDetail={handleEditExercise}
                />
              ))}
            </div>
          )}
        </main>

        {/* Create Exercise Modal */}
        <CreateExerciseModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onExerciseCreated={addExercise}
        />

        {/* Edit Exercise Modal */}
        <EditExerciseModal
          isOpen={isEditModalOpen}
          exercise={selectedExercise}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedExercise(null);
          }}
          onExerciseUpdated={handleExerciseUpdated}
          onDelete={removeExercise}
        />

        {/* Exercise Detail Modal */}
        <ExerciseDetailModal
          isOpen={isDetailModalOpen}
          exercise={selectedExercise}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedExercise(null);
          }}
          onEdit={(exercise) => {
            setSelectedExercise(exercise);
            setIsDetailModalOpen(false);
            setIsEditModalOpen(true);
          }}
          onDelete={removeExercise}
        />
      </div>
    </ProtectedRoute>
  );
}
