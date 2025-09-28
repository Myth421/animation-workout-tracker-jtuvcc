
import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Text, 
  Pressable,
  Dimensions 
} from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { WorkoutProgress } from '@/types/workout';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  statCardFull: {
    width: '100%',
  },
  statIcon: {
    marginBottom: 12,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  chartContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  doughnutContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  doughnut: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 20,
    borderColor: colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  doughnutProgress: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 20,
    borderColor: 'transparent',
  },
  doughnutCenter: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doughnutValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  doughnutLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  weeklyChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 100,
    marginBottom: 10,
  },
  dayBar: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 4,
    width: 30,
    minHeight: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dayBarActive: {
    backgroundColor: colors.primary,
  },
  dayLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  achievementsContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  achievementCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  timeFilters: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  filterTextActive: {
    color: colors.card,
  },
  headerButtonContainer: {
    padding: 6,
  },
});

// Mock data
const mockProgress: WorkoutProgress = {
  totalWorkouts: 24,
  totalDuration: 720, // 12 hours
  currentStreak: 5,
  longestStreak: 12,
  favoriteCategory: 'Strength',
  weeklyGoal: 4,
  weeklyProgress: 3,
};

const weeklyData = [
  { day: 'Mon', workouts: 1 },
  { day: 'Tue', workouts: 0 },
  { day: 'Wed', workouts: 1 },
  { day: 'Thu', workouts: 0 },
  { day: 'Fri', workouts: 1 },
  { day: 'Sat', workouts: 0 },
  { day: 'Sun', workouts: 0 },
];

const achievements = [
  {
    id: '1',
    title: 'First Workout',
    description: 'Completed your first workout',
    icon: '🎉',
    unlocked: true,
  },
  {
    id: '2',
    title: 'Week Warrior',
    description: 'Completed 7 workouts in a week',
    icon: '🔥',
    unlocked: true,
  },
  {
    id: '3',
    title: 'Consistency King',
    description: 'Maintained a 10-day streak',
    icon: '👑',
    unlocked: false,
  },
  {
    id: '4',
    title: 'Century Club',
    description: 'Completed 100 workouts',
    icon: '💯',
    unlocked: false,
  },
];

export default function ProgressScreen() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'year'>('week');

  const weeklyProgressPercentage = (mockProgress.weeklyProgress / mockProgress.weeklyGoal) * 100;
  const maxWorkouts = Math.max(...weeklyData.map(d => d.workouts), 1);

  const renderHeaderRight = () => (
    <Pressable 
      onPress={() => {
        console.log("Export progress");
      }}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="square.and.arrow.up" size={24} color={colors.primary} />
    </Pressable>
  );

  const DoughnutChart = ({ percentage, value, label }: { percentage: number, value: string, label: string }) => {
    const circumference = 2 * Math.PI * 40; // radius = 40 (60 - 20/2)
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <View style={styles.doughnutContainer}>
        <View style={styles.doughnut}>
          <View 
            style={[
              styles.doughnutProgress,
              {
                borderTopColor: colors.primary,
                borderRightColor: percentage > 25 ? colors.primary : 'transparent',
                borderBottomColor: percentage > 50 ? colors.primary : 'transparent',
                borderLeftColor: percentage > 75 ? colors.primary : 'transparent',
                transform: [{ rotate: '-90deg' }],
              }
            ]} 
          />
          <View style={styles.doughnutCenter}>
            <Text style={styles.doughnutValue}>{value}</Text>
            <Text style={styles.doughnutLabel}>{label}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Progress",
          headerRight: renderHeaderRight,
          headerStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
        }}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Time Filters */}
        <View style={styles.timeFilters}>
          {(['week', 'month', 'year'] as const).map((timeframe) => (
            <Pressable
              key={timeframe}
              style={[
                styles.filterButton,
                selectedTimeframe === timeframe && styles.filterButtonActive
              ]}
              onPress={() => {
                console.log(`Selected timeframe: ${timeframe}`);
                setSelectedTimeframe(timeframe);
              }}
            >
              <Text style={[
                styles.filterText,
                selectedTimeframe === timeframe && styles.filterTextActive
              ]}>
                {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <IconSymbol name="dumbbell" size={24} color={colors.primary} />
            </View>
            <Text style={styles.statValue}>{mockProgress.totalWorkouts}</Text>
            <Text style={styles.statLabel}>Total Workouts</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <IconSymbol name="clock" size={24} color={colors.accent} />
            </View>
            <Text style={styles.statValue}>{Math.round(mockProgress.totalDuration / 60)}h</Text>
            <Text style={styles.statLabel}>Time Trained</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <IconSymbol name="flame" size={24} color={colors.error} />
            </View>
            <Text style={styles.statValue}>{mockProgress.currentStreak}</Text>
            <Text style={styles.statLabel}>Current Streak</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <IconSymbol name="trophy" size={24} color={colors.success} />
            </View>
            <Text style={styles.statValue}>{mockProgress.longestStreak}</Text>
            <Text style={styles.statLabel}>Best Streak</Text>
          </View>
        </View>

        {/* Weekly Goal Progress */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Weekly Goal Progress</Text>
          <DoughnutChart 
            percentage={weeklyProgressPercentage}
            value={`${mockProgress.weeklyProgress}/${mockProgress.weeklyGoal}`}
            label="Workouts"
          />
        </View>

        {/* Weekly Activity Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>This Week&apos;s Activity</Text>
          <View style={styles.weeklyChart}>
            {weeklyData.map((day, index) => (
              <View key={index} style={{ alignItems: 'center' }}>
                <View 
                  style={[
                    styles.dayBar,
                    day.workouts > 0 && styles.dayBarActive,
                    { height: Math.max((day.workouts / maxWorkouts) * 80, 10) }
                  ]} 
                />
                <Text style={styles.dayLabel}>{day.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsContainer}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          {achievements.map((achievement) => (
            <View 
              key={achievement.id} 
              style={[
                styles.achievementCard,
                !achievement.unlocked && { opacity: 0.5 }
              ]}
            >
              <View style={styles.achievementIcon}>
                <Text style={{ fontSize: 24 }}>{achievement.icon}</Text>
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
              </View>
              {achievement.unlocked && (
                <IconSymbol name="checkmark.circle.fill" size={24} color={colors.success} />
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
