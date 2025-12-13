const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { ethers } = require("ethers");

// ABI
const abiPath = path.join(__dirname, "../abi/PaymentAudit.json");
const ABI = JSON.parse(fs.readFileSync(abiPath, "utf8")).abi;

function getContract() {
  if (!process.env.SEPOLIA_RPC_URL) {
    throw new Error("SEPOLIA_RPC_URL is undefined");
  }
  if (!process.env.ADMIN_PRIVATE_KEY) {
    throw new Error("ADMIN_PRIVATE_KEY is undefined");
  }
  if (!process.env.CONTRACT_ADDRESS) {
    throw new Error("CONTRACT_ADDRESS is undefined");
  }

  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  const wallet = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, provider);

  return new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    ABI,
    wallet
  );
}

module.exports = getContract;
