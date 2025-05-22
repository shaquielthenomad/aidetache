import { ethers } from 'ethers';
import { Certificate } from '../store';

// Enhanced Smart Contract ABI
const CERTIFICATE_VERIFICATION_ABI = [
  "function verifyCertificate(bytes32 certificateHash) public view returns (bool)",
  "function registerCertificate(bytes32 certificateHash, address owner, uint256 timestamp) public",
  "function getCertificateDetails(bytes32 certificateHash) public view returns (address, uint256, bool)",
  
  "function batchRegisterCertificates(bytes32[] certificateHashes, address[] owners, uint256[] timestamps) public",
  "function revokeCertificate(bytes32 certificateHash, string reason) public",
  "function updateCertificateStatus(bytes32 certificateHash, bool isValid) public",
  
  "event CertificateRegistered(bytes32 indexed certificateHash, address indexed owner, uint256 timestamp)",
  "event CertificateRevoked(bytes32 indexed certificateHash, address indexed revokedBy, string reason, uint256 timestamp)",
  "event CertificateStatusUpdated(bytes32 indexed certificateHash, bool isValid, uint256 timestamp)",
  "event BatchRegistrationCompleted(uint256 count, uint256 timestamp)"
];

interface BlockchainConfig {
  contractAddress: string;
  network: 'mainnet' | 'goerli' | 'sepolia';
  providerUrl: string;
  gasLimit?: number;
  maxPriorityFeePerGas?: string;
  maxFeePerGas?: string;
}

interface GasEstimate {
  gasLimit: number;
  maxPriorityFeePerGas: string;
  maxFeePerGas: string;
}

export class BlockchainService {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;
  private wallet: ethers.Wallet;
  private gasConfig: GasEstimate;

  constructor(config: BlockchainConfig) {
    this.provider = new ethers.JsonRpcProvider(config.providerUrl);
    this.contract = new ethers.Contract(
      config.contractAddress,
      CERTIFICATE_VERIFICATION_ABI,
      this.provider
    );
    
    const privateKey = import.meta.env.VITE_BLOCKCHAIN_PRIVATE_KEY;
    if (!privateKey) {
      throw new Error('Blockchain private key not configured');
    }
    this.wallet = new ethers.Wallet(privateKey, this.provider);

    // Initialize gas configuration
    this.gasConfig = {
      gasLimit: config.gasLimit || 300000,
      maxPriorityFeePerGas: config.maxPriorityFeePerGas || '1500000000', // 1.5 Gwei
      maxFeePerGas: config.maxFeePerGas || '30000000000', // 30 Gwei
    };
  }

  private async estimateGas(transaction: ethers.ContractTransaction): Promise<GasEstimate> {
    try {
      const gasLimit = await transaction.estimateGas();
      const feeData = await this.provider.getFeeData();

      return {
        gasLimit: Math.ceil(gasLimit * 1.2), // Add 20% buffer
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas?.toString() || this.gasConfig.maxPriorityFeePerGas,
        maxFeePerGas: feeData.maxFeePerGas?.toString() || this.gasConfig.maxFeePerGas,
      };
    } catch (error) {
      console.warn('Gas estimation failed, using default values:', error);
      return this.gasConfig;
    }
  }

  async registerCertificate(certificate: Certificate): Promise<string> {
    try {
      const certificateData = {
        id: certificate.id,
        claimId: certificate.claimId,
        userId: certificate.userId,
        timestamp: new Date().getTime(),
        seal: certificate.seal
      };
      
      const certificateHash = ethers.keccak256(
        ethers.toUtf8Bytes(JSON.stringify(certificateData))
      );

      const contractWithSigner = this.contract.connect(this.wallet);
      
      // Prepare transaction with gas optimization
      const tx = await contractWithSigner.registerCertificate.populateTransaction(
        certificateHash,
        certificate.userId,
        certificateData.timestamp
      );

      // Estimate gas and update transaction
      const gasEstimate = await this.estimateGas(
        contractWithSigner.registerCertificate(
          certificateHash,
          certificate.userId,
          certificateData.timestamp
        )
      );

      // Update transaction with gas parameters
      tx.gasLimit = gasEstimate.gasLimit;
      tx.maxPriorityFeePerGas = gasEstimate.maxPriorityFeePerGas;
      tx.maxFeePerGas = gasEstimate.maxFeePerGas;

      // Send transaction
      const response = await this.wallet.sendTransaction(tx);
      const receipt = await response.wait();

      // Emit custom event for monitoring
      this.emitCustomEvent('CertificateRegistered', {
        certificateHash,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
      });

      return certificateHash;
    } catch (error) {
      console.error('Error registering certificate:', error);
      throw new Error('Failed to register certificate on blockchain');
    }
  }

