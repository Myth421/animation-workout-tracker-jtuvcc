
import { Workout, WorkoutCategory } from '../types/workout';

export const prebuiltWorkouts: Workout[] = [
  {
    id: 'beginner-full-body',
    name: 'Beginner Full Body',
    description: 'A complete workout for beginners targeting all major muscle groups',
    category: 'Full Body',
    difficulty: 'Beginner',
    estimatedDuration: 30,
    createdAt: new Date(),
    exercises: [
      {
        exerciseId: 'squats',
        sets: 3,
        reps: 12,
        restTime: 60,
        completed: false,
        completedSets: 0
      },
      {
        exerciseId: 'push-ups',
        sets: 3,
        reps: 8,
        restTime: 60,
        completed: false,
        completedSets: 0
      },
      {
        exerciseId: 'plank',
        sets: 3,
        duration: 30,
        restTime: 45,
        completed: false,
        completedSets: 0
      }
    ]
  },
  {
    id: 'upper-body-strength',
    name: 'Upper Body Strength',
    description: 'Build strength in your chest, back, shoulders, and arms',
    category: 'Upper Body',
    difficulty: 'Intermediate',
    estimatedDuration: 45,
    createdAt: new Date(),
    exercises: [
      {
        exerciseId: 'bench-press',
        sets: 4,
        reps: 8,
        restTime: 90,
        completed: false,
        completedSets: 0
      },
      {
        exerciseId: 'pull-ups',
        sets: 3,
        reps: 6,
        restTime: 90,
        completed: false,
        completedSets: 0
      },
      {
        exerciseId: 'shoulder-press',
        sets: 3,
        reps: 10,
        restTime: 75,
        completed: false,
        completedSets: 0
      },
      {
        exerciseId: 'push-ups',
        sets: 3,
        reps: 12,
        restTime: 60,
        completed: false,
        completedSets: 0
      }
    ]
  },
  {
    id: 'hiit-cardio',
    name: 'HIIT Cardio Blast',
    description: 'High-intensity interval training for maximum calorie burn',
    category: 'HIIT',
    difficulty: 'Advanced',
    estimatedDuration: 20,
    createdAt: new Date(),
    exercises: [
      {
        exerciseId: 'burpees',
        sets: 4,
        reps: 10,
        restTime: 30,
        completed: false,
        completedSets: 0
      },
      {
        exerciseId: 'squats',
        sets: 4,
        reps: 20,
        restTime: 30,
        completed: false,
        completedSets: 0
      },
      {
        exerciseId: 'push-ups',
        sets: 4,
        reps: 15,
        restTime: 30,
        completed: false,
        completedSets: 0
      },
      {
        exerciseId: 'plank',
        sets: 4,
        duration: 45,
        restTime: 30,
        completed: false,
        completedSets: 0
      }
    ]
  },
  {
    id: 'lower-body-power',
    name: 'Lower Body Power',
    description: 'Build strength and power in your legs and glutes',
    category: 'Lower Body',
    difficulty: 'Intermediate',
    estimatedDuration: 40,
    createdAt: new Date(),
    exercises: [
      {
        exerciseId: 'squats',
        sets: 4,
        reps: 15,
        restTime: 75,
        completed: false,
        completedSets: 0
      },
      {
        exerciseId: 'squats',
        sets: 3,
        reps: 12,
        weight: 20,
        restTime: 90,
        completed: false,
        completedSets: 0
      }
    ]
  }
];

export const getWorkoutsByCategory = (category: WorkoutCategory): Workout[] => {
  return prebuiltWorkouts.filter(workout => workout.category === category);
};

export const getWorkoutById = (id: string): Workout | undefined => {
  return prebuiltWorkouts.find(workout => workout.id === id);
};
