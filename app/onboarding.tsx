import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingData, ONBOARDING_STEPS } from '../types/onboarding';
import Step1BasicInfo from '../components/onboarding/steps/Step1BasicInfo';
import Step2Location from '../components/onboarding/steps/Step2Location';
import Step3ProfileDetails from '../components/onboarding/steps/Step3ProfileDetails';
import Step4Strengths from '../components/onboarding/steps/Step4Strengths';
import Step5FocusAreas from '../components/onboarding/steps/Step5FocusAreas';
import ProgressIndicator from '../components/onboarding/ProgressIndicator';

// Define the key for AsyncStorage (should match _layout.js)
const ONBOARDING_STORAGE_KEY = 'hasCompletedOnboarding';

const OnboardingScreen = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({
    firstName: '',
    lastName: '',
    profilePictureUri: null,
    country: '',
    state: '',
    city: '',
    bio: '',
    instagramLink: '',
    bookingLink: '',
    strengths: [],
    focusAreas: [],
  });

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDataChange = (data: Partial<OnboardingData>) => {
    setOnboardingData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  const handleComplete = async () => {
    console.log('Onboarding Complete. Data:', onboardingData);
    // TODO: Send data to API

    try {
      // Set the flag in AsyncStorage
      await AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
      console.log('Onboarding completion flag set.');

      // Navigate to the main app screen (e.g., tabs)
      // Replace ensures the user can't go back to onboarding
      router.replace('/(tabs)'); // Adjust if your main route is different
    } catch (e) {
      console.error('Failed to save onboarding status or navigate', e);
      Alert.alert('Error', 'Could not complete onboarding. Please try again.');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1BasicInfo
            data={{ firstName: onboardingData.firstName, lastName: onboardingData.lastName, profilePictureUri: onboardingData.profilePictureUri }}
            onDataChange={handleDataChange}
          />
        );
      case 2:
        return (
          <Step2Location
            data={{ country: onboardingData.country, state: onboardingData.state, city: onboardingData.city }}
            onDataChange={handleDataChange}
          />
        );
      case 3:
         return (
          <Step3ProfileDetails
            data={{ bio: onboardingData.bio, instagramLink: onboardingData.instagramLink, bookingLink: onboardingData.bookingLink }}
            onDataChange={handleDataChange}
          />
        );
      case 4:
        return (
          <Step4Strengths
            data={{ strengths: onboardingData.strengths }}
            onDataChange={handleDataChange}
          />
        );
      case 5:
        return (
          <Step5FocusAreas
            data={{ focusAreas: onboardingData.focusAreas }}
            onDataChange={handleDataChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ProgressIndicator currentStep={currentStep} totalSteps={ONBOARDING_STEPS} />
        <View style={styles.stepContainer}>{renderStep()}</View>
        <View style={styles.navigationContainer}>
          {currentStep > 1 && <Button title="Back" onPress={handleBack} />}
          <Button
            title={currentStep === ONBOARDING_STEPS ? 'Complete' : 'Next'}
            onPress={handleNext}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Example background color
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Center step content for placeholders
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default OnboardingScreen; 