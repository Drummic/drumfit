# App Architecture - New Design

## Component Hierarchy

```
App
└── Layout (layout.tsx)
    ├── Login Page (login/page.tsx)
    ├── Signup Page (signup/page.tsx)
    └── ProtectedRoute
        ├── Dashboard Page (dashboard/page.tsx) ✏️ REDESIGNED
        │   ├── StatsOverview
        │   ├── ActivityListView
        │   └── ActivityCalendarView
        │
        ├── Workouts Page (workouts/page.tsx)
        │   ├── CreateWorkoutModal
        │   ├── WorkoutCard (multiple)
        │   ├── CreateExerciseModal
        │   └── ExerciseCard (multiple)
        │
        ├── Exercises Page (exercises/page.tsx)
        │   ├── CreateExerciseModal ✏️ UPDATED
        │   │   └── Reps/Sets Fields ✨ NEW
        │   └── ExerciseCard (multiple)
        │
        └── Meals Page (meals/page.tsx) ✨ NEW
            ├── CreateMealModal ✨ NEW
            └── MealCard (multiple) ✨ NEW
```

## Page Flow Diagram

```
┌─────────────────────────────────────────┐
│         Authentication Flow             │
│  (Login/Signup with Google)             │
└──────────────┬──────────────────────────┘
               │
               ▼
        ┌──────────────┐
        │  Dashboard   │
        │   (Main)     │
        └──────┬───────┘
               │
      ┌────────┼────────┐
      │        │        │
      ▼        ▼        ▼
   WORKOUTS  EXERCISES  MEALS
     (Blue)  (Green)  (Orange)
      │        │        │
      │        │        └─→ Create
      │        │        ├─→ Read
      │        │        ├─→ Update
      │        │        └─→ Delete
      │        │
      │        └─→ Create ✏️
      │        ├─→ Read
      │        ├─→ Update (+ Reps/Sets) ✨
      │        └─→ Delete
      │
      └─→ Create
          ├─→ Read
          ├─→ Update
          └─→ Delete
```

## State Management Flow

```
Dashboard
  ├── useAuth() → Get current user
  ├── useWorkout() → Get workouts list
  ├── useExercise() → Get exercises list
  └── useWorkoutLogs() → Get recent activities

Workouts Page
  ├── useAuth()
  ├── useWorkout()
  ├── useExercise()
  └── State:
      ├── activeTab: 'exercises' | 'workouts'
      ├── isCreateModalOpen: boolean
      └── selectedMuscleGroup: string | null

Exercises Page
  ├── useAuth()
  ├── useExercise()
  └── State:
      ├── isCreateModalOpen: boolean
      └── selectedMuscleGroup: string | null

Meals Page
  ├── useAuth()
  └── State:
      ├── meals: Meal[]
      └── isCreateModalOpen: boolean
```

## Data Type Structure

```
User
├── uid: string
├── email: string
├── name?: string
└── profilePicture?: string

Exercise ✏️
├── id: string
├── userId: string
├── name: string
├── description?: string
├── muscleGroups: string[]
├── difficulty: 'beginner' | 'intermediate' | 'advanced'
├── instructions?: string
├── defaultSets?: number ✨ NEW (1-10)
├── defaultReps?: number ✨ NEW (1-100)
└── aiGenerated: boolean

Workout
├── id: string
├── userId: string
├── name: string
├── description?: string
├── duration: 'short' | 'medium' | 'long'
├── exercises: WorkoutExercise[]
└── WorkoutExercise:
    ├── exerciseId: string
    ├── exerciseName: string
    ├── sets: number
    ├── reps: number
    ├── weight?: number
    └── notes?: string

Meal ✨ NEW
├── id: string
├── userId: string
├── name: string
├── description?: string
├── ingredients: string[]
├── macros: {
│   ├── calories: number
│   ├── protein: number
│   ├── carbs: number
│   ├── fat: number
│   └── fiber?: number
└── aiGenerated: boolean
```

## Color System

