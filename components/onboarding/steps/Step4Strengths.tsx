import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { OnboardingData, STRENGTH_OPTIONS } from '../../../types/onboarding';

interface Step4Props {
  data: Pick<Partial<OnboardingData>, 'strengths'>;
  onDataChange: (data: Partial<OnboardingData>) => void;
  // onNext and onBack are handled by the parent OnboardingScreen
}

const Step4Strengths: React.FC<Step4Props> = ({ data, onDataChange }) => {
  const toggleStrength = (strength: string) => {
    const currentStrengths = data.strengths || [];
    const updatedStrengths = currentStrengths.includes(strength)
      ? currentStrengths.filter((s) => s !== strength)
      : [...currentStrengths, strength];
    onDataChange({ strengths: updatedStrengths });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Strengths</Text>
      <Text style={styles.subtitle}>Select the areas where you excel (select all that apply).</Text>

      <View style={styles.optionsContainer}>
        {STRENGTH_OPTIONS.map((strength) => {
          const isSelected = data.strengths?.includes(strength);
          return (
            <TouchableOpacity
              key={strength}
              style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
              onPress={() => toggleStrength(strength)}
            >
              <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                {strength}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
       {/* Navigation buttons are in the parent component */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#3498db', // Example selected color
    borderColor: '#3498db',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  optionTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Step4Strengths; 