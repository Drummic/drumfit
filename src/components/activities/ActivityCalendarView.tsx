'use client';

import React, { useState } from 'react';
import { WorkoutLog } from '@/services/workoutLogService';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ActivityCalendarViewProps {
  logs: WorkoutLog[];
  onSelectLog: (log: WorkoutLog) => void;
}

const ActivityCalendarView: React.FC<ActivityCalendarViewProps> = ({ logs, onSelectLog }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Group logs by date
  const logsByDate = new Map<string, WorkoutLog[]>();
  logs.forEach((log) => {
    const date = new Date(log.completedAt).toDateString();
    if (!logsByDate.has(date)) {
      logsByDate.set(date, []);
    }
    logsByDate.get(date)?.push(log);
  });

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const days = [];
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">{monthName}</h3>
        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-xs font-medium text-slate-400 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="aspect-square" />;
          }

          const dateStr = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
          ).toDateString();

          const dayLogs = logsByDate.get(dateStr) || [];
          const hasWorkout = dayLogs.length > 0;

          return (
            <div key={day}>
              <button
                onClick={() => {
                  if (hasWorkout && dayLogs.length > 0) {
                    onSelectLog(dayLogs[0]);
                  }
                }}
                className={`w-full aspect-square rounded-lg flex flex-col items-center justify-center text-sm font-medium transition ${
                  hasWorkout
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                }`}
              >
                <span>{day}</span>
                {hasWorkout && <span className="text-xs mt-0.5">●</span>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityCalendarView;
