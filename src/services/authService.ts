import { PublicClientApplication, AuthenticationResult, AccountInfo } from '@azure/msal-browser';
import { MsalProvider, useMsal } from '@azure/msal-react';
import { Certificate } from '../store';

// Azure AD B2C Configuration
const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
    authority: `https://${import.meta.env.VITE_AZURE_TENANT_NAME}.b2clogin.com/${import.meta.env.VITE_AZURE_TENANT_NAME}.onmicrosoft.com/${import.meta.env.VITE_AZURE_POLICY_NAME}`,
    knownAuthorities: [`${import.meta.env.VITE_AZURE_TENANT_NAME}.b2clogin.com`],
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: number, message: string, containsPii: boolean) => {
        if (containsPii) return;
        switch (level) {
          case 0:
            console.error(message);
            break;
          case 1:
            console.warn(message);
            break;
          case 2:
            console.info(message);
            break;
          case 3:
            console.debug(message);
            break;
          default:
            console.log(message);
        }
      },
      logLevel: 3,
    },
  },
};

// Initialize MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

export class AuthService {
  private static instance: AuthService;
  private msalInstance: PublicClientApplication;

  private constructor() {
    this.msalInstance = msalInstance;
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(): Promise<AuthenticationResult> {
    try {
      const loginRequest = {
        scopes: ['openid', 'profile', 'email', 'api://your-api-scope/access'],
      };

      const response = await this.msalInstance.loginPopup(loginRequest);
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Authentication failed');
    }
  }

  async logout(): Promise<void> {
    try {
      await this.msalInstance.logoutPopup();
    } catch (error) {
      console.error('Logout failed:', error);
      throw new Error('Logout failed');
    }
  }

  async getToken(): Promise<string> {
    try {
      const account = this.msalInstance.getAllAccounts()[0];
      if (!account) {
        throw new Error('No active account');
      }

      const tokenRequest = {
        scopes: ['api://your-api-scope/access'],
        account: account,
      };

      const response = await this.msalInstance.acquireTokenSilent(tokenRequest);
      return response.accessToken;
    } catch (error) {
      console.error('Token acquisition failed:', error);
      throw new Error('Failed to acquire token');
    }
  }

  async getUserInfo(): Promise<AccountInfo | null> {
    const accounts = this.msalInstance.getAllAccounts();
    return accounts[0] || null;
  }

  async isAuthenticated(): Promise<boolean> {
    const account = await this.getUserInfo();
    return !!account;
  }
}

// Export singleton instance
export const authService = AuthService.getInstance();

// Export MSAL Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <MsalProvider instance={msalInstance}>
      {children}
    </MsalProvider>
  );
};

// Custom hook for authentication
export const useAuth = () => {
  const { instance, accounts, inProgress } = useMsal();
  const account = accounts[0];

  return {
    isAuthenticated: !!account,
    user: account,
    login: () => instance.loginPopup(),
    logout: () => instance.logoutPopup(),
    getToken: async () => {
      if (!account) throw new Error('No active account');
      const response = await instance.acquireTokenSilent({
        scopes: ['api://your-api-scope/access'],
        account,
      });
      return response.accessToken;
    },
    isLoading: inProgress !== 'none',
  };
}; 