```
┌─────────────────────────────────────────┐
│          COLOR SCHEME                   │
├─────────────────────────────────────────┤
│ BLUE (#3B82F6)                          │
│ ├── Primary: Workouts                  │
│ ├── Icon: Zap ⚡                        │
│ ├── Buttons: Start, Create Workout     │
│ └── Hover: -700 variant                 │
│                                         │
│ GREEN (#22C55E)                         │
│ ├── Primary: Exercises                 │
│ ├── Icon: Dumbbell 🏋️                  │
│ ├── Buttons: Add Exercise               │
│ └── Hover: -700 variant                 │
│                                         │
│ ORANGE (#EA580C)                        │
│ ├── Primary: Meals                      │
│ ├── Icon: Utensils 🍽️                  │
│ ├── Buttons: Add Meal                   │
│ └── Hover: -700 variant                 │
│                                         │
│ SLATE (#1E293B - #0F172A)              │
│ ├── Background: Slate-800/900           │
│ ├── Cards: Slate-700                    │
│ └── Text: Slate-300/400                 │
└─────────────────────────────────────────┘
```

## Form Validation Schema

```
Exercise Form Schema (Zod)
├── name: string (2+ chars)
├── description?: string
├── instructions?: string
├── difficulty: enum ('beginner' | 'intermediate' | 'advanced')
├── defaultSets?: number (positive int) ✨ NEW
└── defaultReps?: number (positive int) ✨ NEW

Meal Form Schema (Zod) ✨ NEW
├── name: string (2+ chars)
├── description?: string
├── calories: number (positive int)
├── protein: number (positive int)
├── carbs: number (positive int)
├── fat: number (positive int)
└── fiber?: number (positive int)
```

## API Routes

```
/api
├── auth/
│   ├── login
│   ├── signup
│   └── logout
├── users/
│   └── profile
├── exercises/
│   ├── GET - List user exercises
│   ├── POST - Create exercise
│   ├── PUT/:id - Update exercise
│   └── DELETE/:id - Delete exercise
├── workouts/
│   ├── GET - List user workouts
│   ├── POST - Create workout
│   ├── PUT/:id - Update workout
│   └── DELETE/:id - Delete workout
└── meals/ ✨ NEW
    ├── GET - List user meals
    ├── POST - Create meal
    ├── PUT/:id - Update meal
    └── DELETE/:id - Delete meal
```

## Firebase/Firestore Collections

```
users/
└── {userId}/
    ├── profile
    ├── exercises/
    │   ├── {exerciseId} (now with defaultSets, defaultReps)
    │   └── ...
    ├── workouts/
    │   ├── {workoutId}
    │   └── ...
    ├── meals/ ✨ NEW
    │   ├── {mealId}
    │   └── ...
    └── workoutLogs/
        ├── {logId}
        └── ...
```

## Responsive Breakpoints

```
Mobile (< 640px)
├── Single column layouts
├── Stack buttons vertically
├── Full-width cards
└── Hamburger navigation (if needed)

Tablet (640px - 1024px)
├── 2-column grids
├── Side-by-side layouts
└── Optimized spacing

Desktop (> 1024px)
├── 3-column grids
├── Full multi-column layouts
└── Maximum content visibility
```

## Performance Considerations

```
Optimizations Implemented:
├── Component memoization (React.FC)
├── Proper hook usage (useEffect dependencies)
├── Form state management (React Hook Form)
├── Type safety (TypeScript strict mode)
└── CSS optimization (Tailwind classes)

Potential Future Optimizations:
├── React.memo for card components
├── useMemo for filtered lists
├── useCallback for event handlers
├── Code splitting for pages
└── Image optimization for meals
```

## Error Handling Flow

```
User Action
    ↓
Form Validation (Zod)
    ├── ✓ Valid
    │   ├── API Call
    │   │   ├── Success → Update UI
    │   │   └── Error → Show Error Message
    └── ✗ Invalid → Show Field Errors

Error Display:
├── Form field errors (inline)
├── Alert messages (inline)
├── Toast notifications (optional)
└── Loading states (disabled buttons)
```

---

This architecture provides:
- ✅ Clear separation of concerns
- ✅ Consistent styling and navigation
- ✅ Type safety throughout
- ✅ Scalable structure for future features
- ✅ Responsive design at all breakpoints
- ✅ Proper error handling
- ✅ User feedback mechanisms
