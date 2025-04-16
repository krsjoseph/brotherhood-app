import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarForeground, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    // Position at the top if desired, or keep flow within parent
    // position: 'absolute',
    // top: 0, 
    // left: 0,
    // right: 0,
    backgroundColor: '#f5f5f5', // Match parent background or make transparent
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarForeground: {
    height: '100%',
    backgroundColor: '#3498db', // Example progress color
    borderRadius: 4,
  },
});

export default ProgressIndicator; 