// SPDX-License-Identifier: ISC
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NeuNFT is ERC721Enumerable, Ownable {
    uint256 private _nextTokenId;

    constructor() ERC721("NeuNFT", "NEUFT") Ownable(msg.sender) {}

    // Mint a new NFT to a user
    function mint(address to) public returns (uint256) {
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;
        _safeMint(to, tokenId);
        return tokenId;
    }
}
