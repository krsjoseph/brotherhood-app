import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { OnboardingData } from '../../../types/onboarding';

interface Step1Props {
  data: Pick<Partial<OnboardingData>, 'firstName' | 'lastName' | 'profilePictureUri'>;
  onDataChange: (data: Partial<OnboardingData>) => void;
  // onNext: () => void; // Next button is handled by the parent OnboardingScreen
}

const Step1BasicInfo: React.FC<Step1Props> = ({ data, onDataChange }) => {

  const handleSelectPicture = async () => {
    // Request Media Library permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Launch the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Square aspect ratio for profile pictures
      quality: 0.8, // Compress image slightly
    });

    console.log(result); // Log the result for debugging

    if (!result.canceled) {
      // Check if assets array exists and has items
      if (result.assets && result.assets.length > 0) {
        onDataChange({ profilePictureUri: result.assets[0].uri });
      } else {
         Alert.alert('Error', 'Could not get the selected image.');
      }
    } else {
      console.log('Image picker cancelled by user.');
    }
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