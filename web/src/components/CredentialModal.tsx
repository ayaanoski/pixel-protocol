// src/components/CredentialModal.tsx

import React from 'react';
import { Credential } from '../contracts/PixelCredentialsService';

interface CredentialModalProps {
  credential: Credential | null;
  onClose: () => void;
}

const CredentialModal: React.FC<CredentialModalProps> = ({ credential, onClose }) => {
  if (!credential) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-black border border-blue-500/50 rounded-xl p-8 max-w-lg w-full relative press-start-2p-regular text-white"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">&times;</button>
        <h2 className="text-2xl text-blue-400 mb-4">{credential.credentialType}</h2>
        <div className="mb-6 text-right">
            <div className="text-4xl text-white">{credential.score}</div>
            <div className="text-sm text-gray-400">SCORE</div>
        </div>
        <div className="space-y-3 text-sm">
            <p><span className="text-gray-400">Description:</span> {credential.metadata}</p>
            <p><span className="text-gray-400">Issued On:</span> {new Date(Number(credential.timestamp) * 1000).toLocaleString()}</p>
            <p><span className="text-gray-400">Issuer:</span> {credential.issuer}</p>
            <p className="text-gray-400">Raw Data:</p>
            <pre className="bg-gray-900/50 p-3 rounded-md text-green-400 text-xs overflow-x-auto">
                {JSON.stringify(JSON.parse(credential.rawData), null, 2)}
            </pre>
        </div>
      </div>
    </div>
  );
};

export default CredentialModal;