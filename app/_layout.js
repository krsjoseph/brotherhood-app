import { Stack, useRouter, useSegments } from 'expo-router';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Define the key for AsyncStorage
const ONBOARDING_STORAGE_KEY = 'hasCompletedOnboarding';

// Create custom theme with our logo-inspired colors
const createTheme = (colorScheme) => {
  const colors = Colors[colorScheme];
  
  return {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: colors.primary,
      secondary: colors.secondary,
      background: colors.background,
      surface: colors.card,
      accent: colors.accent,
      text: colors.text,
      onSurface: colors.text,
      outline: colors.border,
    },
    fonts: {
      displayLarge: { fontFamily: 'Inter_700Bold' },
      displayMedium: { fontFamily: 'Inter_700Bold' },
      displaySmall: { fontFamily: 'Inter_700Bold' },
      
      headlineLarge: { fontFamily: 'Inter_700Bold' },
      headlineMedium: { fontFamily: 'Inter_600SemiBold' },
      headlineSmall: { fontFamily: 'Inter_600SemiBold' },
      
      titleLarge: { fontFamily: 'Inter_600SemiBold' },
      titleMedium: { fontFamily: 'Inter_500Medium' },
      titleSmall: { fontFamily: 'Inter_500Medium' },
      
      labelLarge: { fontFamily: 'Inter_500Medium' },
      labelMedium: { fontFamily: 'Inter_500Medium' },
      labelSmall: { fontFamily: 'Inter_500Medium' },
      
      bodyLarge: { fontFamily: 'Inter_400Regular' },
      bodyMedium: { fontFamily: 'Inter_400Regular' },
      bodySmall: { fontFamily: 'Inter_400Regular' },
    },
  };
};

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = createTheme(colorScheme);
  const router = useRouter();
  const segments = useSegments();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [navigationTarget, setNavigationTarget] = useState(null); // State for navigation target (Removed TS type)

  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Effect to check onboarding status once fonts are loaded/failed
  useEffect(() => {
    if (!fontsLoaded && !fontError) {
      return; // Wait for fonts
    }

    const checkOnboardingStatus = async () => {
      let target = null;
      try {
        const hasCompleted = await AsyncStorage.getItem(ONBOARDING_STORAGE_KEY);
        const inAuthGroup = segments[0] === '(auth)';
        const inOnboardingRoute = segments[0] === 'onboarding';

        console.log('Onboarding check:', { hasCompleted, segments, inAuthGroup, inOnboardingRoute });

        if (hasCompleted !== 'true') {
          if (!inOnboardingRoute && !inAuthGroup) {
            console.log('Setting navigation target: /onboarding');
            target = '/onboarding';
          }
        } else {
          if (inOnboardingRoute || inAuthGroup) {
            console.log('Setting navigation target: /(tabs)');
            target = '/(tabs)'; // Adjust if your main route is different
          }
        }
      } catch (e) {
        console.error('Failed to load onboarding status', e);
        // Decide fallback behavior - maybe force onboarding?
        // target = '/onboarding'; 
      } finally {
        setNavigationTarget(target); // Set the target route (or null)
        setIsCheckingAuth(false); // Mark check as complete
      }
    };

    checkOnboardingStatus();

  }, [fontsLoaded, fontError, segments]); // Rerun only when font status or segments change

  // Effect to perform navigation and hide splash screen AFTER checks are done and layout is ready
  useEffect(() => {
    // Only run if checks are done AND fonts are ready
    if (!isCheckingAuth && (fontsLoaded || fontError)) {
      if (navigationTarget) {
        console.log(`Navigating to ${navigationTarget}`);
        router.replace(navigationTarget);
      }
      // Hide splash screen only when everything is settled
      SplashScreen.hideAsync();
      console.log('Splash screen hidden');
    }
  }, [isCheckingAuth, navigationTarget, fontsLoaded, fontError, router]); // Dependencies

  // Loading state: wait for fonts AND the auth check
  if ((!fontsLoaded && !fontError) || isCheckingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Render the main layout
  console.log('Rendering main Stack layout');
  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="modals" options={{ presentation: 'modal' }} />
        <Stack.Screen name="playerProfile" options={{ presentation: 'modal' }} />
      </Stack>
    </PaperProvider>
  );
}