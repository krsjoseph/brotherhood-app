import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, Button, Alert } from 'react-native';
import { OnboardingData, ONBOARDING_STEPS } from './Onboarding.types';
import Step1BasicInfo from './steps/Step1BasicInfo';
import Step2Location from './steps/Step2Location';
import Step3ProfileDetails from './steps/Step3ProfileDetails';
import Step4Strengths from './steps/Step4Strengths';
import Step5FocusAreas from './steps/Step5FocusAreas';
import ProgressIndicator from './components/ProgressIndicator';

const OnboardingScreen = () => {
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

  const handleComplete = () => {
    console.log('Onboarding Complete. Data:', onboardingData);
    // TODO: Send data to API
    Alert.alert('Onboarding Complete', 'User data captured. Check console log.');
    // TODO: Navigate to the main app screen
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