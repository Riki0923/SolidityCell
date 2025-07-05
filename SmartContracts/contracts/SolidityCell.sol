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
function solveCell2(
    uint256 _txCount,
    uint256 _daiTotalSupply,
    bytes4 _gasGuzzlerSelector
) external {
    require(playerProgress[msg.sender] == 1, "You are not at Cell 2.");

    // The hardcoded answers for the updated puzzle questions.
    // NOTE: The txCount is an example; you'd use the live value from your query service.
    uint256 expectedTxCount = 8585803; 
    uint256 expectedDaiSupply = 10078278786944695027589937962; // totalSupply at block 18,000,000
    bytes4 expectedSelector = 0xa0712d68; // selector for "setStartingIndex()"

    require(_txCount >= expectedTxCount, "Incorrect answer for Subgraph.");
    require(_daiTotalSupply == expectedDaiSupply, "Incorrect answer for Token API.");
    require(_gasGuzzlerSelector == expectedSelector, "Incorrect answer for Substream.");

    playerProgress[msg.sender] = 2;
    emit PlayerAdvanced(msg.sender, 2);
}


    // --- Escape Function (Final Goal) ---
    function escape() external {
        // The player must now have solved both puzzles to escape.
        require(playerProgress[msg.sender] == 2, "You have not solved all the puzzles yet.");

        proofOfEscape.safeMint(msg.sender);
        emit PlayerEscaped(msg.sender);
    }
}