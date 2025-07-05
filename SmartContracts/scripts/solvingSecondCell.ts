import hre from "hardhat";
import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createInterface } from "node:readline/promises"; // Use the modern promises API

// --- HELPER FUNCTIONS ---

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getDeployedAddresses() {
  const filePath = path.join(__dirname, "..", "deployedAddresses.json");
  if (!fs.existsSync(filePath)) {
    throw new Error("Could not find deployedAddresses.json. Please run the deployment script first.");
  }
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

// --- MAIN SCRIPT ---

async function main() {
  // 1. SETUP
  console.log("========================================");
  console.log("         CELL #2: THE GRAPH");
  console.log("========================================");
  console.log("\nYou have advanced. This cell requires you to query on-chain data using");
  console.log("The Graph's ecosystem to find the three parts of the key.\n");

  const { solidityCell: SOLIDITY_CELL_ADDRESS } = getDeployedAddresses();
  console.log(`Connecting to contract at: ${SOLIDITY_CELL_ADDRESS}\n`);

    const { viem } = await hre.network.connect();

  const solidityCellContract = await viem.getContractAt("SolidityCell", SOLIDITY_CELL_ADDRESS)

  const publicClient = await viem.getPublicClient();

  // 2. ATTEMPT TO SOLVE

    // Create the readline interface ONCE, outside the loop.
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    let isSolved = false;
    while (!isSolved) {
      // ASK ALL QUESTIONS using the single reader instance
      console.log("--- Please provide the answers for Cell #2 ---");
      const answer1 = await rl.question("Q1: What is the total transaction count for the Uniswap USDC/WETH pool? > ");
      const answer2 = await rl.question("Q2: What was the total supply of DAI at block 18,000,000? > ");
      const answer3 = await rl.question("Q3: What is the 4-byte selector of the most gas-intensive function in the BAYC contract? > ");

      console.log("\n🔓 Submitting your answers to the contract...");
      try {
        const solveHash = await solidityCellContract.write.solveCell2([
            BigInt(answer1),
            BigInt(answer2),
            answer3 as `0x${string}`
        ]);
        await publicClient.waitForTransactionReceipt({ hash: solveHash });

        console.log("🎉 CORRECT! The second cell is unlocked. You have advanced to the final challenge.");
        isSolved = true; // This will exit the loop
        
      } catch (error: any) {
        console.error("\n🔥 INCORRECT! The contract rejected your answers.");
        if(error.shortMessage) {
          console.error("Revert Reason:", error.shortMessage);
        }
        console.log("The puzzle has reset. Please try again from the beginning.\n");
      }
    }
  } finally {
    // This ensures the reader is ALWAYS closed, even if an error occurs.
    rl.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});