import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useLocalSearchParams, Stack } from 'expo-router';
import { ProfileView } from '../components/profile/ProfileView';
import { samplePlayers } from './(tabs)/players';

export default function PlayerProfile() {
  const { playerId } = useLocalSearchParams();
  const player = samplePlayers.find(p => p.id === playerId);

  if (!player) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#001F2D' }}>
        <Text style={{ color: '#fff' }}>Player not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: "Player Profile",
          headerStyle: {
            backgroundColor: '#001F2D',
          },
          headerTintColor: '#fff',
          headerBackTitle: "Players"
        }} 
      />
      <ProfileView user={player} />
    </>
  );
} 