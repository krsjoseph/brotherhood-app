import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface, Avatar, SegmentedButtons } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeColor } from '../../hooks/useThemeColor';

const TopThreeItem = ({ rank, name, score, avatarUrl }) => {
  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
  const iconColor = useThemeColor({}, 'icon');
  const primaryColor = useThemeColor({}, 'primary');

  return (
    <View style={[styles.topThreeItem, rank === 1 && styles.topThreeWinner]}>
      {rank === 1 && (
        <MaterialCommunityIcons 
          name="crown" 
          size={24} 
          color="#FFD700" 
          style={styles.crown} 
        />
      )}
      {avatarUrl ? (
        <Avatar.Image 
          size={rank === 1 ? 80 : 60} 
          source={{ uri: avatarUrl }}
          style={[styles.topThreeAvatar, {
            borderWidth: 2,
            borderColor: rank === 1 ? '#FFD700' : borderColor,
          }]}
        />
      ) : (
        <Avatar.Icon
          size={rank === 1 ? 80 : 60}
          icon={props => <MaterialCommunityIcons name="account" {...props} size={rank === 1 ? 48 : 36} />}
          style={[styles.topThreeAvatar, {
            backgroundColor: primaryColor,
            borderWidth: 2,
            borderColor: rank === 1 ? '#FFD700' : borderColor,
          }]}
        />
      )}
      <Text style={[styles.topThreeName, { 
        fontFamily: 'Inter_600SemiBold',
        fontSize: rank === 1 ? 16 : 14,
        color: textColor,
        letterSpacing: -0.3,
      }]}>{name}</Text>
      <Text style={[styles.topThreeScore, { 
        fontFamily: 'Inter_400Regular',
        color: iconColor,
        fontSize: rank === 1 ? 15 : 13,
      }]}>{score}</Text>
    </View>
  );
};

const LeaderboardItem = ({ rank, name, score, avatarUrl }) => {
  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
  const iconColor = useThemeColor({}, 'icon');
  const primaryColor = useThemeColor({}, 'primary');

  return (
    <Surface style={[styles.leaderboardItem, {
      backgroundColor: cardColor,
      borderRadius: 16,
      marginBottom: 8,
      shadowColor: primaryColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    }]} elevation={1}>
      <View style={styles.leaderboardContent}>
        <Text style={[styles.rank, { 
          fontFamily: 'Inter_600SemiBold', 
          color: iconColor,
          fontSize: 15,
        }]}>#{rank}</Text>
        {avatarUrl ? (
          <Avatar.Image 
            size={40} 
            source={{ uri: avatarUrl }}
            style={[styles.avatar, {
              borderWidth: 2,
              borderColor: borderColor,
            }]}
          />
        ) : (
          <Avatar.Icon
            size={40}
            icon={props => <MaterialCommunityIcons name="account" {...props} size={24} />}
            style={[styles.avatar, { 
              backgroundColor: primaryColor,
              borderWidth: 2,
              borderColor: borderColor,
            }]}
          />
        )}
        <View style={styles.nameContainer}>
          <Text style={[styles.name, { 
            fontFamily: 'Inter_500Medium', 
            color: textColor,
            fontSize: 15,
            letterSpacing: -0.3,
          }]}>{name}</Text>
          <Text style={[styles.score, { 
            fontFamily: 'Inter_400Regular', 
            color: iconColor,
            fontSize: 13,
          }]}>{score}</Text>
        </View>
      </View>
    </Surface>
  );
};

