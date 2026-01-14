'use client';

import React, { useState } from 'react';
import { Exercise } from '@/types';
import { X, Edit, Trash2 } from 'lucide-react';

interface ExerciseDetailModalProps {
  isOpen: boolean;
  exercise: Exercise | null;
  onClose: () => void;
  onEdit: (exercise: Exercise) => void;
  onDelete: (exerciseId: string) => Promise<void>;
}

const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({
  isOpen,
  exercise,
  onClose,
  onEdit,
  onDelete,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!exercise) return;
    if (window.confirm(`Delete "${exercise.name}"?`)) {
      try {
        setIsDeleting(true);
        await onDelete(exercise.id);
        onClose();
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (!isOpen || !exercise) return null;

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg shadow-xl max-w-2xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">{exercise.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          {exercise.description && (
            <div>
              <p className="text-slate-400 text-base">{exercise.description}</p>
            </div>
          )}

          {/* Difficulty */}
          <div>
            <p className="text-sm font-medium text-slate-300 mb-2">Difficulty</p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                exercise.difficulty
              )}`}
            >
              {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
            </span>
          </div>

          {/* Muscle Groups */}
          {exercise.muscleGroups.length > 0 && (
            <div>
              <p className="text-sm font-medium text-slate-300 mb-2">Muscle Groups</p>
              <div className="flex flex-wrap gap-2">
                {exercise.muscleGroups.map((group) => (
                  <span
                    key={group}
                    className="px-3 py-1 bg-slate-700 text-slate-300 text-xs rounded border border-slate-600"
                  >
                    {group}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          {exercise.instructions && (
            <div>
              <p className="text-sm font-medium text-slate-300 mb-2">Instructions</p>
              <p className="text-slate-400 text-sm leading-relaxed">{exercise.instructions}</p>
            </div>
          )}

          {/* Default Reps & Sets */}
          {(exercise.defaultSets || exercise.defaultReps) && (
            <div>
              <p className="text-sm font-medium text-slate-300 mb-2">Default Configuration</p>
              <div className="flex gap-6">
                {exercise.defaultSets && (
                  <div>
                    <p className="text-xs text-slate-400">Sets</p>
                    <p className="text-lg font-semibold text-white">{exercise.defaultSets}</p>
                  </div>
                )}
                {exercise.defaultReps && (
                  <div>
                    <p className="text-xs text-slate-400">Reps</p>
                    <p className="text-lg font-semibold text-white">{exercise.defaultReps}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-700">
            <span>
              Created: {new Date(exercise.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            {exercise.aiGenerated && <span className="text-blue-400">AI Generated</span>}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 border-t border-slate-700">
          <button
            onClick={() => onEdit(exercise)}
            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
          >
            <Edit className="w-5 h-5" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-3 bg-red-600/10 hover:bg-red-600/20 border border-red-600/20 text-red-400 font-medium rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetailModal;
