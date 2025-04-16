import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { OnboardingData } from '../../../types/onboarding';

interface Step2Props {
  data: Pick<Partial<OnboardingData>, 'country' | 'state' | 'city'>;
  onDataChange: (data: Partial<OnboardingData>) => void;
  // onNext and onBack are handled by the parent OnboardingScreen
}

const Step2Location: React.FC<Step2Props> = ({ data, onDataChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Location</Text>
      <Text style={styles.subtitle}>Where are you based?</Text>

      <TextInput
        style={styles.input}
        placeholder="Country"
        value={data.country}
        onChangeText={(text) => onDataChange({ country: text })}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="State / Province"
        value={data.state}
        onChangeText={(text) => onDataChange({ state: text })}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={data.city}
        onChangeText={(text) => onDataChange({ city: text })}
        autoCapitalize="words"
      />
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
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});

export default Step2Location; 