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
          const multipleWorkouts = dayLogs.length > 1;

          return (
            <div key={day}>
              {!multipleWorkouts && hasWorkout && (
                // Single Workout - Regular Button
                <button
                  onClick={() => onSelectLog(dayLogs[0])}
                  className={`w-full aspect-square rounded-lg flex flex-col items-start justify-start text-sm font-medium transition p-2 overflow-hidden bg-green-600 hover:bg-green-700 text-white`}
                >
                  {/* Day Number */}
                  <span className="font-bold text-base mb-1">{day}</span>
                  
                  {/* Workout - Show name and duration */}
                  <div className="text-xs leading-tight">
                    <div className="truncate">{dayLogs[0].workoutName}</div>
                    <div className="text-green-100">{Math.round(dayLogs[0].duration / 60)}min</div>
                  </div>
                </button>
              )}

              {multipleWorkouts && (
                // Multiple Workouts - Each row clickable
                <div className={`w-full aspect-square rounded-lg flex flex-col items-start justify-start text-sm font-medium transition p-2 overflow-auto bg-green-600 text-white`}>
                  {/* Day Number */}
                  <span className="font-bold text-base mb-1 flex-shrink-0">{day}</span>
                  
                  {/* Workouts Table - Clickable rows */}
                  <div className="text-xs w-full flex flex-col gap-0.5 flex-1 overflow-y-auto">
                    {dayLogs.slice(0, 3).map((log, idx) => (
                      <button
                        key={idx}
                        onClick={() => onSelectLog(log)}
                        className="text-left px-1 py-0.5 rounded hover:bg-green-700 transition truncate border-b border-green-500/30 last:border-b-0 flex gap-1 items-center"
                      >
                        <span className="truncate flex-1">{log.workoutName.slice(0, 8)}</span>
                        <span className="text-green-100 flex-shrink-0">{Math.round(log.duration / 60)}m</span>
                      </button>
                    ))}
                    {dayLogs.length > 3 && (
                      <div className="text-center text-green-100 text-xs py-0.5 border-t border-green-500/30">
                        +{dayLogs.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              )}

              {!hasWorkout && (
                // Empty Day
                <button
                  disabled
                  className={`w-full aspect-square rounded-lg flex flex-col items-center justify-center text-sm font-medium transition bg-slate-700 text-slate-400`}
                >
                  <span>{day}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityCalendarView;
