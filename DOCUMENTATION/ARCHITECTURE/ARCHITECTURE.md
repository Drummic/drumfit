# Drum Fit - System Architecture Document

**Version**: 1.0
**Date**: January 11, 2026
**Status**: Design Phase
**App Name**: Drum Fit - Premium Fitness Tracker

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Diagram](#architecture-diagram)
4. [Project Structure](#project-structure)
5. [Database Schema](#database-schema)
6. [API Architecture](#api-architecture)
7. [Frontend Architecture](#frontend-architecture)
8. [AI Integration](#ai-integration)
9. [Authentication & Security](#authentication--security)
10. [Deployment Strategy](#deployment-strategy)
11. [Data Flow](#data-flow)

---

## System Overview

The Fitness App is a full-stack Next.js application designed to help users:

- **Design exercises** with AI styling and guidance
- **Track workouts** with detailed logs
- **Monitor progress** with photo comparisons
- **Plan meals** with AI-generated meal designs
- **Track nutrition** with meal logs and analytics

### Key Features

1. **Exercise Builder** - AI-powered exercise creation and customization
2. **Workout Tracker** - Log workouts with sets, reps, weight, duration
3. **Progress Photos** - Upload and organize before/after photos
4. **Meal Planner** - AI-designed meal plans based on preferences
5. **Nutrition Tracker** - Log meals and track macros
6. **Dashboard** - Analytics and progress visualization
7. **User Profile** - Settings, goals, preferences

---

## Technology Stack

### Frontend

- **Framework**: Next.js 15+ (React 19)
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Context API or Zustand
- **Forms**: React Hook Form + Zod validation
- **Image Handling**: Next.js Image component + sharp
- **API Client**: Fetch API / axios
- **Charts**: Recharts or Chart.js for analytics

### Backend

- **Runtime**: Node.js with Next.js API routes
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **File Storage**: Firebase Cloud Storage
- **AI APIs**: OpenAI API / Anthropic Claude API
- **Real-time Database**: Firebase Firestore (supports real-time listeners)
- **Email**: Firebase Functions + SendGrid/Resend (optional)

### DevOps & Deployment

- **Hosting**: Firebase Hosting (Blaze Plan - pay as you go)
- **Backend**: Firebase Cloud Functions (serverless, optional for API routes)
- **Database Hosting**: Firebase Firestore (managed)
- **Storage**: Firebase Cloud Storage (for progress photos)
- **Environment Management**: .env.local, .env.production, Firebase Config
- **CI/CD**: GitHub Actions + Firebase Deploy
- **Monitoring**: Firebase Console + Sentry for error tracking
- **Analytics**: Firebase Analytics

### Development Tools

- **Language**: TypeScript
- **Package Manager**: npm or pnpm
- **Version Control**: Git
- **Code Quality**: ESLint, Prettier
- **Testing**: Jest, React Testing Library (optional for MVP)

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Client (Browser)                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         React Components (Next.js Pages)             │   │
│  │  - Dashboard  - Exercise Builder  - Meal Planner     │   │
│  │  - Workout Log - Photo Gallery    - Settings         │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕
                    HTTP/REST API Calls
                            ↕
┌─────────────────────────────────────────────────────────────┐
│              Next.js Server (Node.js Runtime)                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            API Routes (/api/*)                       │   │
│  │  - /auth/* (login, register, logout)                │   │
│  │  - /exercises/* (CRUD operations)                   │   │
│  │  - /workouts/* (log, fetch, update)                 │   │
│  │  - /meals/* (create, track)                         │   │
│  │  - /photos/* (upload, gallery)                      │   │
│  │  - /ai/* (exercise design, meal planning)           │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Middleware & Services                        │   │
│  │  - Authentication (NextAuth.js)                      │   │
│  │  - Authorization checks                             │   │
│  │  - AI Service (OpenAI/Claude integration)           │   │
│  │  - File Upload Service (image handling)              │   │
│  │  - Database Service (Prisma ORM)                     │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕
        ┌───────────────────┼───────────────────┐
        ↓                   ↓                   ↓
    Firebase            External APIs      Cloud Storage
    Firestore           - OpenAI/Claude     - Firebase Storage
    - Users             - Email Service     - Progress photos
    - Exercises
    - Workouts
    - Meals
    - Photos metadata
```

---

## Project Structure

```
fitness-app/
├── DOCUMENTATION/
│   ├── ARCHITECTURE/
│   │   └── ARCHITECTURE.md (this file)
│   ├── API_DOCS.md
│   └── SETUP_GUIDE.md
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Home page
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── layout.tsx
│   │   ├── (app)/
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── exercises/
│   │   │   │   ├── page.tsx        # Exercise list
│   │   │   │   ├── [id]/page.tsx   # Exercise detail
│   │   │   │   └── create/page.tsx # Create with AI
│   │   │   ├── workouts/
│   │   │   │   ├── page.tsx        # Workout history
│   │   │   │   ├── [id]/page.tsx
│   │   │   │   └── log/page.tsx    # Log workout
│   │   │   ├── meals/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/page.tsx
│   │   │   │   └── plan/page.tsx   # AI meal planning
│   │   │   ├── photos/
│   │   │   │   ├── page.tsx        # Progress gallery
│   │   │   │   └── upload/page.tsx
│   │   │   ├── settings/page.tsx
│   │   │   └── layout.tsx
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── [...nextauth].ts
│   │       │   ├── register/route.ts
│   │       │   └── logout/route.ts
│   │       ├── exercises/
│   │       │   ├── route.ts         # GET all, POST create
│   │       │   └── [id]/route.ts    # GET, PUT, DELETE
│   │       ├── workouts/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       ├── meals/
│   │       │   ├── route.ts
│   │       │   └── [id]/route.ts
│   │       ├── photos/
│   │       │   ├── route.ts         # POST upload
│   │       │   └── [id]/route.ts
│   │       └── ai/
│   │           ├── design-exercise/route.ts
│   │           ├── plan-meal/route.ts
│   │           └── analyze-progress/route.ts
│   ├── components/
│   │   ├── ui/                      # Reusable shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── modal.tsx
│   │   │   └── ...
│   │   ├── forms/
│   │   │   ├── ExerciseForm.tsx
│   │   │   ├── WorkoutForm.tsx
│   │   │   └── MealForm.tsx
│   │   ├── sections/
│   │   │   ├── ExerciseBuilder.tsx
│   │   │   ├── WorkoutTracker.tsx
│   │   │   ├── MealPlanner.tsx
│   │   │   └── ProgressGallery.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       └── Footer.tsx
│   ├── lib/
│   │   ├── db.ts                    # Prisma client instance
│   │   ├── auth.ts                  # NextAuth configuration
│   │   ├── ai.ts                    # OpenAI/Claude client setup
│   │   ├── storage.ts               # File upload handling
│   │   ├── validators.ts            # Zod schemas
│   │   └── utils.ts                 # Helper functions
│   ├── services/
│   │   ├── exerciseService.ts
│   │   ├── workoutService.ts
│   │   ├── mealService.ts
│   │   ├── photoService.ts
│   │   ├── aiService.ts             # AI API interactions
│   │   └── userService.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useExercises.ts
│   │   ├── useWorkouts.ts
│   │   ├── useMeals.ts
│   │   └── useUpload.ts
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces/types
│   └── styles/
│       ├── globals.css
│       └── variables.css
├── firebase/
│   ├── config.ts                    # Firebase initialization
│   ├── firestore.ts                 # Firestore collections setup
│   └── storage.ts                   # Cloud Storage setup
├── public/
│   ├── images/
│   └── icons/
├── .env.example
├── .env.local                       # Local secrets (gitignored)
├── .eslintrc.json
├── .prettierrc
├── tsconfig.json
├── next.config.js
├── package.json
├── package-lock.json
└── README.md
```

---

## Database Schema

### Firestore Collections Structure

#### `users/{userId}`

```json
{
  "uid": "firebase-auth-uid",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2024-01-11T10:00:00Z",
  "updatedAt": "2024-01-11T10:00:00Z",
  "profileComplete": true,
  "goals": "weight_loss"
}
```

#### `users/{userId}/exercises/{exerciseId}`

```json
{
  "name": "Push-ups",
  "description": "Upper body pushing movement",
  "muscleGroups": ["chest", "triceps", "shoulders"],
  "difficulty": "beginner",
  "instructions": "Lie face down...",
  "aiGenerated": false,
  "imageUrl": "gs://bucket/exercises/pushups.jpg",
  "createdAt": "2024-01-11T10:00:00Z",
  "updatedAt": "2024-01-11T10:00:00Z"
}
```

#### `users/{userId}/workouts/{workoutId}`

```json
{
  "date": "2024-01-11",
  "duration": 45,
  "notes": "Great session!",
  "sets": [
    {
      "exerciseId": "exercise-123",
      "exerciseName": "Push-ups",
      "reps": 15,
      "sets": 3,
      "weight": null,
      "intensity": "high"
    }
  ],
  "createdAt": "2024-01-11T18:00:00Z",
  "updatedAt": "2024-01-11T18:00:00Z"
}
```

#### `users/{userId}/meals/{mealId}`

```json
{
  "name": "Grilled Chicken Salad",
  "description": "High protein lunch",
  "ingredients": ["chicken breast", "spinach", "olive oil"],
  "macros": {
    "calories": 450,
    "protein": 40,
    "carbs": 15,
    "fat": 20,
    "fiber": 5
  },
  "aiGenerated": true,
  "imageUrl": "gs://bucket/meals/chicken-salad.jpg",
  "createdAt": "2024-01-11T10:00:00Z",
  "updatedAt": "2024-01-11T10:00:00Z"
}
```

#### `users/{userId}/mealLogs/{logId}`

```json
{
  "date": "2024-01-11",
  "mealType": "lunch",
  "mealId": "meal-123",
  "customMeal": null,
  "macros": {
    "calories": 450,
    "protein": 40,
    "carbs": 15,
    "fat": 20
  },
  "notes": "Delicious!",
  "createdAt": "2024-01-11T12:00:00Z"
}
```

#### `users/{userId}/photos/{photoId}`

```json
{
  "url": "gs://bucket/photos/userid/photo-20240111.jpg",
  "category": "front",
  "date": "2024-01-11",
  "notes": "Week 1 progress",
  "createdAt": "2024-01-11T10:00:00Z",
  "fileSize": 2500000
}
```

#### `users/{userId}/goals/{goalId}`

```json
{
  "title": "Lose 10 kg",
  "description": "Reach 80kg by March",
  "targetValue": 80,
  "currentValue": 90,
  "metric": "weight",
  "deadline": "2024-03-11",
  "completed": false,
  "createdAt": "2024-01-11T10:00:00Z",
  "updatedAt": "2024-01-11T10:00:00Z"
}
```

---

## API Architecture

### Authentication Flow (Firebase)

```
Frontend:
- Sign up / Login via Firebase SDK
- Firebase returns JWT token

API Routes (for server-side operations):
GET    /api/auth/session           # Get current session from Firebase token
POST   /api/auth/logout            # Logout (delete client token)

Direct Firestore:
- All client writes use Firebase SDK with auth tokens
- Security Rules validate at database layer
```

### Exercise Endpoints

```
GET    /api/exercises              # Get user's exercises
POST   /api/exercises              # Create exercise
GET    /api/exercises/[id]         # Get exercise details
PUT    /api/exercises/[id]         # Update exercise
DELETE /api/exercises/[id]         # Delete exercise
```

### Workout Endpoints

```
GET    /api/workouts               # Get workout history
POST   /api/workouts               # Create workout
GET    /api/workouts/[id]          # Get workout details
PUT    /api/workouts/[id]          # Update workout
DELETE /api/workouts/[id]          # Delete workout
GET    /api/workouts/stats         # Get workout statistics
```

### Meal Endpoints

```
GET    /api/meals                  # Get user's meals
POST   /api/meals                  # Create meal
GET    /api/meals/[id]             # Get meal details
PUT    /api/meals/[id]             # Update meal
DELETE /api/meals/[id]             # Delete meal
GET    /api/meals/logs             # Get meal logs
POST   /api/meals/logs             # Log a meal
```

### Photo Endpoints

```
GET    /api/photos                 # Get progress photos
POST   /api/photos                 # Upload photo
DELETE /api/photos/[id]            # Delete photo
```

### AI Endpoints

```
POST   /api/ai/design-exercise     # AI exercise design
POST   /api/ai/plan-meal           # AI meal planning
POST   /api/ai/analyze-progress    # AI progress analysis
```

### User Endpoints

```
GET    /api/users/profile          # Get user profile
PUT    /api/users/profile          # Update profile
GET    /api/users/goals            # Get goals
POST   /api/users/goals            # Create goal
PUT    /api/users/goals/[id]       # Update goal
```

---

## Frontend Architecture

### State Management

- **Authentication**: NextAuth.js (server-side sessions)
- **Global State**: React Context or Zustand for UI state
- **Server State**: React Query or SWR for API data caching

### Key Component Hierarchy

```
<Layout>
  <Header />
  <Sidebar />
  <main>
    <Route-specific-page>
      <FeatureComponent>
        <FormComponent />
        <DataDisplay />
      </FeatureComponent>
    </Route-specific-page>
  </main>
  <Footer />
</Layout>
```

### Page Flows

**Authentication Flow:**

1. Login/Register page → NextAuth provider → Redirect to dashboard

**Exercise Builder Flow:**

1. Exercises list page
2. Click "Create with AI" → Exercise form
3. Submit → AI service generates suggestions
4. User customizes → Save to database

**Workout Logging Flow:**

1. Dashboard → "Log Workout" button
2. Select exercises → Input sets/reps/weight
3. Submit → Stored in workouts table
4. View in history

**Meal Planning Flow:**

1. Meals page → "Plan with AI" button
2. User preferences → AI generates meal plan
3. User reviews → Save meals
4. Log meals daily → Track macros

**Progress Tracking Flow:**

1. Photos page → "Upload photo"
2. Choose category (front/side/back)
3. Upload → Store in blob storage
4. Gallery view with timeline

---

## AI Integration

### Exercise Designer

**Input**: User preferences, goals, experience level, available equipment
**Process**:

1. Call OpenAI/Claude API with detailed prompt
2. AI generates 3-5 exercise variations
3. Include instructions, muscle groups, difficulty

**Example Prompt Template**:

```
Create 3 unique exercise variations for building chest strength.
User experience: beginner
Available equipment: dumbbells
Time per workout: 30 minutes

For each exercise provide:
- Name
- Step-by-step instructions
- Muscle groups targeted
- Sets/reps recommendations
- Safety tips
```

### Meal Planner

**Input**: Dietary preferences, calorie goals, allergies, cuisine preferences
**Process**:

1. Call OpenAI/Claude with meal planning prompt
2. AI generates 7-day meal plan with macros
3. Include recipes and shopping list

**Example Prompt Template**:

```
Create a 7-day meal plan for muscle building.
Daily calorie target: 2500
Macro targets: 180g protein, 250g carbs, 80g fat
Dietary restrictions: none
Cuisine preference: Mediterranean

For each day and meal provide:
- Meal name
- Ingredients
- Macros (calories, protein, carbs, fat)
- Preparation time
```

### Progress Analysis

**Input**: Before/after photos, workout history, measurements
**Process**:

1. Send photos and data to AI
2. Generate progress report with insights
3. Suggest adjustments to routine

---

## Authentication & Security

### Firebase Authentication Setup

- **Providers**: Email/password, Google, GitHub, Apple (built-in)
- **Session Management**: Firebase Session Cookies + JWT (via Firebase Admin SDK)
- **Password Security**: Firebase handles hashing securely
- **CSRF Protection**: Built-in with Firebase Auth
- **Rate Limiting**: Firebase Authentication rules + Cloud Functions

### Security Best Practices

- Firestore Security Rules enforce user data isolation
- User can only access their own data (rules: `request.auth.uid == userId`)
- Firebase Storage rules validate file type and size
- Environment variables for Firebase config
- HTTPS enforced by default in Firebase
- CORS configured for Next.js domain
- Firestore Rules tested before deployment

### Protected Routes

- All `/app/*` routes require Firebase Auth token
- Firestore Security Rules protect data at database level
- Cloud Storage rules restrict file access to resource owner
- Optional: Custom claims for admin role-based access

---

## Deployment Strategy

### Environment Setup

```
Development:  localhost:3000 (next dev)
Staging:      staging-fitness-app.vercel.app
Production:   fitness-app.vercel.app
```

### Deployment Process

1. Push to main branch
2. GitHub Actions runs tests (if configured)
3. Vercel auto-deploys to production
4. Database migrations run automatically
5. Environment variables pulled from Vercel dashboard

### Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] All tests passing
- [ ] No console errors
- [ ] Security audit passed
- [ ] Rate limiting in place
- [ ] Error monitoring (Sentry) configured

---

## Data Flow

### Creating a Workout Flow

```
User Input (Exercise + Sets/Reps)
    ↓
React Form Component (React Hook Form)
    ↓
POST /api/workouts
    ↓
API Route Handler
    ├─ Validate input (Zod)
    ├─ Check authentication
    └─ Call workoutService.createWorkout()
    ↓
Prisma ORM
    ├─ Insert into workouts table
    └─ Insert into workout_sets table
    ↓
Database (PostgreSQL)
    ↓
Return success response
    ↓
Update UI State
    ↓
Show confirmation toast
```

### Using AI Exercise Designer

```
User Input (Goals + Preferences)
    ↓
Form submission
    ↓
POST /api/ai/design-exercise
    ↓
API Handler calls aiService.designExercise()
    ↓
OpenAI/Claude API Call
    ├─ Send prompt with user preferences
    └─ Stream response
    ↓
Parse AI response
    ↓
Return exercise suggestions
    ↓
Display to user in UI
    ↓
User selects and saves
    ↓
POST /api/exercises (save to database)
```

### Photo Upload Flow

```
User selects photo
    ↓
Frontend validation (type, size)
    ↓
Show upload progress
    ↓
POST /api/photos with FormData
    ↓
API Handler
    ├─ Validate file
    ├─ Call storageService.uploadImage()
    └─ Get signed URL
    ↓
Upload to Blob Storage/S3
    ↓
Store metadata in database
    ↓
Return URL to client
    ↓
Display in progress gallery
```

---

## Development Timeline (Estimated)

### Phase 1: Core Setup (Week 1-2)

- [ ] Next.js project scaffolding
- [ ] Database setup & schema
- [ ] NextAuth.js authentication
- [ ] Basic layout & navigation

### Phase 2: Core Features (Week 3-5)

- [ ] Exercise CRUD + AI integration
- [ ] Workout logging & tracking
- [ ] Meal CRUD + AI integration
- [ ] Dashboard with stats

### Phase 3: Photos & Polish (Week 6-7)

- [ ] Photo upload & gallery
- [ ] Progress comparison tools
- [ ] Responsive design
- [ ] Testing & bug fixes

### Phase 4: Deployment & Optimization (Week 8)

- [ ] Performance optimization
- [ ] SEO setup
- [ ] Analytics integration
- [ ] Deploy to production

---

## Future Enhancements

- **Mobile App**: React Native wrapper around web version
- **Offline Support**: PWA with service workers
- **Social Features**: Share workouts, meal plans
- **Wearable Integration**: Sync with fitness trackers
- **Advanced Analytics**: Machine learning-based recommendations
- **Custom AI Models**: Fine-tuned models for fitness domain
- **Community**: User forums, workout sharing
- **Premium Tiers**: Advanced features, personalized coaching

---

## Monitoring & Logging

- **Error Tracking**: Sentry for production errors
- **Logging**: Winston or Pino for structured logs
- **Performance**: Vercel Analytics + Web Vitals
- **Database**: PostgreSQL query monitoring
- **API Monitoring**: Response times, error rates

---

## Conclusion

This architecture provides a scalable, secure, and user-friendly fitness application built on modern web technologies. The Next.js framework allows rapid development with full-stack capabilities, while PostgreSQL ensures reliable data persistence. AI integration via OpenAI/Claude APIs adds intelligence to exercise and meal planning features.

The modular component structure and clear separation of concerns make the codebase maintainable and easy to extend with new features.
