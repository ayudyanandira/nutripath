// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PaymentAudit {
    struct Record {
        address user;
        uint256 amount;
        string description;
        uint256 timestamp;
    }

    Record[] public records;

    event PaymentRecorded(address user, uint256 amount, string description, uint256 timestamp);

    function storePayment(uint256 amount, string memory description) external {
        records.push(Record(msg.sender, amount, description, block.timestamp));

        emit PaymentRecorded(msg.sender, amount, description, block.timestamp);
    }

    function getAllPayments() external view returns (Record[] memory) {
        return records;
    }

    function getPaymentCount() external view returns (uint256) {
        return records.length;
    }
}
