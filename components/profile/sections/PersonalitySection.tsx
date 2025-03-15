import React from 'react';
import { View, TextInput } from 'react-native';
import { Text, Surface, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SelectBox } from '../../ui/SelectBox';
import {
  personalityTypeOptions,
  visionaryIntegratorOptions,
  humanDesignOptions,
} from '../../../utils/constants/profileOptions';
import styles from '@/components/styles/profileStyles';


interface PersonalitySectionProps {
  user: {
    personalityType: string;
    visionaryOrIntegrator: string;
    visionaryScore: string;
    integratorScore: string;
    humanDesignType: string;
    humanDesignAuthority: string;
    humanDesignDefinition: string;
    humanDesignProfile: string;
    humanDesignIncarnationCross: string;
  };
  isFocus: boolean;
  onPersonalityTypeSelect: (type: string) => void;
  onVisionaryIntegratorSelect: (type: string) => void;
  onHumanDesignSelect: (field: string, value: string) => void;
  onScoreChange: (field: string, value: string) => void;
}

export const PersonalitySection: React.FC<PersonalitySectionProps> = ({
  user,
  isFocus,
  onPersonalityTypeSelect,
  onVisionaryIntegratorSelect,
  onHumanDesignSelect,
  onScoreChange,
}) => {
  return (
    <View style={styles.personalitySection}>
      <Text style={[styles.sectionTitle, { marginBottom: 24 }]}>Personality & Interests</Text>
      
      <Surface style={styles.testCard}>
        <View style={styles.testCardContent}>
          <View style={styles.testCardIcon}>
            <MaterialCommunityIcons name="lightbulb-outline" size={24} color="#fff" />
          </View>
          <Text style={styles.testCardText}>Tap the button to take the personality test</Text>
          <Button 
            mode="outlined" 
            style={styles.testButton}
            labelStyle={styles.testButtonLabel}
            onPress={() => {/* Open personality test */}}
          >
            Open
          </Button>
        </View>
      </Surface>

      <SelectBox
        label="Personality Type"
        value={user.personalityType}
        options={personalityTypeOptions.map(type => ({ label: type, value: type }))}
        onChange={onPersonalityTypeSelect}
        placeholder="Select personality type"
        style={{ marginBottom: 16 }}
      />

      <Surface style={[styles.testCard, { marginTop: 24 }]}>
        <View style={styles.testCardContent}>
          <View style={styles.testCardIcon}>
            <MaterialCommunityIcons name="eye-outline" size={24} color="#fff" />
          </View>
          <Text style={styles.testCardText}>Tap the button to take the Visionary or Integrator test</Text>
          <Button 
            mode="outlined" 
            style={styles.testButton}
            labelStyle={styles.testButtonLabel}
            onPress={() => {/* Open V/I test */}}
          >
            Open
          </Button>
        </View>
      </Surface>

      <SelectBox
        label="Visionary or Integrator"
        value={user.visionaryOrIntegrator}
        options={visionaryIntegratorOptions.map(type => ({ label: type, value: type }))}
        onChange={onVisionaryIntegratorSelect}
        placeholder="Select type"
        style={{ marginBottom: 16 }}
      />

      <View style={styles.scoreFields}>
        <View style={styles.scoreField}>
          <Text style={styles.scoreLabel}>Visionary Score</Text>
          <TextInput
            style={styles.scoreInput}
            value={user.visionaryScore}
            onChangeText={(text) => onScoreChange('visionaryScore', text)}
            placeholder="—"
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.scoreField}>
          <Text style={styles.scoreLabel}>Integrator Score</Text>
          <TextInput
            style={styles.scoreInput}
            value={user.integratorScore}
            onChangeText={(text) => onScoreChange('integratorScore', text)}
            placeholder="—"
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            keyboardType="numeric"
          />
        </View>
      </View>

      <Surface style={[styles.testCard, { marginTop: 24 }]}>
        <View style={styles.testCardContent}>
          <View style={styles.testCardIcon}>
            <MaterialCommunityIcons name="dna" size={24} color="#fff" />
          </View>
          <Text style={styles.testCardText}>Tap the button to take the Human Design test</Text>
          <Button 
            mode="outlined" 
            style={styles.testButton}
            labelStyle={styles.testButtonLabel}
            onPress={() => {/* Open Human Design test */}}
          >
            Open
          </Button>
        </View>
      </Surface>

      {/* Human Design Section */}
      <View style={{ marginTop: 24 }}>
        <Text style={[styles.listItemTitle, { marginBottom: 16 }]}>Human Design</Text>
        
        <SelectBox
          label="Type"
          value={user.humanDesignType}
          options={humanDesignOptions.type.map(type => ({ label: type, value: type }))}
          onChange={(value) => onHumanDesignSelect('type', value)}
          placeholder="Select Type"
          style={{ marginBottom: 16 }}
        />

        <SelectBox
          label="Authority"
          value={user.humanDesignAuthority}
          options={humanDesignOptions.authority.map(auth => ({ label: auth, value: auth }))}
          onChange={(value) => onHumanDesignSelect('authority', value)}
          placeholder="Select Authority"
          style={{ marginBottom: 16 }}
        />

        <SelectBox
          label="Definition"
          value={user.humanDesignDefinition}
          options={humanDesignOptions.definition.map(def => ({ label: def, value: def }))}
          onChange={(value) => onHumanDesignSelect('definition', value)}
          placeholder="Select Definition"
          style={{ marginBottom: 16 }}
        />

        <SelectBox
          label="Profile"
          value={user.humanDesignProfile}
          options={humanDesignOptions.profile.map(prof => ({ label: prof, value: prof }))}
          onChange={(value) => onHumanDesignSelect('profile', value)}
          placeholder="Select Profile"
          style={{ marginBottom: 16 }}
        />

        <SelectBox
          label="Incarnation Cross"
          value={user.humanDesignIncarnationCross}
          options={humanDesignOptions.incarnationCross.map(cross => ({ label: cross, value: cross }))}
          onChange={(value) => onHumanDesignSelect('incarnationCross', value)}
          placeholder="Select Incarnation Cross"
          style={{ marginBottom: 16 }}
        />
      </View>
    </View>
  );
}; 