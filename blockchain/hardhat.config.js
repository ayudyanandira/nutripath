require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

// FIX Undici timeout
require("undici").setGlobalDispatcher(
  new (require("undici").Agent)({
    connect: { timeout: 60000 },
    keepAliveTimeout: 60000,
    pipelining: 0
  })
);

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.27",
      },
      {
        version: "0.8.20",
      }
    ]
  },
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      timeout: 60000,
    },
  },
};
