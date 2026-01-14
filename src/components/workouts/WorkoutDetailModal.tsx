'use client';

import React from 'react';
import { Workout } from '@/types';
import { X, Play } from 'lucide-react';
import Link from 'next/link';

interface WorkoutDetailModalProps {
  isOpen: boolean;
  workout: Workout | null;
  onClose: () => void;
  onExerciseClick?: (exerciseName: string) => void;
}

const WorkoutDetailModal: React.FC<WorkoutDetailModalProps> = ({
  isOpen,
  workout,
  onClose,
  onExerciseClick,
}) => {

  if (!isOpen || !workout) return null;

  const getDurationLabel = (duration: string) => {
    switch (duration) {
      case 'short':
        return '15-30 min';
      case 'medium':
        return '30-60 min';
      case 'long':
        return '60+ min';
      default:
        return duration;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg shadow-xl max-w-2xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">{workout.name}</h2>
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
          {workout.description && (
            <div>
              <p className="text-slate-400 text-base">{workout.description}</p>
            </div>
          )}

          {/* Duration */}
          <div>
            <p className="text-sm font-medium text-slate-300 mb-2">Duration</p>
            <p className="text-slate-300 capitalize">
              {workout.duration.charAt(0).toUpperCase() + workout.duration.slice(1)} (
              {getDurationLabel(workout.duration)})
            </p>
          </div>

          {/* Exercises */}
          <div>
            <p className="text-sm font-medium text-slate-300 mb-3">Exercises ({workout.exercises.length})</p>
            <div className="space-y-2">
              {workout.exercises.map((ex, idx) => (
                <div 
                  key={idx} 
                  onClick={() => onExerciseClick?.(ex.exerciseName)}
                  className="p-3 bg-slate-700/50 rounded border border-slate-600/50 flex items-center justify-between cursor-pointer hover:bg-slate-700 hover:border-blue-500/50 transition"
                >
                  <p className="text-white font-medium">{ex.exerciseName}</p>
                  <span className="text-xs text-slate-400">
                    {ex.sets}x{ex.reps}
                    {ex.weight && ` @ ${ex.weight}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Meta */}
          <p className="text-xs text-slate-500 pt-4 border-t border-slate-700">
            Created: {new Date(workout.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-slate-700">
          <Link
            href={`/workouts/${workout.id}/run`}
            className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            Start Workout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailModal;
