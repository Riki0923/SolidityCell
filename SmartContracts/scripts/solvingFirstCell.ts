import hre from "hardhat";
import * as readline from "readline";

import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url"; // <-- Import this

// ES Module-safe way to get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to read the deployed addresses
function getDeployedAddresses() {
  const filePath = path.join(__dirname, "..", "deployedAddresses.json");
  const addresses = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return addresses;
}

// Helper function to prompt the user for input in the terminal
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

async function main() {
    // 1. WELCOME MESSAGE & SETUP
  console.log("========================================");
  console.log("    WELCOME TO SOLIDITY CELL");
  console.log("========================================");
  console.log("\nYou are a developer trapped in a series of smart contract cells.");
  console.log("You must use your skills to find and exploit vulnerabilities to escape.\n");


  // Get the deployed contract address from the file
  const { solidityCell: SOLIDITY_CELL_ADDRESS } = getDeployedAddresses();

  console.log(`▶️ Attacking contract at: ${SOLIDITY_CELL_ADDRESS}`);

  const { viem } = await hre.network.connect();

  // Get an instance of the already-deployed SolidityCell contract
  const solidityCellContract = await viem.getContractAt("SolidityCell", SOLIDITY_CELL_ADDRESS)

  // Also get the publicClient for waitin on tx hashes
  const publicClient = await viem.getPublicClient();

  // 2. PRESENT PUZZLE #1
  console.log(                "--- Puzzle #1: The Mismatched Hash ---"              );
  console.log("The contract expects a specific keccak256 hash to unlock the first cell.");
  console.log("The hash is derived from: abi.encode(\"Correctly\", 123, your_address)");
  console.log("Hint: The devil is in the details of data packing.\n");

  // 3. GET USER INPUT
  // 3. GET USER INPUT WITH A LOOP
  let userAnswer = "";
  let isValidFormat = false;

  while (!isValidFormat) {
    userAnswer = await promptUser("Enter the correct bytes32 hash to solve Cell #1: ");

    if (userAnswer.startsWith("0x") && userAnswer.length === 66) {
      isValidFormat = true;
    } else {
      console.error("\n❌ Invalid format. A bytes32 hash must be 66 characters long and start with '0x'. Please try again.\n");
    }
  }


  // ATTEMPT 1: THE FAILING WAY (MIMICKING abi.encodePacked)
  const [wallet1, wallet2] = await viem.getWalletClients();

// 4. ATTEMPT TO SOLVE
  console.log("\n🔓 Submitting your hash to the contract...");
  try {
    const solveHash = await solidityCellContract.write.solveCell1([userAnswer as `0x${string}`]);
    await publicClient.waitForTransactionReceipt({ hash: solveHash });
    console.log("🎉 CORRECT! The first cell is unlocked. You have advanced.");
  } catch (error: any) {
    console.error("\n🔥 INCORRECT! The contract rejected your hash. Please check your logic and try again.");
    // Log the specific revert reason if available
    if(error.shortMessage) {
      console.error("Revert Reason:", error.shortMessage);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });