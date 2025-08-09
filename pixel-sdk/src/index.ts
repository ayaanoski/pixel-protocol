import { SmartContractClient } from './clients/smartContractClient';
import { SubgraphClient } from './clients/subgraphClient';
import { ZKPClient } from './clients/zkpClient';
import { WalletClient } from './utils/wallet';
import type { 
  PixelProtocolConfig, 
  Credential, 
  ReputationScore, 
  ZKProof, 
  ProofInput 
} from './types';

export class PixelProtocol {
  private config: PixelProtocolConfig;
  public contracts: SmartContractClient;
  public subgraph: SubgraphClient;
  public zkp: ZKPClient;
  public wallet: WalletClient;

  constructor(config: PixelProtocolConfig) {
    this.config = config;
    this.contracts = new SmartContractClient(config);
    this.subgraph = new SubgraphClient(config);
    this.zkp = new ZKPClient(config);
    this.wallet = new WalletClient(config);
  }

  // High-level convenience methods
  async getReputationProfile(userAddress: string): Promise<{
    credentials: Credential[];
    score: ReputationScore;
  }> {
    const [credentials, score] = await Promise.all([
      this.subgraph.getUserCredentials(userAddress),
      this.contracts.calculateScore(userAddress, 'default')
    ]);

    return { credentials, score };
  }

  async proveCredentialOwnership(
    credentialId: string,
    statement: string
  ): Promise<ZKProof> {
    const credentials = await this.contracts.getCredentials(this.wallet.getAddress() || '');
    const credential = credentials.find(c => c.id === credentialId);
    
    if (!credential) {
      throw new Error('Credential not found');
    }

    return this.zkp.createCredentialProof(
      credentialId,
      credential.data,
      statement
    );
  }

  async proveReputationScore(
    threshold: number,
    algorithmID: string = 'default'
  ): Promise<ZKProof> {
    const userAddress = this.wallet.getAddress();
    if (!userAddress) {
      throw new Error('Wallet not connected');
    }

    const score = await this.contracts.calculateScore(userAddress, algorithmID);
    return this.zkp.createScoreProof(
      score.score,
      threshold,
      { algorithmID, timestamp: score.timestamp }
    );
  }

  // Initializes the SDK with required proving keys and other setup
  async initialize(): Promise<void> {
    // Add any initialization logic here
    await this.wallet.connectWallet();
    await this.wallet.switchChain();
    // Add proving key initialization for ZKP client
  }
}

// Export types
export type {
  PixelProtocolConfig,
  Credential,
  ReputationScore,
  ZKProof,
  ProofInput
};

// Export clients individually for advanced usage
export { SmartContractClient, SubgraphClient, ZKPClient, WalletClient };
