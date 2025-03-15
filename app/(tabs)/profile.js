import { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Platform, Image } from 'react-native';
import { Avatar, Text, List, Button, Divider, Surface, IconButton, SegmentedButtons, Portal, Dialog, Menu } from 'react-native-paper';
import { Link } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import styles from '../../components/styles/profileStyles';
import { ProfileHeader } from '../../components/profile/ProfileHeader';
import { BioModal } from '../../components/profile/modals/BioModal';
import { DatePickerModal } from '../../components/profile/modals/DatePickerModal';
import { LocationPicker } from '../../components/profile/sections/LocationPicker';
import { PersonalitySection } from '../../components/profile/sections/PersonalitySection';
import { InterestsSection } from '../../components/profile/sections/InterestsSection';
import { GoalsSection } from '../../components/profile/sections/GoalsSection';
import { NumbersSection } from '../../components/profile/sections/NumbersSection';
import {
  personalityTypes,
  visionaryIntegratorOptions,
  humanDesignTypes,
  humanDesignAuthorities,
  humanDesignDefinitions,
  humanDesignProfiles,
  humanDesignIncarnationCrosses,
  athleticInterestOptions,
  richerInterestOptions,
  smarterInterestOptions,
  measurementSystemOptions,
  genderOptions,
  locationOptions
} from '../../utils/constants/profileOptions';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('basics');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showBioModal, setShowBioModal] = useState(false);
  const [editingBio, setEditingBio] = useState('');
  const [showReferralMenu, setShowReferralMenu] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date('1993-09-10'));
  const [showLocationMenu, setShowLocationMenu] = useState(null);
  const [showIOSDatePicker, setShowIOSDatePicker] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState({ visible: false, field: null, options: [] });
  const [isFocus, setIsFocus] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [menuRefs, setMenuRefs] = useState({
    personalityType: null,
    visionaryIntegrator: null,
    humanDesignType: null,
    humanDesignAuthority: null,
    humanDesignDefinition: null,
    humanDesignProfile: null,
    humanDesignIncarnationCross: null,
    athleticInterests: null,
    richerInterests: null,
    smarterInterests: null
  });
  
  const [user, setUser] = useState({
    // Basic Info
    name: 'KJ',
    dateOfBirth: '9/10/1993',
    profilePicture: 'b1BUDPRoX7Xg1MWMdgE5.jpeg',
    bio: 'Visionary entrepreneur and community builder passionate about web3, fitness, and personal development. Building Uncommon to empower the next generation of conscious leaders. Always seeking growth and meaningful connections.',
    
    // Location
    country: 'Indonesia',
    state: 'Bali',
    city: 'Canggu',
    town: 'Berawa',
    location: 'Canggu, Bali',
    
    // Contact & Social
    email: 'kj@uncommon.org',
    instagramHandle: '@kjuncommon',
    telegramUsername: '@kjuncommon',
    referredBy: 'Keegan',
    
    // Profile & Status
    avatarUrl: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=400&auto=format&fit=crop&q=60',
    tokenBalance: 2850,
    holderLevel: 'Diamond',
    
    // Personality Section
    personalityType: 'ENFJ - Protagonist',
    visionaryOrIntegrator: 'Visionary',
    visionaryScore: '85',
    integratorScore: '65',
    
    // Human Design Section
    humanDesignType: 'Generator',
    humanDesignAuthority: 'Sacral',
    humanDesignDefinition: 'Split Definition',
    humanDesignProfile: '6/2 Role Model/Hermit',
    humanDesignIncarnationCross: 'Right Angle Cross of Planning',
    
    // Interests Section
    athleticInterests: [
      'CrossFit',
      'Surfing',
      'Yoga'
    ],
    richerInterests: [
      'Real Estate',
      'Cryptocurrency',
      'Angel Investing'
    ],
    smarterInterests: [
      'Psychology',
      'Philosophy',
      'Blockchain Technology'
    ],
    
    // Goals Section
    firstYearGoal: 'Scale Uncommon to 10,000 active members while maintaining a strong community culture and high engagement metrics. Launch three major product features that significantly improve member experience.',
    freedomTarget: 'Build diversified passive income streams reaching $50k/month through real estate investments, crypto yield farming, and strategic angel investments in web3 projects.',
    biggerPicture: 'Create a global network of conscious entrepreneurs and change-makers who collectively impact over 1 million lives through innovative solutions to world problems. Establish Uncommon as the leading platform for holistic entrepreneurial growth.',
    
    // Numbers Section
    gender: 'Male',
    measurementSystem: 'Metric',
    bodyFat: '12',
    height: '183',
    weight: '82',
    yearsWorked: '8',
    weeksPerYear: '48',
    hoursPerWeek: '50',
    netWorth: '2000000',
    totalDebt: '0',
    
    // Additional Metrics
    workoutFrequency: '5',
    meditationMinutes: '20',
    readingHours: '1',
    sleepHours: '7',
    waterIntake: '3',
    journalingFrequency: '7'
  });

  const handleDateChange = (event, date) => {
    if (Platform.OS === 'ios') {
      // Don't dismiss the picker on iOS, let user press "Done"
      if (date) {
        setSelectedDate(date);
        setUser(prev => ({
          ...prev,
          dateOfBirth: date.toLocaleDateString()
        }));
      }
    } else {
      // On Android, dismiss immediately after selection
      setShowDatePicker(false);
      if (date) {
        setSelectedDate(date);
        setUser(prev => ({
          ...prev,
          dateOfBirth: date.toLocaleDateString()
        }));
      }
    }
  };

  const handleBioSave = () => {
    setUser(prev => ({
      ...prev,
      bio: editingBio
    }));
    setShowBioModal(false);
  };

  const handleLocationUpdate = (field, value) => {
    setUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLocationPress = (field, options) => {
    if (Platform.OS === 'ios') {
      setShowLocationPicker({ visible: true, field, options });
    } else {
      setShowLocationMenu(field);
    }
  };

  const handlePersonalityTypeSelect = (type) => {
    setUser(prev => ({
      ...prev,
      personalityType: type
    }));
  };

  const handleVisionaryIntegratorSelect = (type) => {
    setUser(prev => ({
      ...prev,
      visionaryOrIntegrator: type
    }));
  };

  const handleHumanDesignSelect = (field, value) => {
    setUser(prev => ({
      ...prev,
      [`humanDesign${field}`]: value
    }));
  };

  const handleInterestsSelect = (category, interests) => {
    setUser(prev => ({
      ...prev,
      [`${category}Interests`]: interests
    }));
  };

  const handleGoalChange = (field, value) => {
    setUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNumbersChange = (field, value) => {
    setUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderBasicsTab = () => (
    <>
      <LocationPicker
        user={user}
        showLocationMenu={showLocationMenu}
        showLocationPicker={showLocationPicker}
        onLocationPress={handleLocationPress}
        onLocationUpdate={handleLocationUpdate}
        onLocationMenuDismiss={() => setShowLocationMenu(null)}
        onLocationPickerDismiss={() => setShowLocationPicker({ visible: false, field: null, options: [] })}
      />
      
      <PersonalitySection
        user={user}
        isFocus={isFocus}
        onPersonalityTypeSelect={handlePersonalityTypeSelect}
        onVisionaryIntegratorSelect={handleVisionaryIntegratorSelect}
        onHumanDesignSelect={handleHumanDesignSelect}
        onScoreChange={handleInterestsSelect}
      />

      <InterestsSection
        user={user}
        isFocus={isFocus}
        onInterestsSelect={handleInterestsSelect}
      />
    </>
  );

  const renderGoalsTab = () => (
    <GoalsSection
      user={user}
      onGoalChange={handleGoalChange}
    />
  );

  const renderNumbersTab = () => (
    <NumbersSection
      user={user}
      onNumbersChange={handleNumbersChange}
    />
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'basics':
        return renderBasicsTab();
      case 'goals':
        return renderGoalsTab();
      case 'numbers':
        return renderNumbersTab();
      default:
        return renderBasicsTab();
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <ProfileHeader user={user} />

        <View style={styles.tabContainer}>
          <SegmentedButtons
            value={activeTab}
            onValueChange={setActiveTab}
            buttons={[
              { 
                value: 'basics', 
                label: 'Basics',
                style: activeTab === 'basics' ? styles.segmentedButtonActive : styles.segmentedButtonInactive,
                labelStyle: activeTab === 'basics' ? styles.segmentedButtonTextActive : styles.segmentedButtonTextInactive,
              },
              { 
                value: 'goals', 
                label: 'Goals',
                style: activeTab === 'goals' ? styles.segmentedButtonActive : styles.segmentedButtonInactive,
                labelStyle: activeTab === 'goals' ? styles.segmentedButtonTextActive : styles.segmentedButtonTextInactive,
              },
              { 
                value: 'numbers', 
                label: 'Numbers',
                style: activeTab === 'numbers' ? styles.segmentedButtonActive : styles.segmentedButtonInactive,
                labelStyle: activeTab === 'numbers' ? styles.segmentedButtonTextActive : styles.segmentedButtonTextInactive,
              },
            ]}
            style={[styles.tabButtons, styles.segmentedButtonsContainer]}
          />
        </View>

        {renderActiveTab()}
      </ScrollView>

      <Portal>
        <BioModal
          visible={showBioModal}
          onDismiss={() => setShowBioModal(false)}
          bio={editingBio}
          onBioChange={setEditingBio}
          onSave={handleBioSave}
        />

        <DatePickerModal
          visible={showDatePicker}
          onDismiss={() => setShowDatePicker(false)}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
      </Portal>

      {/* iOS Date Picker Modal */}
      {Platform.OS === 'ios' && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showIOSDatePicker}
          onRequestClose={() => setShowIOSDatePicker(false)}
        >
          <View style={styles.iosPickerModal}>
            <View style={styles.iosPickerContainer}>
              <View style={styles.iosPickerHeader}>
                <Button onPress={() => setShowIOSDatePicker(false)}>Cancel</Button>
                <Button onPress={() => setShowIOSDatePicker(false)}>Done</Button>
              </View>
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                style={styles.iosDatePicker}
                textColor="#000000"
              />
            </View>
          </View>
        </Modal>
      )}

      {/* Android Date Picker */}
      {Platform.OS === 'android' && showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </>
  );
}