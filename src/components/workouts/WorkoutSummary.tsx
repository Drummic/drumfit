'use client';

import React from 'react';
import { Workout } from '@/types';
import { CheckCircle, Flame, Clock, Dumbbell } from 'lucide-react';
import Link from 'next/link';

interface WorkoutSummaryProps {
  workout: Workout;
  duration: number;
  caloriesBurned: number;
  onComplete: () => void;
}

const WorkoutSummary: React.FC<WorkoutSummaryProps> = ({
  workout,
  duration,
  caloriesBurned,
  onComplete,
}) => {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${mins}m ${secs}s`;
    }
    return `${mins}m ${secs}s`;
  };

  const totalExercises = workout.exercises.length;
  const totalSets = workout.exercises.reduce((sum, ex) => sum + (ex.sets || 3), 0);
  const totalReps = workout.exercises.reduce((sum, ex) => sum + (ex.sets || 3) * (ex.reps || 10), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Banner */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Workout Complete!</h1>
          <p className="text-slate-400 text-lg">Great job finishing {workout.name}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Duration */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <p className="text-slate-400 text-sm">Duration</p>
            </div>
            <p className="text-3xl font-bold text-white">{formatTime(duration)}</p>
          </div>

          {/* Calories */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <p className="text-slate-400 text-sm">Calories Burned</p>
            </div>
            <p className="text-3xl font-bold text-white">{caloriesBurned}</p>
          </div>

          {/* Exercises */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <Dumbbell className="w-5 h-5 text-green-500" />
              <p className="text-slate-400 text-sm">Exercises</p>
            </div>
            <p className="text-3xl font-bold text-white">{totalExercises}</p>
          </div>

          {/* Total Sets & Reps */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-slate-400 text-sm mb-2">Total Volume</p>
            <p className="text-2xl font-bold text-white">{totalSets} sets</p>
            <p className="text-lg text-slate-400">{totalReps} reps</p>
          </div>
        </div>

        {/* Exercise Breakdown */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Exercise Breakdown</h2>
          <div className="space-y-3">
            {workout.exercises.map((exercise, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-slate-700 rounded-lg">
                <div>
                  <p className="font-medium text-white">{exercise.exerciseName}</p>
                  <p className="text-sm text-slate-400">
                    {exercise.sets || 3} sets × {exercise.reps || 10} reps
                    {exercise.weight && ` @ ${exercise.weight}kg`}
                  </p>
                </div>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Motivation Quote */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-8 text-center">
          <p className="text-white text-lg font-medium mb-2">💪 Amazing Effort!</p>
          <p className="text-blue-100">
            You burned {caloriesBurned} calories in {formatTime(duration)}. Keep crushing it!
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Link
            href="/workouts"
            className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition"
          >
            Back to Workouts
          </Link>
          <button
            onClick={onComplete}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
          >
            Save & Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutSummary;
