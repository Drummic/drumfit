// ============================================================================
// Filename: ExerciseCard.tsx
// Path: /src/components/exercises/ExerciseCard.tsx
// Created At: January 11, 2026
// From: Development Team
// Changed At: N/A
// Functional Description: Card component displaying individual exercise details
// with options to edit and delete exercises
// Dependencies: React, Exercise type, lucide-react
// Used In: Exercises list page
// ============================================================================

'use client';

import React from 'react';
import { Exercise } from '@/types';
import { Dumbbell } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  onEdit?: (exercise: Exercise) => void;
  onViewDetail?: (exercise: Exercise) => void;
}

/**
 * ExerciseCard Component
 * Displays exercise information in a card format
 */
const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onEdit, onViewDetail }) => {

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'intermediate':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'advanced':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-slate-600/10 text-slate-400 border-slate-600/20';
    }
  };

  return (
    <div 
      onClick={() => onViewDetail?.(exercise)}
      className="bg-slate-800 rounded-lg border border-slate-700 hover:border-green-500/50 transition p-6 group cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="bg-green-500/10 p-3 rounded-lg">
            <Dumbbell className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition">
              {exercise.name}
            </h3>
            {exercise.description && (
              <p className="text-sm text-slate-400 mt-1 line-clamp-2">{exercise.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Difficulty */}
      <div className="mb-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
            exercise.difficulty
          )}`}
        >
          {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
        </span>
      </div>

      {/* Muscle Groups */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {exercise.muscleGroups.map((group) => (
            <span
              key={group}
              className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded border border-slate-600"
            >
              {group}
            </span>
          ))}
        </div>
      </div>

      {/* Instructions Preview */}
      {exercise.instructions && (
        <div className="mb-4 p-3 bg-slate-700/50 rounded border border-slate-600/50">
          <p className="text-xs font-medium text-slate-300 uppercase mb-1">Instructions</p>
          <p className="text-sm text-slate-400 line-clamp-2">{exercise.instructions}</p>
        </div>
      )}

      {/* Meta Info */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pt-4 border-t border-slate-700">
        <span>
          {new Date(exercise.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
        {exercise.aiGenerated && <span className="text-blue-400">AI Generated</span>}
      </div>
    </div>
  );
};

export default ExerciseCard;
