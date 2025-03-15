import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: 'default' | 'card' | 'primary' | 'secondary' | 'accent';
};

export function ThemedView({ style, lightColor, darkColor, variant = 'default', ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const theme = useColorScheme() ?? 'light';
  
  let bgColor = backgroundColor;
  
  // Apply variant-specific styling
  if (variant === 'card') {
    bgColor = Colors[theme].card;
  } else if (variant === 'primary') {
    bgColor = Colors[theme].primary;
  } else if (variant === 'secondary') {
    bgColor = Colors[theme].secondary;
  } else if (variant === 'accent') {
    bgColor = Colors[theme].accent;
  }

  return <View style={[{ backgroundColor: bgColor }, style]} {...otherProps} />;
}
