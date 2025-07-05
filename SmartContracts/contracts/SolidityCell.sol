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
    address _firstNewOwner,
    uint256 _usdcBalance,
    uint256 _toCellValue
) external {
    require(playerProgress[msg.sender] == 1, "You are not at Cell 2.");

    // Expected answers — hardcoded for now
    address expectedOwner = 0x63dED784c8Da63A79eE47f9a53BcB1BAD1d9F3e0;
    uint256 expectedUSDC = 60975000; // <-- fill with USDC value in smallest units
    uint256 expectedToCell = 1;

    require(_firstNewOwner == expectedOwner, "Incorrect answer 1 (newOwner).");
    require(_usdcBalance == expectedUSDC, "Incorrect answer 2 (USDC balance).");
    require(_toCellValue == expectedToCell, "Incorrect answer 3 (toCell).");

    playerProgress[msg.sender] = 2;
    emit PlayerAdvanced(msg.sender, 2);
}
}
