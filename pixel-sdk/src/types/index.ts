export interface PixelProtocolConfig {
  rpcUrl: string;
  zkpVerifierAddress: string;
  chainId: number;
  credentialIssuerAddress: string;
  reputationCalculatorAddress: string;
  subgraphUrl: string;
}

export interface ZKProof {
  proof: string;
  publicSignals: string[];
}

export interface ProofInput {
  privateInputs: Record<string, any>;
  publicInputs: Record<string, any>;
}
