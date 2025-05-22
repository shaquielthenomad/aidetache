import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import apiService from '../services/api';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'policyholder' | 'insurer';
  profile?: UserProfile;
}

export interface UserProfile {
  phone?: string;
  address?: string;
  documents?: Document[];
  preferences?: UserPreferences;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  theme: 'light' | 'dark';
  language: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
  status: 'pending' | 'verified' | 'rejected';
}

export interface Claim {
  id: string;
  userId: string;
  insurerId: string;
  status: 'pending' | 'verified' | 'rejected';
  documents: Document[];
  verificationResults?: VerificationResults;
  createdAt: string;
  updatedAt: string;
}

export interface VerificationResults {
  documentAuthenticity: number;
  dataConsistency: number;
  fraudRiskScore: number;
  details?: Record<string, any>;
}

export interface Certificate {
  id: string;
  claimId: string;
  userId: string;
  insurerId: string;
  status: 'valid' | 'expired' | 'revoked';
  issueDate: string;
  expiryDate: string;
  downloadUrl: string;
  verificationUrl: string;
  seal?: {
    timestamp: string;
    username: string;
    verifiedBy: string;
  };
}

export interface Insurer {
  id: string;
  name: string;
  code: string;
  settings: InsurerSettings;
  stats: InsurerStats;
}

export interface InsurerSettings {
  verification: {
    autoVerifyLowRisk: boolean;
    riskThreshold: number;
    requireDocuments: boolean;
    allowAppeal: boolean;
  };
  notifications: {
    newClaims: boolean;
    highRiskAlerts: boolean;
    statusUpdates: boolean;
    dailyReports: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
    ipWhitelist: boolean;
    auditLogs: boolean;
  };
}

export interface InsurerStats {
  totalClaims: number;
  pendingClaims: number;
  verifiedClaims: number;
  rejectedClaims: number;
  averageVerificationTime: number;
  fraudRate: number;
}

// Store State
interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;

  // Claims
  claims: Claim[];
  currentClaim: Claim | null;
  claimsLoading: boolean;
  claimsError: string | null;

  // Certificates
  certificates: Certificate[];
  currentCertificate: Certificate | null;
  certificatesLoading: boolean;
  certificatesError: string | null;

  // Insurers
  insurers: Insurer[];
  currentInsurer: Insurer | null;
  insurersLoading: boolean;
  insurersError: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  
  // Claims actions
  fetchClaims: (params?: Record<string, any>) => Promise<void>;
  fetchClaimDetails: (id: string) => Promise<void>;
  verifyClaim: (id: string, data: any) => Promise<void>;
  uploadClaimDocuments: (id: string, files: File[]) => Promise<void>;
  
  // Certificate actions
  fetchCertificates: (params?: Record<string, any>) => Promise<void>;
  generateCertificate: (claimId: string) => Promise<void>;
  downloadCertificate: (id: string) => Promise<void>;
  verifyCertificate: (id: string, sealData: string) => Promise<void>;
  
  // Insurer actions
  fetchInsurers: (params?: Record<string, any>) => Promise<void>;
  fetchInsurerDetails: (id: string) => Promise<void>;
  updateInsurerSettings: (id: string, settings: Partial<InsurerSettings>) => Promise<void>;
}

