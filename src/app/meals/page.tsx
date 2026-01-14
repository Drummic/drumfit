// ============================================================================
// Filename: page.tsx (Meals Page)
// Path: /src/app/meals/page.tsx
// Created At: January 14, 2026
// From: Development Team
// Changed At: N/A
// Functional Description: Main meals management page showing all user meals
// with options to create, edit, and delete meal plans
// Dependencies: React, useAuth, components, lucide-react
// Used In: Main meals feature accessible from dashboard
// ============================================================================

'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Plus, Utensils, ArrowLeft, LogOut } from 'lucide-react';
import Link from 'next/link';

/**
 * MealsPage Component
 * Protected page for managing meals
 */
export default function MealsPage() {
  const { user, logout } = useAuth();
  const [meals, setMeals] = useState<any[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800">
        {/* Header */}
        <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="p-2 hover:bg-slate-700 rounded-lg transition">
                <ArrowLeft className="w-5 h-5 text-slate-300" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Utensils className="w-6 h-6 text-orange-500" />
                  Meals
                </h1>
                <p className="text-slate-400 text-sm">Manage your meal plans</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Meal
              </button>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-slate-700 rounded-lg transition text-slate-300"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Empty State */}
          {meals.length === 0 ? (
            <div className="text-center py-16">
              <Utensils className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">No meals yet</h2>
              <p className="text-slate-400 mb-8">Create your first meal plan to get started</p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Meal Plan
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Meals will be displayed here */}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
