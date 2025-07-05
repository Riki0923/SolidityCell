import hre from "hardhat";
import { verifyContract } from "@nomicfoundation/hardhat-verify/verify";

async function main() {
  // 1. DEPLOY THE CONTRACT USING VIEM
  console.log("🚀 Deploying Counter contract...");


  const {viem} = await hre.network.connect();

  // Also get the public client, which is needed to wait for transactions
  const publicClient = await viem.getPublicClient();


  // Use hre.viem.deployContract instead of hre.ethers
  const counter = await viem.deployContract("Counter", []);

await counter.write.inc();

  // The address is a direct property in the returned object
  const contractAddress = counter.address;
  console.log(`✅ Counter deployed to: ${contractAddress}`);

  // 2. WAIT FOR BLOCK EXPLORER TO INDEX
  console.log("⏳ Waiting for block explorer to index the contract...");
  await new Promise(resolve => setTimeout(resolve, 25000)); // 15-second delay

  // 3. VERIFY THE CONTRACT (This part remains the same)
  console.log("🔍 Verifying contract on Mantle Sepolia Explorer...");
  try {
    await verifyContract({
      address: contractAddress,
      constructorArgs: [],
    }, hre);
    console.log("✅ Contract verified successfully!");
  } catch (error: any) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("✅ Contract is already verified!");
    } else {
      console.error("🔥 Verification failed:", error);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });