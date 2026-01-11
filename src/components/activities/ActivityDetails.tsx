'use client';

import React from 'react';
import { WorkoutLog } from '@/services/workoutLogService';
import { X, Clock, Flame, Dumbbell, Calendar } from 'lucide-react';

interface ActivityDetailsProps {
  log: WorkoutLog | null;
  onClose: () => void;
}

const ActivityDetails: React.FC<ActivityDetailsProps> = ({ log, onClose }) => {
  if (!log) return null;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${mins}m ${secs}s`;
    }
    return `${mins}m ${secs}s`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg border border-slate-700 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700 sticky top-0 bg-slate-800">
          <h2 className="text-xl font-bold text-white">Workout Summary</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-700 rounded-lg transition text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Workout Name */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{log.workoutName}</h3>
            <div className="flex items-center gap-2 text-slate-400">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{formatDate(log.completedAt)}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Duration */}
            <div className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <p className="text-slate-400 text-sm">Duration</p>
              </div>
              <p className="text-2xl font-bold text-white">{formatTime(log.duration)}</p>
            </div>

            {/* Calories */}
            <div className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <p className="text-slate-400 text-sm">Calories</p>
              </div>
              <p className="text-2xl font-bold text-white">{log.caloriesBurned}</p>
            </div>

            {/* Exercises */}
            <div className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Dumbbell className="w-4 h-4 text-green-500" />
                <p className="text-slate-400 text-sm">Exercises</p>
              </div>
              <p className="text-2xl font-bold text-white">{log.exerciseCount}</p>
            </div>

            {/* Intensity */}
            <div className="bg-slate-700 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-2">Intensity</p>
              <p className="text-xl font-bold text-white">
                {log.duration > 3600 ? '🔥 High' : log.duration > 1800 ? '💪 Medium' : '⚡ Quick'}
              </p>
            </div>
          </div>

          {/* Stats Text */}
          <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <p className="text-slate-300 text-sm leading-relaxed">
              Great effort! You completed <strong>{log.exerciseCount}</strong> exercises in{' '}
              <strong>{formatTime(log.duration)}</strong> and burned approximately{' '}
              <strong>{log.caloriesBurned} calories</strong>. Keep up the momentum! 💪
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetails;
