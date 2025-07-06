# 🧪 Hardhat 3 Alpha: `node:test` and `viem` Example Project

> ⚠️ **Warning**: This project uses Hardhat v3 (Alpha), which is currently under development and not intended for production use.

---

## 🧩 Project Overview

**Solidity Cell** is an on-chain smart contract escape game built entirely with Hardhat v3.  
Players solve EVM-based puzzles using CLI scripts, with support from **The Graph** for data indexing and **0G AI** for cryptographic hints.

> 📌 Full project description will be added to the [ETHGlobal project page](#) before submission.

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/solidity-cell.git
cd solidity-cell
npm install

2. Environment Setup

Create a .env file in the root directory:

PRIVATE_KEY=
ZERO_G_PRIVATE_KEY=
BASE_SEPOLIA_RPC_URL=
ETHERSCAN_API_KEY=
MANTLE_SEPOLIA_RPC_URL=

    ✅ Use the same value for both PRIVATE_KEY and ZERO_G_PRIVATE_KEY for now.
    🟡 MANTLE_SEPOLIA_RPC_URL is optional — the game also runs on Mantle, but it's not used here.

3. Compile & Deploy Contracts

Compile with Hardhat v3:

npx hardhat compile --buildProfile production

Deploy to Base Sepolia:

npx hardhat run scripts/deployAndVeriy.ts --buildProfile production --network baseSepolia

    ⚠️ Requires testnet ETH on Base Sepolia.

4. 🧠 Setup 0G AI

To use the AI hint engine, you'll need 0G testnet tokens.
You can request them here:
👉 https://docs.0g.ai/developer-hub/testnet/testnet-overview
🕹️ Start the Game
▶️ Puzzle 1: The Mismatched Hash

npx hardhat run scripts/solvingFirstCell.ts --network baseSepolia

If you get stuck, 0G AI will assist you with hints.

Use this helper script to generate the correct hash:

// scripts/hashForCell1.ts
import { encodeAbiParameters, keccak256, parseAbiParameters } from "viem";

const encoded = encodeAbiParameters(
  parseAbiParameters("string, uint256, address"),
  ["Correctly", BigInt(123), "0xYourAddressHere"]
);

console.log("Hash:", keccak256(encoded));

Run it with:

npx hardhat run scripts/hashForCell1.ts

    🧠 Replace "0xYourAddressHere" with your wallet address!

▶️ Puzzle 2: The Data Oracle

npx hardhat run scripts/solvingSecondCell.ts --network baseSepolia

Use helper scripts to find the correct data:

npx hardhat run scripts/getSubgraphAnswer.ts
npx hardhat run scripts/getMySubgraphAnswer.ts

✅ Correct answers for Cell #2:

    0x63dED784c8Da63A79eE47f9a53BcB1BAD1d9F3e0 (newOwner)

    60975000 (USDC balance)

    1 (toCell value from subgraph)

▶️ Puzzle 3: The Final Riddle

npx hardhat run scripts/solvingThirdCell.ts --network baseSepolia

You’ll receive a cryptic riddle from 0G AI.
The correct answer is:

Knowledge

Once solved, you'll receive a Proof of Escape NFT directly to your wallet.
🏁 You Escaped!

This project is:

    CLI-only (no frontend)

    Powered by Hardhat v3 and viem

    Indexed by The Graph

    Enhanced with 0G AI

Good luck escaping the Solidity Cell!
💻🔐🧠
