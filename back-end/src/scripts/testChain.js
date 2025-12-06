import contract from "../utils/blockchain.js";

async function main() {
    console.log("Functions available in ABI:");
    console.log(contract.interface.fragments.map(f => f.name));

    // Write test → storePayment
    console.log("\nStoring payment...");
    const tx = await contract.storePayment(5000, "Test backend payment");
    await tx.wait();
    console.log("Payment stored!");

    // Read test → count
    const count = await contract.getPaymentCount();
    console.log("Total payments:", count.toString());

    // Get all
    const all = await contract.getAllPayments();
    console.log(all);
}

main();
