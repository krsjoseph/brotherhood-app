import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { OnboardingData, FOCUS_AREA_OPTIONS } from '../../../types/onboarding';

interface Step5Props {
  data: Pick<Partial<OnboardingData>, 'focusAreas'>;
  onDataChange: (data: Partial<OnboardingData>) => void;
  // onNext (Complete) and onBack are handled by the parent OnboardingScreen
}

const Step5FocusAreas: React.FC<Step5Props> = ({ data, onDataChange }) => {
  const toggleFocusArea = (focusArea: string) => {
    const currentFocusAreas = data.focusAreas || [];
    const updatedFocusAreas = currentFocusAreas.includes(focusArea)
      ? currentFocusAreas.filter((f) => f !== focusArea)
      : [...currentFocusAreas, focusArea];
    onDataChange({ focusAreas: updatedFocusAreas });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Focus Areas</Text>
      <Text style={styles.subtitle}>What areas are you currently focused on improving? (select all that apply)</Text>

      <View style={styles.optionsContainer}>
        {FOCUS_AREA_OPTIONS.map((focusArea) => {
          const isSelected = data.focusAreas?.includes(focusArea);
          return (
            <TouchableOpacity
              key={focusArea}
              style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
              onPress={() => toggleFocusArea(focusArea)}
            >
              <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                {focusArea}
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
    backgroundColor: '#27ae60', // Example selected color (different from strengths)
    borderColor: '#27ae60',
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

export default Step5FocusAreas; 