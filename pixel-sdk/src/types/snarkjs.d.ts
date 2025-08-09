declare module 'snarkjs' {
  interface FullProveResult {
    proof: {
      pi_a: string[];
      pi_b: string[][];
      pi_c: string[];
      protocol: string;
      curve: string;
    };
    publicSignals: string[];
  }

  interface Groth16 {
    fullProve(
      input: Record<string, any>,
      wasmFile: Uint8Array | string,
      zkeyFile: Uint8Array | string
    ): Promise<FullProveResult>;
    verify(
      vkey: Record<string, any>,
      publicSignals: string[],
      proof: Record<string, any>
    ): Promise<boolean>;
  }

  const groth16: Groth16;
}
