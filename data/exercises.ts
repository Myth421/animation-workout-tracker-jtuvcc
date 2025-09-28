
import { Exercise, ExerciseCategory } from '../types/workout';

export const exerciseDatabase: Exercise[] = [
  // Chest Exercises
  {
    id: 'push-ups',
    name: 'Push-ups',
    category: 'Chest',
    muscleGroups: ['Chest', 'Shoulders', 'Triceps', 'Core'],
    description: 'A classic bodyweight exercise that targets the chest, shoulders, and triceps.',
    instructions: [
      'Start in a plank position with hands slightly wider than shoulders',
      'Lower your body until chest nearly touches the floor',
      'Push back up to starting position',
      'Keep your body in a straight line throughout'
    ],
    difficulty: 'Beginner',
    equipment: [],
    animation: {
      type: 'sequence',
      duration: 3000,
      frames: [
        {
          position: 0,
          description: 'Starting position - plank',
          keyPoints: ['Arms extended', 'Body straight', 'Core engaged']
        },
        {
          position: 0.5,
          description: 'Lowering phase',
          keyPoints: ['Chest approaching floor', 'Elbows at 45 degrees', 'Control the descent']
        },
        {
          position: 1,
          description: 'Push back up',
          keyPoints: ['Drive through palms', 'Maintain straight line', 'Full extension']
        }
      ]
    }
  },
  {
    id: 'bench-press',
    name: 'Bench Press',
    category: 'Chest',
    muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
    description: 'A fundamental compound exercise for building chest strength and mass.',
    instructions: [
      'Lie on bench with feet flat on floor',
      'Grip barbell slightly wider than shoulders',
      'Lower bar to chest with control',
      'Press bar back to starting position'
    ],
    difficulty: 'Intermediate',
    equipment: ['Barbell', 'Bench'],
    animation: {
      type: 'sequence',
      duration: 4000,
      frames: [
        {
          position: 0,
          description: 'Starting position',
          keyPoints: ['Bar over chest', 'Feet planted', 'Shoulder blades retracted']
        },
        {
          position: 0.5,
          description: 'Lowering the bar',
          keyPoints: ['Control the descent', 'Bar to chest', 'Elbows at 45 degrees']
        },
        {
          position: 1,
          description: 'Pressing up',
          keyPoints: ['Drive through chest', 'Full extension', 'Maintain form']
        }
      ]
    }
  },

  // Back Exercises
  {
    id: 'pull-ups',
    name: 'Pull-ups',
    category: 'Back',
    muscleGroups: ['Lats', 'Rhomboids', 'Biceps', 'Core'],
    description: 'An excellent upper body pulling exercise that builds back and arm strength.',
    instructions: [
      'Hang from pull-up bar with overhand grip',
      'Pull your body up until chin clears the bar',
      'Lower yourself with control to full extension',
      'Repeat for desired reps'
    ],
    difficulty: 'Intermediate',
    equipment: ['Pull-up bar'],
    animation: {
      type: 'sequence',
      duration: 4000,
      frames: [
        {
          position: 0,
          description: 'Dead hang position',
          keyPoints: ['Full arm extension', 'Shoulders engaged', 'Core tight']
        },
        {
          position: 0.5,
          description: 'Pulling up',
          keyPoints: ['Lead with chest', 'Elbows down and back', 'Engage lats']
        },
        {
          position: 1,
          description: 'Top position',
          keyPoints: ['Chin over bar', 'Chest up', 'Squeeze shoulder blades']
        }
      ]
    }
  },

  // Leg Exercises
  {
    id: 'squats',
    name: 'Squats',
    category: 'Legs',
    muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings', 'Core'],
    description: 'The king of lower body exercises, targeting multiple muscle groups.',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower your body by bending at hips and knees',
      'Descend until thighs are parallel to floor',
      'Drive through heels to return to starting position'
    ],
    difficulty: 'Beginner',
    equipment: [],
    animation: {
      type: 'sequence',
      duration: 4000,
      frames: [
        {
          position: 0,
          description: 'Standing position',
          keyPoints: ['Feet shoulder-width', 'Chest up', 'Core braced']
        },
        {
          position: 0.5,
          description: 'Descending',
          keyPoints: ['Hips back first', 'Knees track over toes', 'Weight on heels']
        },
        {
          position: 1,
          description: 'Bottom position',
          keyPoints: ['Thighs parallel', 'Chest up', 'Ready to drive up']
        }
      ]
    }
  },

  // Core Exercises
  {
    id: 'plank',
    name: 'Plank',
    category: 'Core',
    muscleGroups: ['Core', 'Shoulders', 'Glutes'],
    description: 'An isometric exercise that builds core strength and stability.',
    instructions: [
      'Start in push-up position on forearms',
      'Keep body in straight line from head to heels',
      'Engage core and hold position',
      'Breathe normally throughout'
    ],
    difficulty: 'Beginner',
    equipment: [],
    animation: {
      type: 'loop',
      duration: 2000,
      frames: [
        {
          position: 0,
          description: 'Plank hold',
          keyPoints: ['Straight body line', 'Core engaged', 'Neutral spine']
        },
        {
          position: 0.5,
          description: 'Maintain position',
          keyPoints: ['No sagging hips', 'Steady breathing', 'Strong core']
        },
        {
          position: 1,
          description: 'Continue hold',
          keyPoints: ['Consistent form', 'Mental focus', 'Controlled breathing']
        }
      ]
    }
  },

  // Cardio Exercises
  {
    id: 'burpees',
    name: 'Burpees',
    category: 'Cardio',
    muscleGroups: ['Full Body', 'Cardiovascular'],
    description: 'A high-intensity full-body exercise that combines strength and cardio.',
    instructions: [
      'Start standing, then squat down and place hands on floor',
      'Jump feet back into plank position',
      'Perform a push-up (optional)',
      'Jump feet back to squat position',
      'Jump up with arms overhead'
    ],
    difficulty: 'Advanced',
    equipment: [],
    animation: {
      type: 'sequence',
      duration: 5000,
      frames: [
        {
          position: 0,
          description: 'Standing start',
          keyPoints: ['Ready position', 'Core engaged', 'Prepare to squat']
        },
        {
          position: 0.25,
          description: 'Squat down',
          keyPoints: ['Hands to floor', 'Prepare to jump back', 'Stay low']
        },
        {
          position: 0.5,
          description: 'Plank position',
          keyPoints: ['Straight body', 'Strong plank', 'Optional push-up']
        },
        {
          position: 0.75,
          description: 'Jump feet forward',
          keyPoints: ['Return to squat', 'Prepare to jump', 'Explosive movement']
        },
        {
          position: 1,
          description: 'Jump up',
          keyPoints: ['Arms overhead', 'Full extension', 'Land softly']
        }
      ]
    }
  },

  // Shoulder Exercises
  {
    id: 'shoulder-press',
    name: 'Shoulder Press',
    category: 'Shoulders',
    muscleGroups: ['Shoulders', 'Triceps', 'Core'],
    description: 'A fundamental exercise for building shoulder strength and stability.',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Hold weights at shoulder level',
      'Press weights overhead until arms are fully extended',
      'Lower with control back to starting position'
    ],
    difficulty: 'Intermediate',
    equipment: ['Dumbbells'],
    animation: {
      type: 'sequence',
      duration: 3500,
      frames: [
        {
          position: 0,
          description: 'Starting position',
          keyPoints: ['Weights at shoulders', 'Core engaged', 'Feet planted']
        },
        {
          position: 0.5,
          description: 'Pressing up',
          keyPoints: ['Drive weights up', 'Keep core tight', 'Straight path']
        },
        {
          position: 1,
          description: 'Overhead position',
          keyPoints: ['Arms fully extended', 'Weights aligned', 'Control descent']
        }
      ]
    }
  }
];

export const getExercisesByCategory = (category: ExerciseCategory): Exercise[] => {
  return exerciseDatabase.filter(exercise => exercise.category === category);
};

export const getExerciseById = (id: string): Exercise | undefined => {
  return exerciseDatabase.find(exercise => exercise.id === id);
};

export const searchExercises = (query: string): Exercise[] => {
  const lowercaseQuery = query.toLowerCase();
  return exerciseDatabase.filter(exercise => 
    exercise.name.toLowerCase().includes(lowercaseQuery) ||
    exercise.muscleGroups.some(muscle => muscle.toLowerCase().includes(lowercaseQuery)) ||
    exercise.category.toLowerCase().includes(lowercaseQuery)
  );
};
