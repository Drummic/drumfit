// ============================================================================
// Filename: route.ts (Check User Limit API)
// Path: /src/app/api/check-user-limit/route.ts
// Created At: January 12, 2026
// From: Development Team
// Functional Description: API endpoint to check if user limit (10) has been reached
// for evaluation phase. Uses Firestore query to count users client-side
// Dependencies: Firebase SDK, Firestore
// Used In: Signup flow for limiting registrations to 10 users
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';

const MAX_USERS = 5;


/**
 * GET endpoint to check user count
 * Note: Actual counting is done client-side in AuthContext
 * This endpoint is a reference - real implementation uses Firestore client SDK
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    maxUsers: MAX_USERS,
    message: 'Use Firestore client SDK to check user count',
  });
}
