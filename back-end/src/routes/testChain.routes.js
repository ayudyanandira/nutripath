const express = require("express");
const router = express.Router();
const { recordPaymentOnChain } = require("../utils/blockchain");

router.get("/test-chain", async (req, res) => {
    try {
        const txHash = await recordPaymentOnChain(
            "0x0000000000000000000000000000000000000001", 
            "999",
            12345
        );

        res.json({
            success: true,
            message: "Blockchain OK",
            txHash
        });

    } catch (err) {
        console.error("TEST BLOCKCHAIN ERROR:", err);
        res.status(500).json({
            success: false,
            error: err.toString()
        });
    }
});

module.exports = router;
