import React from 'react';
import { View, TouchableOpacity, Platform, Modal, ScrollView } from 'react-native';
import { Text, Surface, Menu, Chip } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles/profileStyles';

interface SelectBoxProps {
  label: string;
  value: string | string[];
  options: Array<{ label: string; value: string }>;
  placeholder?: string;
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  maxSelections?: number;
  style?: any;
}

export const SelectBox: React.FC<SelectBoxProps> = ({
  label,
  value,
  options,
  placeholder = 'Select an option',
  onChange,
  multiple = false,
  maxSelections = 3,
  style,
}) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [showPicker, setShowPicker] = React.useState(false);

  const values = Array.isArray(value) ? value : [value];
  const selectedOptions = options.filter(option => values.includes(option.value));
  const isAtMax = multiple && selectedOptions.length >= maxSelections;

  const handlePress = () => {
    if (Platform.OS === 'ios') {
      setShowPicker(true);
    } else {
      setShowMenu(true);
    }
  };

  const handleSelect = (selectedValue: string) => {
    if (!multiple) {
      onChange(selectedValue);
      return;
    }

    if (values.includes(selectedValue)) {
      // Always allow deselection
      onChange(values.filter(v => v !== selectedValue));
    } else if (values.length < maxSelections) {
      // Only allow new selections if under the limit
      onChange([...values, selectedValue]);
    }
  };

  const renderValue = () => {
    if (selectedOptions.length === 0) {
      return <Text style={styles.dropdownPlaceholder}>{placeholder}</Text>;
    }

    if (!multiple) {
      return <Text style={styles.dropdownSelectedText}>{selectedOptions[0].label}</Text>;
    }

    return (
      <View style={styles.selectedChips}>
        {selectedOptions.map(option => (
          <Chip
            key={option.value}
            style={styles.selectedChip}
            textStyle={styles.selectedChipText}
            onPress={() => handleSelect(option.value)}
          >
            {option.label}
          </Chip>
        ))}
      </View>
    );
  };

  const renderSelectionLimit = () => {
    if (!multiple) return null;
    return (
      <Text style={[styles.selectionLimit, isAtMax && styles.selectionLimitReached]}>
        {selectedOptions.length}/{maxSelections} selected
      </Text>
    );
  };

  if (Platform.OS === 'ios') {
    return (
      <View style={style}>
        <View style={styles.labelContainer}>
          <Text style={[styles.listItemTitle, { fontSize: 14, color: 'rgba(255, 255, 255, 0.6)', marginBottom: 8 }]}>
            {label}
          </Text>
          {renderSelectionLimit()}
        </View>
        <TouchableOpacity
          onPress={handlePress}
          style={[
            styles.selectValue,
            { borderColor: showPicker ? 'rgba(0, 122, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)' }
          ]}
        >
          {renderValue()}
          <MaterialCommunityIcons
            name="chevron-down"
            size={24}
            color="rgba(255, 255, 255, 0.4)"
          />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showPicker}
          onRequestClose={() => setShowPicker(false)}
        >
          <TouchableOpacity 
            style={styles.iosPickerModal} 
            activeOpacity={1} 
            onPress={() => setShowPicker(false)}
          >
            <TouchableOpacity 
              activeOpacity={1} 
              onPress={e => e.stopPropagation()}
            >
              <Surface style={styles.iosPickerContainer}>
                <View style={styles.iosPickerHeader}>
                  <TouchableOpacity onPress={() => setShowPicker(false)}>
                    <Text style={{ color: '#007AFF' }}>Cancel</Text>
                  </TouchableOpacity>
                  {multiple && (
                    <Text style={[
                      styles.selectionLimit,
                      isAtMax && styles.selectionLimitReached
                    ]}>
                      {selectedOptions.length}/{maxSelections}
                    </Text>
                  )}
                  <TouchableOpacity onPress={() => setShowPicker(false)}>
                    <Text style={{ color: '#007AFF' }}>Done</Text>
                  </TouchableOpacity>
                </View>
                <ScrollView 
                  style={{ maxHeight: 300 }}
                  showsVerticalScrollIndicator={true}
                  bounces={false}
                >
                  {options.map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      style={[
                        styles.iosPickerItem,
                        values.includes(option.value) && { backgroundColor: 'rgba(0, 122, 255, 0.1)' },
                        isAtMax && !values.includes(option.value) && { opacity: 0.5 }
                      ]}
                      onPress={() => {
                        if (!isAtMax || values.includes(option.value)) {
                          handleSelect(option.value);
                          if (!multiple) setShowPicker(false);
                        }
                      }}
                    >
                      <Text style={[
                        styles.iosPickerItemText,
                        values.includes(option.value) && styles.iosPickerItemTextSelected
                      ]}>
                        {option.label}
                      </Text>
                      {values.includes(option.value) && (
                        <MaterialCommunityIcons name="check" size={20} color="#007AFF" />
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </Surface>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }

  return (
    <View style={style}>
      <View style={styles.labelContainer}>
        <Text style={[styles.listItemTitle, { fontSize: 14, color: 'rgba(255, 255, 255, 0.6)', marginBottom: 8 }]}>
          {label}
        </Text>
        {renderSelectionLimit()}
      </View>
      <TouchableOpacity
        onPress={handlePress}
        style={[
          styles.selectValue,
          { borderColor: showMenu ? 'rgba(0, 122, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)' }
        ]}
      >
        {renderValue()}
        <MaterialCommunityIcons
          name="chevron-down"
          size={24}
          color="rgba(255, 255, 255, 0.4)"
        />
      </TouchableOpacity>

      <Menu
        visible={showMenu}
        onDismiss={() => setShowMenu(false)}
        anchor={<View />}
        contentStyle={[styles.menuContent, { maxHeight: 300 }]}
      >
        <ScrollView bounces={false} showsVerticalScrollIndicator={true}>
          {options.map((option) => (
            <Menu.Item
              key={option.value}
              onPress={() => {
                if (!isAtMax || values.includes(option.value)) {
                  handleSelect(option.value);
                  if (!multiple) setShowMenu(false);
                }
              }}
              title={option.label}
              titleStyle={[
                styles.dropdownText,
                values.includes(option.value) && styles.dropdownTextSelected,
                isAtMax && !values.includes(option.value) && { opacity: 0.5 }
              ]}
              style={[
                styles.dropdownItem,
                values.includes(option.value) && styles.dropdownItemSelected
              ]}
              leadingIcon={values.includes(option.value) ? 'check' : undefined}
              disabled={isAtMax && !values.includes(option.value)}
            />
          ))}
        </ScrollView>
      </Menu>
    </View>
  );
}; 