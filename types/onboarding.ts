export interface OnboardingData {
  firstName: string;
  lastName: string;
  profilePictureUri: string | null;
  country: string;
  state: string;
  city: string;
  bio: string;
  instagramLink: string;
  bookingLink: string;
  strengths: string[];
  focusAreas: string[];
}

export const ONBOARDING_STEPS = 5;

export const STRENGTH_OPTIONS = ['Mastermind', 'Athletic', 'Richer', 'Smarter'];
export const FOCUS_AREA_OPTIONS = ['Mastermind', 'Athletic', 'Richer', 'Smarter']; 