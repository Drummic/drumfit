# Drum Fit - Quick Start Guide

## 🚀 For Users

### Getting Started

1. **Visit the app**: https://drumfit-app.vercel.app
2. **Sign Up** with your email or Google account
3. **Create Exercises** in the Exercises tab
4. **Build Workouts** by combining exercises
5. **Run Workouts** and track your progress
6. **View Activity History** in the calendar or list view

### Creating Your First Workout

1. Go to **Manage Workouts** tab
2. Click **"Create New Workout"**
3. Enter workout name and description
4. Select workout duration (short/medium/long)
5. **Add Exercises**:
   - Click "Add Exercise"
   - Select an exercise
   - Set sets, reps, and weight
   - Click "Add"
6. Click **"Create Workout"**

### Running a Workout

1. Click **"Start Workout"** button on dashboard
2. You'll see a 3-2-1 countdown
3. Press **"Start"** to skip countdown and begin immediately
4. Timer will show your exercise time
5. When done, click **"Set Complete"**
6. Rest period will show (30 sec between sets, 60 sec between exercises)
7. Press **"Start"** to skip rest and continue
8. Complete all exercises and view your summary

### Tracking Progress

- **Dashboard**: See total workouts, exercises, and calories
- **List View**: See all your completed workouts
- **Calendar View**: See which days you worked out
- **Activity Details**: Click any activity to see detailed stats

---

## 👨‍💻 For Developers

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
http://localhost:3000

# Build for production
npm run build

# Format code
npm run format
```

### Project Structure

- `src/app/` - Next.js pages and routes
- `src/components/` - Reusable React components
- `src/services/` - Business logic and API calls
- `src/hooks/` - Custom React hooks
- `src/context/` - React Context for state
- `src/types/` - TypeScript type definitions

### Making Changes

1. Make code changes
2. Test locally: `npm run dev`
3. Commit: `git commit -m "feat: Your change"`
4. Push: `git push origin main`
5. Vercel automatically deploys! 🚀

### Adding New Features

Example: Adding a new exercise field

1. Update `src/types/index.ts` with new type
2. Update `src/services/exerciseService.ts` to handle new field
3. Update `src/components/exercises/CreateExerciseModal.tsx` with new form field
4. Test locally
5. Deploy (git push)

### Debugging

**Check Firebase connection:**
```bash
# In browser console
firebase.auth().currentUser // Should show your user
```

**View Firestore data:**
- Go to Firebase Console → Firestore → Collections
- Browse users/{userId}/exercises, workouts, workoutLogs

**Check Vercel logs:**
- Vercel Dashboard → Deployments → Click deployment → Logs

---

## 🔧 Configuration

### Environment Variables Checklist

```
✅ NEXT_PUBLIC_FIREBASE_API_KEY
✅ NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
✅ NEXT_PUBLIC_FIREBASE_PROJECT_ID
✅ NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
✅ NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
✅ NEXT_PUBLIC_FIREBASE_APP_ID
```

All set in:
- Local: `.env.local`
- Production: Vercel → Settings → Environment Variables

### Firebase Authorized Domains

Must be added in Firebase Console:
- Local: `localhost:3000`
- Production: `drumfit-app.vercel.app`

---

## 📊 Architecture Overview

```
User Browser
     ↓
Next.js Frontend (Vercel)
     ↓
Firebase Services
     ├── Authentication
     ├── Firestore Database
     └── Storage
```

### Data Flow Example

1. User creates exercise → React state
2. Click save → calls `exerciseService.createExercise()`
3. Service → Firebase Firestore
4. Firestore → returns exercise ID
5. Update React state → UI refreshes
6. User sees new exercise in list

---

## 🚀 Deployment Checklist

Before deploying new features:

- [ ] Test locally: `npm run dev`
- [ ] No TypeScript errors: `npm run lint`
- [ ] Code formatted: `npm run format`
- [ ] Commit with descriptive message
- [ ] Push to main: `git push origin main`
- [ ] Watch Vercel build: https://vercel.com/dashboard
- [ ] Test on live domain after ✅

---

## 📱 App Features Summary

| Feature | Status | Details |
|---------|--------|---------|
| Exercise Management | ✅ | Create, edit, delete, filter by muscle group |
| Workout Builder | ✅ | Compose workouts with multiple exercises |
| Workout Runner | ✅ | Real-time timer with set/exercise progression |
| Activity Logging | ✅ | Auto-saves workout completions |
| Activity Tracking | ✅ | List view, calendar view, details modal |
| Statistics | ✅ | Dashboard with comprehensive stats |
| User Auth | ✅ | Email/password and Google Sign-in |
| Cloud Database | ✅ | Firestore with security rules |
| Deployment | ✅ | Vercel with auto-deployments |

---

## 🔐 Security Notes

### What's Protected
- ✅ User data in Firestore (requires authentication)
- ✅ API calls via security rules
- ✅ Routes via ProtectedRoute component
- ✅ Passwords hashed by Firebase

### What's Public
- ⚠️ Firebase API keys (intentional, protected by rules)
- ⚠️ Source code on GitHub (open source)

### Best Practices
- Never commit `.env.local` (already in `.gitignore`)
- Keep Firestore rules restrictive
- Regularly check Firebase audit logs
- Monitor Vercel deployment status

---

## 📞 Support

### Troubleshooting Steps

1. **App won't load?**
   - Check browser console for errors
   - Verify environment variables
   - Check Vercel deployment status

2. **Can't log in?**
   - Check Firebase authorized domains
   - Clear browser cache
   - Verify Firebase project settings

3. **Data not saving?**
   - Check Firestore security rules
   - Verify user is authenticated
   - Check network tab in DevTools

4. **Build fails?**
   - Check `npm run lint` for errors
   - Review recent code changes
   - Check Vercel logs

### Useful Links
- Vercel Dashboard: https://vercel.com/dashboard
- Firebase Console: https://console.firebase.google.com
- GitHub Repository: https://github.com/Drummic/drumfit
- Live App: https://drumfit-app.vercel.app

---

**Happy coding! 💪**
