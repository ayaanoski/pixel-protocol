import * as snarkjs from 'snarkjs';
import { ethers } from 'ethers';
import type { PixelProtocolConfig, ZKProof, ProofInput } from '../types';

const ZKP_VERIFIER_ABI = [
  'function verifyProof(bytes proof, uint256[] calldata publicSignals) view returns (bool)',
  'function verifyBatch(bytes[] proofs, uint256[][] calldata publicSignals) view returns (bool)'
];

export class ZKPClient {
  private verifierContract: ethers.Contract;
  private provingKey?: string | Uint8Array;
  private wasmFile?: string | Uint8Array;

  constructor(config: PixelProtocolConfig) {
    const provider = new ethers.JsonRpcProvider(config.rpcUrl);
    this.verifierContract = new ethers.Contract(
      config.zkpVerifierAddress,
      ZKP_VERIFIER_ABI,
      provider
    );
  }

  async setProvingKey(key: string | Uint8Array): Promise<void> {
    this.provingKey = key;
  }

  async setWasmFile(wasm: string | Uint8Array): Promise<void> {
    this.wasmFile = wasm;
  }

  async generateProof(input: ProofInput): Promise<ZKProof> {
    if (!this.provingKey || !this.wasmFile) {
      throw new Error('Proving key and WASM file must be set');
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

  async verifyProof(proof: ZKProof): Promise<boolean> {
    return this.verifierContract.verifyProof(
      ethers.hexlify(ethers.toUtf8Bytes(proof.proof)),
      proof.publicSignals.map(s => ethers.toBigInt(s))
    );
  }

  async verifyBatch(proofs: ZKProof[]): Promise<boolean> {
    const formattedProofs = proofs.map(p => 
      ethers.hexlify(ethers.toUtf8Bytes(p.proof))
    );
    const formattedSignals = proofs.map(p => 
      p.publicSignals.map(s => ethers.toBigInt(s))
    );

    return this.verifierContract.verifyBatch(formattedProofs, formattedSignals);
  }

  // Helper method to create a credential-specific proof
  async createCredentialProof(
    credentialId: string,
    privateData: Record<string, any>,
    publicStatement: string
  ): Promise<ZKProof> {
    return this.generateProof({
      privateInputs: {
        credentialId,
        ...privateData
      },
      publicInputs: {
        statement: ethers.keccak256(ethers.toUtf8Bytes(publicStatement))
      }
    });
  }

  // Helper method to create a reputation score proof
  async createScoreProof(
    score: number,
    threshold: number,
    privateData: Record<string, any>
  ): Promise<ZKProof> {
    return this.generateProof({
      privateInputs: {
        score,
        ...privateData
      },
      publicInputs: {
        threshold,
        commitment: ethers.keccak256(ethers.toUtf8Bytes(JSON.stringify(privateData)))
      }
    });
  }
}
