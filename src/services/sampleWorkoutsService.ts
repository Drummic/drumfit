// ============================================================================
// Filename: sampleWorkoutsService.ts
// Path: /src/services/sampleWorkoutsService.ts
// Created At: January 11, 2026
// From: Development Team
// Changed At: N/A
// Functional Description: Service for creating sample/template workouts with
// predefined exercises for quick onboarding
// Dependencies: None (static data)
// Used In: CreateWorkoutModal and Workouts page
// ============================================================================

import { Workout, WorkoutExercise } from '@/types';

/**
 * Sample Workout Templates
 * Pre-built workout routines for quick onboarding
 */

export interface SampleWorkoutTemplate {
  name: string;
  description: string;
  duration: 'short' | 'medium' | 'long';
  exercises: Array<{
    name: string;
    muscleGroups: string[];
    sets: number;
    reps: number | string;
  }>;
}

const SAMPLE_WORKOUTS: SampleWorkoutTemplate[] = [
  {
    name: 'Upper Body',
    description: 'Full upper body strength and conditioning workout',
    duration: 'medium',
    exercises: [
      {
        name: 'Push-ups',
        muscleGroups: ['chest', 'shoulders', 'triceps'],
        sets: 4,
        reps: '12-20',
      },
      {
        name: 'Pike push-ups (shoulders)',
        muscleGroups: ['shoulders', 'triceps'],
        sets: 4,
        reps: '8-12',
      },
      {
        name: 'Chair dips',
        muscleGroups: ['triceps', 'shoulders', 'chest'],
        sets: 4,
        reps: '10-15',
      },
      {
        name: 'Slow push-ups (5 sec down)',
        muscleGroups: ['chest', 'shoulders', 'triceps'],
        sets: 2,
        reps: 8,
      },
      {
        name: 'Plank',
        muscleGroups: ['core', 'shoulders'],
        sets: 3,
        reps: '60 sec',
      },
      {
        name: 'Leg raises (lying)',
        muscleGroups: ['core', 'abs'],
        sets: 3,
        reps: '12-15',
      },
      {
        name: 'Bicycle crunch',
        muscleGroups: ['core', 'abs'],
        sets: 3,
        reps: 20,
      },
      {
        name: 'Hollow hold',
        muscleGroups: ['core'],
        sets: 3,
        reps: '30 sec',
      },
    ],
  },
  {
    name: 'Lower Body',
    description: 'Full lower body strength and endurance workout',
    duration: 'medium',
    exercises: [
      {
        name: 'Squats',
        muscleGroups: ['quads', 'glutes', 'hamstrings'],
        sets: 4,
        reps: 20,
      },
      {
        name: 'Bulgarian split squats',
        muscleGroups: ['quads', 'glutes', 'hamstrings'],
        sets: 3,
        reps: '10/leg',
      },
      {
        name: 'Hip thrusts (feet elevated)',
        muscleGroups: ['glutes', 'hamstrings'],
        sets: 3,
        reps: 15,
      },
      {
        name: 'Calf raises (slow)',
        muscleGroups: ['calves'],
        sets: 4,
        reps: 20,
      },
      {
        name: 'Side plank',
        muscleGroups: ['core', 'obliques'],
        sets: 3,
        reps: '45 sec/side',
      },
      {
        name: 'Reverse crunch',
        muscleGroups: ['core', 'abs'],
        sets: 3,
        reps: 15,
      },
      {
        name: 'Dead bug',
        muscleGroups: ['core'],
        sets: 3,
        reps: 12,
      },
      {
        name: 'Standing knee raises',
        muscleGroups: ['abs', 'hip flexors'],
        sets: 3,
        reps: 20,
      },
    ],
  },
  {
    name: 'Upper Body (Short)',
    description: 'Quick upper body workout - 15-20 minutes',
    duration: 'short',
    exercises: [
      {
        name: 'Push-ups',
        muscleGroups: ['chest', 'shoulders', 'triceps'],
        sets: 3,
        reps: '10-15',
      },
      {
        name: 'Pike push-ups (shoulders)',
        muscleGroups: ['shoulders', 'triceps'],
        sets: 2,
        reps: '8-10',
      },
      {
        name: 'Plank',
        muscleGroups: ['core', 'shoulders'],
        sets: 2,
        reps: '45 sec',
      },
    ],
  },
  {
    name: 'Lower Body (Short)',
    description: 'Quick lower body workout - 15-20 minutes',
    duration: 'short',
    exercises: [
      {
        name: 'Squats',
        muscleGroups: ['quads', 'glutes', 'hamstrings'],
        sets: 3,
        reps: 15,
      },
      {
        name: 'Calf raises (slow)',
        muscleGroups: ['calves'],
        sets: 3,
        reps: 15,
      },
      {
        name: 'Side plank',
        muscleGroups: ['core', 'obliques'],
        sets: 2,
        reps: '30 sec/side',
      },
    ],
  },
  {
    name: 'Core (Short)',
    description: 'Quick core and abs workout - 10-15 minutes',
    duration: 'short',
    exercises: [
      {
        name: 'Plank',
        muscleGroups: ['core', 'shoulders'],
        sets: 3,
        reps: '45 sec',
      },
      {
        name: 'Bicycle crunch',
        muscleGroups: ['core', 'abs'],
        sets: 3,
        reps: 15,
      },
      {
        name: 'Dead bug',
        muscleGroups: ['core'],
        sets: 3,
        reps: 10,
      },
      {
        name: 'Standing knee raises',
        muscleGroups: ['abs', 'hip flexors'],
        sets: 2,
        reps: 15,
      },
    ],
  },
];

/**
 * Get all sample workout templates
 */
export function getSampleWorkouts(): SampleWorkoutTemplate[] {
  return SAMPLE_WORKOUTS;
}

/**
 * Get a specific sample workout by name
 */
export function getSampleWorkoutByName(name: string): SampleWorkoutTemplate | undefined {
  return SAMPLE_WORKOUTS.find((w) => w.name === name);
}

/**
 * Get sample workouts as workout data format
 * Maps to existing exercises in the system
 */
export function getSampleWorkoutAsWorkout(
  templateName: string,
  existingExercises: Array<{ id: string; name: string }>
): Omit<Workout, 'id' | 'userId' | 'createdAt' | 'updatedAt'> | null {
  const template = getSampleWorkoutByName(templateName);
  if (!template) return null;

  // Map template exercises to existing exercises by name
  const exercises: WorkoutExercise[] = template.exercises
    .map((templateEx) => {
      const foundExercise = existingExercises.find(
        (ex) => ex.name.toLowerCase() === templateEx.name.toLowerCase()
      );

      if (!foundExercise) {
        console.warn(
          `⚠️ Exercise "${templateEx.name}" not found in existing exercises. Skipping.`
        );
        return null;
      }

      return {
        exerciseId: foundExercise.id,
        exerciseName: foundExercise.name,
        sets: templateEx.sets,
        reps: typeof templateEx.reps === 'string' ? parseInt(templateEx.reps) : templateEx.reps,
      } as WorkoutExercise;
    })
    .filter((ex): ex is WorkoutExercise => ex !== null);

  if (exercises.length === 0) {
    console.warn(`⚠️ No valid exercises found for template "${templateName}"`);
    return null;
  }

  return {
    name: template.name,
    description: template.description,
    duration: template.duration,
    exercises,
  };
}
