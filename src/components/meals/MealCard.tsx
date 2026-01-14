// ============================================================================
// Filename: MealCard.tsx
// Path: /src/components/meals/MealCard.tsx
// Created At: January 14, 2026
// From: Development Team
// Changed At: N/A
// Functional Description: Component to display a meal card with nutrition info
// and options to edit or delete
// Dependencies: React, lucide-react, Meal type
// Used In: Meals page
// ============================================================================

'use client';

import React from 'react';
import { Meal } from '@/types';
import { Trash2, Edit2, Utensils } from 'lucide-react';

interface MealCardProps {
  meal: Meal;
  onEdit: (meal: Meal) => void;
  onDelete: (id: string) => void;
}

/**
 * MealCard Component
 */
const MealCard: React.FC<MealCardProps> = ({ meal, onEdit, onDelete }) => {
  const handleDelete = () => {
    if (confirm(`Delete meal "${meal.name}"?`)) {
      onDelete(meal.id);
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-orange-500 transition">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="bg-orange-500/10 p-3 rounded-lg">
            <Utensils className="w-5 h-5 text-orange-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{meal.name}</h3>
            {meal.description && (
              <p className="text-sm text-slate-400 mt-1">{meal.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Nutrition Grid */}
      <div className="grid grid-cols-4 gap-3 mb-4 p-4 bg-slate-700/50 rounded-lg">
        <div>
          <p className="text-xs text-slate-400 uppercase font-semibold">Calories</p>
          <p className="text-lg font-bold text-white">{meal.macros.calories}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400 uppercase font-semibold">Protein</p>
          <p className="text-lg font-bold text-orange-400">{meal.macros.protein}g</p>
        </div>
        <div>
          <p className="text-xs text-slate-400 uppercase font-semibold">Carbs</p>
          <p className="text-lg font-bold text-amber-400">{meal.macros.carbs}g</p>
        </div>
        <div>
          <p className="text-xs text-slate-400 uppercase font-semibold">Fat</p>
          <p className="text-lg font-bold text-yellow-400">{meal.macros.fat}g</p>
        </div>
      </div>

      {/* Fiber */}
      {meal.macros.fiber && (
        <div className="mb-4 text-sm text-slate-400">
          Fiber: <span className="text-white font-semibold">{meal.macros.fiber}g</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4 border-t border-slate-700">
        <button
          onClick={() => onEdit(meal)}
          className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg transition flex items-center justify-center gap-2"
        >
          <Edit2 className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 text-sm font-medium rounded-lg transition flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default MealCard;
