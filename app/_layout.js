import { Stack } from 'expo-router';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { useEffect } from 'react';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '../hooks/useColorScheme';
import { Colors } from '../constants/Colors';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

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
  
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modals" options={{ presentation: 'modal' }} />
      </Stack>
    </PaperProvider>
  );
}