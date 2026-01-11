# 🏋️ Drum Fit - AI-Powered Fitness Tracking

An intelligent fitness tracking application built with Next.js 15, React 19, and Firebase. Create exercises, build custom workouts, track your progress with real-time timers, and analyze your fitness data with comprehensive statistics.

**🚀 Live App**: https://drumfit-app.vercel.app

---

## ✨ Features

### 💪 Exercise Management
- Create and manage custom exercises
- Organize by muscle groups (chest, back, legs, arms, core, shoulders)
- Difficulty levels and descriptions
- Quick-add popular exercises

### 🏋️ Workout Builder
- Compose workouts from your exercises
- Configure sets, reps, and weights per exercise
- Choose workout intensity (short/medium/long)
- Save and reuse workout templates

### ⏱️ Intelligent Workout Runner
- Real-time exercise timer with smart progression
- **Automatic phases**: Exercise → Rest Set → Rest Exercise
- **3-2-1 Countdown**: Before each exercise (pausable, skippable)
- **Rest periods**: 30 seconds between sets, 60 seconds between exercises
- **Smart controls**: Pause/Resume at any time
- **Progress tracking**: Visual set-by-set progress display
- **Auto-calculation**: Calories burned based on volume and intensity

### 📊 Activity Tracking
- **List View**: Chronological workout history
- **Calendar View**: Visual calendar highlighting workout days
- **Activity Details**: Click any workout to see stats
- **Statistics Dashboard**: Comprehensive fitness metrics

### 📈 Statistics & Analytics
- Total workouts completed
- Total time spent exercising
- Total calories burned
- Current workout streak
- Weekly and monthly stats
- Average duration and calories per workout
- Longest workout recorded

### 🔐 User Authentication
- Email/password sign-up and login
- Google Sign-in integration
- Secure authentication via Firebase
- Protected routes (requires login)

---

## 🚀 Quick Start

### For Users
1. Visit https://drumfit-app.vercel.app
2. Sign up with email or Google
3. Create exercises and build workouts
4. Start tracking your fitness journey!

See [QUICK_START.md](./QUICK_START.md) for detailed user guide.

### For Developers

**Local Development:**
```bash
# Clone repository
git clone https://github.com/Drummic/drumfit.git
cd drumfit

# Install dependencies
npm install

# Add environment variables
# Copy DOCUMENTATION/FIRESTORE_SDK_INFO.txt to .env.local

# Start development server
npm run dev

# Open http://localhost:3000
```

**Deployment:**
See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for comprehensive setup instructions including:
- Vercel deployment steps
- Firebase configuration
- Environment variables setup
- Troubleshooting guide

---

## 🛠️ Technology Stack

### Frontend
- **Next.js 16.1.1** - React framework with SSR
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling
- **Lucide React 0.408.0** - Icon library

### Backend
- **Firebase 10.7.0** - Backend services
  - Authentication (Email/Password, Google)
  - Firestore Database (NoSQL)
- **React Hook Form 7.48.0** - Form handling
- **Zod 3.22.0** - Schema validation

### Deployment
- **Vercel** - Hosting with auto-deployments
- **GitHub** - Version control

---

## 📁 Project Structure

```
src/
├── app/              # Next.js pages
├── components/       # React components
├── services/         # Business logic
├── hooks/           # Custom hooks
├── context/         # React Context
├── lib/             # Utilities
└── types/           # TypeScript types
```

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md#project-structure) for detailed structure.

---

## 🔧 Configuration

### Environment Variables Required

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

Get these from Firebase Console → Project Settings → Your apps

### Firebase Setup

- **Project**: drumfit-3a0c1
- **Region**: eur3 (Europe)
- **Database**: Firestore
- **Plan**: Blaze (Pay-as-you-go)

---

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - User and developer quick start
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Complete deployment and setup guide
- **[FIRESTORE_SETUP.md](./DOCUMENTATION/FIRESTORE_SETUP.md)** - Database configuration
- **[ARCHITECTURE.md](./DOCUMENTATION/ARCHITECTURE/ARCHITECTURE.md)** - System architecture

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Visit https://vercel.com/new
3. Import `Drummic/drumfit` repository
4. Add environment variables
5. Deploy! 🚀

Auto-deploys on every git push to main branch.

### Local Testing

```bash
npm run build    # Build production bundle
npm start        # Start production server
```

---

## 🎯 Roadmap

### Current Features ✅
- [x] Exercise management
- [x] Workout builder
- [x] Workout runner with timer
- [x] Activity logging
- [x] Activity tracking (list & calendar)
- [x] Statistics dashboard
- [x] User authentication
- [x] Vercel deployment

### Future Features 🔄
- [ ] Meal tracking integration
- [ ] Workout templates/suggestions
- [ ] AI-powered form feedback
- [ ] Social features (share workouts)
- [ ] Advanced analytics & charts
- [ ] Wearable device integration
- [ ] Offline mode with sync

---

## 🐛 Troubleshooting

**Firebase auth error?**
→ Add your domain to Firebase → Authentication → Authorized domains

**App won't deploy?**
→ Check environment variables in Vercel settings

**Data not loading?**
→ Verify Firestore security rules and user authentication

See [DEPLOYMENT_GUIDE.md#troubleshooting](./DEPLOYMENT_GUIDE.md#troubleshooting) for more.

---

## 📄 License

Open source - feel free to use and modify!

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Push and create a pull request

See [QUICK_START.md](./QUICK_START.md#-for-developers) for developer guidelines.

---

## 📞 Support

- **Live App**: https://drumfit-app.vercel.app
- **GitHub**: https://github.com/Drummic/drumfit
- **Firebase**: https://firebase.google.com

---

**Built with ❤️ using Next.js, React, and Firebase**

**Last Updated**: January 11, 2026 | **Status**: ✅ Production Ready
