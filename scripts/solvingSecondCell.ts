import hre from "hardhat";
import * as readline from "readline";
import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Helper to get deployed address ---
function getDeployedAddresses() {
  const filePath = path.join(__dirname, "..", "deployedAddresses.json");
  const addresses = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return addresses;
}

// --- Helper to prompt the user ---
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

// --- Main Function ---
async function main() {
  console.log("========================================");
  console.log("           CELL #2: THE DATA ORACLE");
  console.log("========================================\n");
  console.log("You must answer 3 questions to escape this cell.");
  console.log("Each answer must be typed manually based on your research.\n");

  const { solidityCell: SOLIDITY_CELL_ADDRESS } = getDeployedAddresses();
  const { viem } = await hre.network.connect();
  const contract = await viem.getContractAt("SolidityCell", SOLIDITY_CELL_ADDRESS);
  const publicClient = await viem.getPublicClient();

  let isSolved = false;

  while (!isSolved) {
    console.log("--- Please answer all 3 questions correctly ---");

    const answer1 = await promptUser("Q1: What is the first `newOwner` address from the Super Accounts subgraph? > ");
    const answer2 = await promptUser("Q2: What is the USDC token balance of 0x6fA26735bDCD8D598f6F1384Fc59F0180e903101? > ");
    const answer3 = await promptUser("Q3: What is the FIRST `toCell` value in your subgraph? > ");

    console.log("\n🔓 Submitting your answers to the contract...");

    try {
      const tx = await contract.write.solveCell2([
        answer1 as `0x${string}`,
        BigInt(answer2),
        BigInt(answer3),
      ]);
      await publicClient.waitForTransactionReceipt({ hash: tx });

      console.log("\n🎉 CORRECT! You have solved Cell #2 and may advance.");
      isSolved = true;

    } catch (err: any) {
      console.error("\n🔥 INCORRECT! The contract rejected your answers.");
      if (err.shortMessage) {
        console.error("Revert Reason:", err.shortMessage);
      }
      console.log("🔁 Try again.\n");
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
