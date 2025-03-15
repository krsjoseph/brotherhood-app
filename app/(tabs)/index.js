import { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Text, Surface, ProgressBar, IconButton, Button, useTheme } from 'react-native-paper';
import { Link } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

const GoalCard = ({ title, value, icon, targetValue, isCompleted, onToggle }) => {

  const handleToggle = () => {
    onToggle();
  };

  return (
    <Surface style={[styles.goalCard, {
      backgroundColor: isCompleted ? 'rgba(0, 122, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
      borderRadius: 16,
      shadowColor: '#007AFF',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      borderWidth: isCompleted ? 1 : 0,
      borderColor: 'rgba(0, 122, 255, 0.3)',
      overflow: 'hidden',
    }]}>
      <Pressable onPress={handleToggle} style={styles.goalContent}>
        <View style={styles.goalHeader}>
          <MaterialCommunityIcons 
            name={icon} 
            size={24} 
            color={isCompleted ? '#007AFF' : 'rgba(255, 255, 255, 0.7)'} 
          />
          <View style={[styles.toggleButton, isCompleted && styles.toggleButtonActive]}>
            {isCompleted && <MaterialCommunityIcons name="check" size={20} color="#fff" />}
          </View>
        </View>
        <View>
          <Text style={[styles.goalTitle, {
            color: isCompleted ? '#007AFF' : '#fff',
            textDecorationLine: isCompleted ? 'line-through' : 'none',
          }]}>{title}</Text>
          <Text style={[styles.goalTarget, {
            fontFamily: 'Inter_400Regular',
            fontSize: 13,
            color: isCompleted ? 'rgba(0, 122, 255, 0.7)' : 'rgba(255, 255, 255, 0.6)',
            marginTop: 2,
          }]}>{targetValue}</Text>
        </View>
      </Pressable>
    </Surface>
  );
};

const FreedomCard = ({ title, description, isCompleted, onToggle, icon }) => {
  return (
    <Surface style={[styles.freedomCard, {
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      borderRadius: 16,
      shadowColor: '#007AFF',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    }]}>
      <Pressable onPress={onToggle} style={styles.freedomContent}>
        <View style={styles.freedomHeader}>
          <View style={styles.freedomTitleRow}>
            <MaterialCommunityIcons name={icon} size={24} color="rgba(255, 255, 255, 0.7)" />
            <Text style={[styles.freedomTitle, { 
              fontFamily: 'Inter_600SemiBold',
              fontSize: 16,
              color: '#fff',
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
          color: 'rgba(255, 255, 255, 0.7)',
          marginTop: 12,
        }]}>{description}</Text>
      </Pressable>
    </Surface>
  );
};

const QuickAccessButton = React.forwardRef(({ icon, label, onPress, style, ...props }, ref) => {
  return (
    <View style={[styles.quickAccessButtonContainer, style]} ref={ref}>
      <Surface style={[styles.quickAccessButton, {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 16,
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        height: 100,
      }]}>
        <Pressable onPress={onPress} style={styles.quickAccessContent} {...props}>
          <View style={[styles.quickAccessIcon, {
            backgroundColor: 'rgba(0, 122, 255, 0.1)',
            marginBottom: 12,
          }]}>
            <MaterialCommunityIcons name={icon} size={22} color="#007AFF" />
          </View>
          <Text 
            style={[styles.quickAccessLabel, { 
              fontFamily: 'Inter_500Medium',
              fontSize: 14,
              color: '#fff',
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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
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
          <Text style={[styles.sectionTitle, { 
            fontFamily: 'Inter_700Bold',
            fontSize: 24,
            color: '#fff',
          }]}>UNCOM25</Text>
          <Text style={[styles.dateText, { 
            fontFamily: 'Inter_400Regular',
            fontSize: 14,
            color: 'rgba(255, 255, 255, 0.7)',
          }]}>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</Text>
        </View>

        <FreedomCard
          title="Mastermind"
          description="Share your plan for the day in the daily chat & share your end of day review"
          isCompleted={freedoms.mastermind}
          onToggle={() => toggleFreedom('mastermind')}
          icon="brain"
        />

        <FreedomCard
          title="Athletic"
          description="Daily Dense Strength (10 minutes) & Skills & Mobility (10 minutes)"
          isCompleted={freedoms.athletic}
          onToggle={() => toggleFreedom('athletic')}
          icon="dumbbell"
        />

        <FreedomCard
          title="Richer"
          description="1THING each day to increase income (10 minutes) & Publish Everyday (10 minutes)"
          isCompleted={freedoms.richer}
          onToggle={() => toggleFreedom('richer')}
          icon="trending-up"
        />

        <FreedomCard
          title="Smarter"
          description="Brain Abilities (10 minutes) & Relationship of Pure Focus (10 minutes)"
          isCompleted={freedoms.smarter}
          onToggle={() => toggleFreedom('smarter')}
          icon="school"
        />

        <Button 
          mode="contained" 
          style={[styles.submitButton, {
            backgroundColor: '#007AFF',
            borderRadius: 12,
            marginTop: 16,
          }]}
          labelStyle={{ 
            fontFamily: 'Inter_600SemiBold',
            fontSize: 16,
          }}
          onPress={() => {/* Handle submission */}}
        >
          Submit Score
        </Button>
      </View>

      {/* Quick Access Section */}
      <View style={styles.quickAccessGrid}>
        <Link href="/stats" asChild>
          <QuickAccessButton icon="chart-bar" label="My Stats" />
        </Link>
        <Link href="/connection-log" asChild>
          <QuickAccessButton icon="account-group" label="Connection Log" />
        </Link>
        <Link href="/physique-log" asChild>
          <QuickAccessButton icon="weight-lifter" label="Physique Log" />
        </Link>
        <Link href="/calendar" asChild>
          <QuickAccessButton icon="calendar" label="Calendar" />
        </Link>
      </View>

      {/* Help Section */}
      <View style={styles.helpContainer}>
        <Text style={[styles.helpText, { 
          fontFamily: 'Inter_400Regular',
          fontSize: 16,
          color: 'rgba(255, 255, 255, 0.7)',
        }]}>Need Help?</Text>
        <IconButton 
          icon="help-circle-outline" 
          size={24} 
          iconColor="rgba(255, 255, 255, 0.7)"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001F2D',
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
    color: '#fff',
  },
  goalTarget: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.6)',
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
    backgroundColor: '#007AFF',
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
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
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