import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { OnboardingData } from '../../../types/onboarding';

interface Step1Props {
  data: Pick<Partial<OnboardingData>, 'firstName' | 'lastName' | 'profilePictureUri'>;
  onDataChange: (data: Partial<OnboardingData>) => void;
  // onNext: () => void; // Next button is handled by the parent OnboardingScreen
}

const Step1BasicInfo: React.FC<Step1Props> = ({ data, onDataChange }) => {

  const handleSelectPicture = () => {
    // Placeholder for image picker logic
    // In a real app, you would use a library like react-native-image-picker
    console.log('Select Profile Picture pressed');
    // Example: Simulate selecting an image
    onDataChange({ profilePictureUri: 'https://via.placeholder.com/150' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Basic Information</Text>

      <TouchableOpacity style={styles.profilePicContainer} onPress={handleSelectPicture}>
        {data.profilePictureUri ? (
          <Image source={{ uri: data.profilePictureUri }} style={styles.profilePic} />
        ) : (
          <View style={styles.profilePicPlaceholder}>
            <Text style={styles.profilePicPlaceholderText}>+</Text>
          </View>
        )}
        <Text style={styles.profilePicLabel}>Add Profile Picture</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={data.firstName}
        onChangeText={(text) => onDataChange({ firstName: text })}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={data.lastName}
        onChangeText={(text) => onDataChange({ lastName: text })}
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
    marginBottom: 30,
  },
  profilePicContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e0e0',
  },
  profilePicPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicPlaceholderText: {
    fontSize: 40,
    color: '#a0a0a0',
  },
  profilePicLabel: {
    marginTop: 10,
    fontSize: 16,
    color: '#3498db', // Example link color
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

export default Step1BasicInfo; 