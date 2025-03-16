import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import { Text, Surface, Avatar, SegmentedButtons } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeColor } from '../../hooks/useThemeColor';
import { api } from '../../src/services/api/apiService';
import { API_CONFIG } from '../../src/services/api/config';

const TopThreeItem = ({ rank, username, full_name, points, avatar_url }) => {
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
      {avatar_url ? (
        <Avatar.Image 
          size={rank === 1 ? 80 : 60} 
          source={{ uri: avatar_url }}
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
      }]}>{full_name || username}</Text>
      <Text style={[styles.topThreeScore, { 
        fontFamily: 'Inter_400Regular',
        color: iconColor,
        fontSize: rank === 1 ? 15 : 13,
      }]}>{points.toLocaleString()} pts</Text>
    </View>
  );
};

const LeaderboardItem = ({ rank, username, full_name, points, avatar_url }) => {
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
        {avatar_url ? (
          <Avatar.Image 
            size={40} 
            source={{ uri: avatar_url }}
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
          }]}>{full_name || username}</Text>
          <Text style={[styles.score, { 
            fontFamily: 'Inter_400Regular', 
            color: iconColor,
            fontSize: 13,
          }]}>{points.toLocaleString()} pts</Text>
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
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total_users: 0,
    total_pages: 0,
    current_page: 1,
    limit: 10,
    has_more: false
  });

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

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        type: 'points',
        limit: '20',
        page: '1',
      });

      // if (category !== 'overall') {
      //   params.append('strength', category);
      // }

      // if (subCategory !== 'overall') {
      //   params.append('working_on', subCategory);
      // }

      const { data } = await api.get(`${API_CONFIG.endpoints.leaderboard.list}?${params}`);
      console.log(data);
      setLeaderboardData(data.leaderboard);
      setPagination(data.pagination);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError('Failed to load leaderboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [category, subCategory]);

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

  if (error) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
        <View style={[styles.container, styles.centerContent]}>
          <Text style={{ color: textColor }}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <View style={styles.container}>
        <ScrollView>
          {/* Header with Category Selection */}
          {/* <View style={styles.header}>
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
          </View> */}

          {/* Sub-category Selection */}
          {/* <View style={styles.subCategoryWrapper}>
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
          </View> */}

          {loading ? (
            <View style={[styles.centerContent, { paddingVertical: 40 }]}>
              <ActivityIndicator size="large" color={primaryColor} />
            </View>
          ) : (
            <>
              {/* Top 3 Section */}
              <View style={styles.topThreeContainer}>
                <View style={styles.topThreeRow}>
                  {leaderboardData.slice(0, 3).map((item) => (
                    <TopThreeItem key={item.id} {...item} />
                  ))}
                </View>
              </View>

              {/* Remaining List */}
              <View style={styles.listContainer}>
                {leaderboardData.slice(3).map((item) => (
                  <LeaderboardItem key={item.id} {...item} />
                ))}
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, 
  },
  container: {
    flex: 1,
    marginTop: 20
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topThreeContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    marginTop: 20
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