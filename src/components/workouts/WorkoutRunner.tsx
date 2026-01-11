'use client';

import React, { useState, useEffect } from 'react';
import { Workout } from '@/types';
import { Play, Pause, CheckCircle, RotateCw } from 'lucide-react';
import WorkoutSummary from '../workouts/WorkoutSummary';

interface WorkoutRunnerProps {
  workout: Workout;
  onComplete: (duration: number, caloriesBurned: number) => void;
}

type Phase = 'exercise' | 'rest-set' | 'rest-exercise' | 'countdown' | 'summary';

interface TimerState {
  phase: Phase;
  exerciseIndex: number;
  setIndex: number;
  elapsed: number;
  isRunning: boolean;
  countdownValue: number;
}

const WorkoutRunner: React.FC<WorkoutRunnerProps> = ({ workout, onComplete }) => {
  const [timer, setTimer] = useState<TimerState>({
    phase: 'countdown',
    exerciseIndex: 0,
    setIndex: 0,
    elapsed: 0,
    isRunning: true,
    countdownValue: 3,
  });

  const totalElapsed = React.useRef(0);

  // Always-running timer for total elapsed time
  useEffect(() => {
    const interval = setInterval(() => {
      totalElapsed.current += 1;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Phase/exercise logic timer (only runs when isRunning)
  useEffect(() => {
    if (!timer.isRunning) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        const newState = { ...prev };

        if (prev.phase === 'countdown') {
          newState.countdownValue -= 1;
          if (newState.countdownValue < 0) {
            newState.phase = 'exercise';
            newState.elapsed = 0;
            newState.countdownValue = 0;
          }
        } else if (prev.phase === 'exercise') {
          newState.elapsed += 1;
        } else if (prev.phase === 'rest-set') {
          newState.countdownValue -= 1;
          if (newState.countdownValue < 0) {
            newState.setIndex += 1;
            newState.phase = 'countdown';
            newState.countdownValue = 3;
            newState.elapsed = 0;
          }
        } else if (prev.phase === 'rest-exercise') {
          newState.countdownValue -= 1;
          if (newState.countdownValue < 0) {
            newState.exerciseIndex += 1;
            newState.setIndex = 0;
            
            // Check if we've gone past the last exercise
            if (newState.exerciseIndex >= workout.exercises.length) {
              newState.phase = 'summary';
              newState.isRunning = false;
              console.log('✅ Auto-completing workout - all exercises done');
            } else {
              newState.phase = 'countdown';
              newState.countdownValue = 3;
              newState.elapsed = 0;
            }
          }
        }

        // Check if workout is complete
        if (newState.exerciseIndex >= workout.exercises.length) {
          newState.phase = 'summary';
          newState.isRunning = false;
        }

        return newState;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer.isRunning, workout.exercises.length]);

  const handleSetComplete = () => {
    const currentExercise = workout.exercises[timer.exerciseIndex];
    const totalSets = currentExercise.sets || 3;
    
    // Check if this is the last set of the current exercise
    if (timer.setIndex < totalSets - 1) {
      // More sets to do for this exercise - show rest period (auto-running)
      setTimer((prev) => ({ ...prev, phase: 'rest-set', countdownValue: 30, isRunning: true }));
    } else {
      // All sets done for this exercise
      // Check if this is the last exercise
      if (timer.exerciseIndex < workout.exercises.length - 1) {
        // More exercises to do - show rest period (auto-running)
        setTimer((prev) => ({ ...prev, phase: 'rest-exercise', countdownValue: 60, isRunning: true }));
      } else {
        // All exercises done - end workout
        console.log('✅ Workout complete - all exercises finished');
        setTimer((prev) => ({ ...prev, phase: 'summary', isRunning: false }));
      }
    }
  };

  const handleStartWorkout = () => {
    setTimer((prev) => {
      // If starting from rest-set, increment setIndex and jump to exercise
      if (prev.phase === 'rest-set') {
        return { ...prev, phase: 'exercise', setIndex: prev.setIndex + 1, isRunning: true, elapsed: 0 };
      }
      // If starting from rest-exercise, increment exerciseIndex and jump to exercise
      if (prev.phase === 'rest-exercise') {
        return { ...prev, phase: 'exercise', exerciseIndex: prev.exerciseIndex + 1, setIndex: 0, isRunning: true, elapsed: 0 };
      }
      // If starting from countdown, jump directly to exercise
      if (prev.phase === 'countdown') {
        return { ...prev, phase: 'exercise', isRunning: true, elapsed: 0, countdownValue: 0 };
      }
      // Otherwise just resume
      return { ...prev, isRunning: true };
    });
  };

  const handlePause = () => {
    setTimer((prev) => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const handleReset = () => {
    setTimer({
      phase: 'countdown',
      exerciseIndex: 0,
      setIndex: 0,
      elapsed: 0,
      isRunning: false,
      countdownValue: 3,
    });
    totalElapsed.current = 0;
  };

  if (timer.phase === 'summary') {
    const caloriesBurned = calculateCaloriesBurned(workout, totalElapsed.current);
    return (
      <WorkoutSummary
        workout={workout}
        duration={totalElapsed.current}
        caloriesBurned={caloriesBurned}
        onComplete={() => onComplete(totalElapsed.current, caloriesBurned)}
      />
    );
  }

  const currentExercise = workout.exercises[timer.exerciseIndex];
  const totalSets = currentExercise.sets || 3;
  // When in rest-set phase, show the next set number; otherwise show current set
  const currentSet = timer.phase === 'rest-set' ? timer.setIndex + 2 : timer.setIndex + 1;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{workout.name}</h1>
          <p className="text-slate-400">{workout.description}</p>
        </div>

        {/* Main Content */}
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
          {timer.phase === 'countdown' && (
            <div className="text-center mb-12">
              <div className="text-8xl font-bold text-blue-500 mb-4 tabular-nums">
                {timer.countdownValue > 0 ? timer.countdownValue : 'GO!'}
              </div>
              <p className="text-slate-300 text-lg">Get ready to start</p>
            </div>
          )}

          {(timer.phase === 'exercise' || timer.phase === 'rest-set') && (
            <>
              {/* Exercise Info */}
              <div className="mb-8">
                {/* Exercise Name + Set & Reps - IN ONE BOX */}
                <div className="flex items-center gap-6 mb-8 p-6 bg-slate-700/50 rounded-lg border border-slate-600">
                  <span className="text-4xl font-black text-orange-500">{currentExercise.exerciseName}</span>
                  <div className="w-1 h-16 bg-slate-600 rounded"></div>
                  <div className="flex items-center gap-2">
                    <span className="text-4xl font-black text-orange-500">{currentSet}</span>
                    <span className="text-lg font-bold text-slate-300">of {totalSets}</span>
                  </div>
                  <div className="w-1 h-12 bg-slate-600 rounded"></div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-slate-300">Reps:</span>
                    <span className="text-4xl font-black text-orange-500">{currentExercise.reps}</span>
                  </div>
                  {currentExercise.weight && (
                    <>
                      <div className="w-1 h-12 bg-slate-600 rounded"></div>
                      <span className="text-lg font-bold text-orange-500">{currentExercise.weight}kg</span>
                    </>
                  )}
                </div>

                {/* Exercise Counter */}
                <div className="text-center mb-6">
                  <p className="text-sm text-slate-400">Exercise {timer.exerciseIndex + 1} of {workout.exercises.length}</p>
                </div>
              </div>

              {/* Timer */}
              <div className="text-center mb-12">
                <div className={`text-7xl font-bold tabular-nums mb-4 ${
                  timer.phase === 'exercise' ? 'text-green-500' : 'text-blue-500'
                }`}>
                  {formatTime(timer.elapsed)}
                </div>
                <p className="text-slate-300 text-lg">
                  {timer.phase === 'exercise' ? 'Exercise Time' : 'Rest Time'}
                </p>
              </div>

              {/* Rest Countdown */}
              {timer.phase === 'rest-set' && (
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold text-yellow-500 mb-2">{timer.countdownValue}</div>
                  <p className="text-slate-300">Rest before next set</p>
                </div>
              )}
            </>
          )}

          {timer.phase === 'rest-exercise' && (
            <div className="text-center mb-12">
              <div className="text-6xl font-bold text-orange-500 mb-4">{timer.countdownValue}</div>
              <p className="text-slate-300 text-xl">Rest before next exercise</p>
            </div>
          )}

          {/* Progress Bar */}
          <div className="mb-8">
            {(() => {
              // Calculate total sets across all exercises
              const totalSets = workout.exercises.reduce((sum, ex) => sum + (ex.sets || 3), 0);
              
              // Calculate completed sets
              let completedSets = 0;
              // Add all sets from completed exercises
              for (let i = 0; i < timer.exerciseIndex; i++) {
                completedSets += workout.exercises[i].sets || 3;
              }
              // Add current exercise's completed sets
              completedSets += timer.setIndex;
              
              const progressPercent = Math.round((completedSets / totalSets) * 100);
              
              return (
                <>
                  <div className="flex justify-between text-sm text-slate-400 mb-3">
                    <span>Overall Progress</span>
                    <span className="font-bold text-blue-400">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden mb-6 border border-slate-600">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-400 h-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </>
              );
            })()}
            
            {/* Exercise and Set Progress - ROW FORMAT */}
            <div className="space-y-3">
              {workout.exercises.map((exercise, exIndex) => {
                const exerciseSets = exercise.sets || 3;
                const isCurrentExercise = exIndex === timer.exerciseIndex;
                const isCompletedExercise = exIndex < timer.exerciseIndex;
                
                return (
                  <div key={exIndex}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-lg font-bold ${
                        isCompletedExercise ? 'text-green-400' : isCurrentExercise ? 'text-blue-400' : 'text-slate-500'
                      }`}>
                        {isCompletedExercise ? '✓' : isCurrentExercise ? '▶' : '○'}
                      </span>
                      <span className={`text-sm font-semibold ${
                        isCompletedExercise ? 'text-green-400' : isCurrentExercise ? 'text-blue-300' : 'text-slate-500'
                      }`}>
                        {exercise.exerciseName}
                      </span>
                    </div>
                    {/* Sets Row */}
                    <div className="flex gap-2 ml-6 flex-wrap">
                      {Array.from({ length: exerciseSets }).map((_, setIdx) => {
                        const isCompletedSet = isCompletedExercise || (isCurrentExercise && setIdx < timer.setIndex);
                        const isCurrentSet = isCurrentExercise && setIdx === timer.setIndex;
                        
                        return (
                          <div
                            key={setIdx}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                              isCompletedSet
                                ? 'bg-green-500 text-white shadow-lg shadow-green-500/50'
                                : isCurrentSet
                                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50 scale-110'
                                : 'bg-slate-700 text-slate-400 border border-slate-600'
                            }`}
                          >
                            {setIdx + 1}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Total Time */}
          <div className="text-center mb-8 p-4 bg-slate-700 rounded-lg">
            <p className="text-slate-400 text-sm mb-1">Total Time</p>
            <p className="text-2xl font-bold text-white">{formatTime(totalElapsed.current)}</p>
          </div>

          {/* Controls */}
          <div className="flex gap-4 justify-center">
            {timer.phase === 'countdown' ? (
              <button
                onClick={handleStartWorkout}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg flex items-center gap-2 transition"
              >
                <Play className="w-5 h-5" />
                Start Workout
              </button>
            ) : (timer.phase === 'rest-set' || timer.phase === 'rest-exercise') ? (
              <button
                onClick={handleStartWorkout}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg flex items-center gap-2 transition"
              >
                <Play className="w-5 h-5" />
                Start Exercise
              </button>
            ) : (
              <>
                <button
                  onClick={handlePause}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center gap-2 transition"
                >
                  {timer.isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {timer.isRunning ? 'Pause' : 'Resume'}
                </button>

                {timer.phase === 'exercise' && (
                  <button
                    onClick={handleSetComplete}
                    className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg flex items-center gap-2 transition"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Set Complete
                  </button>
                )}

                <button
                  onClick={handleReset}
                  className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg flex items-center gap-2 transition"
                >
                  <RotateCw className="w-5 h-5" />
                  Reset
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Calculate estimated calories burned
 * Formula: (Sets × Reps × 0.15) + (Duration in minutes × 3) + base metabolic adjustment
 */
function calculateCaloriesBurned(workout: Workout, durationSeconds: number): number {
  let totalCalories = 0;

  for (const exercise of workout.exercises) {
    const sets = exercise.sets || 3;
    const reps = exercise.reps || 10;
    // Estimate ~0.2 calories per rep for bodyweight exercises
    totalCalories += sets * reps * 0.2;
  }

  // Add calories based on total duration (intensity-based)
  const durationMinutes = durationSeconds / 60;
  const intensityMultiplier = workout.duration === 'short' ? 3 : workout.duration === 'medium' ? 4.5 : 6;
  totalCalories += durationMinutes * intensityMultiplier;

  return Math.round(totalCalories);
}

export default WorkoutRunner;
