import { configureChains, createConfig, useAccount, useConnect, useDisconnect } from 'wagmi';
import { Chain } from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { publicProvider } from 'wagmi/providers/public';
import type { PixelProtocolConfig } from '../types';

const morphHoleskyChain: Chain = {
  id: 2810,
  name: 'Morph Holesky Testnet',
  network: 'morph-holesky',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc-quicknode-holesky.morphl2.io'] },
    public: { http: ['https://rpc-quicknode-holesky.morphl2.io'] }
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer-holesky.morphl2.io' }
  },
  testnet: true
};

export class WalletClient {
  private config: PixelProtocolConfig;

  constructor(config: PixelProtocolConfig) {
    this.config = config;
    this.initializeWagmi();
  }

  private initializeWagmi() {
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
            projectId: 'YOUR_PROJECT_ID' // Replace with actual WalletConnect project ID
          }
        })
      ],
      publicClient,
      webSocketPublicClient
    });
  }

  async connectWallet(connector: 'metamask' | 'walletconnect' = 'metamask') {
    try {
      const { connect } = useConnect();
      if (connector === 'metamask') {
        await connect({ connector: new MetaMaskConnector() });
      } else {
        await connect({
          connector: new WalletConnectConnector({
            options: {
              projectId: 'YOUR_PROJECT_ID' // Replace with actual WalletConnect project ID
            }
          })
        });
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  }

  async disconnectWallet() {
    try {
      const { disconnect } = useDisconnect();
      await disconnect();
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      throw error;
    }
  }

  getAddress(): string | undefined {
    const { address } = useAccount();
    return address;
  }

  isConnected(): boolean {
    const { isConnected } = useAccount();
    return isConnected;
  }

  async switchChain(): Promise<void> {
    // Implementation for switching to the correct chain
    const ethereum = (window as any).ethereum;
    if (!ethereum) {
      throw new Error('No ethereum provider found');
    }

    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${this.config.chainId.toString(16)}` }]
      });
    } catch (error: any) {
      if (error.code === 4902) {
        // Chain not added, implement chain adding logic here
        throw new Error('Chain not added to wallet');
      }
      throw error;
    }
  }
}
