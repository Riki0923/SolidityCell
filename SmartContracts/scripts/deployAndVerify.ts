import hre from "hardhat";
import { verifyContract } from "@nomicfoundation/hardhat-verify/verify";

import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ES Module-safe way to get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log("🚀 Starting deployment of Solidity Cell contracts...");

  // Get the Viem wallet client and the deployer's address
  const { viem } = await hre.network.connect();
  const [deployer] = await viem.getWalletClients();
  const deployerAddress = deployer.account.address;

  // 1. DEPLOY THE PROOF OF ESCAPE NFT CONTRACT
  console.log("\nDeploying ProofOfEscape contract...");
  const proofOfEscape = await viem.deployContract("ProofOfEscape", [
    deployerAddress,
  ]);
  console.log(`✅ ProofOfEscape deployed to: ${proofOfEscape.address}`);

  // 2. DEPLOY THE MAIN SOLIDITYCELL CONTRACT
  console.log("\nDeploying SolidityCell contract...");
  const solidityCell = await viem.deployContract("SolidityCell", [
    proofOfEscape.address,
  ]);
  console.log(`✅ SolidityCell deployed to: ${solidityCell.address}`);

  //  SAVE DEPLOYMENT ADDRESSES TO A FILE
  const addresses = {
    proofOfEscape: proofOfEscape.address,
    solidityCell: solidityCell.address,
  };
  const filePath = path.join(__dirname, "..", "deployedAddresses.json");
  fs.writeFileSync(filePath, JSON.stringify(addresses, null, 2));
  console.log(`\n📄 Deployed addresses saved to: ${filePath}`);
  
  // 3. TRANSFER OWNERSHIP OF THE NFT CONTRACT
  console.log("\n🔐 Transferring ownership of ProofOfEscape to SolidityCell...");
  const publicClient = await viem.getPublicClient();
  const hash = await proofOfEscape.write.transferOwnership([solidityCell.address]);
  await publicClient.waitForTransactionReceipt({ hash });
  console.log("✅ Ownership transferred successfully.");

  // 4. WAIT FOR BLOCK EXPLORER TO INDEX
  console.log("\n⏳ Waiting for block explorer to index the contracts...");
  await new Promise((resolve) => setTimeout(resolve, 30000)); // 30-second delay

  // 5. VERIFY BOTH CONTRACTS
  console.log("\n🔍 Verifying contracts on Mantle Sepolia Explorer...");

  // Verify ProofOfEscape contract
  try {
    console.log("Verifying ProofOfEscape...");
    await verifyContract({
      address: proofOfEscape.address,
      constructorArgs: [deployerAddress],
      provider: "blockscout"
    }, hre);
    console.log("✅ ProofOfEscape verified successfully!");
  } catch (error: any) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("✅ ProofOfEscape is already verified!");
    } else {
      console.error("🔥 ProofOfEscape verification failed:", error);
    }
  }

  // Verify SolidityCell contract
  try {
    console.log("\nVerifying SolidityCell...");
    await verifyContract({
      address: solidityCell.address,
      constructorArgs: [proofOfEscape.address],
      provider: "blockscout"
    }, hre);
    console.log("✅ SolidityCell verified successfully!");
  } catch (error: any) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("✅ SolidityCell is already verified!");
    } else {
      console.error("🔥 SolidityCell verification failed:", error);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });