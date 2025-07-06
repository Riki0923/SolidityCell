import hre from "hardhat";
import * as readline from "readline";
import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { query0G } from "../utils/zeroG.js";

// --- RESOLVE __dirname FOR ES MODULES ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- HELPER: Load deployed contract address ---
function getDeployedAddresses() {
  const filePath = path.join(__dirname, "..", "deployedAddresses.json");
  const addresses = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return addresses;
}

// --- HELPER: Prompt CLI user for input ---
function promptUser(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// --- MAIN FLOW ---
async function main() {
  console.log("========================================");
  console.log("        WELCOME TO SOLIDITY CELL        ");
  console.log("========================================\n");
  console.log("🔒 You're trapped in a smart contract escape room.");
  console.log("Solve the puzzle to unlock the first cell.\n");

  const { solidityCell: SOLIDITY_CELL_ADDRESS } = getDeployedAddresses();
  console.log(`🔗 Contract Address: ${SOLIDITY_CELL_ADDRESS}\n`);

  const { viem } = await hre.network.connect();
  const contract = await viem.getContractAt("SolidityCell", SOLIDITY_CELL_ADDRESS);
  const publicClient = await viem.getPublicClient();

  console.log("📦 --- Puzzle #1: The Mismatched Hash ---");
  console.log("To solve this puzzle, you must compute the correct keccak256 hash.");
  console.log(`Derived from: keccak256(abi.encode("Correctly", 123, your_address))`);
  console.log("⚠️  Hint: Encoding matters — packed vs non-packed!\n");

  let isValidFormat = false;
  let userAnswer = "";

  while (!isValidFormat) {
    userAnswer = await promptUser("🧩 Enter the correct bytes32 hash: ");

    if (userAnswer.startsWith("0x") && userAnswer.length === 66) {
      isValidFormat = true;
    } else {
      console.log("❌ Invalid format. Expected a 66-character hex string starting with 0x.\n");
    // Ask AI for help
    console.log("🤖 Asking 0G AI for guidance...");
    const aiHint = await query0G(`
      I'm solving a Solidity puzzle involving a keccak256 hash of:
      abi.encode("Correctly", 123, my_address).

      My result isn't matching. What could go wrong?
      Briefly explain any encoding issues like abi.encode vs abi.encodePacked.
    `);
    console.log(`💡 0G AI says:\n${aiHint}\n`);
    }


  }

  // 🔓 ATTEMPT TO SOLVE THE PUZZLE
  try {
    console.log("🔓 Submitting your answer to the contract...");
    const txHash = await contract.write.solveCell1([userAnswer as `0x${string}`]);
    await publicClient.waitForTransactionReceipt({ hash: txHash });
    console.log("\n✅ SUCCESS! The first cell is unlocked. Well done.\n");
  } catch (error: any) {
    console.error("\n🔥 The contract rejected your answer.");
    if (error.shortMessage) {
      console.error("↳ Revert Reason:", error.shortMessage);
    }
    console.log("🔁 Try again after reviewing your encoding logic.\n");
  }
}

main().catch((err) => {
  console.error("💥 Fatal error:", err);
  process.exit(1);
});
