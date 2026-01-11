# Drum Fit - Complete Deployment Guide

## Project Overview

**Drum Fit** is an AI-powered fitness tracking application built with Next.js 15, React 19, and Firebase. It provides comprehensive workout management, real-time exercise tracking, and activity analytics.

**Live App**: https://drumfit-app.vercel.app

---

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Project Structure](#project-structure)
3. [Features](#features)
4. [Development Setup](#development-setup)
5. [Vercel Deployment](#vercel-deployment)
6. [Firebase Configuration](#firebase-configuration)
7. [Environment Variables](#environment-variables)
8. [Troubleshooting](#troubleshooting)

---

## Technology Stack

### Frontend
- **Next.js 16.1.1** - React framework with server-side rendering
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React 0.408.0** - Icon library

### Backend & Database
- **Firebase 10.7.0** - Backend services
  - Authentication (Email/Password, Google Sign-in)
  - Firestore Database (NoSQL)
  - Cloud Storage (optional)

### Form & Validation
- **React Hook Form 7.48.0** - Efficient form handling
- **Zod 3.22.0** - TypeScript-first schema validation

### Development Tools
- **ESLint 9** - Code linting
- **Prettier 3.1.0** - Code formatting

---

## Project Structure

```
fitness-app/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── dashboard/                # Main dashboard
│   │   ├── exercises/                # Exercise management
│   │   ├── workouts/                 # Workout management & runner
│   │   ├── login/                    # Authentication
│   │   ├── signup/
│   │   └── layout.tsx
│   │
│   ├── components/                   # Reusable React components
│   │   ├── activities/               # Activity tracking components
│   │   │   ├── ActivityListView.tsx
│   │   │   ├── ActivityCalendarView.tsx
│   │   │   ├── ActivityDetails.tsx
│   │   │   └── StatsOverview.tsx
│   │   ├── exercises/                # Exercise components
│   │   │   ├── CreateExerciseModal.tsx
│   │   │   └── ExerciseCard.tsx
│   │   ├── workouts/                 # Workout components
│   │   │   ├── CreateWorkoutModal.tsx
│   │   │   ├── WorkoutCard.tsx
│   │   │   ├── WorkoutRunner.tsx
│   │   │   └── WorkoutSummary.tsx
│   │   ├── ProtectedRoute.tsx         # Authentication guard
│   │   └── ...
│   │
│   ├── services/                     # Business logic & API calls
│   │   ├── exerciseService.ts        # Exercise CRUD operations
│   │   ├── workoutService.ts         # Workout CRUD operations
│   │   ├── workoutLogService.ts      # Activity logging
│   │   └── workoutStatsService.ts    # Statistics calculations
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useExercise.ts            # Exercise state management
│   │   ├── useWorkout.ts             # Workout state management
│   │   ├── useWorkoutLogs.ts         # Activity log state
│   │   └── useWorkoutStats.ts        # Statistics state
│   │
│   ├── context/                      # React Context
│   │   └── AuthContext.tsx           # Authentication context
│   │
│   ├── lib/                          # Utilities & libraries
│   │   └── firebase.ts               # Firebase initialization
│   │
│   └── types/                        # TypeScript type definitions
│       └── index.ts
│
├── public/                           # Static assets
├── .env.local                        # Local environment variables (gitignored)
├── firebase.json                     # Firebase configuration
├── firestore.rules                   # Firestore security rules
├── package.json                      # Dependencies & scripts
├── tsconfig.json                     # TypeScript configuration
└── next.config.ts                    # Next.js configuration
```

---

## Features

### ✅ Exercise Management
- Create custom exercises with muscle group classification
- Filter exercises by muscle group
- Edit and delete exercises
- Quick-add popular exercises (Pushups, Chair Dips)

### ✅ Workout Builder
- Create workouts from selected exercises
- Configure sets, reps, and weights per exercise
- Categorize workouts by duration (short, medium, long)
- View and manage all workouts

### ✅ Workout Runner
- Real-time exercise timer with phases:
  - **Countdown Phase**: 3-2-1 GO countdown before exercise
  - **Exercise Phase**: Timer runs while you perform exercise
  - **Rest Phases**: 30-second rest between sets, 60-second between exercises
  - **Summary Phase**: Completion stats and celebration
- Manual control: Start/Pause/Resume/Reset
- Skip rest periods with Start button
- Automatic calorie calculation based on:
  - Total sets and reps
  - Workout intensity (short/medium/long)
  - Duration
- Detailed progress tracking with exercise and set visualization

### ✅ Activity Tracking
- **List View**: Chronological workout history
- **Calendar View**: Visual calendar with highlighted workout days
- **Activity Details**: Click any activity to view:
  - Workout name and completion time
  - Duration and calories burned
  - Exercise count and intensity
  - Motivational summary

### ✅ Statistics Dashboard
- Total workouts completed
- Total time spent exercising
- Total calories burned
- Current workout streak (consecutive days)
- Weekly and monthly statistics
- Average duration and calories per workout
- Longest workout recorded

### ✅ User Authentication
- Email/Password sign-up and login
- Google Sign-in integration
- Protected routes (requires authentication)
- Secure session management via Firebase

---

## Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase account (free tier available)

### Local Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Drummic/drumfit.git
   cd drumfit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env.local` file** in the root directory
   ```bash
   cp DOCUMENTATION/FIRESTORE_SDK_INFO.txt .env.local
   ```
   Or manually add (see [Environment Variables](#environment-variables) section)

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

### Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Format code with Prettier
npm run format
```

---

## Vercel Deployment

### Step 1: Push Code to GitHub

```bash
git add .
git commit -m "Initial commit: Drum Fit app"
git push origin main
```

### Step 2: Create Vercel Account

1. Go to https://vercel.com
2. Sign up with GitHub account

### Step 3: Import Project

1. Click **"New Project"**
2. Select **"Drummic/drumfit"** GitHub repository
3. Click **"Import"**

### Step 4: Configure Environment

1. In Vercel project settings, go to **Settings → Environment Variables**
2. Add all 6 Firebase variables (see [Environment Variables](#environment-variables))
3. Click **"Save"**

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait 2-5 minutes for build to complete
3. Once successful, your app is live! 🎉

### Step 6: Authorize Firebase Domain

1. Go to https://console.firebase.google.com
2. Select **drumfit-3a0c1** project
3. Click **"Authentication"** → **"Settings"**
4. Scroll to **"Authorized domains"**
5. Click **"Add domain"**
6. Enter your Vercel domain: `drumfit-app.vercel.app`
7. Click **"Add"**

### Automatic Deployments

Every time you push to the `main` branch:
```bash
git add .
git commit -m "Your message"
git push origin main
```

Vercel automatically rebuilds and deploys! 🚀

---

## Firebase Configuration

### Project Details
- **Project ID**: drumfit-3a0c1
- **Region**: eur3 (Europe)
- **Plan**: Blaze (Pay-as-you-go)

### Database Structure

```
Firestore Database:
├── users/
│   └── {userId}/
│       ├── exercises/
│       │   └── {exerciseId}
│       │       ├── name: string
│       │       ├── description: string
│       │       ├── muscleGroups: array
│       │       ├── difficulty: string (easy/medium/hard)
│       │       └── ...
│       │
│       ├── workouts/
│       │   └── {workoutId}
│       │       ├── name: string
│       │       ├── description: string
│       │       ├── duration: string (short/medium/long)
│       │       ├── exercises: array of exercise objects
│       │       └── ...
│       │
│       └── workoutLogs/
│           └── {logId}
│               ├── workoutId: string
│               ├── workoutName: string
│               ├── duration: number (seconds)
│               ├── caloriesBurned: number
│               ├── exerciseCount: number
│               ├── completedAt: timestamp
│               └── ...
```

### Security Rules

See `firestore.rules` file. Key points:
- Users can only access their own data
- Authentication required for all operations
- Validates data structure on write
- Prevents unauthorized access

---

## Environment Variables

### Local Development (`.env.local`)

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD7s-i8n6YmlalAFmYyXO__pNlmECADcbM
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=drumfit-3a0c1.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=drumfit-3a0c1
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=drumfit-3a0c1.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=818020949104
NEXT_PUBLIC_FIREBASE_APP_ID=1:818020949104:web:452bbe3af85d004dd668b5
```

### Vercel Environment Variables

Add the **same 6 variables** in:
**Vercel Dashboard → Project Settings → Environment Variables**

These are prefixed with `NEXT_PUBLIC_` because they're intentionally public (Firebase SDK keys are not sensitive - data is protected by security rules).

---

## Troubleshooting

### Build Fails with Dependency Error

**Problem**: `npm error ERESOLVE could not resolve`

**Solution**:
- Ensure `package.json` versions are compatible:
  - `eslint: ^9` (for Next.js 16)
  - `lucide-react: ^0.408.0` (for React 19)
  - `react: 19.2.3`

### Firebase Auth Error: "unauthorized-domain"

**Problem**: Login fails with "auth/unauthorized-domain" error

**Solution**:
1. Go to Firebase Console
2. Authentication → Settings → Authorized domains
3. Add your Vercel domain: `drumfit-app.vercel.app`

### App Deployed but No Data Loading

**Problem**: App loads but exercises/workouts don't appear

**Solution**:
1. Check environment variables are correctly set in Vercel
2. Verify Firestore security rules allow your user
3. Ensure user is authenticated
4. Check browser console for Firebase errors

### Vercel Keeps Deploying Wrong Repository

**Problem**: Vercel deploys from wrong GitHub repo

**Solution**:
1. Go to Vercel Project Settings
2. Disconnect current Git repository
3. Connect the correct one: `Drummic/drumfit`
4. Manually redeploy

---

## Performance Optimizations

### Current Implementation
- ✅ Next.js 16 with Turbopack (fast builds)
- ✅ React 19 with latest optimizations
- ✅ Tailwind CSS 4 (smaller bundle size)
- ✅ Lazy component loading
- ✅ Firebase with caching

### Future Improvements
- Add image optimization for exercise photos
- Implement service worker for offline support
- Add workout templates/suggestions
- Implement pagination for large datasets
- Add search functionality

---

## Support & Maintenance

### Common Tasks

**Update a dependency:**
```bash
npm update package-name
git add package.json package-lock.json
git commit -m "Update package-name"
git push
```

**Roll back a deployment:**
1. Go to Vercel Deployments
2. Find previous successful deployment
3. Click "Redeploy"

**Check logs:**
1. Vercel: Dashboard → Deployments → Click deployment → View logs
2. Local: Check terminal output
3. Firebase: Console → Logs

---

## Contributing

To add new features:

1. Create a branch: `git checkout -b feature/your-feature`
2. Make changes and test locally
3. Commit: `git commit -m "feat: Add your feature"`
4. Push: `git push origin feature/your-feature`
5. Vercel will create preview deployment
6. Merge to main when ready

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)

---

**Last Updated**: January 11, 2026
**Project Status**: ✅ Production Ready
