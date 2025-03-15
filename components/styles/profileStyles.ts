import { StyleSheet, Platform } from 'react-native';

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001F2D',
  },
  headerSurface: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 16,
    borderRadius: 0,
  },
  header: {
    alignItems: 'center',
    padding: 24,
  },
  avatar: {
    marginBottom: 16,
  },
  name: {
    marginBottom: 4,
  },
  location: {
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 20,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 4,
  },
  statValue: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
  },
  statDivider: {
    width: 1,
    height: '100%',
  },
  subheader: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    letterSpacing: -0.2,
    marginTop: 8,
  },
  listItem: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
  },
  listItemTitle: {
    color: '#fff',
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    letterSpacing: -0.3,
  },
  listItemDescription: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    letterSpacing: -0.2,
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 8,
  },
  footer: {
    padding: 16,
    paddingBottom: 32,
  },
  logoutButton: {
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  profileImagePreview: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    marginRight: 8,
  },
  referralItem: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  placeholder: {
    color: 'rgba(255, 255, 255, 0.4)',
  },
  tabContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tabButtons: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 100,
  },
  segmentedButtonsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  segmentedButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  segmentedButtonInactive: {
    backgroundColor: 'transparent',
  },
  segmentedButtonTextActive: {
    color: '#FFFFFF',
  },
  segmentedButtonTextInactive: {
    color: 'rgba(255, 255, 255, 0.4)',
  },
  locationSection: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  locationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  locationItem: {
    flex: 1,
    minWidth: '40%',
  },
  locationLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.4)',
    marginBottom: 4,
    fontFamily: 'Inter_400Regular',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  locationValue: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Inter_500Medium',
    letterSpacing: -0.3,
  },
  emptyTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyTabText: {
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  bioInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    textAlignVertical: 'top',
  },
  iosPickerModal: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  iosPickerContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  iosPickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  iosDatePicker: {
    height: 200,
    backgroundColor: '#FFFFFF',
  },
  iosPickerList: {
    maxHeight: 300,
  },
  iosPickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  iosPickerItemText: {
    fontSize: 16,
    color: '#000000',
  },
  iosPickerItemTextSelected: {
    color: '#007AFF',
  },
  referralSection: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  dropdown: {
    height: 56,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  dropdownContainer: {
    backgroundColor: '#001F2D',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  dropdownItemSelected: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  dropdownText: {
    flex: 1,
    color: '#fff',
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  dropdownTextSelected: {
    color: '#007AFF',
    fontFamily: 'Inter_500Medium',
  },
  dropdownPlaceholder: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  dropdownSelectedText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    marginLeft: 12,
  },
  dropdownSearch: {
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    fontFamily: 'Inter_400Regular',
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  dropdownIcon: {
    width: 20,
    height: 20,
    tintColor: 'rgba(255, 255, 255, 0.4)',
  },
  dropdownCheckIcon: {
    marginLeft: 8,
  },
  personalitySection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: 'Inter_600SemiBold',
    color: '#fff',
    letterSpacing: -0.5,
  },
  testCard: {
    backgroundColor: 'rgba(0, 122, 255, 0.05)',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  testCardContent: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  testCardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  testCardText: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  testButton: {
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  testButtonLabel: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#fff',
  },
  selectField: {
    marginTop: 16,
    position: 'relative',
    zIndex: 1,
  },
  selectLabel: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Inter_400Regular',
    marginBottom: 8,
  },
  selectValue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
  },
  selectedChips: {
    flex: 1,
    flexDirection: 'row',
    gap: 4,
    paddingRight: 8,
    alignItems: 'center',
    height: 28,
    overflow: 'hidden'
  },
  selectedChip: {
    backgroundColor: 'rgba(0, 122, 255, 0.15)',
    borderRadius: 8,
    height: 26,
    paddingHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  selectedChipText: {
    color: '#007AFF',
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    includeFontPadding: false
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectionLimit: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.4)',
    fontFamily: 'Inter_400Regular',
  },
  selectionLimitReached: {
    color: '#007AFF',
  },
  scoreFields: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 16,
  },
  scoreField: {
    flex: 1,
  },
  scoreLabel: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Inter_400Regular',
    marginBottom: 8,
  },
  scoreInput: {
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  menuContent: {
    backgroundColor: '#001F2D',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingVertical: 8,
    maxHeight: 300,
    width: '100%',
    position: 'relative',
    zIndex: 1000,
  },
  numberCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  inputField: {
    width: '100%',
  },
  numberInput: {
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  segmentedButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
  infoText: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  section: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  sectionDivider: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 16,
  },
  infoItem: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 4,
    fontFamily: 'Inter_400Regular',
  },
  infoValue: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Inter_500Medium',
  },
  interestTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  interestTag: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  interestTagText: {
    color: '#007AFF',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  // Human Design Section Styles
  sectionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  dropdownContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 8,
  },
  dropdown: {
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  placeholderStyle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#FFFFFF',
  },
}); 


export default profileStyles;