// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./ProofOfEscape.sol";

contract SolidityCell {
    // --- State Variables ---

    ProofOfEscape public immutable proofOfEscape;
    mapping(address => uint) public playerProgress;

    // --- Events ---
    event PlayerAdvanced(address indexed player, uint indexed toCell);
    event PlayerEscaped(address indexed player);

    // --- Constructor ---
    constructor(address _proofOfEscapeAddress) {
        proofOfEscape = ProofOfEscape(_proofOfEscapeAddress);
    }

    // --- Puzzle #1: The Hashing Mismatch ---
    function solveCell1(bytes32 _hash) external {
        require(playerProgress[msg.sender] == 0, "You are not at Cell 1.");

        bytes32 expectedHash = keccak256(
            abi.encode("Correctly", uint256(123), msg.sender)
        );

        require(_hash == expectedHash, "Incorrect hash: check data packing.");

        playerProgress[msg.sender] = 1;
        emit PlayerAdvanced(msg.sender, 1);
    }

    // --- Puzzle #2: The Data Oracle ---
function solveCell2(uint256 _firstToCellValue) external {
    require(playerProgress[msg.sender] == 1, "You are not at Cell 2.");

    // The player must query their subgraph to find that the first advancement is to cell 1.
    require(_firstToCellValue == 1, "Incorrect answer from your subgraph.");

    playerProgress[msg.sender] = 2;
    emit PlayerAdvanced(msg.sender, 2);
}

    // --- Escape Function (Final Goal) ---
    function escape() external {
        // The player must now have solved both puzzles to escape.
        require(
            playerProgress[msg.sender] == 2,
            "You have not solved all the puzzles yet."
        );

        proofOfEscape.safeMint(msg.sender);
        emit PlayerEscaped(msg.sender);
    }
}
