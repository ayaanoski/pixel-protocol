// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PixelCredentials is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _credentialIds;

    struct Credential {
        uint256 id;
        address recipient;
        string credentialType;
        uint256 score;
        string metadata;
        uint256 timestamp;
        bool isValid;
    }

    mapping(uint256 => Credential) public credentials;
    mapping(address => uint256[]) public userCredentials;

    event CredentialIssued(
        uint256 indexed id,
        address indexed recipient,
        string credentialType,
        uint256 score,
        uint256 timestamp
    );

    event CredentialRevoked(uint256 indexed id, uint256 timestamp);

    constructor() {
        _transferOwnership(msg.sender);
    }

    function issueCredential(
        address recipient,
        string memory credentialType,
        uint256 score,
        string memory metadata
    ) external onlyOwner returns (uint256) {
        _credentialIds.increment();
        uint256 newCredentialId = _credentialIds.current();

        Credential memory newCredential = Credential({
            id: newCredentialId,
            recipient: recipient,
            credentialType: credentialType,
            score: score,
            metadata: metadata,
            timestamp: block.timestamp,
            isValid: true
        });

        credentials[newCredentialId] = newCredential;
        userCredentials[recipient].push(newCredentialId);

        emit CredentialIssued(
            newCredentialId,
            recipient,
            credentialType,
            score,
            block.timestamp
        );

        return newCredentialId;
    }

    function revokeCredential(uint256 credentialId) external onlyOwner {
        require(
            credentials[credentialId].isValid,
            "Credential already revoked"
        );
        credentials[credentialId].isValid = false;
        emit CredentialRevoked(credentialId, block.timestamp);
    }

    function getCredential(
        uint256 credentialId
    )
        external
        view
        returns (
            uint256 id,
            address recipient,
            string memory credentialType,
            uint256 score,
            string memory metadata,
            uint256 timestamp,
            bool isValid
        )
    {
        Credential memory cred = credentials[credentialId];
        return (
            cred.id,
            cred.recipient,
            cred.credentialType,
            cred.score,
            cred.metadata,
            cred.timestamp,
            cred.isValid
        );
    }

    function getUserCredentials(
        address user
    ) external view returns (uint256[] memory) {
        return userCredentials[user];
    }
}
