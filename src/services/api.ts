import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import { useAuth } from '../contexts/AuthContext';

// API Types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
  },
  CLAIMS: {
    LIST: '/claims',
    DETAILS: (id: string) => `/claims/${id}`,
    VERIFY: (id: string) => `/claims/${id}/verify`,
    DOCUMENTS: (id: string) => `/claims/${id}/documents`,
  },
  CERTIFICATES: {
    LIST: '/certificates',
    GENERATE: (claimId: string) => `/certificates/generate/${claimId}`,
    DOWNLOAD: (id: string) => `/certificates/${id}/download`,
    VERIFY: (id: string) => `/certificates/${id}/verify`,
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE: '/users/profile',
    DOCUMENTS: '/users/documents',
  },
  INSURERS: {
    LIST: '/insurers',
    DETAILS: (id: string) => `/insurers/${id}`,
    CLAIMS: (id: string) => `/insurers/${id}/claims`,
    SETTINGS: (id: string) => `/insurers/${id}/settings`,
  },
};

// API Configuration
const API_BASE_URL = process.env.VITE_API_URL || 'https://api.aidetache.com';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      const message = error.response.data?.message || 'An error occurred';
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Request made but no response
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      // Request setup error
      return Promise.reject(new Error('Request failed. Please try again.'));
    }
  }
);

// API Service methods
export const apiService = {
  // Auth methods
  auth: {
    login: async (email: string, password: string) => {
      const response = await api.post<ApiResponse<{ accessToken: string; refreshToken: string }>>(
        API_ENDPOINTS.AUTH.LOGIN,
        { email, password }
      );
      return response.data;
    },
    register: async (userData: any) => {
      const response = await api.post<ApiResponse<{ userId: string }>>(
        API_ENDPOINTS.AUTH.REGISTER,
        userData
      );
      return response.data;
    },
    logout: async () => {
      await api.post(API_ENDPOINTS.AUTH.LOGOUT);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },

  // Claims methods
  claims: {
    list: async (params?: Record<string, any>) => {
      const response = await api.get<ApiResponse<any[]>>(API_ENDPOINTS.CLAIMS.LIST, { params });
      return response.data;
    },
    details: async (id: string) => {
      const response = await api.get<ApiResponse<any>>(API_ENDPOINTS.CLAIMS.DETAILS(id));
      return response.data;
    },
    verify: async (id: string, data: any) => {
      const response = await api.post<ApiResponse<any>>(API_ENDPOINTS.CLAIMS.VERIFY(id), data);
      return response.data;
    },
    uploadDocuments: async (id: string, files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => formData.append('documents', file));
      
      const response = await api.post<ApiResponse<any>>(
        API_ENDPOINTS.CLAIMS.DOCUMENTS(id),
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    },
  },

  // Certificate methods
  certificates: {
    list: async (params?: Record<string, any>) => {
      const response = await api.get<ApiResponse<any[]>>(API_ENDPOINTS.CERTIFICATES.LIST, { params });
      return response.data;
    },
    generate: async (claimId: string) => {
      const response = await api.post<ApiResponse<any>>(API_ENDPOINTS.CERTIFICATES.GENERATE(claimId));
      return response.data;
    },
    download: async (id: string) => {
      const response = await api.get<Blob>(API_ENDPOINTS.CERTIFICATES.DOWNLOAD(id), {
        responseType: 'blob',
      });
      return response.data;
    },
    verify: async (id: string) => {
      const response = await api.get<ApiResponse<any>>(API_ENDPOINTS.CERTIFICATES.VERIFY(id));
      return response.data;
    },
  },

  // User methods
  users: {
    getProfile: async () => {
      const response = await api.get<ApiResponse<any>>(API_ENDPOINTS.USERS.PROFILE);
      return response.data;
    },
    updateProfile: async (data: any) => {
      const response = await api.put<ApiResponse<any>>(API_ENDPOINTS.USERS.UPDATE, data);
      return response.data;
    },
    uploadDocuments: async (files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => formData.append('documents', file));
      
      const response = await api.post<ApiResponse<any>>(
        API_ENDPOINTS.USERS.DOCUMENTS,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    },
  },

  // Insurer methods
  insurers: {
    list: async (params?: Record<string, any>) => {
      const response = await api.get<ApiResponse<any[]>>(API_ENDPOINTS.INSURERS.LIST, { params });
      return response.data;
    },
    details: async (id: string) => {
      const response = await api.get<ApiResponse<any>>(API_ENDPOINTS.INSURERS.DETAILS(id));
      return response.data;
    },
    getClaims: async (id: string, params?: Record<string, any>) => {
      const response = await api.get<ApiResponse<any[]>>(API_ENDPOINTS.INSURERS.CLAIMS(id), { params });
      return response.data;
    },
    updateSettings: async (id: string, settings: any) => {
      const response = await api.put<ApiResponse<any>>(API_ENDPOINTS.INSURERS.SETTINGS(id), settings);
      return response.data;
    },
  },
};

export default apiService; 