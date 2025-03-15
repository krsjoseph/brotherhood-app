import React from 'react';
import { View, TextInput } from 'react-native';
import { Text } from 'react-native-paper';
import styles from '../../styles/profileStyles';

interface GoalsSectionProps {
  user: {
    firstYearGoal?: string;
    freedomTarget?: string;
    biggerPicture?: string;
  };
  onGoalChange: (field: string, value: string) => void;
}

export const GoalsSection: React.FC<GoalsSectionProps> = ({
  user,
  onGoalChange,
}) => {
  return (
    <View style={styles.personalitySection}>
      <Text style={[styles.sectionTitle, { marginBottom: 24 }]}>Goals</Text>

      <View style={styles.goalField}>
        <Text style={[styles.listItemTitle, { marginBottom: 8 }]}>
          What are you going to achieve by the end of your first year?
        </Text>
        <TextInput
          style={[styles.bioInput, { height: 120 }]}
          value={user.firstYearGoal}
          onChangeText={(text) => onGoalChange('firstYearGoal', text)}
          placeholder="What are you going to achieve by the end of your first year?"
          placeholderTextColor="rgba(255, 255, 255, 0.4)"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      <View style={[styles.goalField, { marginTop: 24 }]}>
        <Text style={[styles.listItemTitle, { marginBottom: 8 }]}>
          What is your Freedom Target (4 years)?
        </Text>
        <TextInput
          style={[styles.bioInput, { height: 120 }]}
          value={user.freedomTarget}
          onChangeText={(text) => onGoalChange('freedomTarget', text)}
          placeholder="What is your Freedom Target (4 years)?"
          placeholderTextColor="rgba(255, 255, 255, 0.4)"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      <View style={[styles.goalField, { marginTop: 24 }]}>
        <Text style={[styles.listItemTitle, { marginBottom: 8 }]}>
          What is your Bigger Picture (12 years)?
        </Text>
        <TextInput
          style={[styles.bioInput, { height: 120 }]}
          value={user.biggerPicture}
          onChangeText={(text) => onGoalChange('biggerPicture', text)}
          placeholder="What is your Bigger Picture (12 years)?"
          placeholderTextColor="rgba(255, 255, 255, 0.4)"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>
    </View>
  );
}; 