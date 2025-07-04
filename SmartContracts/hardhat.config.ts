import type { HardhatUserConfig } from "hardhat/config";
import * as dotenv from "dotenv";
import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import { configVariable } from "hardhat/config";
import { zircuitGarfieldTestnet } from "viem/chains";
dotenv.config();

const config: HardhatUserConfig = {
  plugins: [hardhatToolboxViemPlugin],

  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },

  networks: {
    baseSepolia: {
      type: "http",
      chainType: "optimism",
      url: configVariable("BASE_SEPOLIA_RPC_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
    
  },

  verify: {
    etherscan: {
      // For now, we will leave the hardcoded key to solve one problem at a time.
      apiKey: "9VJGFQMEKAN9BNCIIZRTZXC55XGSU6G78D",
    },
  },
};

export default config;