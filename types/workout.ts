
export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  muscleGroups: string[];
  description: string;
  instructions: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  equipment: string[];
  animation?: ExerciseAnimation;
}

export interface ExerciseAnimation {
  type: 'sequence' | 'loop';
  frames: AnimationFrame[];
  duration: number;
}

export interface AnimationFrame {
  position: number; // 0-1 representing progress through exercise
  description: string;
  keyPoints: string[];
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: number;
  reps?: number;
  duration?: number; // in seconds
  weight?: number;
  restTime: number; // in seconds
  completed: boolean;
  completedSets: number;
}

export interface Workout {
  id: string;
  name: string;
  description?: string;
  exercises: WorkoutExercise[];
  estimatedDuration: number; // in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: WorkoutCategory;
  createdAt: Date;
  lastPerformed?: Date;
}

export interface WorkoutSession {
  id: string;
  workoutId: string;
  startTime: Date;
  endTime?: Date;
  exercises: CompletedExercise[];
  totalDuration?: number; // in minutes
}

export interface CompletedExercise {
  exerciseId: string;
  sets: CompletedSet[];
}

export interface CompletedSet {
  reps?: number;
  weight?: number;
  duration?: number;
  completedAt: Date;
}

export type ExerciseCategory = 
  | 'Chest'
  | 'Back' 
  | 'Shoulders'
  | 'Arms'
  | 'Legs'
  | 'Core'
  | 'Cardio'
  | 'Full Body';

export type WorkoutCategory =
  | 'Strength'
  | 'Cardio'
  | 'HIIT'
  | 'Flexibility'
  | 'Full Body'
  | 'Upper Body'
  | 'Lower Body';

export interface WorkoutProgress {
  totalWorkouts: number;
  totalDuration: number; // in minutes
  currentStreak: number;
  longestStreak: number;
  favoriteCategory: WorkoutCategory;
  weeklyGoal: number; // workouts per week
  weeklyProgress: number; // completed this week
}
