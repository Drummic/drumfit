// ============================================================================
// Filename: CreateWorkoutModal.tsx
// Path: /src/components/workouts/CreateWorkoutModal.tsx
// Created At: January 11, 2026
// From: Development Team
// Changed At: N/A
// Functional Description: Modal form for creating new workouts by selecting exercises,
// setting duration, and configuring sets/reps for each exercise
// Dependencies: React, React Hook Form, Zod, lucide-react
// Used In: Workouts page
// ============================================================================

'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Plus, Trash2 } from 'lucide-react';
import { Exercise, Workout, WorkoutExercise } from '@/types';

const createWorkoutSchema = z.object({
  name: z.string().min(2, 'Workout name must be at least 2 characters'),
  description: z.string().optional(),
  duration: z.enum(['short', 'medium', 'long']),
});

type CreateWorkoutFormData = z.infer<typeof createWorkoutSchema>;

interface CreateWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWorkoutCreated: (
    workoutData: Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<Workout>;
  exercises: Exercise[];
}

/**
 * CreateWorkoutModal Component
 */
const CreateWorkoutModal: React.FC<CreateWorkoutModalProps> = ({
  isOpen,
  onClose,
  onWorkoutCreated,
  exercises,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState<WorkoutExercise[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateWorkoutFormData>({
    resolver: zodResolver(createWorkoutSchema),
    defaultValues: {
      duration: 'medium',
    },
  });

  const onSubmit = async (data: CreateWorkoutFormData) => {
    try {
      console.log('🎯 CreateWorkoutModal.onSubmit - Starting');
      console.log('📋 Form data:', data);
      console.log('🏋️ Selected exercises:', selectedExercises);

      if (selectedExercises.length === 0) {
        console.warn('⚠️ No exercises selected');
        alert('Please select at least one exercise');
        return;
      }

      setIsLoading(true);

      const workoutData: Omit<Workout, 'id' | 'createdAt' | 'updatedAt'> = {
        userId: '',
        name: data.name,
        description: data.description || undefined,
        duration: data.duration,
        exercises: selectedExercises,
      };

      console.log('📤 Sending workout data:', workoutData);
      const result = await onWorkoutCreated(workoutData);
      console.log('✅ Workout created successfully:', result);

      // Reset form
      reset();
      setSelectedExercises([]);
      onClose();
    } catch (error) {
      console.error('❌ Error creating workout:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('📝 Error details:', errorMessage);
      alert(`Failed to create workout. Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleAddExercise = (exercise: Exercise) => {
    if (selectedExercises.find((e) => e.exerciseId === exercise.id)) {
      alert('This exercise is already added');
      return;
    }

    setSelectedExercises([
      ...selectedExercises,
      {
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        sets: 3,
        reps: 10,
      },
    ]);
  };

  const handleRemoveExercise = (exerciseId: string) => {
    setSelectedExercises(selectedExercises.filter((e) => e.exerciseId !== exerciseId));
  };

  const handleUpdateExercise = (exerciseId: string, field: string, value: any) => {
    setSelectedExercises(
      selectedExercises.map((e) => (e.exerciseId === exerciseId ? { ...e, [field]: value } : e))
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-700 sticky top-0 bg-slate-800">
          <h2 className="text-2xl font-bold text-white">Create Workout</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Workout Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-2">
              Workout Name *
            </label>
            <input
              {...register('name')}
              type="text"
              id="name"
              placeholder="e.g., Morning Upper Body, Evening Cardio"
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
              placeholder="Optional notes about this workout..."
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
              {['short', 'medium', 'long'].map((d) => (
                <label key={d} className="flex items-center gap-2 cursor-pointer">
                  <input
                    {...register('duration')}
                    type="radio"
                    value={d}
                    className="w-4 h-4 rounded-full"
                    disabled={isLoading}
                  />
                  <span className="text-slate-300 capitalize">
                    {d} ({d === 'short' ? '15-30 min' : d === 'medium' ? '30-60 min' : '60+ min'})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Exercise Selector */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-3">Add Exercises</label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="flex items-center justify-between p-3 bg-slate-700 rounded-lg border border-slate-600 hover:border-blue-500/50 transition"
                >
                  <div className="flex-1">
                    <p className="font-medium text-white">{exercise.name}</p>
                    <p className="text-xs text-slate-400">{exercise.muscleGroups.join(', ')}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddExercise(exercise)}
                    disabled={!!selectedExercises.find((e) => e.exerciseId === exercise.id)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded transition flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Exercises */}
          {selectedExercises.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-3">
                Workout Exercises ({selectedExercises.length})
              </label>
              <div className="space-y-3">
                {selectedExercises.map((ex, idx) => (
                  <div
                    key={ex.exerciseId}
                    className="p-4 bg-slate-700/50 rounded-lg border border-slate-600"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-medium text-white">{ex.exerciseName}</p>
                      <button
                        type="button"
                        onClick={() => handleRemoveExercise(ex.exerciseId)}
                        className="p-1 hover:bg-red-600/20 rounded text-red-400 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Sets</label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={ex.sets}
                          onChange={(e) =>
                            handleUpdateExercise(ex.exerciseId, 'sets', parseInt(e.target.value))
                          }
                          className="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Reps</label>
                        <input
                          type="number"
                          min="1"
                          max="50"
                          value={ex.reps}
                          onChange={(e) =>
                            handleUpdateExercise(ex.exerciseId, 'reps', parseInt(e.target.value))
                          }
                          className="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Weight (opt)</label>
                        <input
                          type="text"
                          placeholder="kg/lbs"
                          value={ex.weight || ''}
                          onChange={(e) =>
                            handleUpdateExercise(
                              ex.exerciseId,
                              'weight',
                              e.target.value || undefined
                            )
                          }
                          className="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Create Workout
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWorkoutModal;
