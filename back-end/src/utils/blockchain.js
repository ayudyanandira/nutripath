const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { ethers } = require("ethers");

// path ABI
const abiPath = path.join(__dirname, "../abi/PaymentAudit.json");

// baca ABI
const contractJson = JSON.parse(fs.readFileSync(abiPath, "utf8"));
const ABI = contractJson.abi;

// alamat kontrak
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// provider + wallet
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, provider);

// instance contract
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

module.exports = contract;
