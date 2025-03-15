import React from 'react';
import { View, ScrollView, useWindowDimensions } from 'react-native';
import { Text, Surface, Divider, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles/profileStyles';

interface IconProps {
  size: number;
  color: string;
}

interface ProfileViewProps {
  user: {
    name: string;
    avatarUrl: string;
    tokenBalance: number;
    holderLevel: string;
    bio?: string;
    location?: {
      country?: string;
      state?: string;
      city?: string;
      town?: string;
    };
    personalityType?: string;
    visionaryOrIntegrator?: string;
    visionaryScore?: string;
    integratorScore?: string;
    humanDesignType?: string;
    humanDesignAuthority?: string;
    humanDesignDefinition?: string;
    humanDesignProfile?: string;
    humanDesignIncarnationCross?: string;
    athleticInterests?: string[];
    richerInterests?: string[];
    smarterInterests?: string[];
    firstYearGoal?: string;
    freedomTarget?: string;
    biggerPicture?: string;
    gender?: string;
    measurementSystem?: string;
    weight?: string;
    height?: string;
    bodyFat?: string;
  };
}

const SectionTitle = ({ title }: { title: string }) => (
  <Text 
    variant="titleLarge" 
    style={{ 
      color: '#fff', 
      marginBottom: 12,
      fontSize: 18,
    }}
  >
    {title}
  </Text>
);

const InfoLabel = ({ text }: { text: string }) => (
  <Text 
    variant="bodyMedium"
    style={{ 
      color: 'rgba(255, 255, 255, 0.6)', 
      marginBottom: 2,
      fontSize: 14,
    }}
  >
    {text}
  </Text>
);

const InfoValue = ({ text }: { text?: string }) => {
  if (!text) return null;
  return (
    <Text 
      variant="bodyLarge"
      style={{ 
        color: '#fff',
        fontSize: 16,
      }}
    >
      {text}
    </Text>
  );
};

export const ProfileView: React.FC<ProfileViewProps> = ({ user }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={{ alignItems: 'center', padding: 20 }}>
        <Avatar.Image
          size={80}
          source={{ uri: user.avatarUrl }}
          style={{
            borderWidth: 2,
            borderColor: '#007AFF',
            marginBottom: 12,
          }}
        />
        <Text 
          variant="titleLarge"
          style={{ 
            color: '#fff', 
            marginBottom: 16,
            fontSize: 20,
          }}
        >
          {user.name}
        </Text>
        
        <Surface style={[styles.section, { width: '100%' }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 12 }}>
            <View style={{ alignItems: 'center' }}>
              <Text 
                variant="titleLarge"
                style={{ 
                  color: '#fff',
                  fontSize: 20,
                  marginBottom: 2,
                }}
              >
                {user.tokenBalance}
              </Text>
              <Text 
                variant="bodyMedium"
                style={{ 
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: 12,
                }}
              >
                Token Balance
              </Text>
            </View>
            <View style={{ width: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
            <View style={{ alignItems: 'center' }}>
              <Text 
                variant="titleLarge"
                style={{ 
                  color: '#fff',
                  fontSize: 20,
                  marginBottom: 2,
                }}
              >
                {user.holderLevel}
              </Text>
              <Text 
                variant="bodyMedium"
                style={{ 
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: 12,
                }}
              >
                Holder Level
              </Text>
            </View>
          </View>
        </Surface>
      </View>

      {/* Location Section */}
      <Surface style={[styles.section, { margin: 16 }]}>
        <SectionTitle title="Location" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
          {user.location?.country && (
            <View style={{ flex: 1, minWidth: '45%' }}>
              <InfoLabel text="Country" />
              <InfoValue text={user.location.country} />
            </View>
          )}
          {user.location?.state && (
            <View style={{ flex: 1, minWidth: '45%' }}>
              <InfoLabel text="State" />
              <InfoValue text={user.location.state} />
            </View>
          )}
          {user.location?.city && (
            <View style={{ flex: 1, minWidth: '45%' }}>
              <InfoLabel text="City" />
              <InfoValue text={user.location.city} />
            </View>
          )}
        </View>
      </Surface>

      {/* Personality Section */}
      <Surface style={[styles.section, { margin: 16 }]}>
        <SectionTitle title="Personality & Interests" />
        
        <View style={{ marginBottom: 16 }}>
          <InfoLabel text="Personality Type" />
          <InfoValue text={user.personalityType} />
        </View>

        <View style={{ marginBottom: 16 }}>
          <InfoLabel text="Visionary or Integrator" />
          <InfoValue text={user.visionaryOrIntegrator} />
          {user.visionaryScore && (
            <View style={{ marginTop: 8 }}>
              <InfoLabel text="Visionary Score" />
              <InfoValue text={user.visionaryScore} />
            </View>
          )}
          {user.integratorScore && (
            <View style={{ marginTop: 8 }}>
              <InfoLabel text="Integrator Score" />
              <InfoValue text={user.integratorScore} />
            </View>
          )}
        </View>

        <View style={{ marginBottom: 16 }}>
          <InfoLabel text="Human Design Type" />
          <InfoValue text={user.humanDesignType} />
        </View>

        {user.athleticInterests && user.athleticInterests.length > 0 && (
          <View style={{ marginBottom: 16 }}>
            <InfoLabel text="Athletic Interests" />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
              {user.athleticInterests.map((interest, index) => (
                <Surface 
                  key={index} 
                  style={{ 
                    backgroundColor: 'rgba(0, 122, 255, 0.15)',
                    borderRadius: 12,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Text 
                    variant="bodyMedium"
                    style={{ 
                      color: '#007AFF',
                      fontSize: 12,
                    }}
                  >
                    {interest}
                  </Text>
                </Surface>
              ))}
            </View>
          </View>
        )}

        {user.richerInterests && user.richerInterests.length > 0 && (
          <View style={{ marginBottom: 16 }}>
            <InfoLabel text="Richer Interests" />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
              {user.richerInterests.map((interest, index) => (
                <Surface 
                  key={index} 
                  style={{ 
                    backgroundColor: 'rgba(0, 122, 255, 0.15)',
                    borderRadius: 12,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Text 
                    variant="bodyMedium"
                    style={{ 
                      color: '#007AFF',
                      fontSize: 12,
                    }}
                  >
                    {interest}
                  </Text>
                </Surface>
              ))}
            </View>
          </View>
        )}

        {user.smarterInterests && user.smarterInterests.length > 0 && (
          <View style={{ marginBottom: 16 }}>
            <InfoLabel text="Smarter Interests" />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
              {user.smarterInterests.map((interest, index) => (
                <Surface 
                  key={index} 
                  style={{ 
                    backgroundColor: 'rgba(0, 122, 255, 0.15)',
                    borderRadius: 12,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                  }}
                >
                  <Text 
                    variant="bodyMedium"
                    style={{ 
                      color: '#007AFF',
                      fontSize: 12,
                    }}
                  >
                    {interest}
                  </Text>
                </Surface>
              ))}
            </View>
          </View>
        )}
      </Surface>
    </ScrollView>
  );
}; 