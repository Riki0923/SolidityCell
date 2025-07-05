import type { HardhatUserConfig } from "hardhat/config";
import * as dotenv from "dotenv";
import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import { configVariable } from "hardhat/config";
import hardhatVerifyPlugin from "@nomicfoundation/hardhat-verify";
dotenv.config();

const config: HardhatUserConfig = {
  plugins: [hardhatToolboxViemPlugin, hardhatVerifyPlugin],

  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      // Commented this part out otherwise I am unable to verify contracts

      // production: {
      //   version: "0.8.28",
      //   settings: {
      //     optimizer: {
      //       enabled: true,
      //       runs: 200,
      //     },
      //   },
      // },
    },
  },

chainDescriptors: {
    5003: {
      name: "mantleSepoliaTestnet",
      blockExplorers: {
        etherscan: {
          name: "Mantle Sepolia Explorer",
          url: "https://explorer.sepolia.mantle.xyz/",
          apiUrl: "https://explorer.sepolia.mantle.xyz/api", // This is a standard guess, but not officially documented or supported.
        },
      },
    },
  },

  networks: {
    // baseSepolia was for first test, worked perfectly, leaving here for reference

    // baseSepolia: {
    //   type: "http",
    //   chainType: "optimism",
    //   url: configVariable("BASE_SEPOLIA_RPC_URL"),
    //   accounts: [configVariable("PRIVATE_KEY")],
    // },
    
    mantleSepoliaTestnet: {
      type: "http",
      url: configVariable("MANTLE_SEPOLIA_RPC_URL"),
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