
import React, { useState } from 'react';
import { Stack, router } from 'expo-router';
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Text, 
  Pressable,
  FlatList 
} from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { prebuiltWorkouts, getWorkoutsByCategory } from '@/data/workouts';
import { Workout, WorkoutCategory } from '@/types/workout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  categoriesScroll: {
    paddingVertical: 10,
  },
  categoryChip: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
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
  workoutsList: {
    paddingHorizontal: 20,
  },
  workoutCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  workoutTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.card,
  },
  workoutDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  workoutStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  workoutFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTag: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryTagText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  startButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  startButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.card,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 16,
  },
  headerButtonContainer: {
    padding: 6,
  },
});

const categories: (WorkoutCategory | 'All')[] = [
  'All', 'Strength', 'Cardio', 'HIIT', 'Flexibility', 'Full Body', 'Upper Body', 'Lower Body'
];

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

export default function WorkoutsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<WorkoutCategory | 'All'>('All');

  const getFilteredWorkouts = (): Workout[] => {
    if (selectedCategory === 'All') {
      return prebuiltWorkouts;
    }
    return getWorkoutsByCategory(selectedCategory);
  };

  const filteredWorkouts = getFilteredWorkouts();

  const renderHeaderRight = () => (
    <Pressable 
      onPress={() => {
        console.log("Create workout pressed");
        router.push('/create-workout');
      }}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="plus" size={24} color={colors.primary} />
    </Pressable>
  );

  const renderWorkout = ({ item }: { item: Workout }) => (
    <Pressable
      style={styles.workoutCard}
      onPress={() => {
        console.log(`Starting workout: ${item.name}`);
        router.push(`/workout/${item.id}`);
      }}
    >
      <View style={styles.workoutHeader}>
        <Text style={styles.workoutTitle}>{item.name}</Text>
        <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) }]}>
          <Text style={styles.difficultyText}>{item.difficulty}</Text>
        </View>
      </View>
      
      {item.description && (
        <Text style={styles.workoutDescription} numberOfLines={2}>
          {item.description}
        </Text>
      )}
      
      <View style={styles.workoutStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.exercises.length}</Text>
          <Text style={styles.statLabel}>Exercises</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.estimatedDuration}</Text>
          <Text style={styles.statLabel}>Minutes</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {item.exercises.reduce((total, ex) => total + ex.sets, 0)}
          </Text>
          <Text style={styles.statLabel}>Total Sets</Text>
        </View>
      </View>
      
      <View style={styles.workoutFooter}>
        <View style={styles.categoryTag}>
          <Text style={styles.categoryTagText}>{item.category}</Text>
        </View>
        <Pressable style={styles.startButton}>
          <Text style={styles.startButtonText}>Start Workout</Text>
        </Pressable>
      </View>
    </Pressable>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <IconSymbol name="dumbbell" size={48} color={colors.textSecondary} />
      <Text style={styles.emptyText}>
        No workouts available in this category
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Workouts",
          headerRight: renderHeaderRight,
          headerStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
        }}
      />
      
      <View style={styles.content}>
        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            {categories.map((category) => (
              <Pressable
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.categoryChipActive
                ]}
                onPress={() => {
                  console.log(`Selected workout category: ${category}`);
                  setSelectedCategory(category);
                }}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive
                ]}>
                  {category}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Workouts List */}
        <FlatList
          data={filteredWorkouts}
          renderItem={renderWorkout}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.workoutsList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
        />
      </View>
    </View>
  );
}
