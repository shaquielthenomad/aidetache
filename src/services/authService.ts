import { Auth0Client } from '@auth0/auth0-spa-js';
import { createContext, useContext, useEffect, useState } from 'react';

// Auth0 configuration
const auth0Config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  authorizationParams: {
    redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    scope: import.meta.env.VITE_AUTH0_SCOPE,
  },
  cacheLocation: 'localstorage' as const,
};

// Initialize Auth0 client
const auth0Client = new Auth0Client(auth0Config);

// Auth context interface
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | undefined>;
  handleRedirectCallback: () => Promise<void>;
}

// Create auth context
const AuthContext = createContext<AuthContextType | null>(null);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check if we're handling a redirect
        if (window.location.search.includes('code=')) {
          await handleRedirectCallback();
        }

        // Check authentication status
        const authenticated = await auth0Client.isAuthenticated();
        setIsAuthenticated(authenticated);

        if (authenticated) {
          const userProfile = await auth0Client.getUser();
          setUser(userProfile);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async () => {
    try {
      await auth0Client.loginWithRedirect();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth0Client.logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const getToken = async () => {
    try {
      return await auth0Client.getTokenSilently();
    } catch (error) {
      console.error('Get token error:', error);
      return undefined;
    }
  };

  const handleRedirectCallback = async () => {
    try {
      await auth0Client.handleRedirectCallback();
      const authenticated = await auth0Client.isAuthenticated();
      setIsAuthenticated(authenticated);

      if (authenticated) {
        const userProfile = await auth0Client.getUser();
        setUser(userProfile);
      }
    } catch (error) {
      console.error('Redirect callback error:', error);
      throw error;
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    getToken,
    handleRedirectCallback,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth service class for non-React components
export class AuthService {
  private static instance: AuthService;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(): Promise<void> {
    await auth0Client.loginWithRedirect();
  }

  async logout(): Promise<void> {
    await auth0Client.logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }

  async getToken(): Promise<string | undefined> {
    try {
      return await auth0Client.getTokenSilently();
    } catch (error) {
      console.error('Get token error:', error);
      return undefined;
    }
  }

  async getUser(): Promise<any> {
    try {
      return await auth0Client.getUser();
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    return await auth0Client.isAuthenticated();
  }
}

// Export singleton instance
export const authService = AuthService.getInstance(); 