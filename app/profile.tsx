
import React from 'react';
import { Stack, router } from 'expo-router';
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Text, 
  Pressable 
} from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    color: colors.card,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  menuSection: {
    marginBottom: 30,
  },
  menuItem: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.08)',
    elevation: 2,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  menuArrow: {
    marginLeft: 8,
  },
  logoutButton: {
    backgroundColor: colors.error,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.card,
  },
});

const menuItems = [
  {
    id: 'personal-info',
    title: 'Personal Information',
    subtitle: 'Update your profile details',
    icon: 'person.circle',
    color: colors.primary,
  },
  {
    id: 'preferences',
    title: 'Preferences',
    subtitle: 'Workout settings and goals',
    icon: 'gear',
    color: colors.accent,
  },
  {
    id: 'notifications',
    title: 'Notifications',
    subtitle: 'Manage your alerts',
    icon: 'bell',
    color: colors.secondary,
  },
  {
    id: 'privacy',
    title: 'Privacy & Security',
    subtitle: 'Data and account settings',
    icon: 'lock.shield',
    color: colors.success,
  },
  {
    id: 'help',
    title: 'Help & Support',
    subtitle: 'Get assistance and feedback',
    icon: 'questionmark.circle',
    color: colors.textSecondary,
  },
  {
    id: 'about',
    title: 'About',
    subtitle: 'App version and information',
    icon: 'info.circle',
    color: colors.textSecondary,
  },
];

export default function ProfileScreen() {
  const handleMenuPress = (itemId: string) => {
    console.log(`Menu item pressed: ${itemId}`);
    // Here you would navigate to specific settings screens
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Profile",
          headerStyle: { backgroundColor: colors.background },
          headerShadowVisible: false,
        }}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <Pressable
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleMenuPress(item.id)}
            >
              <View style={[styles.menuIcon, { backgroundColor: `${item.color}20` }]}>
                <IconSymbol name={item.icon as any} size={20} color={item.color} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <View style={styles.menuArrow}>
                <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
              </View>
            </Pressable>
          ))}
        </View>

        {/* Logout Button */}
        <Pressable 
          style={styles.logoutButton}
          onPress={() => {
            console.log("Logout pressed");
            // Handle logout logic here
          }}
        >
          <Text style={styles.logoutText}>Sign Out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
