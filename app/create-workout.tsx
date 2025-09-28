
import React, { useState } from 'react';
import { Stack, router } from 'expo-router';
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Text, 
  Pressable,
  TextInput,
  Alert,
  FlatList 
} from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { exerciseDatabase } from '@/data/exercises';
import { Exercise, Workout, WorkoutExercise, WorkoutCategory } from '@/types/workout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  categoryTextActive: {
    color: colors.card,
  },
  exercisesSection: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
    paddingTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  addExerciseButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  addExerciseText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.card,
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
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  removeButton: {
    padding: 4,
  },
  exerciseInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  inputColumn: {
    flex: 1,
  },
  smallInput: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 16,
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.grey,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  closeButton: {
    padding: 4,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundAlt,
  },
  exerciseInfo: {
    flex: 1,
    marginLeft: 12,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
  },
  exerciseCategory: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  headerButtonContainer: {
    padding: 6,
  },
});

const workoutCategories: WorkoutCategory[] = [
  'Strength', 'Cardio', 'HIIT', 'Flexibility', 'Full Body', 'Upper Body', 'Lower Body'
];

export default function CreateWorkoutScreen() {
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDescription, setWorkoutDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<WorkoutCategory>('Strength');
  const [selectedExercises, setSelectedExercises] = useState<WorkoutExercise[]>([]);
  const [showExerciseModal, setShowExerciseModal] = useState(false);

  const addExercise = (exercise: Exercise) => {
    const newWorkoutExercise: WorkoutExercise = {
      exerciseId: exercise.id,
      sets: 3,
      reps: exercise.category === 'Cardio' ? undefined : 10,
      duration: exercise.category === 'Cardio' ? 30 : undefined,
      restTime: 60,
      completed: false,
      completedSets: 0,
    };

    setSelectedExercises([...selectedExercises, newWorkoutExercise]);
    setShowExerciseModal(false);
    console.log(`Added exercise: ${exercise.name}`);
  };

  const removeExercise = (index: number) => {
    const exercise = exerciseDatabase.find(ex => ex.id === selectedExercises[index].exerciseId);
    setSelectedExercises(selectedExercises.filter((_, i) => i !== index));
    console.log(`Removed exercise: ${exercise?.name}`);
  };

  const updateExercise = (index: number, field: keyof WorkoutExercise, value: any) => {
    const updated = [...selectedExercises];
    updated[index] = { ...updated[index], [field]: value };
    setSelectedExercises(updated);
  };

  const saveWorkout = () => {
    if (!workoutName.trim()) {
      Alert.alert('Error', 'Please enter a workout name');
      return;
    }

    if (selectedExercises.length === 0) {
      Alert.alert('Error', 'Please add at least one exercise');
      return;
    }

    const estimatedDuration = selectedExercises.reduce((total, ex) => {
      const exerciseTime = ex.duration ? ex.duration * ex.sets : ex.sets * 30; // Estimate 30s per set
      const restTime = ex.restTime * (ex.sets - 1);
      return total + exerciseTime + restTime;
    }, 0) / 60; // Convert to minutes

    const newWorkout: Workout = {
      id: `custom-${Date.now()}`,
      name: workoutName,
      description: workoutDescription || undefined,
      category: selectedCategory,
      difficulty: 'Intermediate', // Default for custom workouts
      exercises: selectedExercises,
      estimatedDuration: Math.round(estimatedDuration),
      createdAt: new Date(),
    };

    console.log('Created workout:', newWorkout);
    Alert.alert(
      'Workout Created',
      `"${workoutName}" has been saved successfully!`,
      [
        { text: 'OK', onPress: () => router.back() }
      ]
    );
  };

  const renderHeaderRight = () => (
    <Pressable 
      onPress={saveWorkout}
      style={styles.headerButtonContainer}
    >
      <Text style={{ color: colors.primary, fontWeight: '600' }}>Save</Text>
    </Pressable>
  );

  const renderExerciseModal = () => {
    if (!showExerciseModal) return null;

    return (
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add Exercise</Text>
            <Pressable 
              style={styles.closeButton}
              onPress={() => setShowExerciseModal(false)}
            >
              <IconSymbol name="xmark" size={24} color={colors.text} />
            </Pressable>
          </View>
          
          <FlatList
            data={exerciseDatabase}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable 
                style={styles.exerciseItem}
                onPress={() => addExercise(item)}
              >
                <IconSymbol name="plus.circle" size={24} color={colors.primary} />
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseTitle}>{item.name}</Text>
                  <Text style={styles.exerciseCategory}>{item.category}</Text>
                </View>
              </Pressable>
            )}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Create Workout",
          headerRight: renderHeaderRight,
          headerStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
        }}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Form */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Workout Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter workout name..."
              placeholderTextColor={colors.textSecondary}
              value={workoutName}
              onChangeText={setWorkoutName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description (Optional)</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Describe your workout..."
              placeholderTextColor={colors.textSecondary}
              value={workoutDescription}
              onChangeText={setWorkoutDescription}
              multiline
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.categoryContainer}>
              {workoutCategories.map((category) => (
                <Pressable
                  key={category}
                  style={[
                    styles.categoryChip,
                    selectedCategory === category && styles.categoryChipActive
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text style={[
                    styles.categoryText,
                    selectedCategory === category && styles.categoryTextActive
                  ]}>
                    {category}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        {/* Exercises Section */}
        <View style={styles.exercisesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Exercises ({selectedExercises.length})
            </Text>
            <Pressable 
              style={styles.addExerciseButton}
              onPress={() => setShowExerciseModal(true)}
            >
              <Text style={styles.addExerciseText}>Add Exercise</Text>
            </Pressable>
          </View>

          {selectedExercises.length === 0 ? (
            <View style={styles.emptyState}>
              <IconSymbol name="dumbbell" size={48} color={colors.textSecondary} />
              <Text style={styles.emptyText}>
                No exercises added yet.{'\n'}Tap "Add Exercise" to get started.
              </Text>
            </View>
          ) : (
            <View style={styles.exercisesList}>
              {selectedExercises.map((workoutExercise, index) => {
                const exercise = exerciseDatabase.find(ex => ex.id === workoutExercise.exerciseId);
                if (!exercise) return null;

                return (
                  <View key={`${workoutExercise.exerciseId}-${index}`} style={styles.exerciseCard}>
                    <View style={styles.exerciseHeader}>
                      <Text style={styles.exerciseName}>{exercise.name}</Text>
                      <Pressable 
                        style={styles.removeButton}
                        onPress={() => removeExercise(index)}
                      >
                        <IconSymbol name="trash" size={20} color={colors.error} />
                      </Pressable>
                    </View>

                    <View style={styles.exerciseInputs}>
                      <View style={styles.inputColumn}>
                        <Text style={styles.inputLabel}>Sets</Text>
                        <TextInput
                          style={styles.smallInput}
                          value={workoutExercise.sets.toString()}
                          onChangeText={(text) => updateExercise(index, 'sets', parseInt(text) || 1)}
                          keyboardType="numeric"
                        />
                      </View>

                      {workoutExercise.reps !== undefined && (
                        <View style={styles.inputColumn}>
                          <Text style={styles.inputLabel}>Reps</Text>
                          <TextInput
                            style={styles.smallInput}
                            value={workoutExercise.reps.toString()}
                            onChangeText={(text) => updateExercise(index, 'reps', parseInt(text) || 1)}
                            keyboardType="numeric"
                          />
                        </View>
                      )}

                      {workoutExercise.duration !== undefined && (
                        <View style={styles.inputColumn}>
                          <Text style={styles.inputLabel}>Duration (s)</Text>
                          <TextInput
                            style={styles.smallInput}
                            value={workoutExercise.duration.toString()}
                            onChangeText={(text) => updateExercise(index, 'duration', parseInt(text) || 30)}
                            keyboardType="numeric"
                          />
                        </View>
                      )}

                      <View style={styles.inputColumn}>
                        <Text style={styles.inputLabel}>Rest (s)</Text>
                        <TextInput
                          style={styles.smallInput}
                          value={workoutExercise.restTime.toString()}
                          onChangeText={(text) => updateExercise(index, 'restTime', parseInt(text) || 60)}
                          keyboardType="numeric"
                        />
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <Pressable 
          style={styles.bottomButton}
          onPress={() => router.back()}
        >
          <Text style={styles.bottomButtonText}>Cancel</Text>
        </Pressable>
        
        <Pressable 
          style={[styles.bottomButton, styles.bottomButtonPrimary]}
          onPress={saveWorkout}
        >
          <Text style={[styles.bottomButtonText, styles.bottomButtonTextPrimary]}>
            Save Workout
          </Text>
        </Pressable>
      </View>

      {renderExerciseModal()}
    </View>
  );
}
