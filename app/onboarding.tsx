import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet, SafeAreaView, Text, Button, Alert, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { OnboardingData, ONBOARDING_STEPS } from '../types/onboarding';
import Step1BasicInfo from '../components/onboarding/steps/Step1BasicInfo';
import Step2Location from '../components/onboarding/steps/Step2Location';
import Step3ProfileDetails from '../components/onboarding/steps/Step3ProfileDetails';
import Step4Strengths from '../components/onboarding/steps/Step4Strengths';
import Step5FocusAreas from '../components/onboarding/steps/Step5FocusAreas';
import ProgressIndicator from '../components/onboarding/ProgressIndicator';

// Define the key for AsyncStorage (should match _layout.js)
const ONBOARDING_STORAGE_KEY = 'hasCompletedOnboarding';
const { width: screenWidth } = Dimensions.get('window'); // Get screen width

const OnboardingScreen = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const previousStepRef = useRef<number | null>(null); // Use ref to track previous step
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

  // --- Animation Values ---
  const opacity = useSharedValue(0); // Start with opacity 0 for initial fade-in
  const translateX = useSharedValue(0);

  // --- Animation Styles ---
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateX: translateX.value }],
    };
  });

  // --- Animation Trigger --- 
  useEffect(() => {
    const prevStep = previousStepRef.current;
    const animationDuration = 400;
    const easing = Easing.out(Easing.cubic);

    console.log(`Animating Step: ${currentStep}, Previous: ${prevStep}`);

    if (currentStep === 1 && prevStep === null) {
      // Initial Fade-in for Step 1
      translateX.value = 0;
      opacity.value = 0;
      opacity.value = withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) });
    } else if (prevStep !== null && currentStep > prevStep) {
      // Slide in from Right (Next button)
      opacity.value = 1; // Ensure opacity is 1 for slides
      translateX.value = screenWidth; // Start off-screen right
      translateX.value = withTiming(0, { duration: animationDuration, easing });
    } else if (prevStep !== null && currentStep < prevStep) {
      // Slide in from Left (Back button)
      opacity.value = 1;
      translateX.value = -screenWidth; // Start off-screen left
      translateX.value = withTiming(0, { duration: animationDuration, easing });
    }

  }, [currentStep]); // Trigger animation when currentStep changes

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS) {
      previousStepRef.current = currentStep; // Store current before changing
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      previousStepRef.current = currentStep; // Store current before changing
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDataChange = useCallback((data: Partial<OnboardingData>) => {
    setOnboardingData((prevData) => ({
      ...prevData,
      ...data,
    }));
  }, []);

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

  // --- Render Step Component ---
  // Use React.useMemo to avoid re-creating the component on every render unless step changes
  const StepComponent = React.useMemo(() => {
    switch (currentStep) {
      case 1: return <Step1BasicInfo data={onboardingData} onDataChange={handleDataChange} />;
      case 2: return <Step2Location data={onboardingData} onDataChange={handleDataChange} />;
      case 3: return <Step3ProfileDetails data={onboardingData} onDataChange={handleDataChange} />;
      case 4: return <Step4Strengths data={onboardingData} onDataChange={handleDataChange} />;
      case 5: return <Step5FocusAreas data={onboardingData} onDataChange={handleDataChange} />;
      default: return null;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, onboardingData, handleDataChange]); // Dependencies - include data and stable callback

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ProgressIndicator currentStep={currentStep} totalSteps={ONBOARDING_STEPS} />
        <View style={styles.stepContainer}>
          {/* Apply animation to a wrapper around the step component */}
          <Animated.View style={[styles.animatedWrapper, animatedStyle]}>
             {StepComponent} 
          </Animated.View>
        </View>
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
    // padding: 20, // Padding removed from container to allow full width animation
    justifyContent: 'space-between',
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Center step content for placeholders
    overflow: 'hidden', // Hide content sliding outside the container
    padding: 20, // Add padding here instead of the main container
  },
  animatedWrapper: {
    width: '100%', // Ensure wrapper takes full width inside padding
    alignItems: 'center', // Center step content within the wrapper
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 20, // Add horizontal padding
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default OnboardingScreen; 