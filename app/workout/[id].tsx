
import React, { useState, useEffect } from 'react';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Text, 
  Pressable,
  Alert 
} from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { getWorkoutById } from '@/data/workouts';
import { getExerciseById } from '@/data/exercises';
import { Workout, WorkoutExercise } from '@/types/workout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  headerCard: {
    backgroundColor: colors.card,
    margin: 20,
    borderRadius: 16,
    padding: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  workoutTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  workoutDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 3,
    flex: 1,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  exercisesList: {
    paddingHorizontal: 20,
  },
  exerciseCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  exerciseCardCompleted: {
    backgroundColor: colors.backgroundAlt,
    opacity: 0.7,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  exerciseStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  exerciseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  setsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  setButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.backgroundAlt,
    borderWidth: 2,
    borderColor: colors.grey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setButtonCompleted: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  setButtonActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  setText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  setTextCompleted: {
    color: colors.card,
  },
  exerciseActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionButtonPrimary: {
    backgroundColor: colors.primary,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  actionButtonTextPrimary: {
    color: colors.card,
  },
  restTimer: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    padding: 16,
    margin: 20,
    alignItems: 'center',
  },
  restTimerText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.card,
    marginBottom: 4,
  },
  restTimerLabel: {
    fontSize: 14,
    color: colors.card,
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  bottomButton: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  bottomButtonPrimary: {
    backgroundColor: colors.primary,
  },
  bottomButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  bottomButtonTextPrimary: {
    color: colors.card,
  },
  headerButtonContainer: {
    padding: 6,
  },
});

