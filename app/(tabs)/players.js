import { useState, useEffect, useRef } from 'react';
import { View, ScrollView, TouchableOpacity, ActivityIndicator, Image, SafeAreaView } from 'react-native';
import { Text, Searchbar, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import styles from '../../components/styles/profileStyles';
import { ProfileView } from '../../components/profile/ProfileView';
import { api } from '../../src/services/api/apiService';
import { API_CONFIG } from '../../src/services/api/config';
import { useThemeColor } from '../../hooks/useThemeColor';
import { Colors } from '../../constants/Colors';

export default function Players() {
  const [searchQuery, setSearchQuery] = useState('');
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const loadingRef = useRef(false);
  const searchTimeoutRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const router = useRouter();

  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'border');
  const iconColor = useThemeColor({}, 'icon');
  const primaryColor = useThemeColor({}, 'primary');

  useEffect(() => {
    fetchPlayers();
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setPage(1);
      setPlayers([]);
      setHasMore(true);
      fetchPlayers(true);
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const fetchPlayers = async (isSearch = false) => {
    try {
      if (loadingRef.current || (!hasMore && !isSearch)) {
        return;
      }

      loadingRef.current = true;
      isSearch ? setLoading(true) : setLoadingMore(true);

      const currentPage = isSearch ? 1 : page;
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(searchQuery && { search: searchQuery })
      });
      
      const { data } = await api.get(`${API_CONFIG.endpoints.users.list}?${params}`);
      
      const newUsers = data.users.filter(newUser => 
        !players.some(existingUser => existingUser.id === newUser.id)
      );
      
      if (isSearch || currentPage === 1) {
        setPlayers(newUsers);
      } else {
        setPlayers(prev => [...prev, ...newUsers]);
      }
      
      setHasMore(newUsers.length === 10);
      setError(null);
      
      if (!isSearch && newUsers.length > 0) {
        setPage(prev => prev + 1);
      }
    } catch (err) {
      setError('Failed to load players');
      console.error('Error fetching players:', err);
    } finally {
      loadingRef.current = false;
      isSearch ? setLoading(false) : setLoadingMore(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleLoadMore = () => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      if (!loadingRef.current && hasMore && !loading) {
        fetchPlayers();
      }
    }, 150);
  };

  const handlePlayerPress = (player) => {
    setSelectedPlayer(player);
    router.push({
      pathname: '/playerProfile',
      params: { playerId: player.id }
    });
  };

  const handleScroll = (event) => {
    const offset = event.nativeEvent.contentOffset.y;
    setScrollOffset(offset);
    
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    
    if (isCloseToBottom) {
      handleLoadMore();
    }
  };

  const shadowOpacity = scrollOffset > 0 ? 0.4 : 0;

  if (error) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor }]}>
        <Text style={{ color: textColor }}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={{
        backgroundColor: cardColor,
        paddingHorizontal: 16,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        zIndex: 1,
      }}>
        <Searchbar
          placeholder="Search players"
          onChangeText={handleSearch}
          value={searchQuery}
          style={{
            backgroundColor: backgroundColor,
            borderRadius: 12,
            height: 40,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 1,
            borderWidth: 1,
            borderColor: borderColor,
          }}
          iconColor={iconColor}
          inputStyle={{ 
            color: textColor, 
            fontSize: 14,
            height: 40,
            marginLeft: -4,
            marginTop: -10,
          }}
          placeholderTextColor={iconColor}
        />
      </View>

      <ScrollView
        style={[styles.scrollView, { backgroundColor }]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {players.map((player) => (
          <TouchableOpacity
            key={player.id}
            // onPress={() => handlePlayerPress(player)}
          >
            <View 
              style={[
                styles.section, 
                { 
                  backgroundColor: cardColor,
                  borderRadius: 12,
                  marginHorizontal: 16,
                  marginVertical: 8,
                  padding: 16,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: 1,
                }
              ]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Avatar.Image
                  size={60}
                  source={player.avatarUrl ? { uri: player.avatarUrl } : require('../../assets/images/icon.png')}
                  style={{ marginRight: 16 }}
                  theme={{
                    colors: {
                      primary: backgroundColor,
                      surface: backgroundColor
                    }
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: textColor, marginBottom: 4, fontWeight: '600' }}>
                    {`${player.firstName} ${player.lastName}`}
                  </Text>
                  <Text style={{ color: iconColor }}>
                    {[player.city, player.country].filter(Boolean).join(', ')}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ color: textColor, marginBottom: 4 }}>
                    {player.points || 0}
                  </Text>
                  <Text style={{ color: iconColor }}>
                    {player.level}
                  </Text>
                </View>
              </View>
              
              {player.personalGoals && (
                <View style={{ flexDirection: 'row', marginTop: 16, flexWrap: 'wrap', gap: 8 }}>
                  {player.personalGoals.slice(0, 2).map((goal, index) => (
                    <View 
                      key={index} 
                      style={[
                        styles.interestTag,
                        { 
                          backgroundColor: 'rgba(0, 210, 230, 0.15)',
                          borderColor: primaryColor,
                          borderWidth: 1,
                        }
                      ]}
                    >
                      <Text style={{ color: primaryColor }}>{goal}</Text>
                    </View>
                  ))}
                  {player.personalGoals.length > 2 && (
                    <View 
                      style={[
                        styles.interestTag,
                        { 
                          backgroundColor: 'rgba(0, 210, 230, 0.15)',
                          borderColor: primaryColor,
                          borderWidth: 1,
                        }
                      ]}
                    >
                      <Text style={{ color: primaryColor }}>
                        +{player.personalGoals.length - 2}
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
        {(loading || loadingMore) && (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <ActivityIndicator color={primaryColor} />
            <Text style={{ color: iconColor, marginTop: 8 }}>
              {loading ? 'Loading players...' : 'Loading more players...'}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}