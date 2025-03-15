import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function EditFreedomsModal() {
  return (
    <View style={styles.container}>
      <Text>Edit Freedoms Modal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 