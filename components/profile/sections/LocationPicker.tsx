import React from 'react';
import { View, TouchableOpacity, Platform, Modal } from 'react-native';
import { Text, Surface, Menu, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../../styles/profileStyles';
import { locationOptions } from '../../../utils/constants/profileOptions';

interface LocationPickerProps {
  user: {
    country: string;
    state: string;
    city: string;
    town: string;
  };
  showLocationMenu: string | null;
  showLocationPicker: {
    visible: boolean;
    field: string | null;
    options: string[];
  };
  onLocationPress: (field: string, options: string[]) => void;
  onLocationUpdate: (field: string, value: string) => void;
  onLocationMenuDismiss: () => void;
  onLocationPickerDismiss: () => void;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
  user,
  showLocationMenu,
  showLocationPicker,
  onLocationPress,
  onLocationUpdate,
  onLocationMenuDismiss,
  onLocationPickerDismiss,
}) => {
  const renderLocationField = (field: string, options: string[]) => {
    const label = field.charAt(0).toUpperCase() + field.slice(1);
    const value = user[field as keyof typeof user];

    if (Platform.OS === 'ios') {
      return (
        <TouchableOpacity 
          style={styles.locationItem} 
          onPress={() => onLocationPress(field, options)}
        >
          <Text style={styles.locationLabel}>{label}</Text>
          <Text style={[styles.locationValue, !value && styles.placeholder]} numberOfLines={1} ellipsizeMode="tail">
            {value || `Add ${field.toLowerCase()}`}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <>
        <TouchableOpacity 
          style={styles.locationItem} 
          onPress={() => onLocationPress(field, options)}
        >
          <Text style={styles.locationLabel}>{label}</Text>
          <Text style={[styles.locationValue, !value && styles.placeholder]} numberOfLines={1} ellipsizeMode="tail">
            {value || `Add ${field.toLowerCase()}`}
          </Text>
        </TouchableOpacity>

        <Menu
          visible={showLocationMenu === field}
          onDismiss={onLocationMenuDismiss}
          anchor={<View />}
        >
          {options.map((option) => (
            <Menu.Item
              key={option}
              onPress={() => {
                onLocationUpdate(field, option);
                onLocationMenuDismiss();
              }}
              title={option}
            />
          ))}
        </Menu>
      </>
    );
  };

  return (
    <Surface style={styles.locationSection}>
      <Text style={[styles.listItemTitle, { marginBottom: 16 }]}>Location</Text>
      <View style={styles.locationGrid}>
        {renderLocationField('country', locationOptions.country)}
        {renderLocationField('state', locationOptions.state)}
        {renderLocationField('city', locationOptions.city)}
        {renderLocationField('town', locationOptions.town)}
      </View>

      {Platform.OS === 'ios' && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showLocationPicker.visible}
          onRequestClose={onLocationPickerDismiss}
        >
          <View style={styles.iosPickerModal}>
            <View style={styles.iosPickerContainer}>
              <View style={styles.iosPickerHeader}>
                <Button onPress={onLocationPickerDismiss}>Cancel</Button>
                <Button onPress={onLocationPickerDismiss}>Done</Button>
              </View>
              <View style={styles.iosPickerList}>
                {showLocationPicker.options.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.iosPickerItem}
                    onPress={() => {
                      if (showLocationPicker.field) {
                        onLocationUpdate(showLocationPicker.field, option);
                      }
                      onLocationPickerDismiss();
                    }}
                  >
                    <Text style={[
                      styles.iosPickerItemText,
                      showLocationPicker.field && 
                      user[showLocationPicker.field as keyof typeof user] === option && 
                      styles.iosPickerItemTextSelected
                    ]}>
                      {option}
                    </Text>
                    {showLocationPicker.field && 
                     user[showLocationPicker.field as keyof typeof user] === option && (
                      <MaterialCommunityIcons name="check" size={20} color="#007AFF" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>
      )}
    </Surface>
  );
}; 