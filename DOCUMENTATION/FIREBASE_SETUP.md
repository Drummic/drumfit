# Firebase Project Setup Guide

**Drum Fit - Premium Fitness Tracker**
**Firebase Configuration Guide**
**Created**: January 11, 2026
**Plan**: Firebase Blaze (Pay as you go)

---

## Quick Setup Instructions

### Prerequisites

- Google account
- Access to [Firebase Console](https://console.firebase.google.com/)

---

## Step-by-Step: Create Firebase Project

### 1. Go to Firebase Console

Visit: https://console.firebase.google.com/

### 2. Create a New Project

- Click **"Add project"** or **"Create a project"**
- Enter project name: **`drum-fit`** (or your preferred name)
- Accept the Firebase terms
- **IMPORTANT**: When prompted for billing, select **Blaze Plan** (pay as you go)
- Click **"Create project"**
- Wait 2-3 minutes for creation to complete

### 3. Create Firestore Database

- In Firebase Console, go to **"Build"** → **"Firestore Database"**
- Click **"Create database"**
- Select **"Start in production mode"** (we'll set security rules)
- Choose region closest to you:
  - US: `us-central1` (recommended for North America)
  - Europe: `europe-west1`
  - Asia: `asia-southeast1`
- Click **"Create"**

### 4. Enable Firebase Authentication

- Go to **"Build"** → **"Authentication"**
- Click **"Get started"**
- Enable these sign-in providers:
  - ✅ Email/Password (required)
  - ⭐ Google (optional but recommended)
  - ⭐ GitHub (optional)

### 5. Set Firestore Security Rules

- In Firestore Database, go to **"Rules"** tab
- Replace default rules with the provided security rules (see below)
- Click **"Publish"**

### 6. Get Firebase Configuration

- Go to **"Project Settings"** (gear icon top-left)
- Under **"Your apps"**, click the web icon (`</>`）
- If no app exists, click **"Add app"** → select **"Web"**
- Copy these credentials (you'll need them for `.env.local`):
  ```
  NEXT_PUBLIC_FIREBASE_API_KEY
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  NEXT_PUBLIC_FIREBASE_PROJECT_ID
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  NEXT_PUBLIC_FIREBASE_APP_ID
  ```

---

## Firestore Security Rules

Go to **Firestore Database** → **Rules** tab and paste these rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - can only access own document
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    // Exercises subcollection - user can only access their own
    match /users/{userId}/exercises/{document=**} {
      allow read, write: if request.auth.uid == userId;
    }

    // Workouts subcollection
    match /users/{userId}/workouts/{document=**} {
      allow read, write: if request.auth.uid == userId;
    }

    // Meals subcollection
    match /users/{userId}/meals/{document=**} {
      allow read, write: if request.auth.uid == userId;
    }

    // Meal Logs subcollection
    match /users/{userId}/mealLogs/{document=**} {
      allow read, write: if request.auth.uid == userId;
    }

    // Photos subcollection
    match /users/{userId}/photos/{document=**} {
      allow read, write: if request.auth.uid == userId;
    }

    // Goals subcollection
    match /users/{userId}/goals/{document=**} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

Click **"Publish"** after pasting.

---

## Configure Local Environment

### 1. Copy Environment Template

```bash
cp .env.example .env.local
```

### 2. Fill in Firebase Credentials

Edit `.env.local` with your Firebase credentials:

```env
FITNESS_APP=true

# Firebase Configuration (from Firebase Console Project Settings)
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY_HERE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID_HERE
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID_HERE
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID_HERE

# OpenAI Configuration (for AI features - optional for now)
OPENAI_API_KEY=sk-...

# Vercel Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Test Connection

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and check browser console for:

- No Firebase initialization errors
- Firebase SDK should load successfully

---

## Verify Setup

### ✅ Checklist

- [ ] Firebase project created
- [ ] Firestore database active
- [ ] Firebase Auth enabled with Email/Password
- [ ] Security rules published
- [ ] `.env.local` file created with credentials
- [ ] `npm run dev` works without Firebase errors
- [ ] No warnings in browser console about Firebase

---

## Firebase Console Useful Links

- [Firebase Console](https://console.firebase.google.com/)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Firebase Rules Documentation](https://firebase.google.com/docs/rules)

---

## Troubleshooting

### Firebase SDK Not Initializing

**Problem**: "Firebase: No Firebase App '[DEFAULT]' has been created"
**Solution**:

- Verify `.env.local` has all required variables
- Check that all `NEXT_PUBLIC_` variables are set correctly
- Restart dev server: `npm run dev`

### Authentication Not Working

**Problem**: Login/register buttons don't work
**Solution**:

- Check Firestore Database is "Active" in console
- Verify Email/Password provider is enabled in Authentication
- Check browser console for error messages

### Security Rules Rejected Reads/Writes

**Problem**: "Missing or insufficient permissions"
**Solution**:

- Ensure user is authenticated (logged in)
- Verify security rules match current schema
- Check Firebase Console → Firestore → Rules tab

---

## Next Steps

After completing this setup:

1. Return to [STEPS.md](./STEPS.md) Step 1.5 in the development guide
2. Proceed to Step 2: Configure `.env.local` with credentials
3. Proceed to Step 3: Create Authentication Context

---

## Security Notes

⚠️ **Important**:

- **Never** commit `.env.local` to Git
- `.env.local` is listed in `.gitignore`
- Your Firebase API Key is public (it's the `NEXT_PUBLIC_` prefix that makes it public)
- The Firestore Security Rules protect your data from unauthorized access
- Treat any private keys (like `OPENAI_API_KEY`) as secrets
