// ============================================================================
// Filename: FIRESTORE_EXPLORER_GUIDE.md
// Path: /drum-fit/DOCUMENTATION/FIRESTORE_EXPLORER_GUIDE.md
// Created At: January 11, 2026
// From: Development Team
// Changed At: N/A
// Functional Description: Guide for using Firestore Explorer VS Code extension
// to verify Firebase connection and manage Firestore database directly in VS Code
// Dependencies: Firestore Explorer extension (alesdi.firestore-explorer), Firebase project
// Used In: Development workflow for database inspection and testing
// ============================================================================

# Firestore Explorer Extension Guide

**VS Code Extension**: Firestore Explorer
**Extension ID**: `alesdi.firestore-explorer`
**Status**: ✅ Installed

---

## Prerequisites

Before using Firestore Explorer, you need:

1. ✅ Firebase project created (Step 1.5)
2. ✅ Firestore database initialized
3. ✅ `.env.local` file with Firebase credentials
4. ✅ Firebase CLI installed: `npm install -g firebase-tools`
5. ✅ Logged into Firebase: `firebase login`

---

## Setup Instructions

### Step 1: Install Firebase CLI (if not already installed)

```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase

```bash
firebase login
```

This opens your browser to authenticate with your Google account.

### Step 3: Configure Firebase Project

```bash
cd /Users/drummic/Documents/GitHub/fitness-app
firebase use --add
```

When prompted:

- Select your Firebase project: `drum-fit`
- Alias: `default`

This creates/updates `.firebaserc` file.

### Step 4: Verify Configuration

Check that `.firebaserc` contains:

```json
{
  "projects": {
    "default": "drum-fit"
  }
}
```

---

## Using Firestore Explorer in VS Code

### Open Firestore Explorer

1. Open VS Code sidebar
2. Look for **Firestore icon** (looks like a leaf/database)
3. Click on it to open Firestore Explorer panel

Or use Command Palette:

```
Ctrl+Shift+P → "Firestore: Connect" or "Firestore: Explorer"
```

### Connect to Your Project

1. In Firestore Explorer sidebar
2. Click **"Connect to Firestore"** or gear icon ⚙️
3. Select your Firebase project: `drum-fit`
4. Choose authentication method:
   - **Recommended**: Use default Firebase CLI authentication (you already logged in)
   - Or provide service account key JSON

### Browse Your Database

Once connected, you'll see:

```
📦 drum-fit (your project)
└── Collections:
    ├── users
    ├── exercises
    ├── workouts
    ├── meals
    ├── photos
    └── goals
```

### Available Actions

Right-click on collections/documents:

- **View Document** - See data in editor
- **Add Document** - Create new document
- **Delete Document** - Remove document
- **Copy Path** - Copy Firestore path
- **Refresh** - Reload data

---

## Common Tasks

### View All Users

1. Expand `users` collection
2. See all user documents with their UIDs
3. Click a user to view their data

### Check Exercise Collection Structure

1. Expand any user → `users/{userId}/exercises`
2. See exercises created by that user
3. Verify fields match your schema

### Add Test Data

1. Right-click `users` collection
2. Select "Add Document"
3. Enter document ID (Firebase UID or auto-generate)
4. Add fields:
   ```json
   {
     "email": "test@example.com",
     "name": "Test User",
     "createdAt": "2024-01-11T10:00:00Z"
   }
   ```

### Delete Test Data

1. Right-click document
2. Select "Delete Document"
3. Confirm deletion

---

## Verification Checklist

After connecting Firestore Explorer:

- [ ] Extension shows your project name: `drum-fit`
- [ ] No errors in VS Code terminal
- [ ] Can see collections in sidebar
- [ ] Can expand collections without errors
- [ ] Authentication shows as "Connected"

---

## Troubleshooting

### "Not authenticated" Error

**Problem**: Can't connect to Firestore
**Solution**:

```bash
firebase login
firebase use --add
# Select drum-fit project
```

### "Project not found" Error

**Problem**: Extension can't find your Firebase project
**Solution**:

1. Verify `.firebaserc` has correct project ID
2. Check Firebase Console that project exists
3. Try: `firebase list` to see all your projects
4. Restart VS Code

### "Permission denied" Error

**Problem**: Security rules blocking access
**Solution**:

1. Check Firestore Security Rules in Firebase Console
2. Verify they allow authenticated read/write
3. Use test mode temporarily to debug:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```
4. **⚠️ After testing, restore proper security rules!**

### Extension Not Showing in Sidebar

**Solution**:

1. Verify extension is installed: `code --list-extensions | grep firestore`
2. If not installed: `code --install-extension alesdi.firestore-explorer`
3. Reload VS Code window: `Ctrl+Shift+P → "Developer: Reload Window"`

---

## Firebase Console vs Firestore Explorer

| Task                  | Firebase Console | Firestore Explorer |
| --------------------- | ---------------- | ------------------ |
| Browse data           | ✅ Yes           | ✅ Yes (faster)    |
| Add documents         | ✅ Yes           | ✅ Yes             |
| Edit documents        | ✅ Yes           | ✅ Yes             |
| Delete documents      | ✅ Yes           | ✅ Yes             |
| View security rules   | ✅ Yes           | ❌ No              |
| Update rules          | ✅ Yes           | ❌ No              |
| Manage indexes        | ✅ Yes           | ❌ No              |
| In-editor integration | ❌ No            | ✅ Yes             |
| Speed                 | Slower           | ⚡ Faster          |

---

## Security Rules for Local Testing

Use these rules during development (not for production):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow all reads/writes for authenticated users (development only)
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

For production, use user-specific rules from [FIREBASE_SETUP.md](./FIREBASE_SETUP.md).

---

## Next Steps

1. ✅ Connect Firestore Explorer to your project
2. ✅ Verify database structure appears
3. ✅ Add a test document manually
4. ✅ Delete test document
5. ✅ Proceed to Step 3: Authentication Context

---

## Useful Commands

```bash
# List all Firebase projects
firebase list

# Set default project
firebase use drum-fit

# Get project info
firebase projects:list

# Open Firestore Rules in browser
firebase open firestore:rules

# Deploy Firestore Rules
firebase deploy --only firestore:rules

# Get service account key (for advanced setup)
firebase projects:config:get
```

---

## Additional Resources

- [Firestore Explorer GitHub](https://github.com/alesdi/firestore-explorer)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/rules)
