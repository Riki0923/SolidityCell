import hre from "hardhat";
import * as readline from "readline";
import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { query0G } from "../utils/zeroG.js";

// --- Setup __dirname for ES modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Read deployed contract address ---
function getDeployedAddresses() {
  const filePath = path.join(__dirname, "..", "deployedAddresses.json");
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

// --- Terminal prompt helper ---
function promptUser(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// --- Main flow ---
async function main() {
  console.log("========================================");
  console.log("         CELL #2: THE DATA ORACLE       ");
  console.log("========================================\n");
  console.log("🔍 To escape this cell, you must answer 3 questions.");
  console.log("💡 Each one relates to on-chain data or subgraph queries.\n");

  // AI intro hint (before user input)
  console.log("🤖 Asking 0G AI for an initial tip...");
  const introHint = await query0G(`
This Solidity puzzle presents 3 data questions related to a contract called SolidityCell. 
The user is expected to explore a Subgraph and retrieve information like ownership changes, token balances, and custom values like 'toCell'.

Please give a concise hint encouraging them to:
- Understand how The Graph indexing works
- Explore the SolidityCell contract for subgraphable events
- Identify what kind of contract data could help answer these questions

Keep it short, motivating, and focused on the right direction (not answers).
  `);
  console.log(`💡 0G AI says:\n${introHint}\n`);

  const { solidityCell: SOLIDITY_CELL_ADDRESS } = getDeployedAddresses();
  const { viem } = await hre.network.connect();

  const contract = await viem.getContractAt("SolidityCell", SOLIDITY_CELL_ADDRESS);
  const publicClient = await viem.getPublicClient();

  let isSolved = false;

  while (!isSolved) {
    console.log("----------------------------------------");
    console.log("🧩 Answer all 3 questions to proceed:");
    console.log("----------------------------------------");

    const answer1 = await promptUser("Q1: First `newOwner` from the Super Accounts subgraph > ");
    const answer2 = await promptUser("Q2: USDC token balance of 0x6fA2...3101 > ");
    const answer3 = await promptUser("Q3: FIRST `toCell` value from your custom subgraph > ");

    console.log("\n🔐 Submitting your answers to the contract...");

    try {
      const tx = await contract.write.solveCell2([
        answer1 as `0x${string}`,
        BigInt(answer2),
        BigInt(answer3),
      ]);
      await publicClient.waitForTransactionReceipt({ hash: tx });

      console.log("\n🎉 CORRECT! You've solved Cell #2 and may continue your escape.\n");
      isSolved = true;
    } catch (err: any) {
      console.error("\n❌ INCORRECT! The contract rejected your answers.");
      if (err.shortMessage) {
        console.error("🛠️ Revert Reason:", err.shortMessage);
      }

      console.log("\n🤖 Requesting guidance from 0G AI...");
      const aiHint = await query0G(`
I got 3 questions from a Solidity challenge and need guidance on how to approach answering them using subgraphs and data lookups:

1. How to find the first \`newOwner\` address from a "Super Accounts" subgraph?
2. How to find the USDC token balance of address: 0x6fA26735bDCD8D598f6F1384Fc59F0180e903101?
3. How to determine the first \`toCell\` value from a subgraph?

Explain how to approach these questions using The Graph, block explorers, or viem/ethers. Be concise but clear.
      `);
      console.log(`💡 0G AI says:\n${aiHint}`);
      console.log("\n🔁 Please try again.\n");
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("💥 Fatal error:", err);
    process.exit(1);
  });
