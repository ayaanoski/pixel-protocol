import { ethers } from 'ethers';
import type { PixelProtocolConfig, Credential, ReputationScore } from '../types';

const CREDENTIAL_ISSUER_ABI = [
  'event CredentialIssued(address indexed user, string indexed issuerID, string credentialType, bytes data)',
  'function issueCredential(address user, string issuerID, string credentialType, bytes data)',
  'function revokeCredential(string credentialId)',
  'function verifyCredential(string credentialId) view returns (bool)'
];

const REPUTATION_CALCULATOR_ABI = [
  'function calculateScore(address user, string algorithmID) view returns (uint256)',
  'function getCredentials(address user) view returns (tuple(string id, string issuerID, string credentialType, bytes data)[])',
  'function updateAlgorithm(string algorithmID, bytes algorithm)'
];

export class SmartContractClient {
  private provider: ethers.JsonRpcProvider;
  private credentialIssuer: ethers.Contract;
  private reputationCalculator: ethers.Contract;

  constructor(config: PixelProtocolConfig) {
    this.provider = new ethers.JsonRpcProvider(config.rpcUrl);
    this.credentialIssuer = new ethers.Contract(
      config.credentialIssuerAddress,
      CREDENTIAL_ISSUER_ABI,
      this.provider
    );
    this.reputationCalculator = new ethers.Contract(
      config.reputationCalculatorAddress,
      REPUTATION_CALCULATOR_ABI,
      this.provider
    );
  }

  async issueCredential(
    userAddress: string,
    issuerID: string,
    credentialType: string,
    data: Record<string, any>
  ): Promise<string> {
    const encodedData = ethers.hexlify(ethers.toUtf8Bytes(JSON.stringify(data)));
    const tx = await this.credentialIssuer.issueCredential(
      userAddress,
      issuerID,
      credentialType,
      encodedData
    );
    const receipt = await tx.wait();
    const event = receipt.events?.find((e: { event: string }) => e.event === 'CredentialIssued');
    return event?.args?.credentialId || '';
  }

  async verifyCredential(credentialId: string): Promise<boolean> {
    return this.credentialIssuer.verifyCredential(credentialId);
  }

  async revokeCredential(credentialId: string): Promise<void> {
    const tx = await this.credentialIssuer.revokeCredential(credentialId);
    await tx.wait();
  }

  async calculateScore(userAddress: string, algorithmID: string): Promise<ReputationScore> {
    const score = await this.reputationCalculator.calculateScore(userAddress, algorithmID);
    return {
      score: Number(score),
      algorithmID,
      timestamp: Math.floor(Date.now() / 1000)
    };
  }

  async getCredentials(userAddress: string): Promise<Credential[]> {
    const rawCredentials = await this.reputationCalculator.getCredentials(userAddress);
    return rawCredentials.map((cred: any) => ({
      id: cred.id,
      userAddress,
      issuerID: cred.issuerID,
      credentialType: cred.credentialType,
      data: JSON.parse(ethers.toUtf8String(cred.data)),
      timestamp: Math.floor(Date.now() / 1000)
    }));
  }

  async updateAlgorithm(algorithmID: string, algorithm: string): Promise<void> {
    const tx = await this.reputationCalculator.updateAlgorithm(
      algorithmID,
      ethers.hexlify(ethers.toUtf8Bytes(algorithm))
    );
    await tx.wait();
  }
}
