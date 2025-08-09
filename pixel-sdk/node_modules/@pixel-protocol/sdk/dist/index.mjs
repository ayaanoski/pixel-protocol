// src/clients/smartContractClient.ts
import { ethers } from "ethers";
var CREDENTIAL_ISSUER_ABI = [
  "event CredentialIssued(address indexed user, string indexed issuerID, string credentialType, bytes data)",
  "function issueCredential(address user, string issuerID, string credentialType, bytes data)",
  "function revokeCredential(string credentialId)",
  "function verifyCredential(string credentialId) view returns (bool)"
];
var REPUTATION_CALCULATOR_ABI = [
  "function calculateScore(address user, string algorithmID) view returns (uint256)",
  "function getCredentials(address user) view returns (tuple(string id, string issuerID, string credentialType, bytes data)[])",
  "function updateAlgorithm(string algorithmID, bytes algorithm)"
];
var SmartContractClient = class {
  constructor(config) {
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
  async issueCredential(userAddress, issuerID, credentialType, data) {
    const encodedData = ethers.hexlify(ethers.toUtf8Bytes(JSON.stringify(data)));
    const tx = await this.credentialIssuer.issueCredential(
      userAddress,
      issuerID,
      credentialType,
      encodedData
    );
    const receipt = await tx.wait();
    const event = receipt.events?.find((e) => e.event === "CredentialIssued");
    return event?.args?.credentialId || "";
  }
  async verifyCredential(credentialId) {
    return this.credentialIssuer.verifyCredential(credentialId);
  }
  async revokeCredential(credentialId) {
    const tx = await this.credentialIssuer.revokeCredential(credentialId);
    await tx.wait();
  }
  async calculateScore(userAddress, algorithmID) {
    const score = await this.reputationCalculator.calculateScore(userAddress, algorithmID);
    return {
      score: Number(score),
      algorithmID,
      timestamp: Math.floor(Date.now() / 1e3)
    };
  }
  async getCredentials(userAddress) {
    const rawCredentials = await this.reputationCalculator.getCredentials(userAddress);
    return rawCredentials.map((cred) => ({
      id: cred.id,
      userAddress,
      issuerID: cred.issuerID,
      credentialType: cred.credentialType,
      data: JSON.parse(ethers.toUtf8String(cred.data)),
      timestamp: Math.floor(Date.now() / 1e3)
    }));
  }
  async updateAlgorithm(algorithmID, algorithm) {
    const tx = await this.reputationCalculator.updateAlgorithm(
      algorithmID,
      ethers.hexlify(ethers.toUtf8Bytes(algorithm))
    );
    await tx.wait();
  }
};

// src/clients/subgraphClient.ts
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
var GET_USER_CREDENTIALS = gql`
  query GetUserCredentials($userAddress: String!) {
    credentials(where: { userAddress: $userAddress }) {
      id
      userAddress
      issuerID
      credentialType
      data
      timestamp
    }
  }
`;
var GET_ISSUER_CREDENTIALS = gql`
  query GetIssuerCredentials($issuerID: String!) {
    credentials(where: { issuerID: $issuerID }) {
      id
      userAddress
      issuerID
      credentialType
      data
      timestamp
    }
  }
`;
var SubgraphClient = class {
  constructor(config) {
    this.client = new ApolloClient({
      uri: config.subgraphUrl,
      cache: new InMemoryCache()
    });
  }
  async getUserCredentials(userAddress) {
    const { data } = await this.client.query({
      query: GET_USER_CREDENTIALS,
      variables: { userAddress: userAddress.toLowerCase() }
    });
    return data.credentials.map((cred) => ({
      ...cred,
      data: JSON.parse(cred.data)
    }));
  }
  async getIssuerCredentials(issuerID) {
    const { data } = await this.client.query({
      query: GET_ISSUER_CREDENTIALS,
      variables: { issuerID }
    });
    return data.credentials.map((cred) => ({
      ...cred,
      data: JSON.parse(cred.data)
    }));
  }
  async searchCredentials(query) {
    const whereClause = Object.entries(query).filter(([_, value]) => value !== void 0).reduce((acc, [key, value]) => {
      if (key === "fromTimestamp") {
        return { ...acc, timestamp_gte: value };
      }
      if (key === "toTimestamp") {
        return { ...acc, timestamp_lte: value };
      }
      return { ...acc, [key]: value };
    }, {});
    const { data } = await this.client.query({
      query: gql`
        query SearchCredentials($where: Credential_filter!) {
          credentials(where: $where) {
            id
            userAddress
            issuerID
            credentialType
            data
            timestamp
          }
        }
      `,
      variables: { where: whereClause }
    });
    return data.credentials.map((cred) => ({
      ...cred,
      data: JSON.parse(cred.data)
    }));
  }
};

// src/clients/zkpClient.ts
import * as snarkjs from "snarkjs";
import { ethers as ethers2 } from "ethers";
var ZKP_VERIFIER_ABI = [
  "function verifyProof(bytes proof, uint256[] calldata publicSignals) view returns (bool)",
  "function verifyBatch(bytes[] proofs, uint256[][] calldata publicSignals) view returns (bool)"
];
var ZKPClient = class {
  constructor(config) {
    const provider = new ethers2.JsonRpcProvider(config.rpcUrl);
    this.verifierContract = new ethers2.Contract(
      config.zkpVerifierAddress,
      ZKP_VERIFIER_ABI,
      provider
    );
  }
  async setProvingKey(key) {
    this.provingKey = key;
  }
  async setWasmFile(wasm) {
    this.wasmFile = wasm;
  }
  async generateProof(input) {
    if (!this.provingKey || !this.wasmFile) {
      throw new Error("Proving key and WASM file must be set");
    }
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
      input.privateInputs,
      this.wasmFile,
      this.provingKey
    );
    return {
      proof: JSON.stringify(proof),
      publicSignals: publicSignals.map(String)
    };
  }
  async verifyProof(proof) {
    return this.verifierContract.verifyProof(
      ethers2.hexlify(ethers2.toUtf8Bytes(proof.proof)),
      proof.publicSignals.map((s) => ethers2.toBigInt(s))
    );
  }
  async verifyBatch(proofs) {
    const formattedProofs = proofs.map(
      (p) => ethers2.hexlify(ethers2.toUtf8Bytes(p.proof))
    );
    const formattedSignals = proofs.map(
      (p) => p.publicSignals.map((s) => ethers2.toBigInt(s))
    );
    return this.verifierContract.verifyBatch(formattedProofs, formattedSignals);
  }
  // Helper method to create a credential-specific proof
  async createCredentialProof(credentialId, privateData, publicStatement) {
    return this.generateProof({
      privateInputs: {
        credentialId,
        ...privateData
      },
      publicInputs: {
        statement: ethers2.keccak256(ethers2.toUtf8Bytes(publicStatement))
      }
    });
  }
  // Helper method to create a reputation score proof
  async createScoreProof(score, threshold, privateData) {
    return this.generateProof({
      privateInputs: {
        score,
        ...privateData
      },
      publicInputs: {
        threshold,
        commitment: ethers2.keccak256(ethers2.toUtf8Bytes(JSON.stringify(privateData)))
      }
    });
  }
};

