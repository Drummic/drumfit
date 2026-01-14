// ============================================================================
// Filename: CreateMealModal.tsx
// Path: /src/components/meals/CreateMealModal.tsx
// Created At: January 14, 2026
// From: Development Team
// Changed At: N/A
// Functional Description: Modal form for creating new meal plans with
// validation and nutritional information
// Dependencies: React, React Hook Form, Zod, lucide-react
// Used In: Meals page
// ============================================================================

'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Plus } from 'lucide-react';
import { Meal } from '@/types';

const createMealSchema = z.object({
  name: z.string().min(2, 'Meal name must be at least 2 characters'),
  description: z.string().optional(),
  calories: z.number().int().positive('Calories must be a positive number'),
  protein: z.number().int().positive('Protein must be a positive number'),
  carbs: z.number().int().positive('Carbs must be a positive number'),
  fat: z.number().int().positive('Fat must be a positive number'),
  fiber: z.number().int().optional(),
});

type CreateMealFormData = z.infer<typeof createMealSchema>;

interface CreateMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMealCreated: (
    mealData: Omit<Meal, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<Meal>;
}

/**
 * CreateMealModal Component
 */
const CreateMealModal: React.FC<CreateMealModalProps> = ({
  isOpen,
  onClose,
  onMealCreated,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateMealFormData>({
    resolver: zodResolver(createMealSchema),
    defaultValues: {
      name: 'Grilled Chicken Salad',
      description: 'Healthy grilled chicken with mixed greens and vinaigrette',
      calories: 350,
      protein: 40,
      carbs: 15,
      fat: 12,
      fiber: 6,
    },
  });

  const onSubmit = async (data: CreateMealFormData) => {
    try {
      setIsLoading(true);

      const mealData: Omit<Meal, 'id' | 'createdAt' | 'updatedAt' | 'userId'> = {
        name: data.name,
        description: data.description || undefined,
        ingredients: [],
        macros: {
          calories: data.calories,
          protein: data.protein,
          carbs: data.carbs,
          fat: data.fat,
          fiber: data.fiber,
        },
        aiGenerated: false,
      };

      await onMealCreated(mealData as any);
      // Reset form
      reset();
      onClose();
    } catch (error) {
      alert('Failed to create meal. Please try again.');
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
          <h2 className="text-2xl font-bold text-white">Create Meal Plan</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={wrappedOnSubmit} className="p-6 space-y-6">
          {/* Meal Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-2">
              Meal Name *
            </label>
            <input
              {...register('name')}
              type="text"
              id="name"
              placeholder="e.g., Grilled Chicken Salad"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
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
              placeholder="Brief description of the meal..."
              rows={3}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition resize-none"
              disabled={isLoading}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>
            )}
          </div>

          {/* Nutritional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Nutritional Information</h3>
            
            {/* Calories */}
            <div>
              <label htmlFor="calories" className="block text-sm font-medium text-slate-200 mb-2">
                Calories *
              </label>
              <input
                {...register('calories', { valueAsNumber: true })}
                type="number"
                id="calories"
                min="0"
                placeholder="350"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
                disabled={isLoading}
              />
              {errors.calories && (
                <p className="mt-1 text-sm text-red-400">{errors.calories.message}</p>
              )}
            </div>

            {/* Protein, Carbs, Fat Grid */}
            <div className="grid grid-cols-3 gap-4">
              {/* Protein */}
              <div>
                <label htmlFor="protein" className="block text-sm font-medium text-slate-200 mb-2">
                  Protein (g) *
                </label>
                <input
                  {...register('protein', { valueAsNumber: true })}
                  type="number"
                  id="protein"
                  min="0"
                  placeholder="40"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
                  disabled={isLoading}
                />
                {errors.protein && (
                  <p className="mt-1 text-sm text-red-400">{errors.protein.message}</p>
                )}
              </div>

              {/* Carbs */}
              <div>
                <label htmlFor="carbs" className="block text-sm font-medium text-slate-200 mb-2">
                  Carbs (g) *
                </label>
                <input
                  {...register('carbs', { valueAsNumber: true })}
                  type="number"
                  id="carbs"
                  min="0"
                  placeholder="15"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
                  disabled={isLoading}
                />
                {errors.carbs && (
                  <p className="mt-1 text-sm text-red-400">{errors.carbs.message}</p>
                )}
              </div>

              {/* Fat */}
              <div>
                <label htmlFor="fat" className="block text-sm font-medium text-slate-200 mb-2">
                  Fat (g) *
                </label>
                <input
                  {...register('fat', { valueAsNumber: true })}
                  type="number"
                  id="fat"
                  min="0"
                  placeholder="12"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
                  disabled={isLoading}
                />
                {errors.fat && (
                  <p className="mt-1 text-sm text-red-400">{errors.fat.message}</p>
                )}
              </div>
            </div>

            {/* Fiber */}
            <div>
              <label htmlFor="fiber" className="block text-sm font-medium text-slate-200 mb-2">
                Fiber (g)
              </label>
              <input
                {...register('fiber', { valueAsNumber: true })}
                type="number"
                id="fiber"
                min="0"
                placeholder="6"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
                disabled={isLoading}
              />
              {errors.fiber && (
                <p className="mt-1 text-sm text-red-400">{errors.fiber.message}</p>
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
              className="flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Create Meal
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMealModal;
