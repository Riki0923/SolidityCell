// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract ProofOfEscape is ERC721, Ownable {
    uint256 private _tokenIdCounter;

    // The constructor sets the NFT's name, symbol, and the initial owner.
    // The initial owner will be you, the deployer.
    constructor()
        ERC721("Proof of Escape", "POE")
        Ownable(msg.sender) // Owner defaults to the deployer
    {}
    /**
     * @notice Mints a new NFT trophy to the specified address.
     * @dev Can only be called by the current owner of this contract.
     * We will transfer ownership to the SolidityCell contract after deployment.
     */
    function mint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        _mint(to, tokenId);
    }

    /**
     * @notice Returns the metadata for a given token ID.
     * @dev The metadata (including the image) is generated and stored directly on-chain.
     */
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        string memory json = Base64.encode(
            bytes(
                string.concat(
                    '{"name": "Proof of Escape #',
                    Strings.toString(tokenId),
                    '", "description": "This token certifies that the holder successfully escaped the Solidity Cell. They have demonstrated mastery of advanced EVM concepts and a deep understanding of smart contract security.", "image": "data:image/svg+xml;base64,',
                    Base64.encode(bytes(getOnChainImage())),
                    '"}'
                )
            )
        );
        return string.concat("data:application/json;base64,", json);
    }

    /**
     * @notice Generates an on-chain SVG image for the NFT.
     */
    function getOnChainImage() private pure returns (string memory) {
        return
            '<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg"><rect width="500" height="500" fill="#000"/><text x="50%" y="50%" font-family="monospace" font-size="30" fill="#00FF00" text-anchor="middle" dominant-baseline="middle">I ESCAPED THE CELL</text></svg>';
    }
}