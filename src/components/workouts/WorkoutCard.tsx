'use client';

import React from 'react';
import { Workout } from '@/types';
import { Zap, Clock, Play } from 'lucide-react';
import Link from 'next/link';

interface WorkoutCardProps {
  workout: Workout;
  onViewDetail?: (workout: Workout) => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onViewDetail }) => {

  const getDurationColor = (duration: string) => {
    switch (duration) {
      case 'short':
        return { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' };
      case 'medium':
        return { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' };
      case 'long':
        return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' };
      default:
        return { bg: 'bg-slate-600/10', text: 'text-slate-400', border: 'border-slate-600/20' };
    }
  };

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

  const colors = getDurationColor(workout.duration);

  return (
    <div 
      onClick={() => onViewDetail?.(workout)}
      className="bg-slate-800 rounded-lg border border-slate-700 hover:border-blue-500/50 transition p-6 group cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="bg-blue-500/10 p-3 rounded-lg">
            <Zap className="w-5 h-5 text-blue-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition">
              {workout.name}
            </h3>
            {workout.description && (
              <p className="text-sm text-slate-400 mt-1 line-clamp-2">{workout.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Duration */}
      <div className="mb-4 flex items-center gap-2">
        <Clock className="w-4 h-4 text-slate-400" />
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${colors.bg} ${colors.text} ${colors.border}`}
        >
          {workout.duration.charAt(0).toUpperCase() + workout.duration.slice(1)} (
          {getDurationLabel(workout.duration)})
        </span>
      </div>

      {/* Exercises List */}
      <div className="mb-4">
        <p className="text-xs font-medium text-slate-300 uppercase mb-2">
          Exercises ({workout.exercises.length})
        </p>
        <div className="space-y-2">
          {workout.exercises.map((ex, idx) => (
            <div key={idx} className="p-2 bg-slate-700/50 rounded border border-slate-600/50">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">{ex.exerciseName}</p>
                <span className="text-xs text-slate-400">
                  {ex.sets}x{ex.reps}
                  {ex.weight && ` @ ${ex.weight}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Meta Info */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pt-4 border-t border-slate-700">
        <span>
          {new Date(workout.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Link
          href={`/workouts/${workout.id}/run`}
          className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition flex items-center justify-center gap-2 text-sm"
        >
          <Play className="w-4 h-4" />
          Start Workout
        </Link>
      </div>
    </div>
  );
};

export default WorkoutCard;
