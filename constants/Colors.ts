/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// Logo-inspired colors
const primaryCyan = '#00D2E6';
const primaryMagenta = '#FF3366';
const secondaryBlue = '#0A7EA4';
const secondaryPurple = '#9966CC';

const tintColorLight = primaryCyan;
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#FFFFFF',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: primaryCyan,
    primary: primaryCyan,
    secondary: primaryMagenta,
    accent: secondaryBlue,
    highlight: secondaryPurple,
    card: '#F7F9FA',
    border: '#E6E8EB',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: primaryCyan,
    secondary: primaryMagenta,
    accent: secondaryBlue,
    highlight: secondaryPurple,
    card: '#1E2021',
    border: '#2A2D2E',
  },
};
