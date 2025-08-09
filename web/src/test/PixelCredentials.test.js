const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PixelCredentials", function () {
  let PixelCredentials;
  let pixelCredentials;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    PixelCredentials = await ethers.getContractFactory("PixelCredentials");
    pixelCredentials = await PixelCredentials.deploy();
    await pixelCredentials.waitForDeployment();
  });

  describe("Credential Operations", function () {
    it("Should issue a credential", async function () {
      const tx = await pixelCredentials.issueCredential(
        addr1.address,
        "DeFi Score",
        95,
        "Test metadata"
      );

      const receipt = await tx.wait();
      const event = receipt.events.find(e => e.event === 'CredentialIssued');
      expect(event).to.not.be.undefined;

      const credential = await pixelCredentials.getCredential(1);
      expect(credential.recipient).to.equal(addr1.address);
      expect(credential.credentialType).to.equal("DeFi Score");
      expect(credential.score).to.equal(95);
    });

    it("Should get user credentials", async function () {
      await pixelCredentials.issueCredential(
        addr1.address,
        "DeFi Score",
        95,
        "Test metadata"
      );

      const userCredentials = await pixelCredentials.getUserCredentials(addr1.address);
      expect(userCredentials.length).to.equal(1);
    });

    it("Should revoke a credential", async function () {
      await pixelCredentials.issueCredential(
        addr1.address,
        "DeFi Score",
        95,
        "Test metadata"
      );

      await pixelCredentials.revokeCredential(1);
      const credential = await pixelCredentials.getCredential(1);
      expect(credential.isValid).to.equal(false);
    });
  });
});
