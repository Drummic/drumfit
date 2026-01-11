// ============================================================================
// Filename: ProtectedRoute.tsx
// Path: /src/components/ProtectedRoute.tsx
// Created At: January 11, 2026
// From: Development Team
// Changed At: N/A
// Functional Description: Higher-order component (HOC) that wraps pages/components
// requiring authentication, redirects unauthenticated users to login, shows loading state
// Dependencies: React, useAuth hook, useRouter from Next.js, ReactNode
// Used In: Dashboard and other protected pages in the app
// ============================================================================

'use client';

import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * ProtectedRoute Component
 * Wraps components that require authentication
 * Redirects to login if user is not authenticated
 * Shows loading state while checking auth
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  // Render protected content
  return <>{children}</>;
};

export default ProtectedRoute;
