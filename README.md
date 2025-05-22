# AideTache - Certificate Management System

A secure and intelligent certificate management system with blockchain verification and AI-powered fraud detection.

## Features

- **Secure Certificate Management**
  - Blockchain-based verification
  - AI-powered fraud detection
  - Digital signatures and QR codes
  - Tamper-evident seals

- **Enterprise Authentication**
  - Azure AD B2C integration
  - Multi-factor authentication
  - Role-based access control
  - Secure token management

- **AI-Powered Verification**
  - Image analysis for tampering detection
  - Text analytics for content verification
  - Risk scoring and recommendations
  - Automated fraud detection

- **Blockchain Integration**
  - Smart contract-based verification
  - Immutable certificate records
  - Transparent audit trail
  - Decentralized storage

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- Azure subscription
- Ethereum wallet (for blockchain features)
- Vercel account

## Environment Setup

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Configure environment variables:
   - Azure AD B2C credentials
   - Azure AI Services keys
   - Blockchain network settings
   - API endpoints

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Run tests:
   ```bash
   npm test
   ```

## Deployment to Vercel

1. **Prepare for Deployment**
   - Ensure all environment variables are configured in Vercel
   - Set up build settings in `vercel.json`:
     ```json
     {
       "buildCommand": "npm run build",
       "outputDirectory": "dist",
       "framework": "vite",
       "rewrites": [
         {
           "source": "/(.*)",
           "destination": "/index.html"
         }
       ]
     }
     ```

2. **Deploy to Vercel**
   - Install Vercel CLI:
     ```bash
     npm i -g vercel
     ```
   - Login to Vercel:
     ```bash
     vercel login
     ```
   - Deploy:
     ```bash
     vercel
     ```

3. **Production Deployment**
   - Deploy to production:
     ```bash
     vercel --prod
     ```

4. **Environment Variables**
   - Set up environment variables in Vercel dashboard:
     - Go to Project Settings > Environment Variables
     - Add all variables from `.env.example`
     - Ensure sensitive keys are properly secured

5. **Domain Configuration**
   - Add custom domain in Vercel dashboard
   - Configure DNS settings
   - Enable HTTPS

## Security Considerations

- **Azure AD B2C**
  - Configure user flows and policies
  - Set up application registration
  - Implement proper scopes and permissions

- **Blockchain Security**
  - Secure private key management
  - Smart contract auditing
  - Network selection (mainnet/testnet)

- **AI Services**
  - Rate limiting
  - Data privacy compliance
  - Secure API key management

## Monitoring and Maintenance

- **Vercel Analytics**
  - Enable Vercel Analytics for performance monitoring
  - Set up error tracking
  - Monitor API usage

- **Azure Monitor**
  - Set up Application Insights
  - Configure alerts
  - Monitor AI service usage

- **Blockchain Monitoring**
  - Track smart contract events
  - Monitor gas usage
  - Set up transaction alerts

## Support

For support, please contact:
- Technical Support: support@aidetache.com
- Security Issues: security@aidetache.com

## License

MIT License - see LICENSE file for details