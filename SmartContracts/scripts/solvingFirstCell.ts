import hre from "hardhat";
import {
  keccak256,
  concat,
  stringToBytes,
  toHex,
  encodeAbiParameters,
  parseAbiParameters,
} from "viem";

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

async function main() {
  // Get the deployed contract address from the file
  const { solidityCell: SOLIDITY_CELL_ADDRESS } = getDeployedAddresses();

  console.log(`▶️ Attacking contract at: ${SOLIDITY_CELL_ADDRESS}`);

  const { viem } = await hre.network.connect();

  // Get an instance of the already-deployed SolidityCell contract
  const solidityCellContract = await viem.getContractAt("SolidityCell", SOLIDITY_CELL_ADDRESS)

  // Also get the publicClient for waitin on tx hashes
  const publicClient = await viem.getPublicClient();

  // --- Starting Puzzle #1: The Hashing Mismatch ---
  console.log("\n--- Starting Puzzle #1: The Hashing Mismatch ---");


  // ATTEMPT 1: THE FAILING WAY (MIMICKING abi.encodePacked)
  const [wallet1, wallet2] = await viem.getWalletClients();

  console.log("\n🔍 Attempt #1: Crafting hash with incorrect packing...");
  const packedData = concat([
    stringToBytes("Correctly"),
    toHex(123),
    wallet1.account.address,
  ]);
  const incorrectHash = keccak256(packedData);

  console.log("🔓 Submitting incorrect hash (this is expected to fail)...");
  try {
    const failedTxHash = await solidityCellContract.write.solveCell1([incorrectHash]);
    await publicClient.waitForTransactionReceipt({ hash: failedTxHash });
  } catch (error: any) {
    console.log("🔥 Transaction failed as expected!");
    if (error.shortMessage.includes("Incorrect hash: check data packing")) {
        console.log("✅ Hint from contract received: 'Incorrect hash: check data packing.'");
    } else {
        console.log("Received an unexpected error:", error.shortMessage);
    }
  }

  // ATTEMPT 2: THE SUCCESSFUL WAY (USING PROPER ABI ENCODING)
  console.log("\n🔍 Attempt #2: Crafting hash with correct ABI encoding...");
  const correctlyEncodedData = encodeAbiParameters(
    parseAbiParameters("string, uint256, address"),
    ["Correctly", 123n, wallet1.account.address]
  );
  const correctHash = keccak256(correctlyEncodedData);
  
  console.log("🔓 Submitting correct hash...");
  const solveHash = await solidityCellContract.write.solveCell1([correctHash]);
  await publicClient.waitForTransactionReceipt({ hash: solveHash });
  console.log("🎉 Cell #1 solved!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });