'use client';

import React from 'react';
import { WorkoutLog } from '@/services/workoutLogService';
import { Flame, Clock, Dumbbell } from 'lucide-react';

interface ActivityListViewProps {
  logs: WorkoutLog[];
  onSelectLog: (log: WorkoutLog) => void;
}

const ActivityListView: React.FC<ActivityListViewProps> = ({ logs, onSelectLog }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (logs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400 text-lg">No workout activities yet. Start your first workout!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {logs.map((log) => (
        <button
          key={log.id}
          onClick={() => onSelectLog(log)}
          className="w-full bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-blue-500 hover:bg-slate-700 transition text-left group"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition">
                {log.workoutName}
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                {formatDate(log.completedAt)}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-sm">{formatTime(log.duration)}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm">{log.caloriesBurned} cal</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Dumbbell className="w-4 h-4 text-green-500" />
              <span className="text-sm">{log.exerciseCount} exercises</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ActivityListView;
