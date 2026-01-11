const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '.env.local') });

// Initialize Firebase Admin SDK
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

if (!serviceAccountPath) {
  console.log('❌ FIREBASE_SERVICE_ACCOUNT_PATH not set in .env.local');
  console.log('📝 To check Firestore via CLI, you need a service account key.');
  console.log("📍 For now, let's verify by checking what users exist in Firestore...");
  process.exit(1);
}

const serviceAccount = require(path.resolve(serviceAccountPath));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
});

const db = admin.firestore();

async function checkFirestore() {
  try {
    console.log('🔍 Checking Firestore database...\n');

    // Get all users
    const usersSnapshot = await db.collection('users').get();
    console.log(`✅ Users collection found: ${usersSnapshot.size} user(s)\n`);

    // For each user, check their exercises
    for (const userDoc of usersSnapshot.docs) {
      const userId = userDoc.id;
      const userData = userDoc.data();
      console.log(`👤 User: ${userId}`);
      console.log(`   Email: ${userData.email || 'N/A'}`);
      console.log(`   Name: ${userData.name || 'N/A'}`);

      // Check exercises subcollection
      const exercisesSnapshot = await db
        .collection('users')
        .doc(userId)
        .collection('exercises')
        .get();
      console.log(`   📚 Exercises: ${exercisesSnapshot.size} exercise(s)`);

      if (exercisesSnapshot.size > 0) {
        for (const exerciseDoc of exercisesSnapshot.docs) {
          const exercise = exerciseDoc.data();
          console.log(`      - ${exercise.name} (ID: ${exerciseDoc.id})`);
          console.log(`        Difficulty: ${exercise.difficulty}`);
          console.log(`        Muscle Groups: ${exercise.muscleGroups?.join(', ') || 'N/A'}`);
        }
      }
      console.log();
    }

    console.log('✅ Firestore check complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error checking Firestore:', error.message);
    process.exit(1);
  }
}

checkFirestore();
