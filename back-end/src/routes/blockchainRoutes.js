const express = require("express");
const getContract = require("../utils/blockchain");

const router = express.Router();

router.post("/payment", async (req, res) => {
  try {
    const { amount, description } = req.body;

    const contract = getContract(); // 🔥 di sini

    const tx = await contract.storePayment(amount, description);
    await tx.wait();

    res.json({
      success: true,
      message: "Alhamdulillah payment kesimpen di blockchain",
      txHash: tx.hash,
    });
  } catch (err) {
    console.error("Blockchain route error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