// Create store
export const useStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        claims: [],
        currentClaim: null,
        claimsLoading: false,
        claimsError: null,
        certificates: [],
        currentCertificate: null,
        certificatesLoading: false,
        certificatesError: null,
        insurers: [],
        currentInsurer: null,
        insurersLoading: false,
        insurersError: null,

        // Auth actions
        login: async (email: string, password: string) => {
          set({ loading: true, error: null });
          try {
            const response = await apiService.auth.login(email, password);
            const { accessToken, refreshToken } = response.data;
            
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            
            const userResponse = await apiService.users.getProfile();
            set({
              user: userResponse.data,
              isAuthenticated: true,
              loading: false,
            });
          } catch (error: any) {
            set({
              error: error.response?.data?.message || 'Login failed',
              loading: false,
            });
            throw error;
          }
        },

        logout: async () => {
          try {
            await apiService.auth.logout();
          } finally {
            set({
              user: null,
              isAuthenticated: false,
              claims: [],
              currentClaim: null,
              certificates: [],
              currentCertificate: null,
              insurers: [],
              currentInsurer: null,
            });
          }
        },

        register: async (userData: any) => {
          set({ loading: true, error: null });
          try {
            await apiService.auth.register(userData);
            await get().login(userData.email, userData.password);
          } catch (error: any) {
            set({
              error: error.response?.data?.message || 'Registration failed',
              loading: false,
            });
            throw error;
          }
        },

        updateProfile: async (data: Partial<UserProfile>) => {
          set({ loading: true, error: null });
          try {
            const response = await apiService.users.updateProfile(data);
            set({
              user: { ...get().user!, profile: response.data },
              loading: false,
            });
          } catch (error: any) {
            set({
              error: error.response?.data?.message || 'Profile update failed',
              loading: false,
            });
            throw error;
          }
        },

        // Claims actions
        fetchClaims: async (params?: Record<string, any>) => {
          set({ claimsLoading: true, claimsError: null });
          try {
            const response = await apiService.claims.list(params);
            set({ claims: response.data, claimsLoading: false });
          } catch (error: any) {
            set({
              claimsError: error.response?.data?.message || 'Failed to fetch claims',
              claimsLoading: false,
            });
            throw error;
          }
        },

        fetchClaimDetails: async (id: string) => {
          set({ claimsLoading: true, claimsError: null });
          try {
            const response = await apiService.claims.details(id);
            set({ currentClaim: response.data, claimsLoading: false });
          } catch (error: any) {
            set({
              claimsError: error.response?.data?.message || 'Failed to fetch claim details',
              claimsLoading: false,
            });
            throw error;
          }
        },

        verifyClaim: async (id: string, data: any) => {
          set({ claimsLoading: true, claimsError: null });
          try {
            const response = await apiService.claims.verify(id, data);
            set({
              currentClaim: response.data,
              claims: get().claims.map(claim =>
                claim.id === id ? response.data : claim
              ),
              claimsLoading: false,
            });
          } catch (error: any) {
            set({
              claimsError: error.response?.data?.message || 'Claim verification failed',
              claimsLoading: false,
            });
            throw error;
          }
        },

        uploadClaimDocuments: async (id: string, files: File[]) => {
          set({ claimsLoading: true, claimsError: null });
          try {
            const response = await apiService.claims.uploadDocuments(id, files);
            set({
              currentClaim: response.data,
              claims: get().claims.map(claim =>
                claim.id === id ? response.data : claim
              ),
              claimsLoading: false,
            });
          } catch (error: any) {
            set({
              claimsError: error.response?.data?.message || 'Document upload failed',
              claimsLoading: false,
            });
            throw error;
          }
        },

        // Certificate actions
        fetchCertificates: async (params?: Record<string, any>) => {
          set({ certificatesLoading: true, certificatesError: null });
          try {
            const response = await apiService.certificates.list(params);
            set({ certificates: response.data, certificatesLoading: false });
          } catch (error: any) {
            set({
              certificatesError: error.response?.data?.message || 'Failed to fetch certificates',
              certificatesLoading: false,
            });
            throw error;
          }
        },

        generateCertificate: async (claimId: string) => {
          set({ certificatesLoading: true, certificatesError: null });
          try {
            const response = await apiService.certificates.generate(claimId);
            const { user } = get();
            
            // Generate verification URL
            const verificationUrl = `${window.location.origin}/verify/${response.data.id}`;
            
            // Generate certificate with seal
            const certificate = {
              ...response.data,
              seal: {
                timestamp: new Date().toISOString(),
                username: user?.name || 'System',
                verifiedBy: user?.name || 'System',
              },
              verificationUrl,
            };

            set({
              certificates: [...get().certificates, certificate],
              certificatesLoading: false,
            });

            return certificate;
          } catch (error: any) {
            set({
              certificatesError: error.response?.data?.message || 'Certificate generation failed',
              certificatesLoading: false,
            });
            throw error;
          }
        },

        downloadCertificate: async (id: string) => {
          try {
            const certificate = get().certificates.find(c => c.id === id);
            if (!certificate) {
              throw new Error('Certificate not found');
            }

            const { user } = get();
            const { generateCertificatePDF } = await import('../services/certificateService');

            const pdfBlob = await generateCertificatePDF({
              certificate,
              username: user?.name || 'System',
              verificationUrl: certificate.verificationUrl,
            });

            // Create download link
            const url = window.URL.createObjectURL(pdfBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `certificate-${certificate.id}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            // Update certificate with download timestamp
            set({
              certificates: get().certificates.map(cert =>
                cert.id === id
                  ? {
                      ...cert,
                      seal: {
                        ...cert.seal!,
                        lastDownloaded: new Date().toISOString(),
                      },
                    }
                  : cert
              ),
            });
          } catch (error: any) {
            set({
              certificatesError: error.message || 'Certificate download failed',
            });
            throw error;
          }
        },

        verifyCertificate: async (id: string, sealData: string) => {
          set({ certificatesLoading: true, certificatesError: null });
          try {
            const { verifyCertificateSeal } = await import('../services/certificateService');
            const verification = await verifyCertificateSeal(id, sealData);

            if (!verification.isValid) {
              throw new Error('Invalid certificate seal');
            }

            const response = await apiService.certificates.verify(id);
            const updatedCertificate = {
              ...response.data,
              seal: verification.details,
            };

            set({
              currentCertificate: updatedCertificate,
              certificates: get().certificates.map(cert =>
                cert.id === id ? updatedCertificate : cert
              ),
              certificatesLoading: false,
            });

            return verification;
          } catch (error: any) {
            set({
              certificatesError: error.message || 'Certificate verification failed',
              certificatesLoading: false,
            });
            throw error;
          }
        },

        // Insurer actions
        fetchInsurers: async (params?: Record<string, any>) => {
          set({ insurersLoading: true, insurersError: null });
          try {
            const response = await apiService.insurers.list(params);
            set({ insurers: response.data, insurersLoading: false });
          } catch (error: any) {
            set({
              insurersError: error.response?.data?.message || 'Failed to fetch insurers',
              insurersLoading: false,
            });
            throw error;
          }
        },

        fetchInsurerDetails: async (id: string) => {
          set({ insurersLoading: true, insurersError: null });
          try {
            const response = await apiService.insurers.details(id);
            set({ currentInsurer: response.data, insurersLoading: false });
          } catch (error: any) {
            set({
              insurersError: error.response?.data?.message || 'Failed to fetch insurer details',
              insurersLoading: false,
            });
            throw error;
          }
        },

        updateInsurerSettings: async (id: string, settings: Partial<InsurerSettings>) => {
          set({ insurersLoading: true, insurersError: null });
          try {
            const response = await apiService.insurers.updateSettings(id, settings);
            set({
              currentInsurer: response.data,
              insurers: get().insurers.map(insurer =>
                insurer.id === id ? response.data : insurer
              ),
              insurersLoading: false,
            });
          } catch (error: any) {
            set({
              insurersError: error.response?.data?.message || 'Settings update failed',
              insurersLoading: false,
            });
            throw error;
          }
        },
      }),
      {
        name: 'detachd-store',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
); 