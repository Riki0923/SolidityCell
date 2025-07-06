# Hardhat 3 Alpha: `node:test` and `viem` example project

> **WARNING**: This example project uses Hardhat 3, which is still in development. Hardhat 3 is not yet intended for production use.

Welcome to the Hardhat 3 alpha version! This project showcases some of the changes and new features coming in Hardhat 3.

To learn more about the Hardhat 3 Alpha, please visit [its tutorial](https://hardhat.org/hardhat3-alpha). To share your feedback, join our [Hardhat 3 Alpha](https://hardhat.org/hardhat3-alpha-telegram-group) Telegram group or [open an issue](https://github.com/NomicFoundation/hardhat/issues/new?template=hardhat-3-alpha.yml) in our GitHub issue tracker.

## 🧩 Project Overview

**Solidity Cell** is an on-chain escape game built entirely with Hardhat v3.  
Players solve EVM-based smart contract puzzles using CLI scripts, with help from The Graph and 0G AI.  

> 📌 Full project description, architecture, and credits will be added on the [ETHGlobal project page](#) before submission.

---

## 🚀 How to Use This Project

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/solidity-cell.git
cd solidity-cell
npm install

2. Environment Setup

Create a .env file in the root directory and add:

PRIVATE_KEY=
BASE_SEPOLIA_RPC_URL=
ETHERSCAN_API_KEY=
MANTLE_SEPOLIA_RPC_URL=
ZERO_G_PRIVATE_KEY=

    ✅ PRIVATE_KEY and ZERO_G_PRIVATE_KEY should be the same (for now).

    🟡 MANTLE_SEPOLIA_RPC_URL is optional — the project also works there, but it’s unused here.

3. Compile & Deploy

Compile with Hardhat v3:

npx hardhat compile --buildProfile production

Then deploy the game contracts (ProofOfEscape + SolidityCell):

npx hardhat run scripts/deployAndVeriy.ts --buildProfile production --network baseSepolia

    ⚠️ Requires testnet ETH on Base Sepolia.

4. 🧠 0G AI Setup

To use the AI helper, you also need testnet 0G tokens.

You can request them from:
https://docs.0g.ai/developer-hub/testnet/testnet-overview

🕹️ Start the Game
▶️ Puzzle 1

npx hardhat run scripts/solvingFirstCell.ts --network baseSepolia

If you’re stuck, 0G AI will provide hints.

You can also use this helper script:

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

▶️ Puzzle 2

npx hardhat run scripts/solvingSecondCell.ts --network baseSepolia

Use the helper scripts to find answers:

npx hardhat run scripts/getSubgraphAnswer.ts
npx hardhat run scripts/getMySubgraphAnswer.ts

✅ Correct Answers:

    0x63dED784c8Da63A79eE47f9a53BcB1BAD1d9F3e0 (newOwner)

    60975000 (USDC balance)

    1 (toCell value)

▶️ Puzzle 3

npx hardhat run scripts/solvingThirdCell.ts --network baseSepolia

This one presents a riddle. The answer is:

Knowledge

If answered correctly, the contract will mint you a Proof of Escape NFT!
🎉 Have Fun

This is a fully CLI-based game. No frontend. No distractions. Just smart contracts, viem, The Graph, and 0G AI.

Good luck escaping! 💀🔐
