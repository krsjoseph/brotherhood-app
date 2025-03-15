import React from 'react';
import { View, TextInput } from 'react-native';
import { Text, Surface, SegmentedButtons } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../../styles/profileStyles';

interface NumbersSectionProps {
  user: {
    gender?: string;
    measurementSystem?: string;
    bodyFat?: string;
    weight?: string;
    height?: string;
    yearsWorked?: string;
    weeksPerYear?: string;
    hoursPerWeek?: string;
    netWorth?: string;
    totalDebt?: string;
  };
  onNumbersChange: (field: string, value: string) => void;
}

export const NumbersSection: React.FC<NumbersSectionProps> = ({
  user,
  onNumbersChange,
}) => {
  // Helper function to get measurement labels
  const getMeasurementLabels = () => {
    return user.measurementSystem === 'imperial' 
      ? { weight: 'Weight (lbs)', height: 'Height (ft in)' }
      : { weight: 'Weight (kg)', height: 'Height (cm)' };
  };

  const labels = getMeasurementLabels();

  // Helper function to get button styles
  const getButtonStyle = (value: string, currentValue: string | undefined) => ({
    style: currentValue === value ? styles.segmentedButtonActive : styles.segmentedButtonInactive,
    labelStyle: currentValue === value ? styles.segmentedButtonTextActive : styles.segmentedButtonTextInactive,
  });

  return (
    <View style={styles.personalitySection}>
      <Text style={[styles.sectionTitle, { marginBottom: 24 }]}>The Numbers</Text>

      <Surface style={styles.numberCard}>
        <Text style={[styles.sectionTitle, { fontSize: 20, marginBottom: 16 }]}>
          Muscle & Physique Numbers
        </Text>

        <View style={styles.inputField}>
          <Text style={[styles.listItemTitle, { marginBottom: 8 }]}>
            What's your gender?
            <Text style={{ color: 'rgba(255, 255, 255, 0.4)' }}> Required</Text>
          </Text>
          <SegmentedButtons
            value={user.gender || ''}
            onValueChange={value => onNumbersChange('gender', value)}
            buttons={[
              { 
                value: 'male', 
                label: 'Male',
                ...getButtonStyle('male', user.gender)
              },
              { 
                value: 'female', 
                label: 'Female',
                ...getButtonStyle('female', user.gender)
              },
            ]}
            style={[styles.tabButtons, styles.segmentedButtonsContainer]}
          />
        </View>

        <View style={[styles.inputField, { marginTop: 24 }]}>
          <Text style={[styles.listItemTitle, { marginBottom: 8 }]}>
            Choose your measurement system
            <Text style={{ color: 'rgba(255, 255, 255, 0.4)' }}> Required</Text>
          </Text>
          <SegmentedButtons
            value={user.measurementSystem || ''}
            onValueChange={value => onNumbersChange('measurementSystem', value)}
            buttons={[
              { 
                value: 'imperial', 
                label: 'Imperial',
                ...getButtonStyle('imperial', user.measurementSystem)
              },
              { 
                value: 'metric', 
                label: 'Metric',
                ...getButtonStyle('metric', user.measurementSystem)
              },
            ]}
            style={[styles.tabButtons, styles.segmentedButtonsContainer]}
          />
        </View>

        <View style={[styles.inputField, { marginTop: 24 }]}>
          <Text style={[styles.listItemTitle, { marginBottom: 8 }]}>
            {labels.weight}
          </Text>
          <TextInput
            style={styles.numberInput}
            value={user.weight}
            onChangeText={(text) => onNumbersChange('weight', text)}
            placeholder={`Enter your ${labels.weight.toLowerCase()}`}
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            keyboardType="numeric"
          />
        </View>

        <View style={[styles.inputField, { marginTop: 24 }]}>
          <Text style={[styles.listItemTitle, { marginBottom: 8 }]}>
            {labels.height}
          </Text>
          <TextInput
            style={styles.numberInput}
            value={user.height}
            onChangeText={(text) => onNumbersChange('height', text)}
            placeholder={`Enter your ${labels.height.toLowerCase()}`}
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            keyboardType="numeric"
          />
        </View>

        <View style={[styles.inputField, { marginTop: 24 }]}>
          <Text style={[styles.listItemTitle, { marginBottom: 8 }]}>
            Body Fat (%)
          </Text>
          <TextInput
            style={styles.numberInput}
            value={user.bodyFat}
            onChangeText={(text) => onNumbersChange('bodyFat', text)}
            placeholder="Enter your body fat percentage"
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            keyboardType="numeric"
          />
        </View>
      </Surface>

      <Surface style={[styles.numberCard, { marginTop: 24 }]}>
        <Text style={[styles.sectionTitle, { fontSize: 20, marginBottom: 16 }]}>
          Lifetime Hourly Rate
        </Text>
        <View style={styles.infoBox}>
          <MaterialCommunityIcons name="information-outline" size={20} color="#fff" />
          <Text style={styles.infoText}>
            This information is strictly personal and can only be seen by you
          </Text>
        </View>

        <View style={[styles.inputField, { marginTop: 24 }]}>
          <Text style={[styles.listItemTitle, { marginBottom: 8 }]}>
            Years Worked
          </Text>
          <TextInput
            style={styles.numberInput}
            value={user.yearsWorked}
            onChangeText={(text) => onNumbersChange('yearsWorked', text)}
            placeholder="Enter years worked"
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            keyboardType="numeric"
          />
        </View>

        <View style={[styles.inputField, { marginTop: 24 }]}>
          <Text style={[styles.listItemTitle, { marginBottom: 8 }]}>
            Average Weeks / Year Worked
          </Text>
          <TextInput
            style={styles.numberInput}
            value={user.weeksPerYear}
            onChangeText={(text) => onNumbersChange('weeksPerYear', text)}
            placeholder="Enter average weeks per year"
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            keyboardType="numeric"
          />
        </View>

        <View style={[styles.inputField, { marginTop: 24 }]}>
          <Text style={[styles.listItemTitle, { marginBottom: 8 }]}>
            Average Hours / Week Worked
          </Text>
          <TextInput
            style={styles.numberInput}
            value={user.hoursPerWeek}
            onChangeText={(text) => onNumbersChange('hoursPerWeek', text)}
            placeholder="Enter average hours per week"
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            keyboardType="numeric"
          />
        </View>

        <View style={[styles.inputField, { marginTop: 24 }]}>
          <Text style={[styles.listItemTitle, { marginBottom: 8 }]}>
            Net Worth (numbers only)
          </Text>
          <TextInput
            style={styles.numberInput}
            value={user.netWorth}
            onChangeText={(text) => onNumbersChange('netWorth', text)}
            placeholder="Enter your net worth"
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            keyboardType="numeric"
          />
        </View>

        <View style={[styles.inputField, { marginTop: 24 }]}>
          <Text style={[styles.listItemTitle, { marginBottom: 8 }]}>
            Total Debt (numbers only)
          </Text>
          <TextInput
            style={styles.numberInput}
            value={user.totalDebt}
            onChangeText={(text) => onNumbersChange('totalDebt', text)}
            placeholder="Enter your total debt"
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            keyboardType="numeric"
          />
        </View>
      </Surface>
    </View>
  );
}; 