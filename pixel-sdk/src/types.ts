export interface Credential {
  id: string;
  userAddress: string;
  issuerID: string;
  credentialType: string;
  timestamp: number;
  data: Record<string, any>;
}

export interface ReputationScore {
  score: number;
  algorithmID: string;
  timestamp: number;
}

export interface ZKProof {
  proof: string;
  publicSignals: string[];
}

export interface PixelProtocolConfig {
  rpcUrl: string;
  chainId: number;
  credentialIssuerAddress: string;
  reputationCalculatorAddress: string;
  zkpVerifierAddress: string;
  subgraphUrl: string;
}

export interface ProvingKey {
  data: Uint8Array;
  curve: string;
}

export interface ProofInput {
  privateInputs: Record<string, any>;
  publicInputs: Record<string, any>;
}
