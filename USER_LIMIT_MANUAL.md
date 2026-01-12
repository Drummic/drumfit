# User Limit Configuration Manual

## Overview
This fitness app is configured to limit the number of users that can sign up during the evaluation phase. The limit applies to both email/password and Google sign-in registration methods.

## Current Limit
**Maximum Users: 5**

## How the Limit Works

1. **Registration Check**: When a new user attempts to sign up (via email/password or Google), the app checks the current number of users in Firestore
2. **Enforcement**: If the user count has reached the limit, the signup is rejected with an error message: `"User limit reached. This app is in evaluation phase and limited to X users."`
3. **Auth Cleanup**: The Firebase authentication record is automatically deleted if signup is rejected due to hitting the limit

## Changing the User Limit

There are two ways to change the user limit:

### Method 1: Manual (Edit Files Directly)

You need to update the `MAX_USERS` constant in two files:

#### File 1: `src/context/AuthContext.tsx`
- **Line**: ~33
- **Find**: `const MAX_USERS = 5;`
- **Replace**: `const MAX_USERS = [YOUR_NEW_LIMIT];`

Example:
```typescript
const MAX_USERS = 10; // Change from 5 to 10
```

#### File 2: `src/app/api/check-user-limit/route.ts`
- **Line**: ~6
- **Find**: `const MAX_USERS = 5;`
- **Replace**: `const MAX_USERS = [YOUR_NEW_LIMIT];`

Example:
```typescript
const MAX_USERS = 10; // Change from 5 to 10
```

### Method 2: Automatic (Using Script)

Use the provided script to update both files automatically:

```bash
node set-user-limit.js 10
```

This will set the user limit to 10 users and update both required files.

## Firestore Rules

The Firestore security rules allow authenticated users to:
- Read all user documents (needed to count existing users for limit checking)
- Write only their own user document
- Create their own user document

No changes to Firestore rules are needed to adjust the user limit.

## Testing the Limit

To test if the limit is working:

1. Sign up users until you reach the limit (e.g., if limit is 5, sign up 5 users)
2. Try to sign up a 6th user
3. You should see an error: `"User limit reached. This app is in evaluation phase and limited to 5 users."`

## Monitoring Users

To see how many users are currently registered:

1. Go to **Firebase Console** → **Firestore** → **Collections**
2. Open the **users** collection
3. Count the number of documents

## Location of Configuration Files

```
fitness-app/
├── src/
│   └── context/
│       └── AuthContext.tsx          ← Update line ~33
└── src/app/api/check-user-limit/
    └── route.ts                     ← Update line ~6
```

## Important Notes

- Both files must have the **same** `MAX_USERS` value for consistency
- Changes take effect immediately on the next signup attempt
- Existing users are not affected by limit changes
- The limit counts all user documents in the `users` Firestore collection