export default function Leaderboard() {
  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
  const iconColor = useThemeColor({}, 'icon');
  const primaryColor = useThemeColor({}, 'primary');

  const [category, setCategory] = useState('athletic');
  const [subCategory, setSubCategory] = useState('overall');

  const athleticCategories = [
    { value: 'overall', label: 'Overall' },
    { value: 'strength', label: 'Strength' },
    { value: 'skills', label: 'Skills' },
    { value: 'speed', label: 'Speed & Power' },
    { value: 'stamina', label: 'Stamina' },
    { value: 'stretch', label: 'Stretch' },
    { value: 'holistics', label: 'Holistics' },
  ];

  const richerCategories = [
    { value: 'mrr', label: 'MRR' },
    { value: 'weekly', label: 'Weekly Cash' },
  ];

  // Updated leaderboard data with real photos and consistent user data
  const leaderboardData = [
    { 
      id: 1, 
      rank: 1, 
      name: 'Marcus Chen', 
      score: '2,850 pts', 
      avatarUrl: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=400&auto=format&fit=crop&q=60' 
    },
    { 
      id: 2, 
      rank: 2, 
      name: 'Alexander Wright', 
      score: '2,720 pts', 
      avatarUrl: 'https://images.unsplash.com/photo-1618088129969-bcb0c051985e?w=400&auto=format&fit=crop&q=60' 
    },
    { 
      id: 3, 
      rank: 3, 
      name: 'David Park', 
      score: '2,680 pts', 
      avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=60' 
    },
    { 
      id: 4, 
      rank: 4, 
      name: 'James Rodriguez', 
      score: '2,550 pts', 
      avatarUrl: 'https://images.unsplash.com/photo-1583864697784-a0efc8379f70?w=400&auto=format&fit=crop&q=60' 
    },
    { 
      id: 5, 
      rank: 5, 
      name: 'Thomas Weber', 
      score: '2,480 pts', 
      avatarUrl: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&auto=format&fit=crop&q=60' 
    },
    { 
      id: 6, 
      rank: 6, 
      name: 'Michael Zhang', 
      score: '2,420 pts', 
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60' 
    },
    { 
      id: 7, 
      rank: 7, 
      name: 'Ryan Patel', 
      score: '2,380 pts', 
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60' 
    },
    { 
      id: 8, 
      rank: 8, 
      name: 'Daniel Anderson', 
      score: '2,340 pts', 
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=60' 
    },
    { 
      id: 9, 
      rank: 9, 
      name: 'Lucas Silva', 
      score: '2,290 pts', 
      avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&auto=format&fit=crop&q=60' 
    },
    { 
      id: 10, 
      rank: 10, 
      name: 'Erik Larsson', 
      score: '2,250 pts', 
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60' 
    }
  ];

  const topThree = leaderboardData.slice(0, 3);
  const remainingList = leaderboardData.slice(3);

  const renderSegmentedButton = (buttons, value, onValueChange, style) => (
    <SegmentedButtons
      value={value}
      onValueChange={onValueChange}
      buttons={buttons.map(button => ({
        ...button,
        style: {
          flex: 1,
          justifyContent: 'center',
          minHeight: 52,
        },
        labelStyle: {
          fontFamily: 'Inter_500Medium',
          fontSize: 17,
          color: button.value === value ? textColor : iconColor,
          lineHeight: 22,
        },
      }))}
      style={[{
        backgroundColor: cardColor,
        borderRadius: 100,
      }, style]}
      theme={{
        colors: {
          secondaryContainer: 'transparent',
          onSecondaryContainer: textColor,
          primary: primaryColor,
          outline: 'transparent',
        },
      }}
    />
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      {/* Header with Category Selection */}
      <View style={styles.header}>
        <View style={styles.mainTabContainer}>
          {renderSegmentedButton(
            [
              { value: 'athletic', label: 'Athletic' },
              { value: 'richer', label: 'Richer' },
            ],
            category,
            setCategory,
            {
              backgroundColor: cardColor,
              shadowColor: primaryColor,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }
          )}
        </View>
      </View>

      {/* Sub-category Selection */}
      <View style={styles.subCategoryWrapper}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.subCategoryContainer}
          contentContainerStyle={styles.subCategoryContent}
        >
          {renderSegmentedButton(
            category === 'athletic' ? athleticCategories : richerCategories,
            subCategory,
            setSubCategory,
            {
              backgroundColor: cardColor,
              shadowColor: primaryColor,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }
          )}
        </ScrollView>
      </View>

      {/* Top 3 Section */}
      <View style={styles.topThreeContainer}>
        <View style={styles.topThreeRow}>
          {topThree.map((item) => (
            <TopThreeItem key={item.id} {...item} />
          ))}
        </View>
      </View>

      {/* Remaining List */}
      <View style={styles.listContainer}>
        {remainingList.map((item) => (
          <LeaderboardItem key={item.id} {...item} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  mainTabContainer: {
    marginHorizontal: 16,
  },
  subCategoryWrapper: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  subCategoryContainer: {
    flexGrow: 0,
  },
  subCategoryContent: {
    paddingRight: 16,
  },
  topThreeContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  topThreeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  topThreeItem: {
    alignItems: 'center',
    width: '30%',
  },
  topThreeWinner: {
    marginBottom: -20,
  },
  crown: {
    position: 'absolute',
    top: -20,
    zIndex: 1,
  },
  topThreeAvatar: {
    marginBottom: 8,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  leaderboardItem: {
    overflow: 'hidden',
  },
  leaderboardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
  },
  rank: {
    width: 32,
    textAlign: 'center',
  },
  avatar: {
    marginRight: 0,
  },
  nameContainer: {
    flex: 1,
    gap: 2,
  },
});