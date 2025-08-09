// Mock all wagmi imports
jest.mock('wagmi', () => ({
  configureChains: jest.fn().mockReturnValue({
    chains: [morphHolesky],
    publicClient: jest.fn(),
    webSocketPublicClient: undefined
  }),
  createConfig: jest.fn(),
  useAccount: jest.fn(),
  useConnect: jest.fn(),
  useDisconnect: jest.fn()
}));

const morphHolesky = {
  id: 2810,
  name: 'Morph Holesky Testnet',
  network: 'morph-holesky',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc-quicknode-holesky.morphl2.io'],
    },
    public: {
      http: ['https://rpc-quicknode-holesky.morphl2.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Explorer',
      url: 'https://explorer-holesky.morphl2.io',
    },
  },
  testnet: true,
};

jest.mock('wagmi/connectors/metaMask', () => ({
  MetaMaskConnector: jest.fn()
}));

jest.mock('wagmi/connectors/walletConnect', () => ({
  WalletConnectConnector: jest.fn()
}));

jest.mock('wagmi/providers/public', () => ({
  publicProvider: jest.fn().mockReturnValue({
    http: jest.fn()
  })
}));

jest.mock('@wagmi/core/providers/public', () => ({
  publicProvider: jest.fn().mockReturnValue({
    http: jest.fn()
  })
}));

// Import after mocks
import { PixelProtocol } from '../src';

describe('PixelProtocol SDK', () => {
  let sdk: PixelProtocol;

  beforeAll(() => {
    sdk = new PixelProtocol({
      rpcUrl: 'https://rpc-quicknode-holesky.morphl2.io',
      chainId: 2810,
      credentialIssuerAddress: '0x1234567890123456789012345678901234567890',
      reputationCalculatorAddress: '0x1234567890123456789012345678901234567890',
      zkpVerifierAddress: '0x1234567890123456789012345678901234567890',
      subgraphUrl: 'https://api.thegraph.com/subgraphs/name/pixelprotocol/morph-holesky'
    });
  });

  test('SDK initialization', () => {
    expect(sdk).toBeDefined();
    expect(sdk.contracts).toBeDefined();
    expect(sdk.subgraph).toBeDefined();
    expect(sdk.zkp).toBeDefined();
    expect(sdk.wallet).toBeDefined();
  });

  test('Smart Contract Client methods exist', () => {
    expect(typeof sdk.contracts.issueCredential).toBe('function');
    expect(typeof sdk.contracts.verifyCredential).toBe('function');
    expect(typeof sdk.contracts.calculateScore).toBe('function');
  });

  test('Subgraph Client methods exist', () => {
    expect(typeof sdk.subgraph.getUserCredentials).toBe('function');
    expect(typeof sdk.subgraph.getIssuerCredentials).toBe('function');
    expect(typeof sdk.subgraph.searchCredentials).toBe('function');
  });

  test('ZKP Client methods exist', () => {
    expect(typeof sdk.zkp.generateProof).toBe('function');
    expect(typeof sdk.zkp.verifyProof).toBe('function');
    expect(typeof sdk.zkp.verifyBatch).toBe('function');
  });

  test('Wallet Client methods exist', () => {
    expect(typeof sdk.wallet.connectWallet).toBe('function');
    expect(typeof sdk.wallet.disconnectWallet).toBe('function');
    expect(typeof sdk.wallet.getAddress).toBe('function');
  });
});
