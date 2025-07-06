<<<<<<< HEAD
# Solidity Cell 🧩 — A Hardhat 3 On-Chain Escape Game

> ⚠️ **WARNING:** This project uses Hardhat 3, which is currently in **alpha**. It’s intended for experimentation and learning — **not production** use.

Solidity Cell is a fully on-chain smart contract escape room, built on **Hardhat v3** using its native `viem` interface and the new `node:test` runner. Players solve Ethereum puzzles modeled after real-world security vulnerabilities like storage slot probing, ABI mispacking, and signature spoofing.

There’s **no frontend** — the CLI is the game.

> 🔗 Learn more about Hardhat 3 Alpha [here](https://hardhat.org/hardhat3-alpha), or join the discussion in the [Telegram group](https://hardhat.org/hardhat3-alpha-telegram-group).

---

## 📦 Getting Started

### 1. Clone and install dependencies

```bash
git clone https://github.com/YOUR_REPO_URL
cd solidity-cell
npm install

2. Set up your .env file

Create a .env file at the root and add:
=======
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
```
### 2. Environment Setup

Create a .env file in the root directory:
>>>>>>> origin/main

PRIVATE_KEY=
ZERO_G_PRIVATE_KEY=
BASE_SEPOLIA_RPC_URL=
ETHERSCAN_API_KEY=
<<<<<<< HEAD
MANTLE_SEPOLIA_RPC_URL=  # Optional

    ✅ PRIVATE_KEY and ZERO_G_PRIVATE_KEY should be the same for now. This will be cleaned up later.

    🔄 MANTLE_SEPOLIA_RPC_URL is not currently required, but supported.

3. Compile and deploy

npx hardhat compile --buildProfile production
npx hardhat run scripts/deployAndVeriy.ts --buildProfile production --network baseSepolia

This will deploy:

    ProofOfEscape.sol

    SolidityCell.sol

Make sure your wallet has testnet ETH and 0G tokens on Base Sepolia:

    Request 0G tokens: 0G Testnet Faucet →

🧠 Start Playing
🧩 Cell #1: The Mismatched Hash

npx hardhat run scripts/solvingFirstCell.ts --network baseSepolia

If you're stuck, 0G AI will give you hints.
You can also generate the correct hash manually:

npx hardhat run scripts/hashForCell1.ts

    🔧 Don’t forget to update the address in hashForCell1.ts to your own!

🧩 Cell #2: The Data Oracle

npx hardhat run scripts/solvingSecondCell.ts --network baseSepolia

To solve this, you’ll need:

    scripts/getSubgraphAnswer.ts → pulls data from Super Accounts subgraph

    scripts/getMySubgraphAnswer.ts → fetches your custom subgraph’s answer

npx hardhat run scripts/getSubgraphAnswer.ts
npx hardhat run scripts/getMySubgraphAnswer.ts

    📌 Default answers (if stuck):

    0x63dED784c8Da63A79eE47f9a53BcB1BAD1d9F3e0

    60975000

    1

🧩 Cell #3: The AI Riddle

npx hardhat run scripts/solvingThirdCell.ts --network baseSepolia

A riddle will be presented to you by 0G AI.
The correct answer is: Knowledge

If answered correctly, a Proof of Escape NFT will be minted to your address.
🏁 Final Notes

    This project is a CLI-first, dev-focused learning tool

    Powered by Hardhat v3, The Graph, and 0G AI

    Built for the ETHGlobal community

    🧠 Learn. 🛠️ Hack. 🧩 Escape.

Enjoy the game!
=======
MANTLE_SEPOLIA_RPC_URL=

    ✅ Use the same value for both PRIVATE_KEY and ZERO_G_PRIVATE_KEY for now.
    🟡 MANTLE_SEPOLIA_RPC_URL is optional — the game also runs on Mantle, but it's not used here.

### 3. Compile & Deploy Contracts

Compile with Hardhat v3:

npx hardhat compile --buildProfile production

Deploy to Base Sepolia:

npx hardhat run scripts/deployAndVeriy.ts --buildProfile production --network baseSepolia

    ⚠️ Requires testnet ETH on Base Sepolia.

### 4. 🧠 Setup 0G AI

To use the AI hint engine, you'll need 0G testnet tokens.
You can request them here:
👉 https://docs.0g.ai/developer-hub/testnet/testnet-overview
🕹️ Start the Game
### ▶️ Puzzle 1: The Mismatched Hash

npx hardhat run scripts/solvingFirstCell.ts --network baseSepolia

If you get stuck, 0G AI will assist you with hints.
bash```
Use this helper script to generate the correct hash:

// scripts/hashForCell1.ts
import { encodeAbiParameters, keccak256, parseAbiParameters } from "viem";

const encoded = encodeAbiParameters(
  parseAbiParameters("string, uint256, address"),
  ["Correctly", BigInt(123), "0xYourAddressHere"]
);

console.log("Hash:", keccak256(encoded));
```
Run it with:
bash```
npx hardhat run scripts/hashForCell1.ts
```
    🧠 Replace "0xYourAddressHere" with your wallet address!

### ▶️ Puzzle 2: The Data Oracle
bash```
npx hardhat run scripts/solvingSecondCell.ts --network baseSepolia
```
Use helper scripts to find the correct data:
bash```
npx hardhat run scripts/getSubgraphAnswer.ts
npx hardhat run scripts/getMySubgraphAnswer.ts
```
### ✅ Correct answers for Cell #2:

    0x63dED784c8Da63A79eE47f9a53BcB1BAD1d9F3e0 (newOwner)

    60975000 (USDC balance)

    1 (toCell value from subgraph)

### ▶️ Puzzle 3: The Final Riddle

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
>>>>>>> origin/main
