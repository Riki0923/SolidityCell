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
      // // The original etherscan entry
      etherscan: {
        name: "Mantle Sepolia Explorer (Etherscan)",
        url: "https://explorer.sepolia.mantle.xyz/",
        apiUrl: "https://explorer.sepolia.mantle.xyz/api",
      },
      // The requested blockscout entry
      blockscout: {
        name: "Mantle Sepolia Explorer (Blockscout)",
        url: "https://explorer.sepolia.mantle.xyz/",
        apiUrl: "https://explorer.sepolia.mantle.xyz/api",
      },
    },
  },
},

  networks: {
    // baseSepolia was for first test, worked perfectly, leaving here for reference
    baseSepolia: {
      type: "http",
      chainType: "optimism",
      url: configVariable("BASE_SEPOLIA_RPC_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
    // Having verifcation issues here, on etherscan it says the contracts are verified but when you go to the explorer, you will find that they are not...
    // If you are using blockscout verification, you will just get a prompt that verification failed
    mantleSepoliaTestnet: {
      type: "http",
      url: configVariable("MANTLE_SEPOLIA_RPC_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },

  verify: {
    etherscan: {
      apiKey: "9VJGFQMEKAN9BNCIIZRTZXC55XGSU6G78D",
    },
    blockscout: {
      enabled: true
    }
  },
};

export default config;