import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Country, State, City, ICountry, IState } from 'country-state-city';
import { Dropdown } from 'react-native-element-dropdown';
import { OnboardingData } from '../../../types/onboarding';

interface LocationItem {
  label: string;
  value: string; // isoCode for Country/State, name for City
}

interface Step2Props {
  data: Pick<Partial<OnboardingData>, 'country' | 'state' | 'city'>;
  onDataChange: (data: Partial<OnboardingData>) => void;
  // onNext and onBack are handled by the parent OnboardingScreen
}

const Step2Location: React.FC<Step2Props> = ({ data, onDataChange }) => {
  const [countries, setCountries] = useState<LocationItem[]>([]);
  const [states, setStates] = useState<LocationItem[]>([]);
  const [cities, setCities] = useState<LocationItem[]>([]);

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  // 1. Load countries on mount
  useEffect(() => {
    const countryData = Country.getAllCountries().map(country => ({
      label: country.name,
      value: country.isoCode
    }));
    setCountries(countryData);
    console.log('Countries loaded');
  }, []);

  // 2. Initialize selectedCountry from props ONCE when countries are loaded
  useEffect(() => {
    if (countries.length > 0 && data.country && selectedCountry === null) {
      const initialCountry = countries.find(c => c.label === data.country);
      if (initialCountry) {
        console.log('Initializing Country from props:', initialCountry.value);
        setSelectedCountry(initialCountry.value);
      }
    }
  }, [countries, data.country, selectedCountry]); // Re-run if countries load or prop changes

  // 3. Load states when selectedCountry changes
  useEffect(() => {
    if (selectedCountry) {
      const stateData = State.getStatesOfCountry(selectedCountry).map(state => ({
        label: state.name,
        value: state.isoCode
      }));
      console.log(`States loaded for ${selectedCountry}:`, stateData.length);
      setStates(stateData);
    } else {
      setStates([]); // Clear states if no country selected
    }
    // IMPORTANT: Clear subsequent selections when country changes
    setSelectedState(null);
    setCities([]);
    // Only clear parent state if the change wasn't the initial load
    if (selectedCountry !== null) { 
       // Avoid clearing if selectedCountry was just initialized from props
       // Check maybe if previous selectedCountry was different?
       // Let's simplify: Let parent handle clearing if needed via onChange.
       // onDataChange({ state: '', city: '' }); // Remove parent clearing here
    }
    console.log('Selected Country Effect Ran - State/City Cleared');

  }, [selectedCountry]); // Only depends on selectedCountry

  // 4. Initialize selectedState from props ONCE when states are loaded
  useEffect(() => {
    if (states.length > 0 && data.state && selectedState === null) {
      const initialState = states.find(s => s.label === data.state);
      if (initialState) {
        console.log('Initializing State from props:', initialState.value);
        setSelectedState(initialState.value);
      }
    }
  }, [states, data.state, selectedState]); // Re-run if states load or prop changes

  // 5. Load cities when selectedState changes
  useEffect(() => {
    if (selectedCountry && selectedState) {
      const cityData = City.getCitiesOfState(selectedCountry, selectedState).map(city => ({
        label: city.name,
        value: city.name // Use name as value for city
      }));
       console.log(`Cities loaded for ${selectedState}:`, cityData.length);
      setCities(cityData);
    } else {
      setCities([]); // Clear cities if no state selected
    }
     // Clear parent city when state changes - handled by state dropdown onChange
     // onDataChange({ city: '' }); // Remove parent clearing here
     console.log('Selected State Effect Ran - City Cleared');

  }, [selectedCountry, selectedState]); // Depends on country and state

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Location</Text>
      <Text style={styles.subtitle}>Where are you based?</Text>

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={countries}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Country"
        searchPlaceholder="Search..."
        value={selectedCountry}
        onChange={item => {
          console.log('Country selected:', item);
          setSelectedCountry(item.value); // Set local state
          onDataChange({ country: item.label, state: '', city: '' }); // Update parent, clear children
        }}
      />

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={states}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!selectedCountry ? "Select Country first" : (states.length === 0 ? "No states found" : "Select State / Province")}
        searchPlaceholder="Search..."
        value={selectedState}
        disable={!selectedCountry || states.length === 0}
        onChange={item => {
          console.log('State selected:', item);
          setSelectedState(item.value); // Set local state
          onDataChange({ state: item.label, city: '' }); // Update parent, clear child
        }}
      />

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={cities}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!selectedState ? "Select State first" : (cities.length === 0 ? "No cities found" : "Select City")}
        searchPlaceholder="Search..."
        value={data.city}
        disable={!selectedState || cities.length === 0}
        onChange={item => {
          console.log('City selected:', item);
          onDataChange({ city: item.value }); // Update parent
        }}
      />
       {/* Navigation buttons are in the parent component */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  dropdown: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#9e9e9e', // Placeholder color
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333', // Selected text color
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderColor: '#ccc', // Search input border
    borderRadius: 8,
  },
});

export default Step2Location; 