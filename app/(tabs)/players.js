import { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Text, Surface, Avatar, Searchbar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import styles from '../../components/styles/profileStyles';
import { ProfileView } from '../../components/profile/ProfileView';

// Sample data for players
export const samplePlayers = [
  {
    id: '1',
    name: 'Alex Chen',
    avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    tokenBalance: 3500,
    holderLevel: 'Diamond',
    location: {
      country: 'United States',
      state: 'California',
      city: 'San Francisco',
    },
    personalityType: 'INTJ - Architect',
    visionaryOrIntegrator: 'Visionary',
    visionaryScore: '85',
    humanDesignType: 'Generator',
    athleticInterests: ['Basketball', 'Rock Climbing', 'Surfing'],
    richerInterests: ['Cryptocurrency', 'Angel Investing', 'Web3'],
    smarterInterests: ['Artificial Intelligence', 'Quantum Computing'],
    firstYearGoal: 'Launch a successful AI startup',
    gender: 'male',
    measurementSystem: 'metric',
    weight: '75',
    height: '180',
    bodyFat: '12',
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    tokenBalance: 4200,
    holderLevel: 'Diamond',
    location: {
      country: 'United States',
      state: 'Texas',
      city: 'Austin',
    },
    personalityType: 'ENTJ - Commander',
    visionaryOrIntegrator: 'Visionary',
    visionaryScore: '92',
    humanDesignType: 'Manifestor',
    athleticInterests: ['CrossFit', 'Weight Training', 'Boxing'],
    richerInterests: ['Real Estate', 'Venture Capital', 'DeFi'],
    smarterInterests: ['Machine Learning', 'Robotics'],
    firstYearGoal: 'Scale my tech consulting business to 7 figures',
    gender: 'male',
    measurementSystem: 'imperial',
    weight: '185',
    height: '5\'11"',
    bodyFat: '10',
  },
  {
    id: '3',
    name: 'David Kim',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    tokenBalance: 3100,
    holderLevel: 'Platinum',
    location: {
      country: 'United States',
      state: 'New York',
      city: 'New York City',
    },
    personalityType: 'INTP - Logician',
    visionaryOrIntegrator: 'Integrator',
    integratorScore: '88',
    humanDesignType: 'Projector',
    athleticInterests: ['Tennis', 'Golf', 'Swimming'],
    richerInterests: ['Stock Market', 'NFTs', 'Private Equity'],
    smarterInterests: ['Data Science', 'Psychology'],
    firstYearGoal: 'Build a quantitative trading system',
    gender: 'male',
    measurementSystem: 'metric',
    weight: '70',
    height: '175',
    bodyFat: '14',
  },
  {
    id: '4',
    name: 'Michael Foster',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    tokenBalance: 2900,
    holderLevel: 'Gold',
    location: {
      country: 'United States',
      state: 'Florida',
      city: 'Miami',
    },
    personalityType: 'ENFJ - Protagonist',
    visionaryOrIntegrator: 'Visionary',
    visionaryScore: '78',
    humanDesignType: 'Manifesting Generator',
    athleticInterests: ['Martial Arts', 'Running', 'Yoga'],
    richerInterests: ['Business Development', 'Entrepreneurship', 'Web3'],
    smarterInterests: ['Neuroscience', 'Philosophy'],
    firstYearGoal: 'Launch a wellness tech platform',
    gender: 'male',
    measurementSystem: 'imperial',
    weight: '175',
    height: '6\'0"',
    bodyFat: '11',
  },
  {
    id: '5',
    name: 'James Wilson',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
    tokenBalance: 3800,
    holderLevel: 'Diamond',
    location: {
      country: 'United States',
      state: 'Washington',
      city: 'Seattle',
    },
    personalityType: 'ISTP - Virtuoso',
    visionaryOrIntegrator: 'Integrator',
    integratorScore: '95',
    humanDesignType: 'Generator',
    athleticInterests: ['Hiking', 'Mountain Biking', 'Skiing'],
    richerInterests: ['Angel Investing', 'Blockchain', 'Real Estate'],
    smarterInterests: ['Space Technology', 'Biotechnology'],
    firstYearGoal: 'Develop a breakthrough clean energy solution',
    gender: 'male',
    measurementSystem: 'metric',
    weight: '82',
    height: '185',
    bodyFat: '13',
  }
];

export default function Players() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const router = useRouter();

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredPlayers = samplePlayers.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlayerPress = (player) => {
    setSelectedPlayer(player);
    router.push({
      pathname: '/playerProfile',
      params: { playerId: player.id }
    });
  };

  const handleScroll = (event) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const shadowOpacity = scrollOffset > 0 ? 0.4 : 0;

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
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {filteredPlayers.map((player) => (
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
                  source={{ uri: player.avatarUrl }}
                  style={{ marginRight: 16 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#fff', marginBottom: 4 }}>
                    {player.name}
                  </Text>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    {[player.location.city, player.location.country].filter(Boolean).join(', ')}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ color: '#fff', marginBottom: 4 }}>
                    {player.tokenBalance}
                  </Text>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    {player.holderLevel}
                  </Text>
                </View>
              </View>
              
              <View style={{ flexDirection: 'row', marginTop: 16, flexWrap: 'wrap', gap: 8 }}>
                {player.athleticInterests.slice(0, 2).map((interest, index) => (
                  <Surface 
                    key={index} 
                    style={[
                      styles.interestTag,
                      { backgroundColor: 'rgba(0, 122, 255, 0.15)' }
                    ]}
                  >
                    <Text style={{ color: '#007AFF' }}>{interest}</Text>
                  </Surface>
                ))}
                {player.athleticInterests.length > 2 && (
                  <Surface 
                    style={[
                      styles.interestTag,
                      { backgroundColor: 'rgba(0, 122, 255, 0.15)' }
                    ]}
                  >
                    <Text style={{ color: '#007AFF' }}>
                      +{player.athleticInterests.length - 2}
                    </Text>
                  </Surface>
                )}
              </View>
            </Surface>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
} 