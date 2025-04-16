export const API_CONFIG = {
  baseUrl: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001/api',
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
    },
    users: {
      list: '/api/users',
      glideUsers: '/api/glide-users',
    },
    leaderboard: {
      list: '/api/leaderboard',
    },
  },
  defaultHeaders: {
    'Content-Type': 'application/json',
  } as Record<string, string>,
} as const;

// Helper functions to get config values
export const getBaseUrl = () => API_CONFIG.baseUrl;
export const getEndpoints = () => API_CONFIG.endpoints;
export const getDefaultHeaders = () => ({ ...API_CONFIG.defaultHeaders });
