
import { Stack, router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";
import { WorkoutProgress } from "@/types/workout";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  quickActionsContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  actionIcon: {
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  progressCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
  },
  headerButtonContainer: {
    padding: 6,
  },
});

// Mock data for demonstration
const mockProgress: WorkoutProgress = {
  totalWorkouts: 24,
  totalDuration: 720, // 12 hours
  currentStreak: 5,
  longestStreak: 12,
  favoriteCategory: 'Strength',
  weeklyGoal: 4,
  weeklyProgress: 3,
};

const quickActions = [
  {
    id: 'start-workout',
    title: 'Start Workout',
    subtitle: 'Begin training',
    icon: 'play.circle.fill',
    route: '/workouts',
    color: colors.primary,
  },
  {
    id: 'exercises',
    title: 'Exercises',
    subtitle: 'Browse library',
    icon: 'list.bullet',
    route: '/exercises',
    color: colors.secondary,
  },
  {
    id: 'progress',
    title: 'Progress',
    subtitle: 'View stats',
    icon: 'chart.line.uptrend.xyaxis',
    route: '/progress',
    color: colors.accent,
  },
  {
    id: 'create-workout',
    title: 'Create Workout',
    subtitle: 'Custom routine',
    icon: 'plus.circle.fill',
    route: '/create-workout',
    color: colors.success,
  },
  {
    id: 'image-generator',
    title: 'AI Images',
    subtitle: 'Generate with AI',
    icon: 'photo.badge.plus',
    route: '/image-generator',
    color: '#FF6B6B',
  },
];

function HomeScreen() {
  const progressPercentage = (mockProgress.weeklyProgress / mockProgress.weeklyGoal) * 100;

  const renderHeaderRight = () => (
    <Pressable 
      onPress={() => {
        console.log("Profile pressed");
        router.push('/profile');
      }}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="person.circle" size={28} color={colors.primary} />
    </Pressable>
  );

  const renderHeaderLeft = () => (
    <Pressable
      onPress={() => {
        console.log("Settings pressed");
      }}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="gear" size={28} color={colors.primary} />
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerRight: renderHeaderRight,
          headerLeft: renderHeaderLeft,
          headerStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
        }}
      />
      <View style={styles.container}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.greeting}>Ready to train?</Text>
            <Text style={styles.subtitle}>Let&apos;s crush your fitness goals today</Text>
          </View>

          {/* Weekly Progress */}
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Weekly Goal</Text>
              <Text style={[styles.statNumber, { fontSize: 16 }]}>
                {mockProgress.weeklyProgress}/{mockProgress.weeklyGoal}
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[styles.progressFill, { width: `${Math.min(progressPercentage, 100)}%` }]} 
              />
            </View>
            <Text style={styles.progressText}>
              {mockProgress.weeklyGoal - mockProgress.weeklyProgress} workouts remaining this week
            </Text>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{mockProgress.totalWorkouts}</Text>
              <Text style={styles.statLabel}>Total{'\n'}Workouts</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{Math.round(mockProgress.totalDuration / 60)}h</Text>
              <Text style={styles.statLabel}>Time{'\n'}Trained</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{mockProgress.currentStreak}</Text>
              <Text style={styles.statLabel}>Current{'\n'}Streak</Text>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsContainer}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionGrid}>
              {quickActions.map((action) => (
                <Pressable
                  key={action.id}
                  style={styles.actionCard}
                  onPress={() => {
                    console.log(`Navigating to ${action.route}`);
                    router.push(action.route as any);
                  }}
                >
                  <View style={styles.actionIcon}>
                    <IconSymbol 
                      name={action.icon as any} 
                      size={32} 
                      color={action.color} 
                    />
                  </View>
                  <Text style={styles.actionTitle}>{action.title}</Text>
                  <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export default HomeScreen;
