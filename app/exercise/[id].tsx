
import React, { useState, useEffect } from 'react';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Text, 
  Pressable,
  Dimensions 
} from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  withSequence,
  Easing 
} from 'react-native-reanimated';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { getExerciseById } from '@/data/exercises';
import { Exercise } from '@/types/workout';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  animationContainer: {
    height: 300,
    backgroundColor: colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  exerciseFigure: {
    width: 120,
    height: 120,
    backgroundColor: colors.primary,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  figureText: {
    fontSize: 48,
    color: colors.card,
  },
  animationControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 20,
  },
  controlButton: {
    backgroundColor: colors.card,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  playButton: {
    backgroundColor: colors.primary,
  },
  detailsContainer: {
    padding: 20,
  },
  exerciseTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  exerciseCategory: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 16,
  },
  difficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 12,
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.card,
  },
  equipmentText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  muscleGroups: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  muscleTag: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  muscleText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  instructionsList: {
    gap: 12,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  instructionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  instructionNumberText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.card,
  },
  instructionText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    flex: 1,
  },
  animationFrames: {
    gap: 16,
  },
  frameCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  frameTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  frameDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  keyPoints: {
    gap: 4,
  },
  keyPoint: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  keyPointText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
  },
  addToWorkoutButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    margin: 20,
    alignItems: 'center',
  },
  addToWorkoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.card,
  },
  headerButtonContainer: {
    padding: 6,
  },
});

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner':
      return colors.success;
    case 'Intermediate':
      return colors.accent;
    case 'Advanced':
      return colors.error;
    default:
      return colors.textSecondary;
  }
};

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Animation values
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (id) {
      const foundExercise = getExerciseById(id);
      setExercise(foundExercise || null);
      console.log(`Loading exercise: ${id}`, foundExercise);
    }
  }, [id]);

  useEffect(() => {
    if (isPlaying && exercise?.animation) {
      // Start animation based on exercise type
      if (exercise.name.toLowerCase().includes('push-up')) {
        // Push-up animation: scale down and up
        scale.value = withRepeat(
          withSequence(
            withTiming(0.8, { duration: 1000, easing: Easing.inOut(Easing.quad) }),
            withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.quad) })
          ),
          -1,
          false
        );
      } else if (exercise.name.toLowerCase().includes('squat')) {
        // Squat animation: move up and down
        translateY.value = withRepeat(
          withSequence(
            withTiming(20, { duration: 1500, easing: Easing.inOut(Easing.quad) }),
            withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.quad) })
          ),
          -1,
          false
        );
      } else if (exercise.name.toLowerCase().includes('plank')) {
        // Plank animation: subtle breathing effect
        scale.value = withRepeat(
          withSequence(
            withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.sine) }),
            withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.sine) })
          ),
          -1,
          false
        );
      } else {
        // Default animation: rotation
        rotation.value = withRepeat(
          withTiming(360, { duration: 2000, easing: Easing.linear }),
          -1,
          false
        );
      }
    } else {
      // Stop animations
      scale.value = withTiming(1);
      rotation.value = withTiming(0);
      translateY.value = withTiming(0);
    }
  }, [isPlaying, exercise]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` },
        { translateY: translateY.value },
      ],
    };
  });

  const toggleAnimation = () => {
    console.log(`${isPlaying ? 'Stopping' : 'Starting'} animation for ${exercise?.name}`);
    setIsPlaying(!isPlaying);
  };

  const renderHeaderRight = () => (
    <Pressable 
      onPress={() => {
        console.log("Share exercise");
      }}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="square.and.arrow.up" size={24} color={colors.primary} />
    </Pressable>
  );

  if (!exercise) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Stack.Screen
          options={{
            title: "Exercise",
            headerStyle: { backgroundColor: colors.background },
            headerShadowVisible: false,
          }}
        />
        <Text style={commonStyles.text}>Exercise not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: exercise.name,
          headerRight: renderHeaderRight,
          headerStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
        }}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Animation Container */}
        <View style={styles.animationContainer}>
          <Animated.View style={[styles.exerciseFigure, animatedStyle]}>
            <Text style={styles.figureText}>💪</Text>
          </Animated.View>
          
          <View style={styles.animationControls}>
            <Pressable 
              style={styles.controlButton}
              onPress={() => {
                console.log("Previous frame");
              }}
            >
              <IconSymbol name="backward.fill" size={20} color={colors.primary} />
            </Pressable>
            
            <Pressable 
              style={[styles.controlButton, styles.playButton]}
              onPress={toggleAnimation}
            >
              <IconSymbol 
                name={isPlaying ? "pause.fill" : "play.fill"} 
                size={24} 
                color={colors.card} 
              />
            </Pressable>
            
            <Pressable 
              style={styles.controlButton}
              onPress={() => {
                console.log("Next frame");
              }}
            >
              <IconSymbol name="forward.fill" size={20} color={colors.primary} />
            </Pressable>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          {/* Header */}
          <Text style={styles.exerciseTitle}>{exercise.name}</Text>
          <Text style={styles.exerciseCategory}>{exercise.category}</Text>
          
          <View style={styles.difficultyContainer}>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(exercise.difficulty) }]}>
              <Text style={styles.difficultyText}>{exercise.difficulty}</Text>
            </View>
            <Text style={styles.equipmentText}>
              {exercise.equipment.length > 0 ? exercise.equipment.join(', ') : 'No equipment needed'}
            </Text>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{exercise.description}</Text>
          </View>

          {/* Muscle Groups */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Target Muscles</Text>
            <View style={styles.muscleGroups}>
              {exercise.muscleGroups.map((muscle, index) => (
                <View key={index} style={styles.muscleTag}>
                  <Text style={styles.muscleText}>{muscle}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Instructions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            <View style={styles.instructionsList}>
              {exercise.instructions.map((instruction, index) => (
                <View key={index} style={styles.instructionItem}>
                  <View style={styles.instructionNumber}>
                    <Text style={styles.instructionNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.instructionText}>{instruction}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Animation Frames */}
          {exercise.animation && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Movement Breakdown</Text>
              <View style={styles.animationFrames}>
                {exercise.animation.frames.map((frame, index) => (
                  <View key={index} style={styles.frameCard}>
                    <Text style={styles.frameTitle}>{frame.description}</Text>
                    <Text style={styles.frameDescription}>
                      Phase {index + 1} of {exercise.animation!.frames.length}
                    </Text>
                    <View style={styles.keyPoints}>
                      {frame.keyPoints.map((point, pointIndex) => (
                        <View key={pointIndex} style={styles.keyPoint}>
                          <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
                          <Text style={styles.keyPointText}>{point}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Add to Workout Button */}
      <Pressable 
        style={styles.addToWorkoutButton}
        onPress={() => {
          console.log(`Adding ${exercise.name} to workout`);
          router.push('/create-workout');
        }}
      >
        <Text style={styles.addToWorkoutText}>Add to Workout</Text>
      </Pressable>
    </View>
  );
}
