// ============================================================================
// Filename: EditWorkoutModal.tsx
// Path: /src/components/workouts/EditWorkoutModal.tsx
// Created At: January 14, 2026
// From: Development Team
// Changed At: N/A
// Functional Description: Modal form for editing existing workouts with
// exercise selection and configuration
// Dependencies: React, React Hook Form, Zod, lucide-react
// Used In: Workouts page
// ============================================================================

'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Plus, Trash2 } from 'lucide-react';
import { Workout, WorkoutExercise, Exercise } from '@/types';

const editWorkoutSchema = z.object({
  name: z.string().min(2, 'Workout name must be at least 2 characters'),
  description: z.string().optional(),
  duration: z.enum(['short', 'medium', 'long']),
});

type EditWorkoutFormData = z.infer<typeof editWorkoutSchema>;

interface EditWorkoutModalProps {
  isOpen: boolean;
  workout: Workout | null;
  exercises: Exercise[];
  onClose: () => void;
  onWorkoutUpdated: (workoutId: string, workoutData: Partial<Workout>) => Promise<void>;
  onDelete?: (workoutId: string) => Promise<void>;
}

/**
 * EditWorkoutModal Component
 */
const EditWorkoutModal: React.FC<EditWorkoutModalProps> = ({
  isOpen,
  workout,
  exercises,
  onClose,
  onWorkoutUpdated,
  onDelete,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteConfirming, setIsDeleteConfirming] = useState(false);
  const [isAddExerciseModalOpen, setIsAddExerciseModalOpen] = useState(false);
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>('');
  const [selectedSets, setSelectedSets] = useState<number>(3);
  const [selectedReps, setSelectedReps] = useState<number>(12);
  const [selectedTimeValue, setSelectedTimeValue] = useState<number>(45);
  const [selectedTimeUnit, setSelectedTimeUnit] = useState<'seconds' | 'minutes'>('seconds');
  const [useTime, setUseTime] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditWorkoutFormData>({
    resolver: zodResolver(editWorkoutSchema),
  });

  // Initialize form with workout data when it opens
  useEffect(() => {
    if (isOpen && workout) {
      reset({
        name: workout.name,
        description: workout.description,
        duration: workout.duration,
      });
      setWorkoutExercises(workout.exercises);
    }
  }, [isOpen, workout, reset]);

  const addExercise = () => {
    if (!selectedExerciseId) {
      alert('Please select an exercise');
      return;
    }

    const exercise = exercises.find((ex) => ex.id === selectedExerciseId);
    if (!exercise) return;

    // Check if exercise already added
    if (workoutExercises.some((ex) => ex.exerciseId === selectedExerciseId)) {
      alert('This exercise is already added to the workout');
      return;
    }

    const newExercise: WorkoutExercise = {
      exerciseId: selectedExerciseId,
      exerciseName: exercise.name,
      sets: selectedSets,
      ...(useTime
        ? {
            timeValue: selectedTimeValue,
            timeUnit: selectedTimeUnit,
          }
        : {
            reps: selectedReps,
          }),
    };

    setWorkoutExercises([...workoutExercises, newExercise]);
    setSelectedExerciseId('');
    setIsAddExerciseModalOpen(false);
    // Reset to defaults
    setSelectedSets(3);
    setSelectedReps(12);
    setSelectedTimeValue(45);
    setSelectedTimeUnit('seconds');
    setUseTime(false);
  };

  const removeExercise = (exerciseId: string) => {
    setWorkoutExercises(workoutExercises.filter((ex) => ex.exerciseId !== exerciseId));
  };

  const updateExerciseReps = (exerciseId: string, reps: number) => {
    setWorkoutExercises(
      workoutExercises.map((ex) => (ex.exerciseId === exerciseId ? { ...ex, reps } : ex))
    );
  };

  const updateExerciseSets = (exerciseId: string, sets: number) => {
    setWorkoutExercises(
      workoutExercises.map((ex) => (ex.exerciseId === exerciseId ? { ...ex, sets } : ex))
    );
  };

  const onSubmit = async (data: EditWorkoutFormData) => {
    if (!workout) return;

    try {
      setIsLoading(true);

      if (workoutExercises.length === 0) {
        alert('Please add at least one exercise to the workout');
        setIsLoading(false);
        return;
      }

      const workoutData: Partial<Workout> = {
        name: data.name,
        description: data.description || undefined,
        duration: data.duration,
        exercises: workoutExercises,
      };

      await onWorkoutUpdated(workout.id, workoutData);
      onClose();
    } catch (error) {
      alert('Failed to update workout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!workout || !onDelete) return;
    
    if (!isDeleteConfirming) {
      setIsDeleteConfirming(true);
      return;
    }

    try {
      setIsLoading(true);
      await onDelete(workout.id);
      onClose();
    } catch (error) {
      alert('Failed to delete workout. Please try again.');
      setIsDeleteConfirming(false);
    } finally {
      setIsLoading(false);
    }
  };

  const wrappedOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  if (!isOpen || !workout) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-700 sticky top-0 bg-slate-800">
          <h2 className="text-2xl font-bold text-white">Edit Workout</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={wrappedOnSubmit} className="p-6 space-y-6">
          {/* Workout Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-2">
              Workout Name *
            </label>
            <input
              {...register('name')}
              type="text"
              id="name"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              disabled={isLoading}
            />
            {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-200 mb-2">
              Description
            </label>
            <textarea
              {...register('description')}
              id="description"
              rows={3}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition resize-none"
              disabled={isLoading}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>
            )}
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-3">Duration *</label>
            <div className="flex gap-4">
              {['short', 'medium', 'long'].map((dur) => (
                <label key={dur} className="flex items-center gap-2 cursor-pointer">
                  <input
                    {...register('duration')}
                    type="radio"
                    value={dur}
                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 focus:ring-2 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                  <span className="text-slate-300 capitalize">{dur}</span>
                </label>
              ))}
            </div>
            {errors.duration && (
              <p className="mt-1 text-sm text-red-400">{errors.duration.message}</p>
            )}
          </div>

          {/* Exercises Section */}
          <div className="space-y-4 p-4 bg-slate-700/30 rounded-lg border border-slate-700">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Exercises</h3>
                <button
                  type="button"
                  onClick={() => setIsAddExerciseModalOpen(true)}
                  disabled={isLoading}
                  className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition"
                  title="Add exercise"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Exercises List */}
              <div className="space-y-2">
                {workoutExercises.length === 0 ? (
                  <p className="text-sm text-slate-400 italic">No exercises added yet</p>
                ) : (
                  workoutExercises.map((ex) => (
                    <div
                      key={ex.exerciseId}
                      className="flex items-center justify-between p-3 bg-slate-600 rounded border border-slate-500"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{ex.exerciseName}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <label className="text-xs text-slate-300">Sets:</label>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={ex.sets}
                            onChange={(e) =>
                              updateExerciseSets(ex.exerciseId, parseInt(e.target.value) || 1)
                            }
                            className="w-12 px-2 py-1 bg-slate-700 border border-slate-500 rounded text-white text-xs focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        {ex.reps !== undefined ? (
                          <div className="flex items-center gap-2">
                            <label className="text-xs text-slate-300">Reps:</label>
                            <input
                              type="number"
                              min="1"
                              max="100"
                              value={ex.reps}
                              onChange={(e) =>
                                updateExerciseReps(ex.exerciseId, parseInt(e.target.value) || 1)
                              }
                              className="w-12 px-2 py-1 bg-slate-700 border border-slate-500 rounded text-white text-xs focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-300">{ex.timeValue}</span>
                            <span className="text-xs text-slate-400">{ex.timeUnit}</span>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeExercise(ex.exerciseId)}
                          className="p-1 text-red-400 hover:bg-red-600/20 rounded transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition"
            >
              Back
            </button>
            {onDelete && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isLoading}
                className={`flex-1 px-4 py-2 font-medium rounded-lg transition flex items-center justify-center gap-2 ${
                  isDeleteConfirming
                    ? 'bg-red-600 hover:bg-red-700 disabled:bg-red-700'
                    : 'bg-red-600 hover:bg-red-700 disabled:bg-slate-600 disabled:cursor-not-allowed'
                } text-white`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {isDeleteConfirming ? 'Confirm...' : 'Deleting...'}
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    {isDeleteConfirming ? 'Confirm Delete' : 'Delete'}
                  </>
                )}
              </button>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>Save</>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Add Exercise Modal */}
      {isAddExerciseModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg shadow-xl max-w-md w-full mx-4 p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Add Exercise</h3>
              <button
                onClick={() => {
                  setIsAddExerciseModalOpen(false);
                  setSelectedExerciseId('');
                }}
                className="p-1 hover:bg-slate-700 rounded transition text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Exercise Select */}
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Exercise
                </label>
                <select
                  value={selectedExerciseId}
                  onChange={(e) => setSelectedExerciseId(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                >
                  <option value="">Select an exercise...</option>
                  {exercises.map((ex) => (
                    <option key={ex.id} value={ex.id}>
                      {ex.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sets */}
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Sets
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={selectedSets}
                  onChange={(e) => setSelectedSets(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                />
              </div>

              {/* Time vs Reps Toggle */}
              <div>
                <label className="flex items-center gap-2 text-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useTime}
                    onChange={(e) => setUseTime(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-500 bg-slate-600"
                  />
                  <span className="text-sm font-medium">Use time instead of reps</span>
                </label>
              </div>

              {/* Reps or Time */}
              {useTime ? (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      Time Value
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="300"
                      value={selectedTimeValue}
                      onChange={(e) => setSelectedTimeValue(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      Unit
                    </label>
                    <select
                      value={selectedTimeUnit}
                      onChange={(e) => setSelectedTimeUnit(e.target.value as 'seconds' | 'minutes')}
                      className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                    >
                      <option value="seconds">Seconds</option>
                      <option value="minutes">Minutes</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Reps
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={selectedReps}
                    onChange={(e) => setSelectedReps(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                  />
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddExerciseModalOpen(false);
                    setSelectedExerciseId('');
                  }}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={addExercise}
                  disabled={!selectedExerciseId}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditWorkoutModal;
