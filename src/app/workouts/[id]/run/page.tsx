'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useWorkout } from '@/hooks/useWorkout';
import { useWorkoutLogs } from '@/hooks/useWorkoutLogs';
import ProtectedRoute from '@/components/ProtectedRoute';
import WorkoutRunner from '@/components/workouts/WorkoutRunner';
import { Workout } from '@/types';

export default function RunWorkoutPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { workouts, loading } = useWorkout();
  const { addLog } = useWorkoutLogs();
  const [workout, setWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    if (workouts.length > 0) {
      const found = workouts.find((w) => w.id === params.id);
      setWorkout(found || null);
    }
  }, [workouts, params.id]);

  const handleWorkoutComplete = async (duration: number, caloriesBurned: number) => {
    if (!workout || !user) return;

    try {
      console.log('✅ Workout completed:', {
        duration,
        caloriesBurned,
        workout: workout.name,
        timestamp: new Date().toISOString(),
      });

      // Save workout completion to logs
      await addLog(
        workout.id,
        workout.name,
        duration,
        caloriesBurned,
        workout.exercises.length
      );

      alert('Workout saved successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error('❌ Error saving workout:', error);
      alert('Failed to save workout. Please try again.');
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-300">Loading workout...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!workout) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Workout Not Found</h1>
            <p className="text-slate-400 mb-4">The workout you're looking for doesn't exist.</p>
            <button
              onClick={() => router.push('/workouts')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              Back to Workouts
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <WorkoutRunner workout={workout} onComplete={handleWorkoutComplete} />
    </ProtectedRoute>
  );
}