// src/utils/wallet.ts
import { configureChains, createConfig, useAccount, useConnect, useDisconnect } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";
var morphHoleskyChain = {
  id: 2810,
  name: "Morph Holesky Testnet",
  network: "morph-holesky",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc-quicknode-holesky.morphl2.io"] },
    public: { http: ["https://rpc-quicknode-holesky.morphl2.io"] }
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://explorer-holesky.morphl2.io" }
  },
  testnet: true
};
var WalletClient = class {
  constructor(config) {
    this.config = config;
    this.initializeWagmi();
  }
  initializeWagmi() {
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [morphHoleskyChain],
      [publicProvider()]
    );
    createConfig({
      autoConnect: true,
      connectors: [
        new MetaMaskConnector({ chains }),
        new WalletConnectConnector({
          chains,
          options: {
            projectId: "YOUR_PROJECT_ID"
            // Replace with actual WalletConnect project ID
          }
        })
      ],
      publicClient,
      webSocketPublicClient
    });
  }
  async connectWallet(connector = "metamask") {
    try {
      const { connect } = useConnect();
      if (connector === "metamask") {
        await connect({ connector: new MetaMaskConnector() });
      } else {
        await connect({
          connector: new WalletConnectConnector({
            options: {
              projectId: "YOUR_PROJECT_ID"
              // Replace with actual WalletConnect project ID
            }
          })
        });
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      throw error;
    }
  }
  async disconnectWallet() {
    try {
      const { disconnect } = useDisconnect();
      await disconnect();
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
      throw error;
    }
  }
  getAddress() {
    const { address } = useAccount();
    return address;
  }
  isConnected() {
    const { isConnected } = useAccount();
    return isConnected;
  }
  async switchChain() {
    const ethereum = window.ethereum;
    if (!ethereum) {
      throw new Error("No ethereum provider found");
    }
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${this.config.chainId.toString(16)}` }]
      });
    } catch (error) {
      if (error.code === 4902) {
        throw new Error("Chain not added to wallet");
      }
      throw error;
    }
  }
};

// src/index.ts
var PixelProtocol = class {
  constructor(config) {
    this.config = config;
    this.contracts = new SmartContractClient(config);
    this.subgraph = new SubgraphClient(config);
    this.zkp = new ZKPClient(config);
    this.wallet = new WalletClient(config);
  }
  // High-level convenience methods
  async getReputationProfile(userAddress) {
    const [credentials, score] = await Promise.all([
      this.subgraph.getUserCredentials(userAddress),
      this.contracts.calculateScore(userAddress, "default")
    ]);
    return { credentials, score };
  }
  async proveCredentialOwnership(credentialId, statement) {
    const credentials = await this.contracts.getCredentials(this.wallet.getAddress() || "");
    const credential = credentials.find((c) => c.id === credentialId);
    if (!credential) {
      throw new Error("Credential not found");
    }
    return this.zkp.createCredentialProof(
      credentialId,
      credential.data,
      statement
    );
  }
  async proveReputationScore(threshold, algorithmID = "default") {
    const userAddress = this.wallet.getAddress();
    if (!userAddress) {
      throw new Error("Wallet not connected");
    }
    const score = await this.contracts.calculateScore(userAddress, algorithmID);
    return this.zkp.createScoreProof(
      score.score,
      threshold,
      { algorithmID, timestamp: score.timestamp }
    );
  }
  // Initializes the SDK with required proving keys and other setup
  async initialize() {
    await this.wallet.connectWallet();
    await this.wallet.switchChain();
  }
};
export {
  PixelProtocol,
  SmartContractClient,
  SubgraphClient,
  WalletClient,
  ZKPClient
};
