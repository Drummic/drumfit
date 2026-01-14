// ============================================================================
// Filename: CreateExerciseModal.tsx
// Path: /src/components/exercises/CreateExerciseModal.tsx
// Created At: January 11, 2026
// From: Development Team
// Changed At: N/A
// Functional Description: Modal form for creating new custom exercises with
// validation, muscle group selection, and difficulty level configuration
// Dependencies: React, React Hook Form, Zod, lucide-react
// Used In: Exercises page and dashboard
// ============================================================================

'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Plus } from 'lucide-react';
import { Exercise } from '@/types';

const MUSCLE_GROUPS = [
  'Chest',
  'Back',
  'Shoulders',
  'Biceps',
  'Triceps',
  'Forearms',
  'Legs',
  'Quads',
  'Hamstrings',
  'Glutes',
  'Calves',
  'Core',
  'Abs',
  'Cardio',
];

const createExerciseSchema = z.object({
  name: z.string().min(2, 'Exercise name must be at least 2 characters'),
  description: z.string().optional(),
  instructions: z.string().optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  defaultReps: z.number().int().positive('Reps must be a positive number').optional(),
  defaultSets: z.number().int().positive('Sets must be a positive number').optional(),
});

type CreateExerciseFormData = z.infer<typeof createExerciseSchema>;

interface CreateExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExerciseCreated: (
    exerciseData: Omit<Exercise, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<Exercise>;
}

/**
 * CreateExerciseModal Component
 */
const CreateExerciseModal: React.FC<CreateExerciseModalProps> = ({
  isOpen,
  onClose,
  onExerciseCreated,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<string[]>(['Legs', 'Glutes', 'Core']);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CreateExerciseFormData>({
    resolver: zodResolver(createExerciseSchema),
    defaultValues: {
      name: 'Air Squats',
      description: 'Medium deep squats without any additional weight',
      instructions:
        'Do 3 sets of 15 slow squats with 3 seconds down and rapid up. 30 second pause between sets.',
      difficulty: 'beginner',
      defaultSets: 3,
      defaultReps: 12,
    },
  });

  const difficulty = watch('difficulty');

  const handleMuscleGroupToggle = (group: string) => {
    setSelectedGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );
  };

  const onSubmit = async (data: CreateExerciseFormData) => {
    try {
      setIsLoading(true);

      if (selectedGroups.length === 0) {
        console.warn('⚠️ No muscle groups selected');
        alert('Please select at least one muscle group');
        setIsLoading(false);
        return;
      }

      const exerciseData: Omit<Exercise, 'id' | 'createdAt' | 'updatedAt' | 'userId'> = {
        name: data.name,
        description: data.description || undefined,
        instructions: data.instructions || undefined,
        difficulty: data.difficulty,
        muscleGroups: selectedGroups,
        aiGenerated: false,
      };

      await onExerciseCreated(exerciseData as any);
      // Reset form
      reset();
      setSelectedGroups([]);
      onClose();
    } catch (error) {
      alert('Failed to create exercise. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const wrappedOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-700 sticky top-0 bg-slate-800">
          <h2 className="text-2xl font-bold text-white">Create Exercise</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={wrappedOnSubmit} className="p-6 space-y-6">
          {/* Exercise Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-2">
              Exercise Name *
            </label>
            <input
              {...register('name')}
              type="text"
              id="name"
              placeholder="e.g., Bench Press"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition"
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
              placeholder="Brief description of the exercise..."
              rows={3}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition resize-none"
              disabled={isLoading}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>
            )}
          </div>

          {/* Instructions */}
          <div>
            <label htmlFor="instructions" className="block text-sm font-medium text-slate-200 mb-2">
              Instructions
            </label>
            <textarea
              {...register('instructions')}
              id="instructions"
              placeholder="Step-by-step instructions for proper form..."
              rows={3}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition resize-none"
              disabled={isLoading}
            />
            {errors.instructions && (
              <p className="mt-1 text-sm text-red-400">{errors.instructions.message}</p>
            )}
          </div>

          {/* Difficulty Level */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-3">
              Difficulty Level *
            </label>
            <div className="flex gap-4">
              {['beginner', 'intermediate', 'advanced'].map((level) => (
                <label key={level} className="flex items-center gap-2 cursor-pointer">
                  <input
                    {...register('difficulty')}
                    type="radio"
                    value={level}
                    className="w-4 h-4 text-green-600 bg-slate-700 border-slate-600 focus:ring-2 focus:ring-green-500"
                    disabled={isLoading}
                  />
                  <span className="text-slate-300 capitalize">{level}</span>
                </label>
              ))}
            </div>
            {errors.difficulty && (
              <p className="mt-1 text-sm text-red-400">{errors.difficulty.message}</p>
            )}
          </div>

          {/* Muscle Groups */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-3">
              Muscle Groups * ({selectedGroups.length} selected)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {MUSCLE_GROUPS.map((group) => (
                <button
                  key={group}
                  type="button"
                  onClick={() => handleMuscleGroupToggle(group)}
                  disabled={isLoading}
                  className={`px-3 py-2 rounded-lg font-medium transition ${
                    selectedGroups.includes(group)
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {group}
                </button>
              ))}
            </div>
            {selectedGroups.length === 0 && (
              <p className="mt-1 text-sm text-red-400">Select at least one muscle group</p>
            )}
          </div>

          {/* Default Sets and Reps */}
          <div className="grid grid-cols-2 gap-4">
            {/* Default Sets */}
            <div>
              <label htmlFor="defaultSets" className="block text-sm font-medium text-slate-200 mb-2">
                Default Sets
              </label>
              <input
                {...register('defaultSets', { valueAsNumber: true })}
                type="number"
                id="defaultSets"
                min="1"
                max="10"
                placeholder="3"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition"
                disabled={isLoading}
              />
              {errors.defaultSets && (
                <p className="mt-1 text-sm text-red-400">{errors.defaultSets.message}</p>
              )}
            </div>

            {/* Default Reps */}
            <div>
              <label htmlFor="defaultReps" className="block text-sm font-medium text-slate-200 mb-2">
                Default Reps
              </label>
              <input
                {...register('defaultReps', { valueAsNumber: true })}
                type="number"
                id="defaultReps"
                min="1"
                max="100"
                placeholder="12"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition"
                disabled={isLoading}
              />
              {errors.defaultReps && (
                <p className="mt-1 text-sm text-red-400">{errors.defaultReps.message}</p>
              )}
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
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Create Exercise
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExerciseModal;