  async batchRegisterCertificates(certificates: Certificate[]): Promise<string[]> {
    try {
      const contractWithSigner = this.contract.connect(this.wallet);
      
      // Prepare batch data
      const certificateHashes = await Promise.all(
        certificates.map(async (cert) => {
          const data = {
            id: cert.id,
            claimId: cert.claimId,
            userId: cert.userId,
            timestamp: new Date().getTime(),
            seal: cert.seal
          };
          return ethers.keccak256(ethers.toUtf8Bytes(JSON.stringify(data)));
        })
      );

      const owners = certificates.map(cert => cert.userId);
      const timestamps = certificates.map(() => new Date().getTime());

      // Prepare transaction with gas optimization
      const tx = await contractWithSigner.batchRegisterCertificates.populateTransaction(
        certificateHashes,
        owners,
        timestamps
      );

      // Estimate gas for batch operation
      const gasEstimate = await this.estimateGas(
        contractWithSigner.batchRegisterCertificates(
          certificateHashes,
          owners,
          timestamps
        )
      );

      // Update transaction with gas parameters
      tx.gasLimit = gasEstimate.gasLimit;
      tx.maxPriorityFeePerGas = gasEstimate.maxPriorityFeePerGas;
      tx.maxFeePerGas = gasEstimate.maxFeePerGas;

      // Send transaction
      const response = await this.wallet.sendTransaction(tx);
      const receipt = await response.wait();

      // Emit custom event for monitoring
      this.emitCustomEvent('BatchRegistrationCompleted', {
        count: certificates.length,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
      });

      return certificateHashes;
    } catch (error) {
      console.error('Error batch registering certificates:', error);
      throw new Error('Failed to batch register certificates on blockchain');
    }
  }

  async revokeCertificate(certificateHash: string, reason: string): Promise<void> {
    try {
      const contractWithSigner = this.contract.connect(this.wallet);
      
      // Prepare transaction with gas optimization
      const tx = await contractWithSigner.revokeCertificate.populateTransaction(
        certificateHash,
        reason
      );

      const gasEstimate = await this.estimateGas(
        contractWithSigner.revokeCertificate(certificateHash, reason)
      );

      tx.gasLimit = gasEstimate.gasLimit;
      tx.maxPriorityFeePerGas = gasEstimate.maxPriorityFeePerGas;
      tx.maxFeePerGas = gasEstimate.maxFeePerGas;

      const response = await this.wallet.sendTransaction(tx);
      const receipt = await response.wait();

      this.emitCustomEvent('CertificateRevoked', {
        certificateHash,
        reason,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
      });
    } catch (error) {
      console.error('Error revoking certificate:', error);
      throw new Error('Failed to revoke certificate on blockchain');
    }
  }

  async getCertificateEvents(certificateHash: string): Promise<Array<{
    type: string;
    timestamp: number;
    transactionHash: string;
    details: any;
  }>> {
    try {
      const events = await Promise.all([
        this.contract.queryFilter(this.contract.filters.CertificateRegistered(certificateHash)),
        this.contract.queryFilter(this.contract.filters.CertificateRevoked(certificateHash)),
        this.contract.queryFilter(this.contract.filters.CertificateStatusUpdated(certificateHash))
      ]);

      return events.flat().map(event => {
        const block = await event.getBlock();
        return {
          type: event.event || 'Unknown',
          timestamp: block.timestamp,
          transactionHash: event.transactionHash,
          details: event.args
        };
      }).sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error('Error fetching certificate events:', error);
      throw new Error('Failed to fetch certificate events');
    }
  }

  private emitCustomEvent(eventName: string, data: any): void {
    // Implement custom event emission for monitoring
    const event = new CustomEvent(`blockchain:${eventName}`, {
      detail: {
        ...data,
        timestamp: new Date().toISOString(),
        network: this.provider.network.name
      }
    });
    window.dispatchEvent(event);
  }

  async verifyCertificate(certificateHash: string): Promise<{
    isValid: boolean;
    owner: string;
    timestamp: number;
  }> {
    try {
      const [owner, timestamp, isValid] = await this.contract.getCertificateDetails(certificateHash);
      
      return {
        isValid,
        owner: owner.toString(),
        timestamp: timestamp.toNumber()
      };
    } catch (error) {
      console.error('Error verifying certificate on blockchain:', error);
      throw new Error('Failed to verify certificate on blockchain');
    }
  }

  async getCertificateHistory(certificateHash: string): Promise<{
    events: Array<{
      type: string;
      timestamp: number;
      transactionHash: string;
    }>;
  }> {
    try {
      const filter = this.contract.filters.CertificateRegistered(certificateHash);
      const events = await this.contract.queryFilter(filter);
      
      return {
        events: events.map(event => ({
          type: 'CertificateRegistered',
          timestamp: event.args?.timestamp.toNumber(),
          transactionHash: event.transactionHash
        }))
      };
    } catch (error) {
      console.error('Error fetching certificate history:', error);
      throw new Error('Failed to fetch certificate history');
    }
  }
}

// Export singleton instance with enhanced configuration
export const blockchainService = new BlockchainService({
  contractAddress: import.meta.env.VITE_BLOCKCHAIN_CONTRACT_ADDRESS,
  network: import.meta.env.VITE_BLOCKCHAIN_NETWORK as 'mainnet' | 'goerli' | 'sepolia',
  providerUrl: import.meta.env.VITE_BLOCKCHAIN_PROVIDER_URL,
  gasLimit: parseInt(import.meta.env.VITE_BLOCKCHAIN_GAS_LIMIT || '300000'),
  maxPriorityFeePerGas: import.meta.env.VITE_BLOCKCHAIN_MAX_PRIORITY_FEE || '1500000000',
  maxFeePerGas: import.meta.env.VITE_BLOCKCHAIN_MAX_FEE || '30000000000'
}); 