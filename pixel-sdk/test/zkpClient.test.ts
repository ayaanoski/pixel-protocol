import { ethers } from 'ethers';
import { ZKPClient } from '../src/clients/zkpClient';
import { PixelProtocolConfig } from '../src/types';
import { MORPH_HOLESKY_CONFIG } from '../src/utils/morph-holesky';

const testConfig: PixelProtocolConfig = {
  rpcUrl: MORPH_HOLESKY_CONFIG.rpcUrl,
  chainId: MORPH_HOLESKY_CONFIG.chainId,
  zkpVerifierAddress: ethers.hexlify(ethers.randomBytes(20)), // Random address for testing
  credentialIssuerAddress: ethers.hexlify(ethers.randomBytes(20)),
  reputationCalculatorAddress: ethers.hexlify(ethers.randomBytes(20)),
  subgraphUrl: 'https://api.thegraph.com/subgraphs/name/pixelprotocol/morph-holesky'
};

describe('ZKPClient', () => {
  let zkpClient: ZKPClient;

  beforeEach(() => {
    zkpClient = new ZKPClient(testConfig);
  });

  describe('setProvingKey', () => {
    it('should accept a string key', async () => {
      const key = 'test-key';
      await expect(zkpClient.setProvingKey(key)).resolves.not.toThrow();
    });

    it('should accept a Uint8Array key', async () => {
      const key = new Uint8Array([1, 2, 3]);
      await expect(zkpClient.setProvingKey(key)).resolves.not.toThrow();
    });
  });

  describe('generateProof', () => {
    it('should throw error if proving key not set', async () => {
      const input = {
        privateInputs: { foo: 'bar' },
        publicInputs: { baz: 'qux' }
      };
      await expect(zkpClient.generateProof(input)).rejects.toThrow('Proving key and WASM file must be set');
    });
  });
});
