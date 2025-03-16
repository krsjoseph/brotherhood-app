import { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, Surface, Avatar, Searchbar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import styles from '../../components/styles/profileStyles';
import { ProfileView } from '../../components/profile/ProfileView';
import { api } from '../../src/services/api/apiService';
import { API_CONFIG } from '../../src/services/api/config';

export default function Players() {
  const [searchQuery, setSearchQuery] = useState('');
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetchPlayers();
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      setPage(1);
      setPlayers([]);
      fetchPlayers(true);
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  const fetchPlayers = async (isSearch = false) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: isSearch ? 1 : page,
        limit: 10,
        ...(searchQuery && { search: searchQuery })
      });
      
      const { data } = await api.get(`${API_CONFIG.endpoints.users.list}?${params}`);
      
      if (isSearch || page === 1) {
        setPlayers(data.users);
      } else {
        setPlayers(prev => [...prev, ...data.users]);
      }
      
      setHasMore(data.users.length === 10);
      setError(null);
    } catch (err) {
      setError('Failed to load players');
      console.error('Error fetching players:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
      fetchPlayers();
    }
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
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: 'white' }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Surface style={[
        styles.headerSurface, 
        { 
          backgroundColor: '#001F2D',
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(255, 255, 255, 0.1)',
          paddingHorizontal: 16,
          paddingVertical: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: shadowOpacity,
          shadowRadius: 4,
          elevation: scrollOffset > 0 ? 4 : 0,
          zIndex: 1,
        }
      ]}>
        <Searchbar
          placeholder="Search players"
          onChangeText={handleSearch}
          value={searchQuery}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: 12,
            height: 40,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3,
            elevation: 3,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
          }}
          iconColor="rgba(255, 255, 255, 0.6)"
          inputStyle={{ 
            color: '#fff', 
            fontSize: 14,
            height: 40,
            marginLeft: -4,
            marginTop: -10,
          }}
          placeholderTextColor="rgba(255, 255, 255, 0.4)"
        />
      </Surface>

      <ScrollView
        style={styles.scrollView}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {players.map((player) => (
          <TouchableOpacity
            key={player.id}
            onPress={() => handlePlayerPress(player)}
          >
            <Surface 
              style={[
                styles.section, 
                { 
                  marginHorizontal: 16,
                  marginBottom: 16,
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                }
              ]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Avatar.Image
                  size={60}
                  source={{ uri: player.avatarUrl || 'https://via.placeholder.com/60' }}
                  style={{ marginRight: 16 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#fff', marginBottom: 4 }}>
                    {`${player.firstName} ${player.lastName}`}
                  </Text>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    {[player.city, player.country].filter(Boolean).join(', ')}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ color: '#fff', marginBottom: 4 }}>
                    {player.points || 0}
                  </Text>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    {player.level}
                  </Text>
                </View>
              </View>
              
              {player.personalGoals && (
                <View style={{ flexDirection: 'row', marginTop: 16, flexWrap: 'wrap', gap: 8 }}>
                  {player.personalGoals.slice(0, 2).map((goal, index) => (
                    <Surface 
                      key={index} 
                      style={[
                        styles.interestTag,
                        { backgroundColor: 'rgba(0, 122, 255, 0.15)' }
                      ]}
                    >
                      <Text style={{ color: '#007AFF' }}>{goal}</Text>
                    </Surface>
                  ))}
                  {player.personalGoals.length > 2 && (
                    <Surface 
                      style={[
                        styles.interestTag,
                        { backgroundColor: 'rgba(0, 122, 255, 0.15)' }
                      ]}
                    >
                      <Text style={{ color: '#007AFF' }}>
                        +{player.personalGoals.length - 2}
                      </Text>
                    </Surface>
                  )}
                </View>
              )}
            </Surface>
          </TouchableOpacity>
        ))}
        {loading && (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <ActivityIndicator color="white" />
          </View>
        )}
      </ScrollView>
    </View>
  );
}