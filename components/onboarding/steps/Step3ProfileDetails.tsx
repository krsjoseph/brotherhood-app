import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { OnboardingData } from '../../../types/onboarding';

interface Step3Props {
  data: Pick<Partial<OnboardingData>, 'bio' | 'instagramLink' | 'bookingLink'>;
  onDataChange: (data: Partial<OnboardingData>) => void;
  // onNext and onBack are handled by the parent OnboardingScreen
}

const Step3ProfileDetails: React.FC<Step3Props> = ({ data, onDataChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Details</Text>
      <Text style={styles.subtitle}>Tell us more about you.</Text>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Bio (Tell us a bit about yourself)"
        value={data.bio}
        onChangeText={(text) => onDataChange({ bio: text })}
        multiline
        numberOfLines={4}
        maxLength={250} // Example max length
      />
      <TextInput
        style={styles.input}
        placeholder="Instagram Profile Link (optional)"
        value={data.instagramLink}
        onChangeText={(text) => onDataChange({ instagramLink: text })}
        keyboardType="url"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Booking Link (optional)"
        value={data.bookingLink}
        onChangeText={(text) => onDataChange({ bookingLink: text })}
        keyboardType="url"
        autoCapitalize="none"
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
  textArea: {
    height: 100, // Adjust height for multiline input
    textAlignVertical: 'top', // Start text from the top
    paddingTop: 15,
  },
});

export default Step3ProfileDetails; 