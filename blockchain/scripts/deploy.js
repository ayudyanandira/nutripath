const hre = require("hardhat");

async function main() {
  const PaymentAudit = await hre.ethers.getContractFactory("PaymentAudit");
  const contract = await PaymentAudit.deploy();

  // ethers v6 tidak punya deployed(), diganti waitForDeployment()
  await contract.waitForDeployment();

  console.log("PaymentAudit deployed at:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
