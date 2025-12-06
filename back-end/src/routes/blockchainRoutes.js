const express = require("express");
const contract = require("../utils/blockchain");

const router = express.Router();

router.post("/payment", async (req, res) => {
    try {
        const { amount, description } = req.body;

        const tx = await contract.storePayment(amount, description);
        await tx.wait();

        res.json({
            success: true,
            message: "Alhamdulillah payment kesimpen di blockchain",
            txHash: tx.hash,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
