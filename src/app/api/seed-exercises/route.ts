import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    const exercises = [
      {
        name: 'Pushups',
        description: 'Bodyweight pushups for chest, shoulders, and triceps',
        muscleGroup: 'chest',
        equipment: 'none',
        difficulty: 'beginner'
      },
      {
        name: 'Chair Dips',
        description: 'Tricep dips using a chair for upper body strength',
        muscleGroup: 'triceps',
        equipment: 'none',
        difficulty: 'beginner'
      }
    ];

    const createdExercises = [];

    for (const exercise of exercises) {
      const docRef = await addDoc(
        collection(db, `users/${userId}/exercises`),
        {
          ...exercise,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }
      );
      createdExercises.push({ id: docRef.id, ...exercise });
    }

    return NextResponse.json({
      success: true,
      message: 'Exercises created successfully',
      exercises: createdExercises
    });
  } catch (error) {
    console.error('Error creating exercises:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create exercises' },
      { status: 500 }
    );
  }
}
