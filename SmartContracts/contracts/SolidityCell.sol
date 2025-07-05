// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./ProofOfEscape.sol";

contract SolidityCell {
    // --- State Variables ---

    // The instance of our NFT contract, set upon deployment.
    ProofOfEscape public immutable proofOfEscape;

    // Mapping to track which cell each player has advanced to.
    mapping(address => uint) public playerProgress;

    // The secret key for the first puzzle. It's private, but not secret!
    bytes32 private immutable CELL1_HIDDEN_KEY;

    // --- Events ---
    event PlayerAdvanced(address indexed player, uint indexed toCell);
    event PlayerEscaped(address indexed player);

    // --- Constructor ---
    constructor(address _proofOfEscapeAddress) {
        // Instantiate our NFT contract handle
        proofOfEscape = ProofOfEscape(_proofOfEscapeAddress);

        // Generate a pseudo-random "hidden" key for the first puzzle
        CELL1_HIDDEN_KEY = keccak256(
            abi.encodePacked(block.timestamp, msg.sender)
        );
    }

    // In SolidityCell.sol

    // --- Puzzle #1: The Hashing Mismatch ---
    function solveCell1(bytes32 _hash) external {
        require(playerProgress[msg.sender] == 0, "You are not at this cell.");

        // The contract calculates the hash the "correct" way, using standard ABI encoding.
        bytes32 expectedHash = keccak256(
            abi.encode("Correctly", uint256(123), msg.sender)
        );

        // The player's first attempt will likely fail here.
        require(_hash == expectedHash, "Incorrect hash: check data packing.");

        playerProgress[msg.sender] = 1;
        emit PlayerAdvanced(msg.sender, 1);
    }

    // --- Escape Function (Final Goal) ---
    // We'll add more checks here as we add more puzzles
    function escape() external {
        // For now, let's assume there is only one puzzle to solve.
        require(
            playerProgress[msg.sender] == 1,
            "You have not solved all the puzzles yet."
        );

        // Mint the "Proof of Escape" NFT to the player
        proofOfEscape.safeMint(msg.sender);
        emit PlayerEscaped(msg.sender);
    }
}
