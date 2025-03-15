import { api } from './apiService';
import { getEndpoints } from './config';

interface User {
  id: string;
  email: string;
  name: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

const endpoints = getEndpoints();

export const auth = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post<{ user: User; token: string }>(
      endpoints.auth.login,
      credentials
    );
    
    // Set the auth token for future requests
    if (response.data.token) {
      api.setAuthToken(response.data.token);
    }
    
    return response.data;
  },

  logout: () => {
    api.clearAuthToken();
  },
} as const;
