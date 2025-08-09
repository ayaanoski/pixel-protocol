interface Credential {
    id: string;
    userAddress: string;
    issuerID: string;
    credentialType: string;
    timestamp: number;
    data: Record<string, any>;
}
interface ReputationScore {
    score: number;
    algorithmID: string;
    timestamp: number;
}
interface ZKProof {
    proof: string;
    publicSignals: string[];
}
interface PixelProtocolConfig {
    rpcUrl: string;
    chainId: number;
    credentialIssuerAddress: string;
    reputationCalculatorAddress: string;
    zkpVerifierAddress: string;
    subgraphUrl: string;
}
interface ProofInput {
    privateInputs: Record<string, any>;
    publicInputs: Record<string, any>;
}

declare class SmartContractClient {
    private provider;
    private credentialIssuer;
    private reputationCalculator;
    constructor(config: PixelProtocolConfig);
    issueCredential(userAddress: string, issuerID: string, credentialType: string, data: Record<string, any>): Promise<string>;
    verifyCredential(credentialId: string): Promise<boolean>;
    revokeCredential(credentialId: string): Promise<void>;
    calculateScore(userAddress: string, algorithmID: string): Promise<ReputationScore>;
    getCredentials(userAddress: string): Promise<Credential[]>;
    updateAlgorithm(algorithmID: string, algorithm: string): Promise<void>;
}

declare class SubgraphClient {
    private client;
    constructor(config: PixelProtocolConfig);
    getUserCredentials(userAddress: string): Promise<Credential[]>;
    getIssuerCredentials(issuerID: string): Promise<Credential[]>;
    searchCredentials(query: {
        userAddress?: string;
        issuerID?: string;
        credentialType?: string;
        fromTimestamp?: number;
        toTimestamp?: number;
    }): Promise<Credential[]>;
}

declare class ZKPClient {
    private verifierContract;
    private provingKey?;
    private wasmFile?;
    constructor(config: PixelProtocolConfig);
    setProvingKey(key: string | Uint8Array): Promise<void>;
    setWasmFile(wasm: string | Uint8Array): Promise<void>;
    generateProof(input: ProofInput): Promise<ZKProof>;
    verifyProof(proof: ZKProof): Promise<boolean>;
    verifyBatch(proofs: ZKProof[]): Promise<boolean>;
    createCredentialProof(credentialId: string, privateData: Record<string, any>, publicStatement: string): Promise<ZKProof>;
    createScoreProof(score: number, threshold: number, privateData: Record<string, any>): Promise<ZKProof>;
}

declare class WalletClient {
    private config;
    constructor(config: PixelProtocolConfig);
    private initializeWagmi;
    connectWallet(connector?: 'metamask' | 'walletconnect'): Promise<void>;
    disconnectWallet(): Promise<void>;
    getAddress(): string | undefined;
    isConnected(): boolean;
    switchChain(): Promise<void>;
}

declare class PixelProtocol {
    private config;
    contracts: SmartContractClient;
    subgraph: SubgraphClient;
    zkp: ZKPClient;
    wallet: WalletClient;
    constructor(config: PixelProtocolConfig);
    getReputationProfile(userAddress: string): Promise<{
        credentials: Credential[];
        score: ReputationScore;
    }>;
    proveCredentialOwnership(credentialId: string, statement: string): Promise<ZKProof>;
    proveReputationScore(threshold: number, algorithmID?: string): Promise<ZKProof>;
    initialize(): Promise<void>;
}

export { Credential, PixelProtocol, PixelProtocolConfig, ProofInput, ReputationScore, SmartContractClient, SubgraphClient, WalletClient, ZKPClient, ZKProof };
