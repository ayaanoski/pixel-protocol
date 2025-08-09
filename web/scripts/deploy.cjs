const { ethers, run } = require("hardhat");

async function main() {
  try {
    const [deployer] = await ethers.getSigners();
    const deployerAddress = await deployer.getAddress();
    console.log("Deploying contracts with the account:", deployerAddress);
    
    const balance = await deployer.provider.getBalance(deployerAddress);
    console.log("Account balance:", ethers.formatUnits(balance, "ether"), "ETH");

    const PixelCredentials = await ethers.getContractFactory("PixelCredentials");
    console.log("Deploying PixelCredentials...");

    const pixelCredentials = await PixelCredentials.deploy();
    console.log("Waiting for deployment transaction...");
    
    await pixelCredentials.waitForDeployment();
    const contractAddress = await pixelCredentials.getAddress();
    console.log("PixelCredentials deployed to:", contractAddress);

    console.log("Waiting for block confirmations...");
    const deployTx = await pixelCredentials.deploymentTransaction();
    if (deployTx) {
      await deployTx.wait(5);
      console.log("Deployment confirmed with 5 block confirmations");
    }

    console.log("Verifying contract on explorer...");
    try {
      await run("verify:verify", {
        address: contractAddress,
        constructorArguments: []
      });
      console.log("Contract verified successfully");
    } catch (error) {
      console.log("Contract verification failed:", error.message);
    }
  } catch (error) {
    console.error("Deployment failed:", error);
    throw error;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
