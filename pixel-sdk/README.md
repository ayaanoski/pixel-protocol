# Pixel Protocol SDK

The official SDK for interacting with Pixel Protocol - a decentralized reputation infrastructure.

## Installation

```bash
npm install @pixel-protocol/sdk
```

Or with yarn:

```bash
yarn add @pixel-protocol/sdk
```

## Quick Start

```typescript
import { PixelProtocol } from "@pixel-protocol/sdk";

// Initialize the SDK with Morph Holesky Testnet
const pixelProtocol = new PixelProtocol({
  rpcUrl: "https://rpc-quicknode-holesky.morphl2.io",
  chainId: 2810, // Morph Holesky Testnet
  credentialIssuerAddress: "YOUR_CONTRACT_ADDRESS",
  reputationCalculatorAddress: "YOUR_CONTRACT_ADDRESS",
  zkpVerifierAddress: "YOUR_CONTRACT_ADDRESS",
  subgraphUrl:
    "https://api.thegraph.com/subgraphs/name/pixelprotocol/morph-holesky",
});

// Initialize (connects wallet and sets up ZKP)
await pixelProtocol.initialize();

// Get a user's reputation profile
const profile = await pixelProtocol.getReputationProfile("0x...");
console.log("Credentials:", profile.credentials);
console.log("Reputation Score:", profile.score);

// Prove credential ownership with zero knowledge
const proof = await pixelProtocol.proveCredentialOwnership(
  "credentialId",
  "I have a positive payment history"
);

// Verify the proof
const isValid = await pixelProtocol.zkp.verifyProof(proof);
```

## Features

- Full smart contract interaction layer
- Subgraph querying for efficient data retrieval
- Zero-knowledge proof generation and verification
- Wallet management and connection
- TypeScript support with full type definitions
- Comprehensive credential management
- Reputation score calculation
- Privacy-preserving proofs

## Documentation

### TypeScript Types

```typescript
interface PixelProtocolConfig {
  rpcUrl: string;
  chainId: number;
  credentialIssuerAddress: string;
  reputationCalculatorAddress: string;
  zkpVerifierAddress: string;
  subgraphUrl: string;
}

interface ZKProof {
  proof: string;
  publicSignals: string[];
}

interface ProofInput {
  privateInputs: Record<string, any>;
  publicInputs: Record<string, any>;
}

interface ReputationProfile {
  address: string;
  credentials: Credential[];
  score: number;
  lastUpdated: Date;
}

interface Credential {
  id: string;
  issuer: string;
  type: string;
  data: Record<string, any>;
  issuedAt: Date;
  expiresAt?: Date;
}
```

### Smart Contract Interactions

```typescript
// Issue a new credential
const credentialId = await pixelProtocol.contracts.issueCredential(
  userAddress,
  "issuer1",
  "paymentHistory",
  { score: 95, date: "2025-08-09" }
);

// Verify a credential
const isValid = await pixelProtocol.contracts.verifyCredential(credentialId);

// Calculate reputation score
const score = await pixelProtocol.contracts.calculateScore(
  userAddress,
  "default"
);
```

### Subgraph Queries

```typescript
// Get all credentials for a user
const credentials = await pixelProtocol.subgraph.getUserCredentials(
  userAddress
);

// Search credentials with filters
const filtered = await pixelProtocol.subgraph.searchCredentials({
  credentialType: "paymentHistory",
  fromTimestamp: 1628553600,
});
```

### Zero-Knowledge Proofs

```typescript
// Create a proof of meeting a score threshold
const proof = await pixelProtocol.proveReputationScore(80);

// Verify a batch of proofs
const isValid = await pixelProtocol.zkp.verifyBatch(proofs);
```

## Network Support

The SDK currently supports the following networks:

### Morph Holesky Testnet

- Chain ID: 2810
- RPC URL: https://rpc-quicknode-holesky.morphl2.io
- Explorer: https://explorer-holesky.morphl2.io
- Currency: ETH

## Development

To contribute to the SDK:

1. Clone the repository

```bash
git clone https://github.com/ayaanoski/pixel-protocol.git
cd pixel-protocol/pixel-sdk
```

2. Install dependencies

```bash
npm install
```

3. Run tests

```bash
npm test
```

4. Build the SDK

```bash
npm run build
```

## Publishing

The SDK is published to npm under the `@pixel-protocol` organization. To install the latest beta version:

```bash
npm install @pixel-protocol/sdk@beta
```

For the stable version:

```bash
npm install @pixel-protocol/sdk
```

## License

MIT License

## Support

For support:

- Join our [Discord community](https://discord.gg/pixelprotocol)
- Open an issue on [GitHub](https://github.com/ayaanoski/pixel-protocol/issues)
- Check our [Documentation](https://docs.pixelprotocol.com)

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests.

## License

MIT License