export default function WorkoutSessionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [restTime, setRestTime] = useState(0);
  const [isResting, setIsResting] = useState(false);

  useEffect(() => {
    if (id) {
      const foundWorkout = getWorkoutById(id);
      if (foundWorkout) {
        setWorkout(foundWorkout);
        console.log(`Starting workout: ${foundWorkout.name}`);
      }
    }
  }, [id]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResting && restTime > 0) {
      interval = setInterval(() => {
        setRestTime((prev) => {
          if (prev <= 1) {
            setIsResting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResting, restTime]);

  const completeSet = (exerciseIndex: number) => {
    if (!workout) return;

    const updatedWorkout = { ...workout };
    const exercise = updatedWorkout.exercises[exerciseIndex];
    
    if (exercise.completedSets < exercise.sets) {
      exercise.completedSets += 1;
      
      if (exercise.completedSets === exercise.sets) {
        exercise.completed = true;
        console.log(`Completed exercise: ${getExerciseById(exercise.exerciseId)?.name}`);
      }
      
      setWorkout(updatedWorkout);
      
      // Start rest timer if not the last set
      if (exercise.completedSets < exercise.sets) {
        setRestTime(exercise.restTime);
        setIsResting(true);
        console.log(`Starting rest timer: ${exercise.restTime} seconds`);
      }
    }
  };

  const skipRest = () => {
    setIsResting(false);
    setRestTime(0);
    console.log("Skipped rest timer");
  };

  const finishWorkout = () => {
    Alert.alert(
      "Finish Workout",
      "Are you sure you want to finish this workout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Finish", 
          style: "default",
          onPress: () => {
            console.log("Workout finished");
            router.back();
          }
        }
      ]
    );
  };

  const renderHeaderRight = () => (
    <Pressable 
      onPress={() => {
        Alert.alert(
          "End Workout",
          "Are you sure you want to end this workout? Your progress will be lost.",
          [
            { text: "Cancel", style: "cancel" },
            { 
              text: "End", 
              style: "destructive",
              onPress: () => {
                console.log("Workout ended");
                router.back();
              }
            }
          ]
        );
      }}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="xmark" size={24} color={colors.error} />
    </Pressable>
  );

  if (!workout) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Stack.Screen
          options={{
            title: "Workout",
            headerStyle: { backgroundColor: colors.background },
            headerShadowVisible: false,
          }}
        />
        <Text style={commonStyles.text}>Workout not found</Text>
      </View>
    );
  }

  const completedExercises = workout.exercises.filter(ex => ex.completed).length;
  const totalExercises = workout.exercises.length;
  const progressPercentage = (completedExercises / totalExercises) * 100;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: workout.name,
          headerRight: renderHeaderRight,
          headerStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
        }}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header Card */}
        <View style={styles.headerCard}>
          <Text style={styles.workoutTitle}>{workout.name}</Text>
          {workout.description && (
            <Text style={styles.workoutDescription}>{workout.description}</Text>
          )}
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              {completedExercises}/{totalExercises}
            </Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
            </View>
            <Text style={styles.progressText}>{Math.round(progressPercentage)}%</Text>
          </View>
        </View>

        {/* Rest Timer */}
        {isResting && (
          <View style={styles.restTimer}>
            <Text style={styles.restTimerText}>{restTime}s</Text>
            <Text style={styles.restTimerLabel}>Rest Time</Text>
          </View>
        )}

        {/* Exercises */}
        <View style={styles.exercisesList}>
          {workout.exercises.map((workoutExercise, index) => {
            const exercise = getExerciseById(workoutExercise.exerciseId);
            if (!exercise) return null;

            const isCompleted = workoutExercise.completed;
            const isActive = index === currentExerciseIndex;

            return (
              <View 
                key={`${workoutExercise.exerciseId}-${index}`}
                style={[
                  styles.exerciseCard,
                  isCompleted && styles.exerciseCardCompleted
                ]}
              >
                <View style={styles.exerciseHeader}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <View style={styles.exerciseStatus}>
                    <IconSymbol 
                      name={isCompleted ? "checkmark.circle.fill" : "circle"} 
                      size={20} 
                      color={isCompleted ? colors.success : colors.grey} 
                    />
                    <Text style={styles.statusText}>
                      {workoutExercise.completedSets}/{workoutExercise.sets}
                    </Text>
                  </View>
                </View>

                <View style={styles.exerciseDetails}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailValue}>{workoutExercise.sets}</Text>
                    <Text style={styles.detailLabel}>Sets</Text>
                  </View>
                  {workoutExercise.reps && (
                    <View style={styles.detailItem}>
                      <Text style={styles.detailValue}>{workoutExercise.reps}</Text>
                      <Text style={styles.detailLabel}>Reps</Text>
                    </View>
                  )}
                  {workoutExercise.duration && (
                    <View style={styles.detailItem}>
                      <Text style={styles.detailValue}>{workoutExercise.duration}s</Text>
                      <Text style={styles.detailLabel}>Duration</Text>
                    </View>
                  )}
                  <View style={styles.detailItem}>
                    <Text style={styles.detailValue}>{workoutExercise.restTime}s</Text>
                    <Text style={styles.detailLabel}>Rest</Text>
                  </View>
                </View>

                <View style={styles.setsContainer}>
                  {Array.from({ length: workoutExercise.sets }, (_, setIndex) => (
                    <Pressable
                      key={setIndex}
                      style={[
                        styles.setButton,
                        setIndex < workoutExercise.completedSets && styles.setButtonCompleted,
                        setIndex === workoutExercise.completedSets && isActive && styles.setButtonActive
                      ]}
                      onPress={() => {
                        if (setIndex === workoutExercise.completedSets && !isCompleted) {
                          completeSet(index);
                        }
                      }}
                    >
                      <Text style={[
                        styles.setText,
                        setIndex < workoutExercise.completedSets && styles.setTextCompleted
                      ]}>
                        {setIndex + 1}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                <View style={styles.exerciseActions}>
                  <Pressable 
                    style={styles.actionButton}
                    onPress={() => {
                      console.log(`Viewing exercise: ${exercise.name}`);
                      router.push(`/exercise/${exercise.id}`);
                    }}
                  >
                    <Text style={styles.actionButtonText}>View Exercise</Text>
                  </Pressable>
                  
                  {!isCompleted && (
                    <Pressable 
                      style={[styles.actionButton, styles.actionButtonPrimary]}
                      onPress={() => completeSet(index)}
                    >
                      <Text style={[styles.actionButtonText, styles.actionButtonTextPrimary]}>
                        Complete Set
                      </Text>
                    </Pressable>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        {isResting && (
          <Pressable style={styles.bottomButton} onPress={skipRest}>
            <Text style={styles.bottomButtonText}>Skip Rest</Text>
          </Pressable>
        )}
        
        <Pressable 
          style={[styles.bottomButton, styles.bottomButtonPrimary]}
          onPress={finishWorkout}
        >
          <Text style={[styles.bottomButtonText, styles.bottomButtonTextPrimary]}>
            Finish Workout
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
