import { ethers } from 'ethers';

export const MORPH_HOLESKY_CONFIG = {
  chainId: 2810,
  name: 'Morph Holesky Testnet',
  rpcUrl: 'https://rpc-quicknode-holesky.morphl2.io',
  explorerUrl: 'https://explorer-holesky.morphl2.io',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18
  }
};

export function getMorphHoleskyProvider() {
  return new ethers.JsonRpcProvider(MORPH_HOLESKY_CONFIG.rpcUrl);
}

export async function waitForTransaction(txHash: string) {
  const provider = getMorphHoleskyProvider();
  const receipt = await provider.waitForTransaction(txHash);
  return receipt;
}

export async function getBalance(address: string) {
  const provider = getMorphHoleskyProvider();
  const balance = await provider.getBalance(address);
  return balance;
}

export async function estimateGas(tx: any) {
  const provider = getMorphHoleskyProvider();
  const gas = await provider.estimateGas(tx);
  return gas;
}

export async function getGasPrice() {
  const provider = getMorphHoleskyProvider();
  const gasPrice = await provider.getFeeData();
  return gasPrice;
}
