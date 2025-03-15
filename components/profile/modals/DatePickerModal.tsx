import React from 'react';
import { View, Modal, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../../styles/profileStyles';

interface DatePickerModalProps {
  visible: boolean;
  onDismiss: () => void;
  selectedDate: Date;
  onDateChange: (event: any, date?: Date) => void;
}

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  visible,
  onDismiss,
  selectedDate,
  onDateChange,
}) => {
  if (Platform.OS === 'android') {
    if (!visible) return null;
    return (
      <DateTimePicker
        value={selectedDate}
        mode="date"
        display="default"
        onChange={onDateChange}
      />
    );
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onDismiss}
    >
      <View style={styles.iosPickerModal}>
        <View style={styles.iosPickerContainer}>
          <View style={styles.iosPickerHeader}>
            <Button onPress={onDismiss}>Cancel</Button>
            <Button onPress={onDismiss}>Done</Button>
          </View>
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="spinner"
            onChange={onDateChange}
            style={styles.iosDatePicker}
            textColor="#000000"
          />
        </View>
      </View>
    </Modal>
  );
}; 