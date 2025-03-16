import { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Text, Surface, ProgressBar, IconButton, Button, useTheme } from 'react-native-paper';
import { Link } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { api } from '../../src/services/api/apiService';
import { getEndpoints } from '../../src/services/api/config';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

const GoalCard = ({ title, value, icon, targetValue, isCompleted, onToggle }) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const handleToggle = () => {
    onToggle();
  };

  return (
    <Surface style={[styles.goalCard, {
      backgroundColor: isCompleted ? `${colors.primary}26` : '#FFFFFF', // 26 is 15% opacity in hex
      borderRadius: 16,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      borderWidth: isCompleted ? 1 : 0,
      borderColor: `${colors.primary}4D`, // 4D is 30% opacity in hex
      overflow: 'hidden',
    }]}>
      <Pressable onPress={handleToggle} style={styles.goalContent}>
        <View style={styles.goalHeader}>
          <MaterialCommunityIcons 
            name={icon} 
            size={24} 
            color={isCompleted ? colors.primary : colors.icon} 
          />
          <View style={[styles.toggleButton, isCompleted && styles.toggleButtonActive]}>
            {isCompleted && <MaterialCommunityIcons name="check" size={20} color="#fff" />}
          </View>
        </View>
        <View>
          <Text style={[styles.goalTitle, {
            color: isCompleted ? colors.primary : colors.text,
            textDecorationLine: isCompleted ? 'line-through' : 'none',
          }]}>{title}</Text>
          <Text style={[styles.goalTarget, {
            fontFamily: 'Inter_400Regular',
            fontSize: 13,
            color: isCompleted ? `${colors.primary}B3` : colors.icon, // B3 is 70% opacity in hex
            marginTop: 2,
          }]}>{targetValue}</Text>
        </View>
      </Pressable>
    </Surface>
  );
};

const FreedomCard = ({ title, description, isCompleted, onToggle, icon }) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  return (
    <Surface style={[styles.freedomCard, {
      backgroundColor: colors.card,
      borderRadius: 16,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    }]}>
      <Pressable onPress={onToggle} style={styles.freedomContent}>
        <View style={styles.freedomHeader}>
          <View style={styles.freedomTitleRow}>
            <MaterialCommunityIcons name={icon} size={24} color={colors.icon} />
            <Text style={[styles.freedomTitle, { 
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: colors.text,
              marginLeft: 12,
            }]}>{title}</Text>
          </View>
          <View style={[styles.toggleButton, isCompleted && styles.toggleButtonActive]}>
            {isCompleted && <MaterialCommunityIcons name="check" size={20} color="#fff" />}
          </View>
        </View>
        <Text style={[styles.freedomDescription, { 
          fontFamily: 'Inter_400Regular',
          fontSize: 14,
          color: colors.icon,
          marginTop: 12,
        }]}>{description}</Text>
      </Pressable>
    </Surface>
  );
};

const QuickAccessButton = React.forwardRef(({ icon, label, onPress, style, ...props }, ref) => {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  return (
    <View style={[styles.quickAccessButtonContainer, style]} ref={ref}>
      <Surface style={[styles.quickAccessButton, {
        backgroundColor: colors.card,
        borderRadius: 16,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        height: 100,
      }]}>
        <Pressable onPress={onPress} style={styles.quickAccessContent} {...props}>
          <View style={[styles.quickAccessIcon, {
            backgroundColor: `${colors.primary}1A`, // 1A is 10% opacity in hex
            marginBottom: 12,
          }]}>
            <MaterialCommunityIcons name={icon} size={22} color={colors.primary} />
          </View>
          <Text 
            style={[styles.quickAccessLabel, { 
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              color: colors.text,
              textAlign: 'center',
            }]}
            numberOfLines={2}
          >{label}</Text>
        </Pressable>
      </Surface>
    </View>
  );
});

