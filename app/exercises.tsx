
import React, { useState } from 'react';
import { Stack, router } from 'expo-router';
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Text, 
  Pressable, 
  TextInput,
  FlatList 
} from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { exerciseDatabase, getExercisesByCategory, searchExercises } from '@/data/exercises';
import { Exercise, ExerciseCategory } from '@/types/workout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  searchInput: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
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
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  exerciseTitle: {
    fontSize: 18,
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
  exerciseDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  muscleGroups: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  muscleTag: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  muscleText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  exerciseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  equipmentText: {
    fontSize: 12,
    color: colors.textSecondary,
    flex: 1,
  },
  viewButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  viewButtonText: {
    fontSize: 12,
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

const categories: (ExerciseCategory | 'All')[] = [
  'All', 'Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core', 'Cardio', 'Full Body'
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

export default function ExercisesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | 'All'>('All');

  const getFilteredExercises = (): Exercise[] => {
    let exercises = exerciseDatabase;

    // Filter by category
    if (selectedCategory !== 'All') {
      exercises = getExercisesByCategory(selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      exercises = searchExercises(searchQuery);
      // If we have a category selected, further filter the search results
      if (selectedCategory !== 'All') {
        exercises = exercises.filter(ex => ex.category === selectedCategory);
      }
    }

    return exercises;
  };

  const filteredExercises = getFilteredExercises();

  const renderHeaderRight = () => (
    <Pressable 
      onPress={() => {
        console.log("Filter pressed");
      }}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="line.3.horizontal.decrease.circle" size={24} color={colors.primary} />
    </Pressable>
  );

  const renderExercise = ({ item }: { item: Exercise }) => (
    <Pressable
      style={styles.exerciseCard}
      onPress={() => {
        console.log(`Opening exercise: ${item.name}`);
        router.push(`/exercise/${item.id}`);
      }}
    >
      <View style={styles.exerciseHeader}>
        <Text style={styles.exerciseTitle}>{item.name}</Text>
        <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) }]}>
          <Text style={styles.difficultyText}>{item.difficulty}</Text>
        </View>
      </View>
      
      <Text style={styles.exerciseDescription} numberOfLines={2}>
        {item.description}
      </Text>
      
      <View style={styles.muscleGroups}>
        {item.muscleGroups.map((muscle, index) => (
          <View key={index} style={styles.muscleTag}>
            <Text style={styles.muscleText}>{muscle}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.exerciseFooter}>
        <Text style={styles.equipmentText}>
          {item.equipment.length > 0 ? item.equipment.join(', ') : 'No equipment needed'}
        </Text>
        <Pressable style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View</Text>
        </Pressable>
      </View>
    </Pressable>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <IconSymbol name="magnifyingglass" size={48} color={colors.textSecondary} />
      <Text style={styles.emptyText}>
        {searchQuery ? `No exercises found for "${searchQuery}"` : 'No exercises available'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Exercises",
          headerRight: renderHeaderRight,
          headerStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
        }}
      />
      
      <View style={styles.content}>
        {/* Search */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search exercises..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

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
                  console.log(`Selected category: ${category}`);
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

        {/* Exercises List */}
        <FlatList
          data={filteredExercises}
          renderItem={renderExercise}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.exercisesList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
        />
      </View>
    </View>
  );
}
