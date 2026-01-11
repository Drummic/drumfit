(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/services/workoutService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createWorkout",
    ()=>createWorkout,
    "deleteWorkout",
    ()=>deleteWorkout,
    "getWorkoutById",
    ()=>getWorkoutById,
    "getWorkouts",
    ()=>getWorkouts,
    "getWorkoutsByDuration",
    ()=>getWorkoutsByDuration,
    "updateWorkout",
    ()=>updateWorkout
]);
// ============================================================================
// Filename: workoutService.ts
// Path: /src/services/workoutService.ts
// Created At: January 11, 2026
// From: Development Team
// Changed At: N/A
// Functional Description: Service layer for Workout CRUD operations in Firestore.
// Handles creating, reading, updating, and deleting workouts for authenticated users
// Dependencies: Firebase Firestore (db), types (Workout), auth context
// Used In: Workout pages, components, and custom hooks
// ============================================================================
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm2017.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-client] (ecmascript)");
;
;
const createWorkout = async (userId, workoutData)=>{
    try {
        console.log('🔧 workoutService.createWorkout - Starting');
        console.log('👤 userId:', userId);
        console.log('📊 workoutData:', workoutData);
        // Ensure user document exists
        const userDocRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'users', userId);
        const userDocSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(userDocRef);
        if (!userDocSnap.exists()) {
            console.log('📝 Creating user document');
            // Create a minimal user document to allow subcollections
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setDoc"])(userDocRef, {
                uid: userId,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }, {
                merge: true
            });
        }
        console.log('📂 Getting workouts collection reference');
        const workoutsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'users', userId, 'workouts');
        console.log('💾 Adding workout document');
        const docRef = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDoc"])(workoutsRef, {
            ...workoutData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        console.log('✅ Workout created with ID:', docRef.id);
        return {
            id: docRef.id,
            ...workoutData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    } catch (error) {
        console.error('❌ Error in createWorkout:', error);
        if (error instanceof Error) {
            console.error('📝 Error message:', error.message);
            console.error('🔍 Error code:', error.code);
        }
        throw error;
    }
};
const getWorkouts = async (userId)=>{
    try {
        const workoutsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'users', userId, 'workouts');
        const querySnapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(workoutsRef);
        const workouts = [];
        querySnapshot.forEach((doc)=>{
            workouts.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return workouts;
    } catch (error) {
        throw error;
    }
};
const getWorkoutById = async (userId, workoutId)=>{
    try {
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'users', userId, 'workouts', workoutId);
        const docSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDoc"])(docRef);
        if (!docSnap.exists()) {
            throw new Error('Workout not found');
        }
        return {
            id: docSnap.id,
            ...docSnap.data()
        };
    } catch (error) {
        throw error;
    }
};
const updateWorkout = async (userId, workoutId, updates)=>{
    try {
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'users', userId, 'workouts', workoutId);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDoc"])(docRef, {
            ...updates,
            updatedAt: new Date().toISOString()
        });
    } catch (error) {
        throw error;
    }
};
const deleteWorkout = async (userId, workoutId)=>{
    try {
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], 'users', userId, 'workouts', workoutId);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteDoc"])(docRef);
    } catch (error) {
        throw error;
    }
};
const getWorkoutsByDuration = async (userId, duration)=>{
    try {
        const allWorkouts = await getWorkouts(userId);
        return allWorkouts.filter((w)=>w.duration === duration);
    } catch (error) {
        throw error;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useWorkout.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWorkout",
    ()=>useWorkout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$workoutService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/workoutService.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
// ============================================================================
// Filename: useWorkout.ts
// Path: /src/hooks/useWorkout.ts
// Created At: January 11, 2026
// From: Development Team
// Changed At: N/A
// Functional Description: Custom React hook for managing workout state and operations.
// Provides workouts list, loading state, error handling, and CRUD methods
// Dependencies: React, workoutService, useAuth hook
// Used In: Workout pages and components
// ============================================================================
'use client';
;
;
;
const useWorkout = ()=>{
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [workouts, setWorkouts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    /**
   * Fetch workouts
   */ const fetchWorkouts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWorkout.useCallback[fetchWorkouts]": async ()=>{
            if (!user) return;
            try {
                setLoading(true);
                setError(null);
                const workoutsData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$workoutService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWorkouts"])(user.uid);
                setWorkouts(workoutsData);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to fetch workouts';
                setError(errorMessage);
            } finally{
                setLoading(false);
            }
        }
    }["useWorkout.useCallback[fetchWorkouts]"], [
        user
    ]);
    /**
   * Initial fetch on mount
   */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWorkout.useEffect": ()=>{
            fetchWorkouts();
        }
    }["useWorkout.useEffect"], [
        fetchWorkouts
    ]);
    /**
   * Add new workout
   */ const addWorkout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWorkout.useCallback[addWorkout]": async (workoutData)=>{
            if (!user) {
                throw new Error('No user logged in');
            }
            try {
                setError(null);
                // Add userId to the workout data
                const fullWorkoutData = {
                    ...workoutData,
                    userId: user.uid
                };
                const newWorkout = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$workoutService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createWorkout"])(user.uid, fullWorkoutData);
                setWorkouts({
                    "useWorkout.useCallback[addWorkout]": (prev)=>[
                            ...prev,
                            newWorkout
                        ]
                }["useWorkout.useCallback[addWorkout]"]);
                return newWorkout;
            } catch (err_0) {
                const errorMessage_0 = err_0 instanceof Error ? err_0.message : 'Failed to create workout';
                setError(errorMessage_0);
                throw err_0;
            }
        }
    }["useWorkout.useCallback[addWorkout]"], [
        user
    ]);
    /**
   * Update workout
   */ const updateWorkoutData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWorkout.useCallback[updateWorkoutData]": async (workoutId, updates)=>{
            if (!user) throw new Error('No user logged in');
            try {
                setError(null);
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$workoutService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateWorkout"])(user.uid, workoutId, updates);
                // Update local state
                setWorkouts({
                    "useWorkout.useCallback[updateWorkoutData]": (prev_0)=>prev_0.map({
                            "useWorkout.useCallback[updateWorkoutData]": (w)=>w.id === workoutId ? {
                                    ...w,
                                    ...updates,
                                    updatedAt: new Date().toISOString()
                                } : w
                        }["useWorkout.useCallback[updateWorkoutData]"])
                }["useWorkout.useCallback[updateWorkoutData]"]);
            } catch (err_1) {
                const errorMessage_1 = err_1 instanceof Error ? err_1.message : 'Failed to update workout';
                setError(errorMessage_1);
                throw err_1;
            }
        }
    }["useWorkout.useCallback[updateWorkoutData]"], [
        user
    ]);
    /**
   * Remove workout
   */ const removeWorkout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWorkout.useCallback[removeWorkout]": async (workoutId_0)=>{
            if (!user) throw new Error('No user logged in');
            try {
                setError(null);
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$workoutService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteWorkout"])(user.uid, workoutId_0);
                setWorkouts({
                    "useWorkout.useCallback[removeWorkout]": (prev_1)=>prev_1.filter({
                            "useWorkout.useCallback[removeWorkout]": (w_0)=>w_0.id !== workoutId_0
                        }["useWorkout.useCallback[removeWorkout]"])
                }["useWorkout.useCallback[removeWorkout]"]);
            } catch (err_2) {
                const errorMessage_2 = err_2 instanceof Error ? err_2.message : 'Failed to delete workout';
                setError(errorMessage_2);
                throw err_2;
            }
        }
    }["useWorkout.useCallback[removeWorkout]"], [
        user
    ]);
    /**
   * Filter workouts by duration
   */ const getByDuration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWorkout.useCallback[getByDuration]": (duration)=>{
            return workouts.filter({
                "useWorkout.useCallback[getByDuration]": (w_1)=>w_1.duration === duration
            }["useWorkout.useCallback[getByDuration]"]);
        }
    }["useWorkout.useCallback[getByDuration]"], [
        workouts
    ]);
    /**
   * Refetch workouts
   */ const refetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWorkout.useCallback[refetch]": async ()=>{
            await fetchWorkouts();
        }
    }["useWorkout.useCallback[refetch]"], [
        fetchWorkouts
    ]);
    return {
        workouts,
        loading,
        error,
        refetch,
        addWorkout,
        updateWorkoutData,
        removeWorkout,
        getByDuration
    };
};
_s(useWorkout, "7QGd2DA/+G5drY5Hqtke1pD0I4Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/workoutLogService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getWorkoutLogs",
    ()=>getWorkoutLogs,
    "getWorkoutLogsForDate",
    ()=>getWorkoutLogsForDate,
    "logWorkoutCompletion",
    ()=>logWorkoutCompletion
]);
// ============================================================================
// Filename: workoutLogService.ts
// Path: /src/services/workoutLogService.ts
// Created At: January 11, 2026
// From: Development Team
// Changed At: N/A
// Functional Description: Service for logging and retrieving completed workouts
// Dependencies: Firebase Firestore
// Used In: Workout runner, activity tracking
// ============================================================================
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm2017.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-client] (ecmascript)");
;
;
const logWorkoutCompletion = async (userId, workoutId, workoutName, duration, caloriesBurned, exerciseCount)=>{
    try {
        console.log('📝 Logging workout completion:', {
            workoutName,
            duration,
            caloriesBurned
        });
        const docRef = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], `users/${userId}/workoutLogs`), {
            workoutId,
            workoutName,
            duration,
            caloriesBurned,
            exerciseCount,
            completedAt: new Date().toISOString(),
            createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
        });
        console.log('✅ Workout logged with ID:', docRef.id);
        return {
            id: docRef.id,
            userId,
            workoutId,
            workoutName,
            duration,
            caloriesBurned,
            completedAt: new Date().toISOString(),
            exerciseCount
        };
    } catch (error) {
        console.error('❌ Error logging workout:', error);
        throw error;
    }
};
const getWorkoutLogs = async (userId)=>{
    try {
        console.log('🔍 Fetching workout logs for user:', userId);
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], `users/${userId}/workoutLogs`), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('completedAt', 'desc'));
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        const logs = [];
        snapshot.forEach((doc)=>{
            logs.push({
                id: doc.id,
                userId,
                ...doc.data()
            });
        });
        console.log('✅ Retrieved', logs.length, 'workout logs');
        return logs;
    } catch (error) {
        console.error('❌ Error fetching workout logs:', error);
        throw error;
    }
};
const getWorkoutLogsForDate = async (userId, date)=>{
    try {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["db"], `users/${userId}/workoutLogs`), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('completedAt', '>=', startOfDay.toISOString()), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["where"])('completedAt', '<=', endOfDay.toISOString()), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderBy"])('completedAt', 'desc'));
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDocs"])(q);
        const logs = [];
        snapshot.forEach((doc)=>{
            logs.push({
                id: doc.id,
                userId,
                ...doc.data()
            });
        });
        return logs;
    } catch (error) {
        console.error('❌ Error fetching logs for date:', error);
        return [];
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useWorkoutLogs.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWorkoutLogs",
    ()=>useWorkoutLogs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$workoutLogService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/workoutLogService.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const useWorkoutLogs = ()=>{
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [logs, setLogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchLogs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWorkoutLogs.useCallback[fetchLogs]": async ()=>{
            if (!user) return;
            try {
                setLoading(true);
                setError(null);
                const logsData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$workoutLogService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWorkoutLogs"])(user.uid);
                setLogs(logsData);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to fetch logs';
                setError(errorMessage);
                console.error('Error fetching logs:', err);
            } finally{
                setLoading(false);
            }
        }
    }["useWorkoutLogs.useCallback[fetchLogs]"], [
        user
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWorkoutLogs.useEffect": ()=>{
            fetchLogs();
        }
    }["useWorkoutLogs.useEffect"], [
        fetchLogs
    ]);
    const addLog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWorkoutLogs.useCallback[addLog]": async (workoutId, workoutName, duration, caloriesBurned, exerciseCount)=>{
            if (!user) throw new Error('No user logged in');
            try {
                setError(null);
                const newLog = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$workoutLogService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logWorkoutCompletion"])(user.uid, workoutId, workoutName, duration, caloriesBurned, exerciseCount);
                setLogs({
                    "useWorkoutLogs.useCallback[addLog]": (prev)=>[
                            newLog,
                            ...prev
                        ]
                }["useWorkoutLogs.useCallback[addLog]"]);
                return newLog;
            } catch (err_0) {
                const errorMessage_0 = err_0 instanceof Error ? err_0.message : 'Failed to log workout';
                setError(errorMessage_0);
                throw err_0;
            }
        }
    }["useWorkoutLogs.useCallback[addLog]"], [
        user
    ]);
    return {
        logs,
        loading,
        error,
        refetch: fetchLogs,
        addLog
    };
};
_s(useWorkoutLogs, "78tTx+xB3vGnK7yjBld5/ZxPL9o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ProtectedRoute.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProtectedRoute",
    ()=>ProtectedRoute,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
;
;
;
const ProtectedRoute = (t0)=>{
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "b76441e2f3a408e9c72aa4f0b33b9c9a264159cfbbda641c73165788ac65ceed") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b76441e2f3a408e9c72aa4f0b33b9c9a264159cfbbda641c73165788ac65ceed";
    }
    const { children } = t0;
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isAuthenticated, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    if (loading) {
        let t1;
        if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
            t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ProtectedRoute.tsx",
                            lineNumber: 48,
                            columnNumber: 150
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-300",
                            children: "Loading..."
                        }, void 0, false, {
                            fileName: "[project]/src/components/ProtectedRoute.tsx",
                            lineNumber: 48,
                            columnNumber: 264
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ProtectedRoute.tsx",
                    lineNumber: 48,
                    columnNumber: 121
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/ProtectedRoute.tsx",
                lineNumber: 48,
                columnNumber: 12
            }, ("TURBOPACK compile-time value", void 0));
            $[1] = t1;
        } else {
            t1 = $[1];
        }
        return t1;
    }
    if (!isAuthenticated) {
        router.push("/login");
        return null;
    }
    let t1;
    if ($[2] !== children) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false);
        $[2] = children;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    return t1;
};
_s(ProtectedRoute, "DaFcG1qmcv6lysWWWqka/J1ae2w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = ProtectedRoute;
const __TURBOPACK__default__export__ = ProtectedRoute;
var _c;
__turbopack_context__.k.register(_c, "ProtectedRoute");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/workouts/WorkoutSummary.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check-circle.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flame.js [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dumbbell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dumbbell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dumbbell.js [app-client] (ecmascript) <export default as Dumbbell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
'use client';
;
;
;
;
const WorkoutSummary = (t0)=>{
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(49);
    if ($[0] !== "fa9a1b61e486b91f8934ac08c4ee929e6aef2f4168bf2ba402140e161ce66167") {
        for(let $i = 0; $i < 49; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "fa9a1b61e486b91f8934ac08c4ee929e6aef2f4168bf2ba402140e161ce66167";
    }
    const { workout, duration, caloriesBurned, onComplete } = t0;
    const formatTime = _temp;
    const totalExercises = workout.exercises.length;
    let t1;
    if ($[1] !== workout.exercises) {
        t1 = workout.exercises.reduce(_temp2, 0);
        $[1] = workout.exercises;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const totalSets = t1;
    let t2;
    if ($[3] !== workout.exercises) {
        t2 = workout.exercises.reduce(_temp3, 0);
        $[3] = workout.exercises;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    const totalReps = t2;
    let t3;
    let t4;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                className: "w-12 h-12 text-white"
            }, void 0, false, {
                fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
                lineNumber: 51,
                columnNumber: 108
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
            lineNumber: 51,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "text-4xl font-bold text-white mb-2",
            children: "Workout Complete!"
        }, void 0, false, {
            fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
            lineNumber: 52,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[5] = t3;
        $[6] = t4;
    } else {
        t3 = $[5];
        t4 = $[6];
    }
    let t5;
    if ($[7] !== workout.name) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center mb-12",
            children: [
                t3,
                t4,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-slate-400 text-lg",
                    children: [
                        "Great job finishing ",
                        workout.name
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
                    lineNumber: 61,
                    columnNumber: 53
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
            lineNumber: 61,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[7] = workout.name;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    let t6;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3 mb-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                    className: "w-5 h-5 text-blue-500"
                }, void 0, false, {
                    fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
                    lineNumber: 69,
                    columnNumber: 56
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-slate-400 text-sm",
                    children: "Duration"
                }, void 0, false, {
                    fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
                    lineNumber: 69,
                    columnNumber: 99
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
            lineNumber: 69,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[9] = t6;
    } else {
        t6 = $[9];
    }
    const t7 = formatTime(duration);
    let t8;
    if ($[10] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-slate-800 rounded-xl p-6 border border-slate-700",
            children: [
                t6,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-3xl font-bold text-white",
                    children: t7
                }, void 0, false, {
                    fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
                    lineNumber: 77,
                    columnNumber: 83
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
            lineNumber: 77,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[10] = t7;
        $[11] = t8;
    } else {
        t8 = $[11];
    }
    let t9;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3 mb-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                    className: "w-5 h-5 text-orange-500"
                }, void 0, false, {
                    fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
                    lineNumber: 85,
                    columnNumber: 56
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-slate-400 text-sm",
                    children: "Calories Burned"
                }, void 0, false, {
                    fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
                    lineNumber: 85,
                    columnNumber: 101
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
            lineNumber: 85,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[12] = t9;
    } else {
        t9 = $[12];
    }
    let t10;
    if ($[13] !== caloriesBurned) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-slate-800 rounded-xl p-6 border border-slate-700",
            children: [
                t9,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-3xl font-bold text-white",
                    children: caloriesBurned
                }, void 0, false, {
                    fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
                    lineNumber: 92,
                    columnNumber: 84
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
            lineNumber: 92,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[13] = caloriesBurned;
        $[14] = t10;
    } else {
        t10 = $[14];
    }
    let t11;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3 mb-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dumbbell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dumbbell$3e$__["Dumbbell"], {
                    className: "w-5 h-5 text-green-500"
                }, void 0, false, {
                    fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
                    lineNumber: 100,
                    columnNumber: 57
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-slate-400 text-sm",
                    children: "Exercises"
                }, void 0, false, {
                    fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
                    lineNumber: 100,
                    columnNumber: 104
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
            lineNumber: 100,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[15] = t11;
    } else {
        t11 = $[15];
    }
    let t12;
    if ($[16] !== totalExercises) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-slate-800 rounded-xl p-6 border border-slate-700",
            children: [
                t11,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-3xl font-bold text-white",
                    children: totalExercises
                }, void 0, false, {
                    fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
                    lineNumber: 107,
                    columnNumber: 85
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
            lineNumber: 107,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[16] = totalExercises;
        $[17] = t12;
    } else {
        t12 = $[17];
    }
    let t13;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-slate-400 text-sm mb-2",
            children: "Total Volume"
        }, void 0, false, {
            fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
            lineNumber: 115,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[18] = t13;
    } else {
        t13 = $[18];
    }
    let t14;
    if ($[19] !== totalSets) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-2xl font-bold text-white",
            children: [
                totalSets,
                " sets"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
            lineNumber: 122,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[19] = totalSets;
        $[20] = t14;
    } else {
        t14 = $[20];
    }
    let t15;
    if ($[21] !== totalReps) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-lg text-slate-400",
            children: [
                totalReps,
                " reps"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
            lineNumber: 130,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[21] = totalReps;
        $[22] = t15;
    } else {
        t15 = $[22];
    }
    let t16;
    if ($[23] !== t14 || $[24] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-slate-800 rounded-xl p-6 border border-slate-700",
            children: [
                t13,
                t14,
                t15
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
            lineNumber: 138,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[23] = t14;
        $[24] = t15;
        $[25] = t16;
    } else {
        t16 = $[25];
    }
    let t17;
    if ($[26] !== t10 || $[27] !== t12 || $[28] !== t16 || $[29] !== t8) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-4 mb-8",
            children: [
                t8,
                t10,
                t12,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
            lineNumber: 147,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[26] = t10;
        $[27] = t12;
        $[28] = t16;
        $[29] = t8;
        $[30] = t17;
    } else {
        t17 = $[30];
    }
    let t18;
    if ($[31] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-xl font-bold text-white mb-4",
            children: "Exercise Breakdown"
        }, void 0, false, {
            fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
            lineNumber: 158,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[31] = t18;
    } else {
        t18 = $[31];
    }
    let t19;
    if ($[32] !== workout.exercises) {
        t19 = workout.exercises.map(_temp4);
        $[32] = workout.exercises;
        $[33] = t19;
    } else {
        t19 = $[33];
    }
    let t20;
    if ($[34] !== t19) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-slate-800 rounded-xl p-6 border border-slate-700 mb-8",
            children: [
                t18,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: t19
                }, void 0, false, {
                    fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
                    lineNumber: 173,
                    columnNumber: 90
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
            lineNumber: 173,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[34] = t19;
        $[35] = t20;
    } else {
        t20 = $[35];
    }
    let t21;
    if ($[36] === Symbol.for("react.memo_cache_sentinel")) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-white text-lg font-medium mb-2",
            children: "💪 Amazing Effort!"
        }, void 0, false, {
            fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
            lineNumber: 181,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[36] = t21;
    } else {
        t21 = $[36];
    }
    const t22 = formatTime(duration);
    let t23;
    if ($[37] !== caloriesBurned || $[38] !== t22) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-8 text-center",
            children: [
                t21,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-blue-100",
                    children: [
                        "You burned ",
                        caloriesBurned,
                        " calories in ",
                        t22,
                        ". Keep crushing it!"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
                    lineNumber: 189,
                    columnNumber: 110
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
            lineNumber: 189,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[37] = caloriesBurned;
        $[38] = t22;
        $[39] = t23;
    } else {
        t23 = $[39];
    }
    let t24;
    if ($[40] === Symbol.for("react.memo_cache_sentinel")) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/workouts",
            className: "px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition",
            children: "Back to Workouts"
        }, void 0, false, {
            fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
            lineNumber: 198,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[40] = t24;
    } else {
        t24 = $[40];
    }
    let t25;
    if ($[41] !== onComplete) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-4 justify-center",
            children: [
                t24,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onComplete,
                    className: "px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition",
                    children: "Save & Finish"
                }, void 0, false, {
                    fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
                    lineNumber: 205,
                    columnNumber: 59
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
            lineNumber: 205,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[41] = onComplete;
        $[42] = t25;
    } else {
        t25 = $[42];
    }
    let t26;
    if ($[43] !== t17 || $[44] !== t20 || $[45] !== t23 || $[46] !== t25 || $[47] !== t5) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 sm:p-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-2xl mx-auto",
                children: [
                    t5,
                    t17,
                    t20,
                    t23,
                    t25
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
                lineNumber: 213,
                columnNumber: 98
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
            lineNumber: 213,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[43] = t17;
        $[44] = t20;
        $[45] = t23;
        $[46] = t25;
        $[47] = t5;
        $[48] = t26;
    } else {
        t26 = $[48];
    }
    return t26;
};
_c = WorkoutSummary;
const __TURBOPACK__default__export__ = WorkoutSummary;
function _temp(seconds) {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor(seconds % 3600 / 60);
    const secs = seconds % 60;
    if (hours > 0) {
        return `${hours}h ${mins}m ${secs}s`;
    }
    return `${mins}m ${secs}s`;
}
function _temp2(sum, ex) {
    return sum + (ex.sets || 3);
}
function _temp3(sum_0, ex_0) {
    return sum_0 + (ex_0.sets || 3) * (ex_0.reps || 10);
}
function _temp4(exercise, index) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex justify-between items-center p-3 bg-slate-700 rounded-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-medium text-white",
                        children: exercise.exerciseName
                    }, void 0, false, {
                        fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
                        lineNumber: 242,
                        columnNumber: 106
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-slate-400",
                        children: [
                            exercise.sets || 3,
                            " sets × ",
                            exercise.reps || 10,
                            " reps",
                            exercise.weight && ` @ ${exercise.weight}kg`
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
                        lineNumber: 242,
                        columnNumber: 171
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
                lineNumber: 242,
                columnNumber: 101
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                className: "w-5 h-5 text-green-500"
            }, void 0, false, {
                fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
                lineNumber: 242,
                columnNumber: 319
            }, this)
        ]
    }, index, true, {
        fileName: "[project]/src/components/workouts/WorkoutSummary.tsx",
        lineNumber: 242,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "WorkoutSummary");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/workouts/WorkoutRunner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pause.js [app-client] (ecmascript) <export default as Pause>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check-circle.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-cw.js [app-client] (ecmascript) <export default as RotateCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$workouts$2f$WorkoutSummary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/workouts/WorkoutSummary.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const WorkoutRunner = ({ workout, onComplete })=>{
    _s();
    const [timer, setTimer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        phase: 'countdown',
        exerciseIndex: 0,
        setIndex: 0,
        elapsed: 0,
        isRunning: true,
        countdownValue: 3
    });
    const totalElapsed = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useRef(0);
    // Always-running timer for total elapsed time
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WorkoutRunner.useEffect": ()=>{
            const interval = setInterval({
                "WorkoutRunner.useEffect.interval": ()=>{
                    totalElapsed.current += 1;
                }
            }["WorkoutRunner.useEffect.interval"], 1000);
            return ({
                "WorkoutRunner.useEffect": ()=>clearInterval(interval)
            })["WorkoutRunner.useEffect"];
        }
    }["WorkoutRunner.useEffect"], []);
    // Phase/exercise logic timer (only runs when isRunning)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WorkoutRunner.useEffect": ()=>{
            if (!timer.isRunning) return;
            const interval_0 = setInterval({
                "WorkoutRunner.useEffect.interval_0": ()=>{
                    setTimer({
                        "WorkoutRunner.useEffect.interval_0": (prev)=>{
                            const newState = {
                                ...prev
                            };
                            if (prev.phase === 'countdown') {
                                newState.countdownValue -= 1;
                                if (newState.countdownValue < 0) {
                                    newState.phase = 'exercise';
                                    newState.elapsed = 0;
                                    newState.countdownValue = 0;
                                }
                            } else if (prev.phase === 'exercise') {
                                newState.elapsed += 1;
                            } else if (prev.phase === 'rest-set') {
                                newState.countdownValue -= 1;
                                if (newState.countdownValue < 0) {
                                    newState.setIndex += 1;
                                    newState.phase = 'countdown';
                                    newState.countdownValue = 3;
                                    newState.elapsed = 0;
                                }
                            } else if (prev.phase === 'rest-exercise') {
                                newState.countdownValue -= 1;
                                if (newState.countdownValue < 0) {
                                    newState.exerciseIndex += 1;
                                    newState.setIndex = 0;
                                    // Check if we've gone past the last exercise
                                    if (newState.exerciseIndex >= workout.exercises.length) {
                                        newState.phase = 'summary';
                                        newState.isRunning = false;
                                        console.log('✅ Auto-completing workout - all exercises done');
                                    } else {
                                        newState.phase = 'countdown';
                                        newState.countdownValue = 3;
                                        newState.elapsed = 0;
                                    }
                                }
                            }
                            // Check if workout is complete
                            if (newState.exerciseIndex >= workout.exercises.length) {
                                newState.phase = 'summary';
                                newState.isRunning = false;
                            }
                            return newState;
                        }
                    }["WorkoutRunner.useEffect.interval_0"]);
                }
            }["WorkoutRunner.useEffect.interval_0"], 1000);
            return ({
                "WorkoutRunner.useEffect": ()=>clearInterval(interval_0)
            })["WorkoutRunner.useEffect"];
        }
    }["WorkoutRunner.useEffect"], [
        timer.isRunning,
        workout.exercises.length
    ]);
    const handleSetComplete = ()=>{
        const currentExercise = workout.exercises[timer.exerciseIndex];
        const totalSets = currentExercise.sets || 3;
        // Check if this is the last set of the current exercise
        if (timer.setIndex < totalSets - 1) {
            // More sets to do for this exercise - show rest period (auto-running)
            setTimer((prev_0)=>({
                    ...prev_0,
                    phase: 'rest-set',
                    countdownValue: 30,
                    isRunning: true
                }));
        } else {
            // All sets done for this exercise
            // Check if this is the last exercise
            if (timer.exerciseIndex < workout.exercises.length - 1) {
                // More exercises to do - show rest period (auto-running)
                setTimer((prev_1)=>({
                        ...prev_1,
                        phase: 'rest-exercise',
                        countdownValue: 60,
                        isRunning: true
                    }));
            } else {
                // All exercises done - end workout
                console.log('✅ Workout complete - all exercises finished');
                setTimer((prev_2)=>({
                        ...prev_2,
                        phase: 'summary',
                        isRunning: false
                    }));
            }
        }
    };
    const handleStartWorkout = ()=>{
        setTimer((prev_3)=>{
            // If starting from rest-set, increment setIndex and jump to exercise
            if (prev_3.phase === 'rest-set') {
                return {
                    ...prev_3,
                    phase: 'exercise',
                    setIndex: prev_3.setIndex + 1,
                    isRunning: true,
                    elapsed: 0
                };
            }
            // If starting from rest-exercise, increment exerciseIndex and jump to exercise
            if (prev_3.phase === 'rest-exercise') {
                return {
                    ...prev_3,
                    phase: 'exercise',
                    exerciseIndex: prev_3.exerciseIndex + 1,
                    setIndex: 0,
                    isRunning: true,
                    elapsed: 0
                };
            }
            // If starting from countdown, jump directly to exercise
            if (prev_3.phase === 'countdown') {
                return {
                    ...prev_3,
                    phase: 'exercise',
                    isRunning: true,
                    elapsed: 0,
                    countdownValue: 0
                };
            }
            // Otherwise just resume
            return {
                ...prev_3,
                isRunning: true
            };
        });
    };
    const handlePause = ()=>{
        setTimer((prev_4)=>({
                ...prev_4,
                isRunning: !prev_4.isRunning
            }));
    };
    const handleReset = ()=>{
        setTimer({
            phase: 'countdown',
            exerciseIndex: 0,
            setIndex: 0,
            elapsed: 0,
            isRunning: false,
            countdownValue: 3
        });
        totalElapsed.current = 0;
    };
    if (timer.phase === 'summary') {
        const caloriesBurned = calculateCaloriesBurned(workout, totalElapsed.current);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$workouts$2f$WorkoutSummary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            workout: workout,
            duration: totalElapsed.current,
            caloriesBurned: caloriesBurned,
            onComplete: ()=>onComplete(totalElapsed.current, caloriesBurned)
        }, void 0, false, {
            fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
            lineNumber: 190,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    }
    const currentExercise_0 = workout.exercises[timer.exerciseIndex];
    const totalSets_0 = currentExercise_0.sets || 3;
    // When in rest-set phase, show the next set number; otherwise show current set
    const currentSet = timer.phase === 'rest-set' ? timer.setIndex + 2 : timer.setIndex + 1;
    const formatTime = (seconds)=>{
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 sm:p-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-2xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-bold text-white mb-2",
                            children: workout.name
                        }, void 0, false, {
                            fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                            lineNumber: 205,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-slate-400",
                            children: workout.description
                        }, void 0, false, {
                            fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                            lineNumber: 206,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                    lineNumber: 204,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-slate-800 rounded-2xl p-8 border border-slate-700",
                    children: [
                        timer.phase === 'countdown' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-8xl font-bold text-blue-500 mb-4 tabular-nums",
                                    children: timer.countdownValue > 0 ? timer.countdownValue : 'GO!'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                    lineNumber: 212,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-slate-300 text-lg",
                                    children: "Get ready to start"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                    lineNumber: 215,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                            lineNumber: 211,
                            columnNumber: 43
                        }, ("TURBOPACK compile-time value", void 0)),
                        (timer.phase === 'exercise' || timer.phase === 'rest-set') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-6 mb-8 p-6 bg-slate-700/50 rounded-lg border border-slate-600",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-4xl font-black text-orange-500",
                                                    children: currentExercise_0.exerciseName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                                    lineNumber: 223,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-1 h-16 bg-slate-600 rounded"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                                    lineNumber: 224,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-4xl font-black text-orange-500",
                                                            children: currentSet
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                                            lineNumber: 226,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-lg font-bold text-slate-300",
                                                            children: [
                                                                "of ",
                                                                totalSets_0
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                                            lineNumber: 227,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                                    lineNumber: 225,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-1 h-12 bg-slate-600 rounded"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                                    lineNumber: 229,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-lg font-bold text-slate-300",
                                                            children: "Reps:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                                            lineNumber: 231,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-4xl font-black text-orange-500",
                                                            children: currentExercise_0.reps
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                                            lineNumber: 232,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                                    lineNumber: 230,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                currentExercise_0.weight && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-1 h-12 bg-slate-600 rounded"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                                            lineNumber: 235,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-lg font-bold text-orange-500",
                                                            children: [
                                                                currentExercise_0.weight,
                                                                "kg"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                                            lineNumber: 236,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                            lineNumber: 222,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center mb-6",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-slate-400",
                                                children: [
                                                    "Exercise ",
                                                    timer.exerciseIndex + 1,
                                                    " of ",
                                                    workout.exercises.length
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                                lineNumber: 242,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                            lineNumber: 241,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                    lineNumber: 220,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center mb-12",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `text-7xl font-bold tabular-nums mb-4 ${timer.phase === 'exercise' ? 'text-green-500' : 'text-blue-500'}`,
                                            children: formatTime(timer.elapsed)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                            lineNumber: 248,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-slate-300 text-lg",
                                            children: timer.phase === 'exercise' ? 'Exercise Time' : 'Rest Time'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                            lineNumber: 251,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                    lineNumber: 247,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                timer.phase === 'rest-set' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center mb-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-5xl font-bold text-yellow-500 mb-2",
                                            children: timer.countdownValue
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                            lineNumber: 258,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-slate-300",
                                            children: "Rest before next set"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                            lineNumber: 259,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                    lineNumber: 257,
                                    columnNumber: 46
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true),
                        timer.phase === 'rest-exercise' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-6xl font-bold text-orange-500 mb-4",
                                    children: timer.countdownValue
                                }, void 0, false, {
                                    fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                    lineNumber: 264,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-slate-300 text-xl",
                                    children: "Rest before next exercise"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                    lineNumber: 265,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                            lineNumber: 263,
                            columnNumber: 47
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-8",
                            children: [
                                (()=>{
                                    // Calculate total sets across all exercises
                                    const totalSets_1 = workout.exercises.reduce((sum, ex)=>sum + (ex.sets || 3), 0);
                                    // Calculate completed sets
                                    let completedSets = 0;
                                    // Add all sets from completed exercises
                                    for(let i = 0; i < timer.exerciseIndex; i++){
                                        completedSets += workout.exercises[i].sets || 3;
                                    }
                                    // Add current exercise's completed sets
                                    completedSets += timer.setIndex;
                                    const progressPercent = Math.round(completedSets / totalSets_1 * 100);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-sm text-slate-400 mb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Overall Progress"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                                        lineNumber: 285,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-blue-400",
                                                        children: [
                                                            progressPercent,
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                                        lineNumber: 286,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                                lineNumber: 284,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full bg-slate-700 rounded-full h-3 overflow-hidden mb-6 border border-slate-600",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-gradient-to-r from-blue-500 to-blue-400 h-full transition-all duration-300",
                                                    style: {
                                                        width: `${progressPercent}%`
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                                    lineNumber: 289,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                                lineNumber: 288,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true);
                                })(),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: workout.exercises.map((exercise, exIndex)=>{
                                        const exerciseSets = exercise.sets || 3;
                                        const isCurrentExercise = exIndex === timer.exerciseIndex;
                                        const isCompletedExercise = exIndex < timer.exerciseIndex;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `text-lg font-bold ${isCompletedExercise ? 'text-green-400' : isCurrentExercise ? 'text-blue-400' : 'text-slate-500'}`,
                                                            children: isCompletedExercise ? '✓' : isCurrentExercise ? '▶' : '○'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                                            lineNumber: 304,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `text-sm font-semibold ${isCompletedExercise ? 'text-green-400' : isCurrentExercise ? 'text-blue-300' : 'text-slate-500'}`,
                                                            children: exercise.exerciseName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                                            lineNumber: 307,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                                    lineNumber: 303,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-2 ml-6 flex-wrap",
                                                    children: Array.from({
                                                        length: exerciseSets
                                                    }).map((_, setIdx)=>{
                                                        const isCompletedSet = isCompletedExercise || isCurrentExercise && setIdx < timer.setIndex;
                                                        const isCurrentSet = isCurrentExercise && setIdx === timer.setIndex;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${isCompletedSet ? 'bg-green-500 text-white shadow-lg shadow-green-500/50' : isCurrentSet ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50 scale-110' : 'bg-slate-700 text-slate-400 border border-slate-600'}`,
                                                            children: setIdx + 1
                                                        }, setIdx, false, {
                                                            fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                                            lineNumber: 318,
                                                            columnNumber: 28
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                                    lineNumber: 312,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, exIndex, true, {
                                            fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                            lineNumber: 302,
                                            columnNumber: 22
                                        }, ("TURBOPACK compile-time value", void 0));
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                    lineNumber: 297,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                            lineNumber: 269,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-8 p-4 bg-slate-700 rounded-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-slate-400 text-sm mb-1",
                                    children: "Total Time"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                    lineNumber: 330,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-2xl font-bold text-white",
                                    children: formatTime(totalElapsed.current)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                    lineNumber: 331,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                            lineNumber: 329,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-4 justify-center",
                            children: timer.phase === 'countdown' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleStartWorkout,
                                className: "px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg flex items-center gap-2 transition",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                        lineNumber: 337,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Start Workout"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                lineNumber: 336,
                                columnNumber: 44
                            }, ("TURBOPACK compile-time value", void 0)) : timer.phase === 'rest-set' || timer.phase === 'rest-exercise' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleStartWorkout,
                                className: "px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg flex items-center gap-2 transition",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                        lineNumber: 340,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Start Exercise"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                lineNumber: 339,
                                columnNumber: 91
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handlePause,
                                        className: "px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center gap-2 transition",
                                        children: [
                                            timer.isRunning ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                                lineNumber: 344,
                                                columnNumber: 38
                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                                lineNumber: 344,
                                                columnNumber: 70
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            timer.isRunning ? 'Pause' : 'Resume'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                        lineNumber: 343,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    timer.phase === 'exercise' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSetComplete,
                                        className: "px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg flex items-center gap-2 transition",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                                lineNumber: 349,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Set Complete"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                        lineNumber: 348,
                                        columnNumber: 48
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleReset,
                                        className: "px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg flex items-center gap-2 transition",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__["RotateCw"], {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                                lineNumber: 354,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Reset"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                                        lineNumber: 353,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                            lineNumber: 335,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
                    lineNumber: 210,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
            lineNumber: 202,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/workouts/WorkoutRunner.tsx",
        lineNumber: 201,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s(WorkoutRunner, "L0FbLSGvsVVbz5DvmOuMbZfteLA=");
_c = WorkoutRunner;
/**
 * Calculate estimated calories burned
 * Formula: (Sets × Reps × 0.15) + (Duration in minutes × 3) + base metabolic adjustment
 */ function calculateCaloriesBurned(workout, durationSeconds) {
    let totalCalories = 0;
    for (const exercise of workout.exercises){
        const sets = exercise.sets || 3;
        const reps = exercise.reps || 10;
        // Estimate ~0.2 calories per rep for bodyweight exercises
        totalCalories += sets * reps * 0.2;
    }
    // Add calories based on total duration (intensity-based)
    const durationMinutes = durationSeconds / 60;
    const intensityMultiplier = workout.duration === 'short' ? 3 : workout.duration === 'medium' ? 4.5 : 6;
    totalCalories += durationMinutes * intensityMultiplier;
    return Math.round(totalCalories);
}
const __TURBOPACK__default__export__ = WorkoutRunner;
var _c;
__turbopack_context__.k.register(_c, "WorkoutRunner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/workouts/[id]/run/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RunWorkoutPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWorkout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useWorkout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWorkoutLogs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useWorkoutLogs.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProtectedRoute$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProtectedRoute.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$workouts$2f$WorkoutRunner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/workouts/WorkoutRunner.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function RunWorkoutPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(18);
    if ($[0] !== "e27819ac404dce167e674932fc7a900b97718d9eac8cc796014ae86973776fe3") {
        for(let $i = 0; $i < 18; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e27819ac404dce167e674932fc7a900b97718d9eac8cc796014ae86973776fe3";
    }
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { workouts, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWorkout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkout"])();
    const { addLog } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWorkoutLogs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkoutLogs"])();
    const [workout, setWorkout] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    let t0;
    let t1;
    if ($[1] !== params.id || $[2] !== workouts) {
        t0 = ({
            "RunWorkoutPage[useEffect()]": ()=>{
                if (workouts.length > 0) {
                    const found = workouts.find({
                        "RunWorkoutPage[useEffect() > workouts.find()]": (w)=>w.id === params.id
                    }["RunWorkoutPage[useEffect() > workouts.find()]"]);
                    setWorkout(found || null);
                }
            }
        })["RunWorkoutPage[useEffect()]"];
        t1 = [
            workouts,
            params.id
        ];
        $[1] = params.id;
        $[2] = workouts;
        $[3] = t0;
        $[4] = t1;
    } else {
        t0 = $[3];
        t1 = $[4];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
    let t2;
    if ($[5] !== addLog || $[6] !== router || $[7] !== user || $[8] !== workout) {
        t2 = ({
            "RunWorkoutPage[handleWorkoutComplete]": async (duration, caloriesBurned)=>{
                if (!workout || !user) {
                    return;
                }
                ;
                try {
                    console.log("\u2705 Workout completed:", {
                        duration,
                        caloriesBurned,
                        workout: workout.name,
                        timestamp: new Date().toISOString()
                    });
                    await addLog(workout.id, workout.name, duration, caloriesBurned, workout.exercises.length);
                    alert("Workout saved successfully!");
                    router.push("/dashboard");
                } catch (t3) {
                    const error = t3;
                    console.error("\u274C Error saving workout:", error);
                    alert("Failed to save workout. Please try again.");
                }
            }
        })["RunWorkoutPage[handleWorkoutComplete]"];
        $[5] = addLog;
        $[6] = router;
        $[7] = user;
        $[8] = workout;
        $[9] = t2;
    } else {
        t2 = $[9];
    }
    const handleWorkoutComplete = t2;
    if (loading) {
        let t3;
        if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
            t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProtectedRoute$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                            }, void 0, false, {
                                fileName: "[project]/src/app/workouts/[id]/run/page.tsx",
                                lineNumber: 93,
                                columnNumber: 166
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-slate-300",
                                children: "Loading workout..."
                            }, void 0, false, {
                                fileName: "[project]/src/app/workouts/[id]/run/page.tsx",
                                lineNumber: 93,
                                columnNumber: 280
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/workouts/[id]/run/page.tsx",
                        lineNumber: 93,
                        columnNumber: 137
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/workouts/[id]/run/page.tsx",
                    lineNumber: 93,
                    columnNumber: 28
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/workouts/[id]/run/page.tsx",
                lineNumber: 93,
                columnNumber: 12
            }, this);
            $[10] = t3;
        } else {
            t3 = $[10];
        }
        return t3;
    }
    if (!workout) {
        let t3;
        let t4;
        if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
            t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold text-white mb-2",
                children: "Workout Not Found"
            }, void 0, false, {
                fileName: "[project]/src/app/workouts/[id]/run/page.tsx",
                lineNumber: 104,
                columnNumber: 12
            }, this);
            t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-slate-400 mb-4",
                children: "The workout you're looking for doesn't exist."
            }, void 0, false, {
                fileName: "[project]/src/app/workouts/[id]/run/page.tsx",
                lineNumber: 105,
                columnNumber: 12
            }, this);
            $[11] = t3;
            $[12] = t4;
        } else {
            t3 = $[11];
            t4 = $[12];
        }
        let t5;
        if ($[13] !== router) {
            t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProtectedRoute$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            t3,
                            t4,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: {
                                    "RunWorkoutPage[<button>.onClick]": ()=>router.push("/workouts")
                                }["RunWorkoutPage[<button>.onClick]"],
                                className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition",
                                children: "Back to Workouts"
                            }, void 0, false, {
                                fileName: "[project]/src/app/workouts/[id]/run/page.tsx",
                                lineNumber: 114,
                                columnNumber: 174
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/workouts/[id]/run/page.tsx",
                        lineNumber: 114,
                        columnNumber: 137
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/workouts/[id]/run/page.tsx",
                    lineNumber: 114,
                    columnNumber: 28
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/workouts/[id]/run/page.tsx",
                lineNumber: 114,
                columnNumber: 12
            }, this);
            $[13] = router;
            $[14] = t5;
        } else {
            t5 = $[14];
        }
        return t5;
    }
    let t3;
    if ($[15] !== handleWorkoutComplete || $[16] !== workout) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProtectedRoute$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$workouts$2f$WorkoutRunner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                workout: workout,
                onComplete: handleWorkoutComplete
            }, void 0, false, {
                fileName: "[project]/src/app/workouts/[id]/run/page.tsx",
                lineNumber: 126,
                columnNumber: 26
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/workouts/[id]/run/page.tsx",
            lineNumber: 126,
            columnNumber: 10
        }, this);
        $[15] = handleWorkoutComplete;
        $[16] = workout;
        $[17] = t3;
    } else {
        t3 = $[17];
    }
    return t3;
}
_s(RunWorkoutPage, "hDlK2AvzMkB6W5jw65P0BesD4no=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWorkout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkout"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWorkoutLogs$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWorkoutLogs"]
    ];
});
_c = RunWorkoutPage;
var _c;
__turbopack_context__.k.register(_c, "RunWorkoutPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_26a56ad0._.js.map