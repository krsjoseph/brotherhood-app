import { getBaseUrl, getDefaultHeaders } from './config';
import type { ApiResponse, ApiError, RequestConfig } from './types';

// State management using a closure
const createHeaders = () => {
  let headers = getDefaultHeaders();

  return {
    getHeaders: () => ({ ...headers }),
    setAuthToken: (token: string) => {
      headers = { ...headers, Authorization: `Bearer ${token}` };
    },
    clearAuthToken: () => {
      const { Authorization, ...rest } = headers;
      headers = rest;
    },
  };
};

const { getHeaders, setAuthToken, clearAuthToken } = createHeaders();

const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    throw {
      status: response.status,
      message: data.message || 'An error occurred',
      errors: data.errors,
    } as ApiError;
  }

  return {
    data,
    status: response.status,
    message: data.message,
  };
};

const createUrl = (endpoint: string, params?: Record<string, string | number | boolean>): string => {
  const url = new URL(endpoint, getBaseUrl());
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }
  return url.toString();
};

const request = async <T>(
  method: string,
  endpoint: string,
  { headers = {}, params, signal, ...config }: RequestConfig = {}
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(createUrl(endpoint, params), {
      method,
      headers: { ...getHeaders(), ...headers },
      signal,
      ...config,
    });

    return handleResponse<T>(response);
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw { status: 499, message: 'Request cancelled' } as ApiError;
    }
    throw error;
  }
};

// HTTP method functions
const get = <T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> =>
  request<T>('GET', endpoint, config);

const post = <T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> =>
  request<T>('POST', endpoint, {
    ...config,
    body: JSON.stringify(data),
  });

const put = <T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> =>
  request<T>('PUT', endpoint, {
    ...config,
    body: JSON.stringify(data),
  });

const patch = <T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> =>
  request<T>('PATCH', endpoint, {
    ...config,
    body: JSON.stringify(data),
  });

const del = <T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> =>
  request<T>('DELETE', endpoint, config);

export const api = {
  get,
  post,
  put,
  patch,
  delete: del,
  setAuthToken,
  clearAuthToken,
} as const;
