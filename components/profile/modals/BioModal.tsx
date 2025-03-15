import React from 'react';
import { TextInput } from 'react-native';
import { Dialog, Button } from 'react-native-paper';
import styles from '../../styles/profileStyles';

interface BioModalProps {
  visible: boolean;
  onDismiss: () => void;
  bio: string;
  onBioChange: (text: string) => void;
  onSave: () => void;
}

export const BioModal: React.FC<BioModalProps> = ({
  visible,
  onDismiss,
  bio,
  onBioChange,
  onSave,
}) => {
  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <Dialog.Title>Edit Bio</Dialog.Title>
      <Dialog.Content>
        <TextInput
          value={bio}
          onChangeText={onBioChange}
          placeholder="Write something about yourself..."
          multiline
          numberOfLines={4}
          style={styles.bioInput}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss}>Cancel</Button>
        <Button onPress={onSave}>Save</Button>
      </Dialog.Actions>
    </Dialog>
  );
}; 