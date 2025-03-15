import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { SelectBox } from '../../ui/SelectBox';
import styles from '../../styles/profileStyles';
import { interestOptions } from '../../../utils/constants/profileOptions';

interface InterestsSectionProps {
  user: {
    athleticInterests: string[];
    richerInterests: string[];
    smarterInterests: string[];
  };
  isFocus: boolean;
  onInterestsSelect: (category: string, interests: string[]) => void;
}

export const InterestsSection: React.FC<InterestsSectionProps> = ({
  user,
  isFocus,
  onInterestsSelect,
}) => {
  const renderInterestDropdown = (category: string, options: string[], values: string[]) => (
    <View style={{ marginTop: 16 }}>
      <SelectBox
        label={`${category.charAt(0).toUpperCase() + category.slice(1)} Interests`}
        value={values}
        options={options.map(interest => ({ label: interest, value: interest }))}
        onChange={(newValues) => onInterestsSelect(category, newValues as string[])}
        placeholder={`Select ${category.toLowerCase()} interests`}
        multiple={true}
        maxSelections={3}
        style={{ marginBottom: 16 }}
      />
    </View>
  );

  return (
    <View style={styles.personalitySection}>
      {renderInterestDropdown('athletic', interestOptions.athletic, user.athleticInterests)}
      {renderInterestDropdown('richer', interestOptions.richer, user.richerInterests)}
      {renderInterestDropdown('smarter', interestOptions.smarter, user.smarterInterests)}
    </View>
  );
}; 