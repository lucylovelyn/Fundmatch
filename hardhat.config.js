require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x" + "0".repeat(64);
const BASESEPOLIA_RPC = process.env.BASESEPOLIA_RPC_URL || "https://sepolia.base.org";

module.exports = {
  solidity: {
    version: "0.8.25",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "cancun",
      viaIR: true,
    },
  },
  networks: {
    hardhat: {},
    "base-sepolia": {
      url: BASESEPOLIA_RPC,
      accounts: [PRIVATE_KEY],
      chainId: 84532,
    },
  },
};