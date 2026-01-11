// ============================================================================
// Filename: types.ts
// Path: /fitness-app/src/types/index.ts
// Created At: January 11, 2026
// From: Development Team
// Changed At: N/A
// Functional Description: TypeScript type definitions for the entire Fitness App.
// Defines interfaces for User, Exercise, Workout, Meal, Photo, and other entities
// used throughout the application. Central location for all type definitions.
// Dependencies: None (pure TypeScript definitions)
// Used In: All services, components, and API routes
// ============================================================================

export interface User {
  uid: string;
  email: string;
  name?: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Exercise {
  id: string;
  userId: string;
  name: string;
  description?: string;
  muscleGroups: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructions?: string;
  aiGenerated: boolean;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkoutSet {
  exerciseId: string;
  exerciseName: string;
  reps?: number;
  sets?: number;
  weight?: number;
  duration?: number;
  intensity?: 'low' | 'medium' | 'high';
  notes?: string;
}

export interface WorkoutExercise {
  exerciseId: string;
  exerciseName: string;
  sets: number;
  reps: number;
  weight?: number;
  notes?: string;
}

export interface Workout {
  id: string;
  userId: string;
  name: string;
  description?: string;
  duration: 'short' | 'medium' | 'long';
  exercises: WorkoutExercise[];
  createdAt: string;
  updatedAt: string;
}

export interface Macros {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
}

export interface Meal {
  id: string;
  userId: string;
  name: string;
  description?: string;
  ingredients: string[];
  macros: Macros;
  aiGenerated: boolean;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MealLog {
  id: string;
  userId: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  mealId?: string;
  customMeal?: string;
  macros: Macros;
  notes?: string;
  createdAt: string;
}

export interface Photo {
  id: string;
  userId: string;
  url: string;
  category: 'front' | 'side' | 'back';
  date: string;
  notes?: string;
  createdAt: string;
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  description?: string;
  targetValue: number;
  currentValue: number;
  metric: 'weight' | 'strength' | 'endurance';
  deadline?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  firebaseUser: any;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}