export default function Home() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const [freedoms, setFreedoms] = useState({
    mastermind: false,
    athletic: false,
    richer: false,
    smarter: false,
  });
  const [goals, setGoals] = useState({
    income: false,
    benchPress: false,
  });

  const toggleFreedom = (key) => {
    setFreedoms(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleGoal = (key) => {
    setGoals(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={[styles.proContainer, {
          backgroundColor: 'rgba(255, 215, 0, 0.1)',
          borderRadius: 12,
          padding: 8,
        }]}>
          <MaterialCommunityIcons name="lightning-bolt" size={24} color="#FFD700" />
          <Text style={[styles.proText, { 
            fontFamily: 'Inter_700Bold',
            color: '#FFD700',
            marginLeft: 4,
          }]}>PRO</Text>
        </View>
        
      </View>

      {/* Goals Section */}
      <View style={styles.goalsContainer}>
        <GoalCard 
          title="Monthly Income" 
          icon="currency-usd"
          targetValue="$30,000"
          isCompleted={goals.income}
          onToggle={() => toggleGoal('income')}
        />
        <GoalCard 
          title="Bench Press" 
          icon="weight-lifter"
          targetValue="99kg"
          isCompleted={goals.benchPress}
          onToggle={() => toggleGoal('benchPress')}
        />
      </View>

      {/* Freedoms Section */}
      <View style={styles.freedomsContainer}>
        <View style={styles.sectionHeader}>
          <Text style={{ 
            fontFamily: 'Inter_700Bold',
            fontSize: 18,
            color: colors.text,
            marginBottom: 4,
          }}>Your Freedom Goals</Text>
        </View>
        
        <FreedomCard 
          title="Join a Mastermind Group" 
          description="Connect with like-minded entrepreneurs to accelerate growth"
          icon="account-group"
          isCompleted={freedoms.mastermind}
          onToggle={() => toggleFreedom('mastermind')}
        />
        
        <FreedomCard 
          title="Athletic Achievement" 
          description="Complete a marathon or fitness milestone"
          icon="run-fast"
          isCompleted={freedoms.athletic}
          onToggle={() => toggleFreedom('athletic')}
        />
        
        <FreedomCard 
          title="Become 20% Richer" 
          description="Increase your net worth through strategic investments"
          icon="chart-line"
          isCompleted={freedoms.richer}
          onToggle={() => toggleFreedom('richer')}
        />
        
        <FreedomCard 
          title="Learn Something New" 
          description="Master a valuable skill that increases your market value"
          icon="school"
          isCompleted={freedoms.smarter}
          onToggle={() => toggleFreedom('smarter')}
        />
      </View>

      {/* Quick Access Section */}
      <View style={styles.quickAccessGrid}>
        <QuickAccessButton 
          icon="chart-timeline-variant" 
          label="Track Progress" 
          onPress={() => {}} 
        />
        <QuickAccessButton 
          icon="calendar-check" 
          label="Daily Tasks" 
          onPress={() => {}} 
        />
        <QuickAccessButton 
          icon="notebook" 
          label="Journal" 
          onPress={() => {}} 
        />
        <QuickAccessButton 
          icon="account-group" 
          label="Community" 
          onPress={() => {}} 
        />
      </View>

      {/* Help Section */}
      <View style={styles.helpContainer}>
        <Link href="/help" asChild>
          <Button 
            mode="text" 
            icon="help-circle" 
            textColor={colors.primary}
          >
            Need Help?
          </Button>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  proContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  goalCard: {
    width: '48%',
    height: 120,
  },
  goalContent: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
  },
  goalTarget: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    marginTop: 2,
  },
  progressContainer: {
    marginTop: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  freedomsContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  freedomCard: {
    marginBottom: 12,
  },
  freedomContent: {
    padding: 16,
  },
  freedomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  freedomTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  toggleButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#00D2E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#00D2E6',
    borderColor: '#00D2E6',
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  quickAccessButtonContainer: {
    width: '48%',
    marginBottom: 16,
  },
  quickAccessButton: {
    width: '100%',
  },
  quickAccessContent: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  quickAccessIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickAccessLabel: {
    width: '100%',
    paddingHorizontal: 4,
  },
  helpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
});