import React from 'react';
import { View } from 'react-native';
import { Avatar, Text, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles/profileStyles';

interface ProfileHeaderProps {
  user: {
    name: string;
    avatarUrl: string;
    tokenBalance: number;
    holderLevel: string;
  };
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <Surface style={[styles.headerSurface, {
      shadowColor: '#007AFF',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    }]}>
      <View style={styles.header}>
        {user.avatarUrl ? (
          <Avatar.Image
            size={80}
            source={{ uri: user.avatarUrl }}
            style={[styles.avatar, {
              borderWidth: 2,
              borderColor: 'rgba(255, 255, 255, 0.1)',
            }]}
          />
        ) : (
          <Avatar.Icon
            size={80}
            icon={props => <MaterialCommunityIcons name="account" {...props} size={48} />}
            style={[styles.avatar, {
              backgroundColor: '#007AFF',
              borderWidth: 2,
              borderColor: 'rgba(255, 255, 255, 0.1)',
            }]}
          />
        )}
        <Text variant="headlineSmall" style={[styles.name, { 
          fontFamily: 'Inter_600SemiBold',
          color: '#fff',
          fontSize: 24,
          letterSpacing: -0.5,
        }]}>{user.name}</Text>
        
        <Surface style={[styles.stats, {
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          borderRadius: 16,
        }]}>
          <View style={styles.statItem}>
            <Text variant="titleMedium" style={styles.statLabel}>Token Balance</Text>
            <Text variant="headlineSmall" style={styles.statValue}>{user.tokenBalance}</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]} />
          <View style={styles.statItem}>
            <Text variant="titleMedium" style={styles.statLabel}>Holder Level</Text>
            <Text variant="headlineSmall" style={styles.statValue}>{user.holderLevel}</Text>
          </View>
        </Surface>
      </View>
    </Surface>
  );
}; 