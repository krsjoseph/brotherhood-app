export const locationOptions = {
  country: ['Indonesia', 'United States', 'Singapore', 'Australia'],
  state: ['Bali', 'Jakarta', 'California', 'New York'],
  city: ['Denpasar', 'Ubud', 'San Francisco', 'Los Angeles'],
  town: ['Kuta', 'Seminyak', 'Mission District', 'Venice']
};

export const personalityTypeOptions = [
  'INTJ - Architect',
  'INTP - Logician',
  'ENTJ - Commander',
  'ENTP - Debater',
  'INFJ - Advocate',
  'INFP - Mediator',
  'ENFJ - Protagonist',
  'ENFP - Campaigner',
  'ISTJ - Logistician',
  'ISFJ - Defender',
  'ESTJ - Executive',
  'ESFJ - Consul',
  'ISTP - Virtuoso',
  'ISFP - Adventurer',
  'ESTP - Entrepreneur',
  'ESFP - Entertainer'
];

export const visionaryIntegratorOptions = [
  'Visionary',
  'Integrator'
];

export const humanDesignOptions = {
  type: [
    'Generator',
    'Manifesting Generator',
    'Manifestor',
    'Projector',
    'Reflector'
  ],
  authority: [
    'Emotional',
    'Sacral',
    'Splenic',
    'Ego',
    'Self',
    'G Center',
    'Lunar',
    'Environmental'
  ],
  definition: [
    'Single Definition',
    'Split Definition',
    'Triple Split',
    'Quadruple Split',
    'Undefined'
  ],
  profile: [
    '1/3 Investigator/Martyr',
    '1/4 Investigator/Opportunist',
    '2/4 Hermit/Opportunist',
    '2/5 Hermit/Heretic',
    '3/5 Martyr/Heretic',
    '3/6 Martyr/Role Model',
    '4/6 Opportunist/Role Model',
    '4/1 Opportunist/Investigator',
    '5/1 Heretic/Investigator',
    '5/2 Heretic/Hermit',
    '6/2 Role Model/Hermit',
    '6/3 Role Model/Martyr'
  ],
  incarnationCross: [
    'Right Angle Cross of Planning',
    'Right Angle Cross of the Four Ways',
    'Right Angle Cross of Maya',
    'Right Angle Cross of the Vessel of Love',
    'Right Angle Cross of the Sphinx',
    'Right Angle Cross of Service',
    'Right Angle Cross of Eden',
    'Right Angle Cross of Tension',
    'Right Angle Cross of Consciousness'
  ]
};

export const humanDesignTypes = humanDesignOptions.type.map(type => ({
  label: type,
  value: type
}));

export const humanDesignAuthorities = humanDesignOptions.authority.map(authority => ({
  label: authority,
  value: authority
}));

export const humanDesignDefinitions = humanDesignOptions.definition.map(definition => ({
  label: definition,
  value: definition
}));

export const humanDesignProfiles = humanDesignOptions.profile.map(profile => ({
  label: profile,
  value: profile
}));

export const humanDesignIncarnationCrosses = humanDesignOptions.incarnationCross.map(cross => ({
  label: cross,
  value: cross
}));

export const interestOptions = {
  athletic: [
    'Basketball',
    'Football',
    'Soccer',
    'Tennis',
    'Golf',
    'Swimming',
    'Running',
    'Cycling',
    'Yoga',
    'Hiking',
    'Rock Climbing',
    'Surfing',
    'Skiing',
    'Martial Arts',
    'CrossFit',
    'Weight Training'
  ],
  richer: [
    'Real Estate',
    'Stock Market',
    'Cryptocurrency',
    'Angel Investing',
    'Venture Capital',
    'Business Development',
    'Entrepreneurship',
    'Financial Planning',
    'Wealth Management',
    'Private Equity',
    'NFTs',
    'Web3',
    'DeFi',
    'Blockchain'
  ],
  smarter: [
    'Artificial Intelligence',
    'Machine Learning',
    'Data Science',
    'Quantum Computing',
    'Robotics',
    'Space Technology',
    'Biotechnology',
    'Neuroscience',
    'Psychology',
    'Philosophy',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology'
  ]
}; 